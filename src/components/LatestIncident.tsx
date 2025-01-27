import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { CableIncident } from '../types/index';

interface LatestIncidentProps {
  incident: CableIncident;
}

export const LatestIncident = ({ incident }: LatestIncidentProps) => (
  <Alert className="bg-red-50 border-red-200">
    <AlertTriangle className="h-4 w-4 text-red-500" />
    <AlertTitle className="text-red-700">⚡ Breaking News: Latest Cable Incident ⚡</AlertTitle>
    <AlertDescription className="text-red-600">
      <span className="font-semibold">{incident.cable_name}</span> - {incident.description}
      <br />
      <span className="text-sm">
        Reported on: {incident.date.toLocaleDateString()}
      </span>
    </AlertDescription>
  </Alert>
);