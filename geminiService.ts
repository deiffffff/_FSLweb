
import { GoogleGenAI } from "@google/genai";

export const getStructuralAdvice = async (query: string) => {
  // Fix: Create a new GoogleGenAI instance right before making an API call 
  // to ensure it always uses the most up-to-date API key from the environment.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  if (!process.env.API_KEY) {
    return "Error: API Key no configurada.";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        systemInstruction: `
          Eres .est-AI, el consultor experto de DARCHEST STRUCTURE LAB (.est), un estudio de ingeniería estructural de alto standing.
          Tu tono es: profesional, sofisticado, técnico pero accesible, y extremadamente preciso.
          Especialidades: Hormigón visto, estructuras metálicas complejas, sostenibilidad, sismicidad y estética estructural.
          Idiomas: Responde en el idioma en que se te pregunte.
          No des consejos legales o de seguridad finales; siempre recuerda que los cálculos definitivos deben ser validados por un ingeniero colegiado del estudio .est.
          Mantén las respuestas concisas y elegantes.
        `,
        temperature: 0.7,
      },
    });

    // Fix: Access .text property directly as it is a getter, not a method.
    return response.text || "No pude procesar tu consulta en este momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Hubo un error al conectar con el cerebro de .est. Por favor, inténtalo de nuevo.";
  }
};
