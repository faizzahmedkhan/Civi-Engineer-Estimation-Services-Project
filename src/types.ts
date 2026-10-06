export interface Project {
  id: string;
  title: string;
  category: "Cost Estimation & Takeoffs" | "Structural Design & Sizing" | "Local Estimations" | "Value Engineering & Optimization" | "High-Rise" | "Residential" | "Infrastructure" | "Industrial" | "Commercial";
  location: string;
  structuralSystem: string;
  scale: string; // e.g., "45,000 sq ft" or "18 Stories"
  description: string;
  imageUrl: string;
  status: "Completed" | "Under Construction" | "Structural Sizing Phase" | "Conceptual";
  year: number;
  seismicRating: string; // e.g., "Zone D, Category E"
  windLoadMax: string; // e.g., "145 mph"
  concreteGrade?: string; // e.g., "C40/50" or "Grade 60"
  steelGrade?: string; // e.g., "ASTM A992"
}

export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  iconName: string; // mapping to lucide-react names
  standards: string[]; // e.g., ["ACI 318-19", "AISC 360-16"]
  keyDeliverables: string[];
}

export interface EstimateSpecs {
  buildingType: "Residential" | "Commercial" | "Industrial" | "Mixed Use" | "Infrastructure";
  footprintArea: number;
  floorsCount: number;
  structuralSystem: "Reinforced Concrete" | "Structural Steel" | "Mass Timber" | "Masonry / Shear Walls";
  siteLocation: string;
  seismicZone: "Low" | "Moderate" | "High" | "Very High";
  windSpeed: number;
  foundationType: "Shallow Footing" | "Raft/Mat Foundation" | "Deep Pile Foundation" | "Let AI suggest";
  sustainabilityFocus: boolean;
  additionalNotes: string;
}

export interface CostBreakdownItem {
  category: string;
  percentage: number;
  estimatedAmount: number;
  notes: string;
}

export interface MaterialTakeoffItem {
  material: string;
  estimatedQuantity: number;
  unit: string;
  purpose: string;
}

export interface EngineeringTimelineItem {
  phase: string;
  durationWeeks: number;
  deliverables: string;
}

export interface EstimateResult {
  projectName: string;
  costEstimation: {
    minCost: number;
    maxCost: number;
    breakdown: CostBreakdownItem[];
  };
  materialTakeoff: MaterialTakeoffItem[];
  structuralRecommendations: string[];
  engineeringTimeline: EngineeringTimelineItem[];
  regulatoryRiskAssessment: string;
  isFallback?: boolean;
}

export interface SubmittedInquiry {
  id: string;
  date: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  specs: EstimateSpecs;
  result: EstimateResult;
  status: "Pending Sizing Audit" | "Seismic Model Verified" | "Site Visit Scheduled" | "PE-Stamped Approved";
  notes?: string;
}
