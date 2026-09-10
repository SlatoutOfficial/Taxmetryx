export interface Industry {
  id: number;
  slug: string;
  number: string;
  name: string;
  shortDescription: string;
  description: string;
  challenges: string[];
  advisoryFocus: string[];
  relatedServices: string[];
  stats?: { label: string; value: string };
  image: string;
}
