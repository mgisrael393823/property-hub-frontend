
export interface CreatorCardProps {
  id: string;
  name: string;
  location: string;
  services: string[];
  imageUrl: string;
  workSamples?: { url: string; type: string }[];
  rating?: number;
  responseTime?: string;
  verified?: boolean;
}
