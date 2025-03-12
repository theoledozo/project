import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyD35lHUoNUn5xigEOumQcGbdVkAziVHlis';
const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateRecipe(ingredients: string[]): Promise<string | null> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Erreur lors de la génération de la recette');
  }
}

export async function generateGeminiResponse(prompt: string): Promise<string | null> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('Erreur Gemini:', error);
    return null;
  }
}

