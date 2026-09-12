export interface NavItem {
  title: string;
  href: string;
  badge?: string;
  hasDropdown?: boolean;
}

export interface OfficeLocation {
  id: string;
  city: string;
  region: string;
  name: string;
  line1: string;
  line2: string;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  subtagline: string;
  description: string;
  founded: string;
  headquarters: {
    country: string;
    city: string;
    address: string;
    building: string;
    zone: string;
  };
  offices?: OfficeLocation[];
  contact: {
    email: string;
    phone: string;
    phoneFormatted: string;
    whatsapp: string;
    advisoryHotline: string;
  };
  metrics: {
    combinedExperienceYears: number;
    practicesCount: number;
    keyMarketsCount: number;
    regionsCount: number;
    advisoryAccuracyRate: string;
    crossBorderMattersHandled: string;
  };
  social: {
    linkedin: string;
    twitter: string;
  };
  legal: {
    licenseNo: string;
    regulatoryBody: string;
    taxAgencyRegistered: boolean;
  };
}

export interface ValueItem {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  keyPillars: string[];
}

export interface ExpertiseLayer {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  metricsHighlight?: string;
  deliverables: string[];
}
