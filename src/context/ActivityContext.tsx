import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Activity, LogEntry, ActivityContextType } from '../types';

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export const useActivities = () => {
    const context = useContext(ActivityContext);
    if (!context) {
        throw new Error('useActivities must be used within an ActivityProvider');
    }
    return context;
};

interface ActivityProviderProps {
    children: ReactNode;
}

export const ActivityProvider: React.FC<ActivityProviderProps> = ({ children }) => {
    const [activities, setActivities] = useState<Activity[]>(() => {
        const saved = localStorage.getItem('activities');
        return saved ? JSON.parse(saved) : [];
    });

    const [logs, setLogs] = useState<LogEntry[]>(() => {
        const saved = localStorage.getItem('logs');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('activities', JSON.stringify(activities));
    }, [activities]);

    useEffect(() => {
        localStorage.setItem('logs', JSON.stringify(logs));
    }, [logs]);

    const addActivity = (activity: Omit<Activity, 'id'>) => {
        const newActivity = { ...activity, id: crypto.randomUUID() };
        setActivities(prev => [...prev, newActivity]);
    };

    const deleteActivity = (id: string) => {
        setActivities(prev => prev.filter(a => a.id !== id));
        setLogs(prev => prev.filter(l => l.activityId !== id));
    };

    const updateActivity = (activity: Activity) => {
        setActivities(prev => prev.map(a => a.id === activity.id ? activity : a));
    };

    const logActivity = (entry: Omit<LogEntry, 'id'>) => {
        // Check if entry already exists for this date/activity? 
        // For now, allow multiple entries or assume UI handles it.
        // Let's toggle if exists for checkbox type? 
        // The requirement says "LogTracker: A list of today's tasks with completion toggles".

        // If we are just toggling completion for "today", we might want to update existing entry.
        // But let's just append for now and handle "find existing" in UI or helper.

        const newEntry = { ...entry, id: crypto.randomUUID() };
        setLogs(prev => {
            // Simple dedupe for same day/activity if needed, but let's just add.
            // Actually, if we want to toggle, we should check if one exists.
            const existing = prev.find(l => l.activityId === entry.activityId && l.date === entry.date);
            if (existing) {
                return prev.map(l => l.id === existing.id ? { ...l, ...entry } : l);
            }
            return [...prev, newEntry];
        });
    };

    const getLogsForDate = (date: string) => {
        return logs.filter(l => l.date === date);
    };

    const getActivityStats = (activityId: string) => {
        const activityLogs = logs.filter(l => l.activityId === activityId && l.completed);
        return {
            completionRate: 0, // TODO: Calculate based on frequency
            totalSessions: activityLogs.length
        };
    };

    return (
        <ActivityContext.Provider value={{
            activities,
            logs,
            addActivity,
            deleteActivity,
            updateActivity,
            logActivity,
            getLogsForDate,
            getActivityStats
        }}>
            {children}
        </ActivityContext.Provider>
    );
};
