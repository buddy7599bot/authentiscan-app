import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

interface WatchAnalysisResult {
  brand: string | null
  model: string | null
  reference: string | null
  verdict: "authentic" | "suspicious" | "fake"
  confidence: number
  issues: {
    area: string
    severity: "minor" | "moderate" | "critical"
    description: string
  }[]
  summary: string
}

export async function analyzeWatchImages(imageBase64Array: string[]): Promise<WatchAnalysisResult> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

  const imageParts = imageBase64Array.map((base64, index) => ({
    inlineData: {
      data: base64.replace(/^data:image\/\w+;base64,/, ""),
      mimeType: "image/jpeg"
    }
  }))

  const prompt = `You are an expert luxury watch authenticator specializing in detecting counterfeit and "super clone" watches. 

Analyze these watch images carefully and provide authentication results.

Check for these specific indicators of counterfeits:
1. DIAL: Font spacing, text alignment, logo positioning, printing quality
2. HANDS: Shape, finish, lume application, proportions
3. BEZEL: Markers alignment, color, engraving depth
4. CROWN: Logo engraving, shape, guards (if applicable)
5. CASE: Finishing quality, proportions, serial/model engravings
6. DATE WINDOW: Magnification (cyclops), date wheel font, alignment
7. LUME: Application quality, color consistency, glow pattern
8. MOVEMENT (if visible): Quality, engravings, finishing

Respond in this exact JSON format:
{
  "brand": "detected brand name or null",
  "model": "detected model name or null",
  "reference": "reference number if visible or null",
  "verdict": "authentic" | "suspicious" | "fake",
  "confidence": 0-100,
  "issues": [
    {
      "area": "specific area (dial, crown, bezel, etc.)",
      "severity": "minor" | "moderate" | "critical",
      "description": "detailed description of the issue"
    }
  ],
  "summary": "2-3 sentence summary of the authentication assessment"
}

Important:
- Be thorough but fair - super clones are sophisticated
- If image quality is poor, note it but still provide best assessment
- Confidence should reflect certainty (50 = uncertain, 90+ = very confident)
- Always provide at least one observation even if authentic`

  try {
    const result = await model.generateContent([prompt, ...imageParts])
    const response = await result.response
    const text = response.text()
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("No JSON found in response")
    }
    
    const analysis = JSON.parse(jsonMatch[0]) as WatchAnalysisResult
    return analysis
  } catch (error) {
    console.error("Gemini analysis error:", error)
    
    // Return a default result on error
    return {
      brand: null,
      model: null,
      reference: null,
      verdict: "suspicious",
      confidence: 50,
      issues: [{
        area: "analysis",
        severity: "moderate",
        description: "Could not complete full analysis. Please try with clearer images."
      }],
      summary: "Analysis could not be completed. Please upload higher quality images."
    }
  }
}
