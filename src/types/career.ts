export interface JobOpening {
  id: string;
  title: string;
  department: "Transfer Pricing" | "Corporate Tax" | "International Tax" | "Controversy & Regulatory" | "Advisory Operations";
  location: "Dubai, UAE" | "Abu Dhabi (ADGM), UAE" | "Hybrid / Cross-Border";
  type: "Full-Time" | "Director" | "Senior Manager" | "Associate";
  experience: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
  postedDate: string;
}

export interface CareerCulturePillar {
  number: string;
  title: string;
  description: string;
}

export interface CareersData {
  hero: {
    eyebrow: string;
    headline: string;
    description: string;
  };
  culturePillars: CareerCulturePillar[];
  benefits: string[];
  openings: JobOpening[];
}
