import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini API client
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not defined. The app will use rule-based engineering fallback calculations.");
      return null;
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

// Fallback rule-based calculator when API key is not present
function generateFallbackEstimate(specs: any) {
  const footprint = Number(specs.footprintArea) || 2000;
  const floors = Number(specs.floorsCount) || 1;
  const totalSqFt = footprint * floors;
  
  // Basic rates based on building system & type
  let baseRateSqFt = 250; // default commercial
  if (specs.buildingType === "Residential") baseRateSqFt = 200;
  if (specs.buildingType === "Industrial") baseRateSqFt = 150;
  
  let structuralMultiplier = 1.0;
  if (specs.structuralSystem === "Reinforced Concrete") structuralMultiplier = 1.1;
  if (specs.structuralSystem === "Structural Steel") structuralMultiplier = 1.25;
  if (specs.structuralSystem === "Mass Timber") structuralMultiplier = 1.15;
  
  let seismicMultiplier = 1.0;
  if (specs.seismicZone === "High") seismicMultiplier = 1.15;
  if (specs.seismicZone === "Very High") seismicMultiplier = 1.3;
  
  const calculatedRate = baseRateSqFt * structuralMultiplier * seismicMultiplier;
  const rawCost = totalSqFt * calculatedRate;
  
  const minCost = Math.round(rawCost * 0.9);
  const maxCost = Math.round(rawCost * 1.15);
  
  // Build categories breakdown
  const breakdown = [
    { category: "Structural Frame & Foundations", percentage: 35, estimatedAmount: Math.round(rawCost * 0.35), notes: `Includes structural system of ${specs.structuralSystem || "Standard Frame"}.` },
    { category: "Enclosure & Facade", percentage: 20, estimatedAmount: Math.round(rawCost * 0.20), notes: "Cladding, curtain walls, and thermal barriers." },
    { category: "MEP & Life Safety Systems", percentage: 25, estimatedAmount: Math.round(rawCost * 0.25), notes: "Mechanical, electrical, plumbing, and HVAC systems." },
    { category: "Architectural Finishes", percentage: 15, estimatedAmount: Math.round(rawCost * 0.15), notes: "Flooring, ceiling tiles, interior partitions, and trims." },
    { category: "Permits, Surveying, Engineering Fees", percentage: 5, estimatedAmount: Math.round(rawCost * 0.05), notes: "Rida Sarfaraz professional engineering, seismic reports, peer reviews." },
  ];
  
  // Takeoff quantities
  const takeoff = [
    { material: "Concrete (C30/37)", estimatedQuantity: Math.round(totalSqFt * 0.15), unit: "m³", purpose: "Slabs, pillars, and structural foundation elements" },
    { material: "Structural Reinforcement Steel (Grade 60)", estimatedQuantity: Math.round(totalSqFt * 12.5), unit: "kg", purpose: "Tensile steel rebars for concrete framing" },
  ];
  
  if (specs.structuralSystem === "Structural Steel") {
    takeoff.push({ material: "Structural Steel Members (I-Beams & HSS)", estimatedQuantity: Math.round(totalSqFt * 32), unit: "kg", purpose: "Primary columns, beams, and bracing members" });
  } else if (specs.structuralSystem === "Mass Timber") {
    takeoff.push({ material: "Cross-Laminated Timber (CLT)", estimatedQuantity: Math.round(totalSqFt * 0.18), unit: "m³", purpose: "Load-bearing timber walls, flooring panels, and cores" });
  }
  
  // Dynamic engineering recommendations
  const recommendations = [
    `Designed for site location: ${specs.siteLocation || "Regional Coordinates"}.`,
    `A ${specs.structuralSystem || "conventional"} structural system was evaluated for a ${floors}-story building.`,
    `Seismic bracing is calibrated for ${specs.seismicZone || "Moderate"} activity zone; recommend braced steel framing or concrete shear cores.`,
  ];
  
  if (specs.windSpeed && Number(specs.windSpeed) > 110) {
    recommendations.push(`High wind load speed recognized (${specs.windSpeed} mph). Facade ties and corner roof zones require special cladding engineering design (RSE-Wind-Specs).`);
  }
  
  if (specs.sustainabilityFocus) {
    recommendations.push("Sustainability upgrade: Specified low-carbon concrete mixture replacing 40% Portland cement with fly ash/slag to reduce lifecycle CO2 footprint.");
  }
  
  const timeline = [
    { phase: "Pre-construction Peer Review & Surveying", durationWeeks: 4, deliverables: "Topographical maps, geotechnical soil investigations report, initial code compliance audit" },
    { phase: "Schematic Engineering & Load Modeling", durationWeeks: 6, deliverables: "3D SAP2000 structural analytical grid, dynamic seismic response models, preliminary member sizing blueprints" },
    { phase: "Construction Documentation & Permitting Support", durationWeeks: 8, deliverables: "Full blueprint package stamped by PE, structural rebar drawings, foundation scheduling sheets, PE stamping" },
    { phase: "On-site Field Inspection & Foundation Review", durationWeeks: 12, deliverables: "On-site concrete testing logs, pour authorization stamps, structural compliance affidavits" }
  ];
  
  return {
    projectName: `RSE-PROJ-${Math.floor(100 + Math.random() * 900)}-${specs.structuralSystem?.substring(0, 3).toUpperCase() || "STD"}`,
    costEstimation: { minCost, maxCost, breakdown },
    materialTakeoff: takeoff,
    structuralRecommendations: recommendations,
    engineeringTimeline: timeline,
    regulatoryRiskAssessment: `Evaluation based on the ${specs.seismicZone === "Very High" || specs.seismicZone === "High" ? "IBC (International Building Code) Chapter 16 (Seismic Design Criteria Category D/E)" : "IBC Chapter 16 standard load calculations"}. A professional PE stamp is recommended. Site-specific soil geotechnical boring is mandatory to verify if foundation types fit ground friction values.`
  };
}

// API endpoint for project estimates
app.post("/api/estimate", async (req, res) => {
  try {
    const specs = req.body;
    const ai = getGeminiClient();
    
    if (!ai) {
      // Return local rule-based calculated results if API key is not present
      const fallbackResult = generateFallbackEstimate(specs);
      return res.json(fallbackResult);
    }
    
    const footprint = specs.footprintArea || 2000;
    const floors = specs.floorsCount || 1;
    const totalSqFt = footprint * floors;
    const sys = specs.structuralSystem || "Reinforced Concrete";
    const type = specs.buildingType || "Residential";
    const loc = specs.siteLocation || "USA";
    const seismic = specs.seismicZone || "Moderate";
    const wind = specs.windSpeed || 110;
    const foundation = specs.foundationType || "Not Sure (Suggest best suited)";
    const sustainability = specs.sustainabilityFocus ? "Strongly focused on LEED / Low-carbon concrete" : "Standard compliance";
    const notes = specs.additionalNotes || "No specific additional parameters";

    const systemInstruction = `You are a Principal Structural and Geotechnical Engineer at 'Rida Sarfaraz Engineering'. 
Your task is to analyze building design specification parameters and generate a highly professional structural engineering assessment, realistic cost estimate, detailed material takeoff (concrete volume, steel mass, or timber members), and an engineering phase timeline.
Provide real, pragmatic calculations based on standard engineering formulas (e.g. concrete density 2400 kg/m3, structural steel requirements, ASCE 7 wind loads, IBC 2024 seismic requirements).
Ensure all generated text is concise, formal, extremely authoritative, and lacks typical conversational padding or marketing language. Make the project name unique and technical (e.g. 'RSE-SEC-920-混凝土').`;

    const prompt = `Analyze these project specifications for structural engineering design:
- Building Type: ${type}
- Total Footprint Area: ${footprint} sq ft
- Number of Floors: ${floors} (Total Area: ${totalSqFt} sq ft)
- Structural System Preference: ${sys}
- Intended Location: ${loc}
- Seismic Activity Zone: ${seismic}
- Ultimate Wind Speed Requirements: ${wind} mph
- Desired Foundation Type: ${foundation}
- Sustainability Directives: ${sustainability}
- Structural Notes/Special requirements: ${notes}

Perform high-precision preliminary engineering sizing. Return a JSON report containing realistic cost ranges (minCost, maxCost in USD), a standard breakdown of major components (foundations/structural, enclosure, MEP, finishes, engineering fees), a detailed material takeoff array (include concrete C30/37, reinforcement steel, or steel profiles with accurate weights/volumes based on total area), robust professional engineering recommendations (including concrete slab thickness or wind loading bracing tips), an engineering project timeline, and a brief regulatory compliance assessment.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["projectName", "costEstimation", "materialTakeoff", "structuralRecommendations", "engineeringTimeline", "regulatoryRiskAssessment"],
          properties: {
            projectName: {
              type: Type.STRING,
              description: "A highly technical engineering project code ID like RSE-CON-405-TX"
            },
            costEstimation: {
              type: Type.OBJECT,
              required: ["minCost", "maxCost", "breakdown"],
              properties: {
                minCost: { type: Type.INTEGER, description: "Minimum calculated construction cost in USD" },
                maxCost: { type: Type.INTEGER, description: "Maximum calculated construction cost in USD" },
                breakdown: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    required: ["category", "percentage", "estimatedAmount", "notes"],
                    properties: {
                      category: { type: Type.STRING, description: "Component category like Foundations, Cladding, MEP, PE Fees" },
                      percentage: { type: Type.INTEGER, description: "Percentage of total budget, sum should be 100" },
                      estimatedAmount: { type: Type.INTEGER, description: "Estimated amount in USD" },
                      notes: { type: Type.STRING, description: "Specific engineering notes regarding this cost portion" }
                    }
                  }
                }
              }
            },
            materialTakeoff: {
              type: Type.ARRAY,
              description: "Estimated structural materials list",
              items: {
                type: Type.OBJECT,
                required: ["material", "estimatedQuantity", "unit", "purpose"],
                properties: {
                  material: { type: Type.STRING, description: "Name of structural material, e.g., Concrete (C30/37), Rebar (Grade 60), timber CLT" },
                  estimatedQuantity: { type: Type.NUMBER, description: "Sized volume or weight" },
                  unit: { type: Type.STRING, description: "e.g., m³, kg, tons, sq ft" },
                  purpose: { type: Type.STRING, description: "Engineering purpose, e.g. Column reinforcement, structural slabs" }
                }
              }
            },
            structuralRecommendations: {
              type: Type.ARRAY,
              description: "Professional structural, wind, seismic, or foundation suggestions",
              items: { type: Type.STRING }
            },
            engineeringTimeline: {
              type: Type.ARRAY,
              description: "Phases of professional engineering services",
              items: {
                type: Type.OBJECT,
                required: ["phase", "durationWeeks", "deliverables"],
                properties: {
                  phase: { type: Type.STRING, description: "Engineering design phase name" },
                  durationWeeks: { type: Type.INTEGER, description: "Duration in weeks" },
                  deliverables: { type: Type.STRING, description: "Document or engineering review deliverables" }
                }
              }
            },
            regulatoryRiskAssessment: {
              type: Type.STRING,
              description: "Compliance brief mapping parameters to IBC Chapter 16 and geotechnical survey mandates"
            }
          }
        }
      }
    });

    const text = response.text || "";
    const parsedData = JSON.parse(text.trim());
    return res.json(parsedData);
  } catch (error: any) {
    console.error("Gemini API Error, falling back to local formulas:", error);
    // Graceful fallback to rule-based estimate on error
    const fallbackResult = generateFallbackEstimate(req.body);
    return res.json({
      ...fallbackResult,
      isFallback: true,
      errorMessage: error.message
    });
  }
});

// Setup Vite Dev server or Serve Static dist folder
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode (integrating Vite middleware)...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    
    // Mount Vite dev server middlewares
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode (serving static assets)...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully active and listening on: http://localhost:${PORT}`);
  });
}

startServer();
