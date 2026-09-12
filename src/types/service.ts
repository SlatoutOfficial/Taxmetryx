export interface ServiceCapability {
  title: string;
  description: string;
  deliverables?: string[];
}

export interface ServiceApproachStep {
  step: string;
  title: string;
  description: string;
}

export interface SubService {
  number: string;
  title: string;
  description: string;
  inPractice?: string;
  youReceive?: string;
}

export interface Service {
  id: number;
  slug: string;
  number: string;
  title: string;
  eyebrow: string;
  shortDescription: string;
  description: string;
  heroStatement: string;
  lede?: string;
  overviewDescription?: string;
  whenToInvolve?: string[];
  subservicesCount?: number;
  subservices?: SubService[];
  typicalOutputs?: string;
  services: string[];
  capabilities: ServiceCapability[];
  approach: ServiceApproachStep[];
  whyItMatters: {
    headline: string;
    points: { title: string; text: string }[];
  };
  keyDeliverables: string[];
  applicableFrameworks: string[];
  icon: string;
  stats?: { value: string; label: string };
  relatedSlugs: string[];
}

