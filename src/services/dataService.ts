import { CableIncident, CableStats } from '../types';

export const processIncidentData = (csvData: string): {
    incidents: CableIncident[];
    stats: CableStats;
    currentStreak: number;
    longestStreak: number;
} => {
    const rows = csvData.split('\n').slice(1);
    const parsedIncidents = rows.map(row => {
        const [date, location, cable_name, description] = row.split(',');
        return {
            date: new Date(date),
            location,
            cable_name,
            description
        };
    }).sort((a, b) => b.date.getTime() - a.date.getTime());

    const now = new Date();
    const lastIncidentDate = parsedIncidents[0]?.date;
    const currentStreakDays = lastIncidentDate ? 
        Math.floor((now.getTime() - lastIncidentDate.getTime()) / (1000 * 60 * 60 * 24)) : 0;

    const mostImpacted = parsedIncidents.reduce<Record<string, number>>((acc, incident) => {
        acc[incident.cable_name] = (acc[incident.cable_name] || 0) + 1;
        return acc;
    }, {});

    const mostImpactedCable = Object.keys(mostImpacted).reduce((a, b) => mostImpacted[a] > mostImpacted[b] ? a : b);

    let maxStreak = 0;
    for (let i = 0; i < parsedIncidents.length - 1; i++) {
        const streak = Math.floor(
        (parsedIncidents[i].date.getTime() - parsedIncidents[i + 1].date.getTime()) / 
        (1000 * 60 * 60 * 24)
        );
        maxStreak = Math.max(maxStreak, streak);
    }

    const firstIncidentDate = parsedIncidents[parsedIncidents.length - 1]?.date;
    const monthsSinceFirst = firstIncidentDate ? 
        (now.getTime() - firstIncidentDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44) : 1;
    const monthlyAvg = parsedIncidents.length / monthsSinceFirst;

    const stats: CableStats = {
        totalIncidents: parsedIncidents.length,
        monthlyAverage: Number(monthlyAvg.toFixed(1)),
        lastIncident: parsedIncidents[0] || null,
        impactedConnections: new Set(parsedIncidents.map(i => i.cable_name)),
        mostImpacted: mostImpactedCable
    };

    return {
        incidents: parsedIncidents,
        stats,
        currentStreak: currentStreakDays,
        longestStreak: maxStreak
    };
};