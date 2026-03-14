import React, { useState } from 'react';
import Onboarding from './components/Onboarding';
import Chat from './components/Chat';
import Chart from './components/Chart';

export default function App() {
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState('chat');

  if (!user) {
    return <Onboarding onComplete={setUser} />;
  }

  return (
    <div>
      <div style={styles.tabs}>
        <button
          style={{ ...styles.tab, ...(screen === 'chat' ? styles.activeTab : {}) }}
          onClick={() => setScreen('chat')}>
          💬 Chat with Mudassir
        </button>
        <button
          style={{ ...styles.tab, ...(screen === 'chart' ? styles.activeTab : {}) }}
          onClick={() => setScreen('chart')}>
          📈 Wealth Visualiser
        </button>
      </div>

      {screen === 'chat' ? <Chat user={user} /> : <Chart user={user} />}
    </div>
  );
}

const styles = {
  tabs: {
    display: 'flex',
    background: '#0A2342',
    padding: '0 24px',
  },
  tab: {
    padding: '14px 24px',
    background: 'transparent',
    color: '#AED6F1',
    border: 'none',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 'bold',
    borderBottom: '3px solid transparent',
  },
  activeTab: {
    color: '#F39C12',
    borderBottom: '3px solid #F39C12',
  }
};