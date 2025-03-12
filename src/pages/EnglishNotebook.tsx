import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Pencil, Trash2, Search } from 'lucide-react';
import toast from 'react-hot-toast';

interface Category {
  id: number;
  name: string;
}

interface EnglishItem {
  id: number;
  french_text: string;
  english_text: string;
  category_id: number;
  notes?: string;
  created_at: string;
}

const EnglishNotebook = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<EnglishItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form states
  const [frenchText, setFrenchText] = useState('');
  const [englishText, setEnglishText] = useState('');
  const [notes, setNotes] = useState('');
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [editingItem, setEditingItem] = useState<EnglishItem | null>(null);

  useEffect(() => {
    fetchCategories();
    fetchItems();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) {
      toast.error('Erreur lors du chargement des catégories');
      return;
    }
    setCategories(data);
  };

  const fetchItems = async () => {
    let query = supabase.from('english_items').select('*');
    
    if (selectedCategory) {
      query = query.eq('category_id', selectedCategory);
    }
    
    if (searchTerm) {
      query = query.or(`french_text.ilike.%${searchTerm}%,english_text.ilike.%${searchTerm}%`);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      toast.error('Erreur lors du chargement des éléments');
      return;
    }
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, [selectedCategory, searchTerm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!frenchText || !englishText || !categoryId) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      if (editingItem) {
        const { error } = await supabase
          .from('english_items')
          .update({
            french_text: frenchText,
            english_text: englishText,
            category_id: categoryId,
            notes
          })
          .eq('id', editingItem.id);

        if (error) throw error;
        toast.success('Élément modifié avec succès');
      } else {
        const { error } = await supabase
          .from('english_items')
          .insert([{
            french_text: frenchText,
            english_text: englishText,
            category_id: categoryId,
            notes
          }]);

        if (error) throw error;
        toast.success('Élément ajouté avec succès');
      }

      setFrenchText('');
      setEnglishText('');
      setNotes('');
      setCategoryId('');
      setEditingItem(null);
      fetchItems();
    } catch (error) {
      toast.error('Une erreur est survenue');
    }
  };

  const handleEdit = (item: EnglishItem) => {
    setEditingItem(item);
    setFrenchText(item.french_text);
    setEnglishText(item.english_text);
    setNotes(item.notes || '');
    setCategoryId(item.category_id);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
      return;
    }

    const { error } = await supabase
      .from('english_items')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Erreur lors de la suppression');
      return;
    }

    toast.success('Élément supprimé');
    fetchItems();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Carnet d'anglais</h1>

      {/* Formulaire d'ajout/modification */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2">Français</label>
            <input
              type="text"
              value={frenchText}
              onChange={(e) => setFrenchText(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Texte en français"
            />
          </div>
          <div>
            <label className="block mb-2">Anglais</label>
            <input
              type="text"
              value={englishText}
              onChange={(e) => setEnglishText(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Texte en anglais"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2">Catégorie</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              className="w-full p-2 border rounded"
            >
              <option value="">Sélectionnez une catégorie</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2">Notes (optionnel)</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Notes ou exemples"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
        >
          {editingItem ? 'Modifier' : 'Ajouter'}
        </button>
      </form>

      {/* Barre de recherche et filtres */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border rounded"
            placeholder="Rechercher..."
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <select
          value={selectedCategory || ''}
          onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : null)}
          className="p-2 border rounded md:w-48"
        >
          <option value="">Toutes les catégories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Liste des éléments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow">
            <div className="mb-2">
              <p className="font-semibold">{item.french_text}</p>
              <p className="text-gray-600">{item.english_text}</p>
              {item.notes && (
                <p className="text-sm text-gray-500 mt-2">{item.notes}</p>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="text-blue-500 hover:text-blue-700"
              >
                <Pencil size={20} />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnglishNotebook; 