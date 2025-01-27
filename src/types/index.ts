export interface CableIncident {
  date: Date;
  location: string;
  cable_name: string;
  description: string;
}
  
export interface CableStats {
  totalIncidents: number;
  monthlyAverage: number;
  lastIncident: CableIncident | null;
  impactedConnections: Set<string>;
  mostImpacted: string;
}