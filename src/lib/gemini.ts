import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateRecipe(ingredients: string[]) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Génère une recette simple en français avec ces ingrédients : ${ingredients.join(', ')}. 
    Format souhaité :
    Nom de la recette
    Temps de préparation
    Ingrédients nécessaires
    Instructions étape par étape`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Erreur de génération:', error);
    throw new Error('Erreur lors de la génération de la recette');
  }
}