import { Project, Service } from "./types";

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: "rse-01",
    title: "Urban Mixed-Use Commercial Tower",
    category: "Cost Estimation & Takeoffs",
    location: "Sized & Costed for International Contractor",
    structuralSystem: "Reinforced Concrete Shear Core + Flat Slab Structural Sizing",
    scale: "15 Stories (240,000 sq ft)",
    description: "Prepared a comprehensive structural cost estimation, concrete takeoff volume calculations, and comprehensive Bills of Quantities (BoQ) for a major high-rise development. Balanced regional material price fluctuations to safeguard the client's investment margins.",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    status: "Completed",
    year: 2025,
    seismicRating: "IBC 2024 Code Compliance Audited",
    windLoadMax: "125 mph Wind Exposure Class",
    concreteGrade: "C40/50 Frame & Foundation Mat",
    steelGrade: "Grade 60 Reinforcement (A615) Sizing Takeoffs"
  },
  {
    id: "rse-02",
    title: "Beachfront Villa Cantilevered Frame",
    category: "Structural Design & Sizing",
    location: "International Freelance Project (Western Europe)",
    structuralSystem: "Post-Tensioned Slabs + Cantilevered Structural Steel Frames",
    scale: "7,200 sq ft Coastal Luxury Residence",
    description: "Provided remote freelance structural design, dead/live/wind loading simulations, and material takeoffs for an elite hillside cantilevered villa. Sized all load-bearing elements in accordance with local Eurocode requirements.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    status: "Completed",
    year: 2024,
    seismicRating: "Eurocode 8 Seismic Zone Calibration",
    windLoadMax: "140 mph Coastal Ridge Rating",
    concreteGrade: "C35/45 Cast-in-Place Structural Elements",
    steelGrade: "EN 10025 S355 high-tensile structural steel"
  },
  {
    id: "rse-03",
    title: "Regional Highway Overpass Bridge",
    category: "Local Estimations",
    location: "Local Infrastructure Project",
    structuralSystem: "Precast Prestressed Concrete Girders + Deep Drilled Pile Foundations",
    scale: "1.5 Miles Civil Overpass Alignment",
    description: "Performed rigorous cost estimation audits, concrete volume takeoff schedules, and foundation civil work estimates for a major local transit development. Guaranteed RICS & AACE compliance for state licensing board reviews.",
    imageUrl: "https://images.unsplash.com/photo-1545558014-8687977e90a1?q=80&w=1200&auto=format&fit=crop",
    status: "Completed",
    year: 2023,
    seismicRating: "Local Seismic Code Dampening Standards",
    windLoadMax: "110 mph High-Impact Overpass Grade",
    concreteGrade: "High-Strength C50/60 Prestressed Box Beams",
    steelGrade: "ASTM A416 Low-Relaxation Prestressing Strands"
  },
  {
    id: "rse-04",
    title: "Logistics Distribution Hangar",
    category: "Value Engineering & Optimization",
    location: "Industrial Project Portfolio",
    structuralSystem: "Long-Span Webbed Steel Space Trusses & Custom Footings",
    scale: "85,000 sq ft Columns-Free Core Area",
    description: "Conducted a detailed value engineering study that optimized the primary structural steel frames. Slashed material waste by 18% through load path optimization without sacrificing ASCE-7 design compliance.",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    status: "Completed",
    year: 2024,
    seismicRating: "ASCE 7-22 Rigid Braced Sizing",
    windLoadMax: "115 mph Exposure C Factor",
    concreteGrade: "C30/37 Fiber-Reinforced Ground Slab",
    steelGrade: "AISC W-Shapes Grade 50 Steel Framing"
  },
  {
    id: "rse-05",
    title: "CLT Eco-Office Development",
    category: "Structural Design & Sizing",
    location: "International Office Landmark",
    structuralSystem: "Hybrid Cross-Laminated Timber (CLT) + Glulam Structural Bracing",
    scale: "5 Stories (48,000 sq ft)",
    description: "Collaborated remotely with international architect groups to deliver preliminary timber panel thicknesses, load deflection calculations, and detailed volume counts for sustainable construction materials.",
    imageUrl: "https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1200&auto=format&fit=crop",
    status: "Structural Sizing Phase",
    year: 2026,
    seismicRating: "IBC Category C Seismic Bracing Plan",
    windLoadMax: "110 mph",
    concreteGrade: "C30/37 Base Slab (Subterranean Only)",
    steelGrade: "ASTM A36 Custom Fasteners & Connectors"
  }
];

export const ENGINEERING_SERVICES: Service[] = [
  {
    id: "serv-01",
    title: "Civil Estimations & Material Takeoffs",
    shortDesc: "Precise estimation lists, material quantification, and comprehensive Bills of Quantities (BoQ) for residential & commercial builds.",
    longDesc: "Over my 6-year career as a civil engineer, I have delivered highly accurate, transparent material takeoffs (concrete volumes, structural steel tonnages, masonry count, drywalls, finishes, and MEP packages). Utilizing a rigorous, data-driven approach, I translate structural blueprints into practical cost models that reflect active local and international market pricing.",
    iconName: "Layers",
    standards: ["RICS (Royal Institution of Chartered Surveyors)", "AACE International Standard Cost Classifications", "IBC Chapter 16 Loading Standards"],
    keyDeliverables: [
      "Itemized Material Takeoff Sheets (QTO)",
      "Comprehensive Bills of Quantities (BoQ)",
      "Procurement Planning & Waste Factors Schedules",
      "Dynamic cost-per-square-foot baseline estimations"
    ]
  },
  {
    id: "serv-02",
    title: "Value Engineering & Cost Optimization",
    shortDesc: "Auditing structural layouts to discover material redundancies, optimizing configurations, and saving 10-25% on core framing budgets.",
    longDesc: "Cost efficiency doesn't mean cutting corners—it means elegant engineering. I analyze existing design plans from architectural groups to locate structural over-design or inefficient load paths. By revising beam spans, utilizing high-performance concrete/steel grade combinations, and optimizing foundation sizing, I help developers shave off substantial project costs while fully maintaining code compliance.",
    iconName: "Activity",
    standards: ["ASCE 7-22 Minimum Design Loads", "ASTM Standards for Structural Members", "Value Engineering Protocol (SAVE International)"],
    keyDeliverables: [
      "Structural Sizing Redundancy Audits",
      "Steel Weight Reduction Optimization Sheets",
      "Alternative Foundation Sizing Recommendations",
      "Direct Cost Saving Differential Matrices"
    ]
  },
  {
    id: "serv-03",
    title: "International Freelance Structural Sizing",
    shortDesc: "Dynamic structural calculations, beam/column sizing, and structural validation modeling for global contractors.",
    longDesc: "I support international clients with robust engineering calculations, sizing structural concrete frames, designing continuous or deep pile foundations, and modeling load transfers. Using advanced digital simulation systems, I ensure your structures are perfectly configured for standard loading, high wind pressures, and seismic drift hazards, conforming to local building codes.",
    iconName: "ShieldAlert",
    standards: ["IBC 2024 (International Building Code)", "Eurocodes 2, 3 & 8 (Reinforced Concrete, Steel, Seismic)", "ACI 318-19 (Reinforced Concrete Specifications)", "AISC 360-16 (Steel Structures Design)"],
    keyDeliverables: [
      "PE-Aligned Structural Design Calculation Packets",
      "Finite Element Load Deflection Analyses (FEA)",
      "Beam-to-Column Connection Details",
      "Foundation Sizing & Geotechnical Load Transfers"
    ]
  },
  {
    id: "serv-04",
    title: "Green Civil Planning & Low-Carbon Structuring",
    shortDesc: "Estimating sustainable construction assemblies, CLT timber design integrations, and carbon offset evaluations.",
    longDesc: "For progressive developers targeting carbon-neutral properties, I evaluate ecological material alternatives such as Cross-Laminated Timber (CLT), Glulam, and green low-carbon concrete mixes. I provide complete volume counts, load distributions for low-inertia materials, and detailed thermal/char ring computations to pass rigid sustainable design peer reviews.",
    iconName: "Leaf",
    standards: ["NDS 2024 National Design Spec for Wood", "APA CLT Standards PRG-320", "LEED BD+C Materials and Resources Evaluation"],
    keyDeliverables: [
      "Low-Carbon Concrete Structural Sizing Sheets",
      "CLT Timber Panel Sizing & Deflection Reports",
      "Alternative Sustainable Sourcing Cost Plans",
      "Embodied Carbon Structural Calculation Schedules"
    ]
  }
];
