import React, { useState, useEffect } from 'react';
import { useActivities } from '../context/ActivityContext';
import { ActivityType } from '../types';

export const ActivitySetup: React.FC = () => {
    const { activities, addActivity, updateActivity, deleteActivity } = useActivities();
    const [mode, setMode] = useState<'none' | 'add' | 'edit'>('none');
    const [editingId, setEditingId] = useState<string | null>(null);

    // Initial state for add form
    const [name, setName] = useState('');
    const [type, setType] = useState<ActivityType>('checkbox');
    const [goalReps, setGoalReps] = useState('');
    const [goalSets, setGoalSets] = useState('');
    const [goalDuration, setGoalDuration] = useState('');
    const [frequency, setFrequency] = useState('1');

    useEffect(() => {
        if (editingId) {
            const activity = activities.find(a => a.id === editingId);
            if (activity) {
                setName(activity.name);
                setType(activity.type);
                setGoalReps(activity.goal?.reps?.toString() || '');
                setGoalSets(activity.goal?.sets?.toString() || '');
                setGoalDuration(activity.goal?.durationSeconds?.toString() || '');
                setFrequency(activity.frequency.toString());
            }
        } else {
            // Reset form when not editing
            setName('');
            setType('checkbox');
            setGoalReps('');
            setGoalSets('');
            setGoalDuration('');
            setFrequency('1');
        }
    }, [editingId, activities]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        const activityData = {
            name,
            type,
            goal: type === 'reps'
                ? { reps: Number(goalReps), sets: Number(goalSets) }
                : type === 'duration'
                    ? { durationSeconds: Number(goalDuration) }
                    : undefined,
            frequency: Number(frequency),
            color: '#' + Math.floor(Math.random() * 16777215).toString(16)
        };

        if (editingId) {
            updateActivity({ ...activityData, id: editingId, color: activities.find(a => a.id === editingId)?.color || activityData.color });
            setEditingId(null);
            setMode('none');
        } else {
            addActivity(activityData);
            // Reset form
            setName('');
            setGoalReps('');
            setGoalSets('');
            setGoalDuration('');
            setFrequency('1');
        }
    };

    return (
        <div className="card" style={{ textAlign: 'left' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #333',
                paddingBottom: '0.5rem',
                marginBottom: '1rem'
            }}>
                <h2 style={{ margin: 0, border: 'none', padding: 0 }}>ACTIVITIES</h2>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        type="button"
                        onClick={() => {
                            setMode(mode === 'add' ? 'none' : 'add');
                            setEditingId(null);
                        }}
                        style={{ padding: '0.4em 0.8em', fontSize: '0.9em', backgroundColor: mode === 'add' ? 'var(--primary-color)' : undefined }}
                    >
                        Add New
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setMode(mode === 'edit' ? 'none' : 'edit');
                            setEditingId(null);
                        }}
                        style={{ padding: '0.4em 0.8em', fontSize: '0.9em', backgroundColor: mode === 'edit' ? 'var(--primary-color)' : undefined }}
                    >
                        Edit
                    </button>
                </div>
            </div>

            {(mode === 'add' || editingId) && (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {editingId && <h3 style={{ marginTop: 0 }}>Editing: {name}</h3>}
                    <input
                        placeholder="Activity Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        style={{ padding: '0.8rem' }}
                    />

                    <select value={type} onChange={e => setType(e.target.value as ActivityType)} style={{ padding: '0.5rem' }}>
                        <option value="checkbox">Simple Completion</option>
                        <option value="reps">Reps Based</option>
                        <option value="duration">Duration Based</option>
                    </select>

                    {type === 'reps' && (
                        <>
                            <input
                                type="number"
                                placeholder="Goal Reps"
                                value={goalReps}
                                onChange={e => setGoalReps(e.target.value)}
                                style={{ padding: '0.5rem' }}
                            />
                            <input
                                type="number"
                                placeholder="Goal Sets"
                                value={goalSets}
                                onChange={e => setGoalSets(e.target.value)}
                                style={{ padding: '0.5rem' }}
                            />
                        </>
                    )}

                    {type === 'duration' && (
                        <input
                            type="number"
                            placeholder="Goal Duration (seconds)"
                            value={goalDuration}
                            onChange={e => setGoalDuration(e.target.value)}
                            style={{ padding: '0.5rem' }}
                        />
                    )}

                    <label>
                        Times per week:
                        <input
                            type="number"
                            min="1"
                            max="7"
                            value={frequency}
                            onChange={e => setFrequency(e.target.value)}
                            style={{ width: '3rem', marginLeft: '0.5rem' }}
                        />
                    </label>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button type="submit" style={{ flex: 1 }}>{editingId ? 'Save Changes' : 'Save'}</button>
                        {editingId && (
                            <>
                                <button type="button" onClick={() => setEditingId(null)} style={{ flex: 1, backgroundColor: '#555' }}>Cancel</button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        deleteActivity(editingId);
                                        setEditingId(null);
                                    }}
                                    style={{ flex: 1, backgroundColor: '#d00' }}
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                </form>
            )}

            {mode === 'edit' && !editingId && (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {activities.map(activity => (
                        <li
                            key={activity.id}
                            onClick={() => setEditingId(activity.id)}
                            style={{
                                padding: '0.6rem 0.8rem 0.85rem 0.8rem',
                                borderBottom: '1px solid #333',
                                cursor: 'pointer',
                                backgroundColor: '#2a2a2a',
                                borderRadius: '12px',
                                marginBottom: '0.5rem',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                            className="activity-item-hover"
                        >
                            <span style={{ color: 'var(--primary-color)', display: 'inline-block', lineHeight: 'normal', paddingBottom: '4px' }}>{activity.name}</span>
                        </li>
                    ))}
                    {activities.length === 0 && <p style={{ color: '#888' }}>No activities found.</p>}
                </ul>
            )}
        </div>
    );
};

