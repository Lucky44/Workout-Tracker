export type ActivityType = 'reps' | 'duration' | 'checkbox';

export interface Activity {
    id: string;
    name: string;
    type: ActivityType;
    goal?: {
        reps?: number;
        sets?: number;
        durationSeconds?: number;
    };
    frequency: number; // times per week
    color: string;
}

export interface LogEntry {
    id: string;
    activityId: string;
    date: string; // ISO date string (YYYY-MM-DD)
    completed: boolean;
    value?: number; // actual reps or duration
    notes?: string;
}

export interface ActivityContextType {
    activities: Activity[];
    logs: LogEntry[];
    addActivity: (activity: Omit<Activity, 'id'>) => void;
    deleteActivity: (id: string) => void;
    updateActivity: (activity: Activity) => void;
    logActivity: (entry: Omit<LogEntry, 'id'>) => void;
    getLogsForDate: (date: string) => LogEntry[];
    getActivityStats: (activityId: string) => { completionRate: number, totalSessions: number };
}
