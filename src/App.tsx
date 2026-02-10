// Workout Tracker - Updated: 2026-02-09
import { ActivitySetup } from './components/ActivitySetup';
import { LogTracker } from './components/LogTracker';
import { StatsDashboard } from './components/StatsDashboard';
import './App.css'; // We might need to create this or use inline/global

function App() {
    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
            <h1>Workout Tracker</h1>
            <ActivitySetup />
            <LogTracker />
            <StatsDashboard />
            <div style={{ marginTop: '3rem', textAlign: 'center', opacity: 0.8, color: 'var(--primary-color)', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <span>v 0.55</span>
                <button
                    onClick={() => window.location.reload()}
                    style={{
                        padding: '2px 8px',
                        fontSize: '0.7rem',
                        background: 'transparent',
                        border: '1px solid currentColor',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Check for Update
                </button>
            </div>
        </div>
    )
}

export default App
