import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useActivities } from '../context/ActivityContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const StatsDashboard: React.FC = () => {
    const { logs, activities } = useActivities();
    const [viewMode, setViewMode] = React.useState<'day' | 'week' | 'month'>('week');

    const getDates = (range: 'day' | 'week' | 'month') => {
        const dates = [];
        const today = new Date();
        const daysToSubtract = range === 'day' ? 1 : range === 'week' ? 7 : 30;

        for (let i = daysToSubtract - 1; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            dates.push(d.toISOString().split('T')[0]);
        }
        return dates;
    };

    const processData = () => {
        const labels = getDates(viewMode);
        const data = labels.map(date => {
            return logs.filter(l => l.date === date && l.completed).length;
        });

        return {
            labels,
            datasets: [
                {
                    label: 'Completed Activities',
                    data: data,
                    backgroundColor: 'rgba(136, 153, 255, 0.5)', // Adjusted to match theme #8899ff with opacity
                    borderColor: '#8899ff',
                    borderWidth: 1,
                },
            ],
        };
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // Save vertical space
            },
            title: {
                display: false, // Save vertical space
            },
            tooltip: {
                backgroundColor: '#333',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: '#555',
                borderWidth: 1
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: activities.length > 0 ? activities.length : 5,
                grid: {
                    color: '#333'
                },
                ticks: {
                    color: '#aaa',
                    stepSize: 1,
                    autoSkip: false
                }
            },
            x: {
                grid: {
                    color: '#333'
                },
                ticks: {
                    color: '#aaa'
                }
            }
        }
    };

    const rangeText = viewMode === 'day' ? 'Today' : viewMode === 'week' ? 'Last 7 Days' : 'Last 30 Days';

    return (
        <div className="card" style={{ marginTop: '2rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h2 style={{ margin: 0, border: 'none', display: 'inline-block', marginRight: '0.5rem' }}>Your Progress</h2>
                    <span style={{ fontSize: '0.8em', color: '#888' }}>({rangeText})</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        onClick={() => setViewMode('day')}
                        style={{
                            padding: '0.3em 0.6em',
                            fontSize: '0.8em',
                            backgroundColor: viewMode === 'day' ? 'var(--primary-color)' : undefined
                        }}
                    >
                        Day
                    </button>
                    <button
                        onClick={() => setViewMode('week')}
                        style={{
                            padding: '0.3em 0.6em',
                            fontSize: '0.8em',
                            backgroundColor: viewMode === 'week' ? 'var(--primary-color)' : undefined
                        }}
                    >
                        Week
                    </button>
                    <button
                        onClick={() => setViewMode('month')}
                        style={{
                            padding: '0.3em 0.6em',
                            fontSize: '0.8em',
                            backgroundColor: viewMode === 'month' ? 'var(--primary-color)' : undefined
                        }}
                    >
                        30-Day
                    </button>
                </div>
            </div>
            <div style={{ height: '200px' }}>
                <Bar options={options} data={processData()} height={200} />
            </div>
        </div>
    );
};
