import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { generateGeminiResponse } from '../lib/gemini';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { Trash2 } from 'lucide-react';

interface WorkDay {
  id: number;
  person: string;
  hours: number;
  days: number;
  contract_type: 'Casual' | 'Piece Rate';
  days_counted: number;
  start_date: string;
  end_date: string;
  created_at: string;
}

const DaysCalculator = () => {
  const { person } = useParams();
  const [hours, setHours] = useState('');
  const [days, setDays] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [contractType, setContractType] = useState<'Casual' | 'Piece Rate'>('Casual');
  const [loading, setLoading] = useState(false);
  const [totalDays, setTotalDays] = useState(0);
  const [payslips, setPayslips] = useState<WorkDay[]>([]);

  useEffect(() => {
    fetchTotalDays();
    fetchPayslips();
  }, [person]);

  const fetchTotalDays = async () => {
    const { data, error } = await supabase
      .from('work_days')
      .select('days_counted')
      .eq('person', person);

    if (error) {
      toast.error('Erreur lors du chargement des jours');
      return;
    }

    const total = data.reduce((sum, record) => sum + record.days_counted, 0);
    setTotalDays(total);
  };

  const fetchPayslips = async () => {
    const { data, error } = await supabase
      .from('work_days')
      .select('*')
      .eq('person', person)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Erreur lors du chargement des payslips');
      return;
    }

    setPayslips(data || []);
  };

  const extractDaysFromResponse = (response: string): number => {
    const match = response.match(/: (\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  const deletePayslip = async (id: number) => {
    const { error } = await supabase
      .from('work_days')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Erreur lors de la suppression');
      return;
    }

    toast.success('Payslip supprimé');
    fetchPayslips();
    fetchTotalDays();
  };

  const calculateDays = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hours.trim() || !days.trim() || !startDate || !endDate) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    try {
      const prompt = `Tu vas prendre le role d'un Agent d'immigration du gouvernement australien  

      Je suis un francais en working holiday visa, je vais te dire les heures que et jours travailler dans la semain et tu vas me dire combien de jour je peux compter  

      La reponse doit etre sous ce format la : "Nombre de jours pouvant etre comptabiliser : (reponse)." il ne doit pas avoir d'info supplementaire

      J'ai travailler ${days} jours dans la semaine pour un total de ${hours}h en ${contractType.toLowerCase()}`;

      const response = await generateGeminiResponse(prompt);
      
      if (!response) {
        throw new Error('Pas de réponse générée');
      }

      const daysCount = extractDaysFromResponse(response);

      // Sauvegarder dans Supabase
      const { error } = await supabase
        .from('work_days')
        .insert([{
          person,
          hours: Number(hours),
          days: Number(days),
          contract_type: contractType,
          days_counted: daysCount,
          start_date: startDate,
          end_date: endDate
        }]);

      if (error) throw error;
      
      setTotalDays(prev => prev + daysCount);
      toast.success('Calcul effectué !');
      setHours('');
      setDays('');
      setStartDate('');
      setEndDate('');
      fetchPayslips();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors du calcul');
    } finally {
      setLoading(false);
    }
  };

  const progressPercentage = (totalDays / 88) * 100;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Calcul des jours - {person}</h1>

      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Progression</span>
          <span>{totalDays}/88 jours</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          ></div>
        </div>
      </div>
      
      <form onSubmit={calculateDays} className="space-y-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Date de début</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-2">Date de fin</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2">Nombre d'heures travaillées</label>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Heures travaillées"
          />
        </div>

        <div>
          <label className="block mb-2">Nombre de jours travaillés</label>
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Jours travaillés"
          />
        </div>

        <div>
          <label className="block mb-2">Type de contrat</label>
          <select
            value={contractType}
            onChange={(e) => setContractType(e.target.value as 'Casual' | 'Piece Rate')}
            className="w-full p-2 border rounded"
          >
            <option value="Casual">Casual</option>
            <option value="Piece Rate">Piece Rate</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Calcul en cours...' : 'Calculer'}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Historique des payslips</h2>
        <div className="space-y-4">
          {payslips.map((payslip) => (
            <div key={payslip.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">
                    {new Date(payslip.start_date).toLocaleDateString()} - {new Date(payslip.end_date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">{payslip.hours} heures travaillées</p>
                  <p className="text-gray-600">{payslip.days} jours travaillés</p>
                </div>
                <button
                  onClick={() => deletePayslip(payslip.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DaysCalculator; 