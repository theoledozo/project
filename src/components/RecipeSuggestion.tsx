import React, { useState } from 'react';
import { ChefHat, Loader2 } from 'lucide-react';
import { generateRecipe } from '../lib/gemini';
import toast from 'react-hot-toast';

interface Props {
  selectedItems: string[];
}

export default function RecipeSuggestion({ selectedItems }: Props) {
  const [recipe, setRecipe] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateRecipe = async () => {
    if (selectedItems.length === 0) {
      toast.error('Sélectionnez des ingrédients d\'abord !');
      return;
    }

    setLoading(true);
    try {
      const suggestion = await generateRecipe(selectedItems);
      setRecipe(suggestion);
    } catch (error) {
      toast.error('Erreur lors de la génération de la recette');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-white rounded-lg p-4 shadow-sm">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <ChefHat className="text-orange-500" />
        Suggestion de Recette
      </h2>

      <button
        onClick={handleGenerateRecipe}
        disabled={loading || selectedItems.length === 0}
        className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" />
            Génération en cours...
          </>
        ) : (
          'Générer une recette'
        )}
      </button>

      {recipe && (
        <div className="mt-4 p-4 bg-orange-50 rounded-lg">
          <div className="prose prose-sm">
            {recipe.split('\n').map((line, index) => (
              <p key={index} className="mb-2">{line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}