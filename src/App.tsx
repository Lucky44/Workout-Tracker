import { useState, useEffect } from 'react';
import { ActivitySetup } from './components/ActivitySetup';
import { LogTracker } from './components/LogTracker';
import { StatsDashboard } from './components/StatsDashboard';
import './App.css';

function App() {
    const [isLandscape, setIsLandscape] = useState(false);

    useEffect(() => {
        const checkOrientation = () => {
            // Check if viewport is landscape
            const landscape = window.matchMedia("(orientation: landscape)").matches;
            // Only block if it's a mobile/tablet sized screen (width < 1024)
            const isMobileSized = window.innerWidth < 1024;
            setIsLandscape(landscape && isMobileSized);
        };

        checkOrientation();

        const mql = window.matchMedia("(orientation: landscape)");
        mql.addEventListener('change', checkOrientation);
        window.addEventListener('resize', checkOrientation);
        window.addEventListener('orientationchange', checkOrientation);

        return () => {
            mql.removeEventListener('change', checkOrientation);
            window.removeEventListener('resize', checkOrientation);
            window.removeEventListener('orientationchange', checkOrientation);
        };
    }, []);

    if (isLandscape) {
        return (
            <div className="orientation-guard">
                <div className="guard-content">
                    <div className="guard-icon">🔄</div>
                    <h2>Portrait Mode Required</h2>
                    <p>Please rotate your device to continue tracking your workout.</p>
                    <div className="guard-hint">The app is optimized for vertical use.</div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
            <h1>Workout Tracker</h1>
            <ActivitySetup />
            <LogTracker />
            <StatsDashboard />
            <div style={{ marginTop: '3rem', textAlign: 'center', opacity: 0.8, color: 'var(--primary-color)', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <span>v 0.58</span>
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
