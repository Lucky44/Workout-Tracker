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
        </div>
    )
}

export default App
