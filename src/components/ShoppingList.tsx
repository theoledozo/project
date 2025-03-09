import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Plus, Trash2, RotateCcw } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface ShoppingItem {
  id: number;
  name: string;
  created_at: string;
}

export default function ShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const { data, error } = await supabase
      .from('shopping_items')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      toast.error('Erreur lors du chargement des articles');
      return;
    }
    setItems(data || []);
  }

  async function addItem(e: React.FormEvent) {
    e.preventDefault();
    if (!newItem.trim()) return;

    const { error } = await supabase
      .from('shopping_items')
      .insert([{ name: newItem.trim() }]);

    if (error) {
      toast.error('Erreur lors de l\'ajout de l\'article');
      return;
    }

    toast.success('Article ajouté');
    setNewItem('');
    fetchItems();
  }

  async function deleteItem(id: number) {
    const { error } = await supabase
      .from('shopping_items')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Erreur lors de la suppression');
      return;
    }

    toast.success('Article supprimé');
    fetchItems();
  }

  async function resetList() {
    const { error } = await supabase
      .from('shopping_items')
      .delete()
      .neq('id', 0);

    if (error) {
      toast.error('Erreur lors de la réinitialisation');
      return;
    }

    toast.success('Liste réinitialisée');
    fetchItems();
  }

  const SwipeableItem = ({ item }: { item: ShoppingItem }) => {
    const handlers = useSwipeable({
      onSwipedRight: () => deleteItem(item.id),
      trackMouse: true
    });

    return (
      <div
        {...handlers}
        className="flex items-center bg-white p-4 mb-2 rounded-lg shadow-sm transform transition-transform touch-pan-y"
      >
        <span className="flex-grow">{item.name}</span>
        <button
          onClick={() => deleteItem(item.id)}
          className="ml-2 text-red-500 hover:text-red-700"
        >
          <Trash2 size={20} />
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Liste de Courses</h1>
      
      <form onSubmit={addItem} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Ajouter un article..."
            className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            <Plus size={24} />
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {items.map((item) => (
          <SwipeableItem key={item.id} item={item} />
        ))}
      </div>

      {items.length > 0 && (
        <button
          onClick={resetList}
          className="mt-6 w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 flex items-center justify-center gap-2"
        >
          <RotateCcw size={20} />
          Réinitialiser la liste
        </button>
      )}
    </div>
  );
}