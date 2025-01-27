'use client';

import { useEffect, useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { processIncidentData } from './services/dataService';
import { CableIncident, CableStats } from './types/index';

export default function App() {
  const [incidents, setIncidents] = useState<CableIncident[]>([]);
  const [stats, setStats] = useState<CableStats>({
    totalIncidents: 0,
    monthlyAverage: 0,
    lastIncident: null,
    impactedConnections: new Set()
  });
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.csv');
        const csvData = await response.text();
        const { incidents, stats, currentStreak, longestStreak } = processIncidentData(csvData);

        setIncidents(incidents);
        setStats(stats);
        setCurrentStreak(currentStreak);
        setLongestStreak(longestStreak);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Dashboard 
      incidents={incidents}
      stats={stats}
      currentStreak={currentStreak}
      longestStreak={longestStreak}
    />
  );
}