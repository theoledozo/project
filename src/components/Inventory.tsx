import { useState, useEffect } from 'react';
import { Plus, Minus, PlusCircle, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  created_at: string;
}

export default function Inventory() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [newItem, setNewItem] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const { data, error } = await supabase
      .from('inventory_items')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      toast.error('Erreur lors du chargement de l\'inventaire');
      return;
    }
    setItems(data || []);
  }

  async function addItem(e: React.FormEvent) {
    e.preventDefault();
    if (!newItem.trim()) return;

    const { error } = await supabase
      .from('inventory_items')
      .insert([{ 
        name: newItem.trim(),
        quantity: 1
      }]);

    if (error) {
      toast.error('Erreur lors de l\'ajout de l\'article');
      return;
    }

    toast.success('Article ajouté');
    setNewItem('');
    fetchItems();
  }

  async function updateQuantity(id: number, newQuantity: number) {
    if (newQuantity <= 0) {
      const { error } = await supabase
        .from('inventory_items')
        .delete()
        .eq('id', id);

      if (error) {
        toast.error('Erreur lors de la suppression');
        return;
      }
      toast.success('Article supprimé');
    } else {
      const { error } = await supabase
        .from('inventory_items')
        .update({ quantity: newQuantity })
        .eq('id', id);

      if (error) {
        toast.error('Erreur lors de la mise à jour');
        return;
      }
    }

    fetchItems();
  }

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Inventaire</h1>
      
      <form onSubmit={addItem} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Ajouter un article..."
            className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            <PlusCircle size={24} />
          </button>
        </div>
      </form>

      <div className="relative mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher un article..."
          className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>

      <div className="space-y-2">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm transform transition-all duration-200 hover:shadow-md"
          >
            <span className="flex-grow">{item.name}</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="text-red-500 hover:text-red-700 transition-colors p-1 hover:bg-red-50 rounded"
              >
                <Minus size={20} />
              </button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="text-green-500 hover:text-green-700 transition-colors p-1 hover:bg-green-50 rounded"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        ))}
        {filteredItems.length === 0 && searchQuery && (
          <div className="text-center text-gray-500 py-4">
            Aucun article trouvé pour "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
} 