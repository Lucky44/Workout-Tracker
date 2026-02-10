import React from 'react';
import { useActivities } from '../context/ActivityContext';
import { getLocalDateString } from '../utils/dateUtils';

export const LogTracker: React.FC = () => {
    const { activities, logs, logActivity } = useActivities();
    const today = getLocalDateString();

    const handleToggle = (activityId: string) => {
        const existingLog = logs.find(l => l.activityId === activityId && l.date === today);
        // If exists and completed, toggle off? 
        // Or just re-log with !completed
        const isCompleted = existingLog ? existingLog.completed : false;

        // For simplicity, we just overwrite/update
        // In strict sense, we should leverage updateLog or similar, 
        // but logActivity handles update if exists in my implementation.
        logActivity({
            activityId,
            date: today,
            completed: !isCompleted
        });
    };

    return (
        <div className="card" style={{ marginTop: '2rem', textAlign: 'left' }}>
            <h2>Today's Activities ({today})</h2>
            {activities.length === 0 ? <p style={{ color: 'var(--primary-color)', opacity: 0.8 }}>No activities added yet.</p> : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {activities.map(activity => {
                        const isCompleted = logs.some(l => l.activityId === activity.id && l.date === today && l.completed);

                        return (
                            <li key={activity.id} style={{
                                margin: '0.5rem 0',
                                padding: '0.5rem',
                                border: '1px solid #444',
                                borderRadius: '8px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: isCompleted ? 'rgba(100, 108, 255, 0.1)' : 'transparent'
                            }}>
                                <span style={{ textDecoration: isCompleted ? 'line-through' : 'none', color: 'var(--primary-color)' }}>
                                    {activity.name} {activity.goal?.reps ? `(${activity.goal.sets ? `${activity.goal.sets}x` : ''}${activity.goal.reps} reps)` : ''}
                                    {activity.goal?.durationSeconds ? `(${activity.goal.durationSeconds}s)` : ''}
                                </span>
                                <div>
                                    <button
                                        onClick={() => handleToggle(activity.id)}
                                        style={{
                                            padding: '0.3em 0.6em',
                                            minWidth: '80px',
                                            backgroundColor: isCompleted ? 'var(--primary-color)' : undefined,
                                            color: isCompleted ? 'white' : undefined,
                                            borderColor: isCompleted ? 'var(--primary-color)' : undefined
                                        }}
                                    >
                                        {isCompleted ? 'Undo' : 'Done?'}
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )
            }
        </div >
    );
};
