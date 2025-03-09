import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateRecipe(ingredients: string[]): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const prompt = `Avec ses aliments là ${ingredients.join(', ')} donne moi un idée de recette à faire et donne moi les étapes ou un lien pour la faire.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating recipe:', error);
    throw new Error('Failed to generate recipe suggestion');
  }
}