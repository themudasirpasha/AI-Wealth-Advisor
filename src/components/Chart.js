import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Chart({ user }) {
  const [monthly, setMonthly] = useState(500);
  const [years, setYears] = useState(10);

  const generateData = () => {
    const data = [];
    for (let y = 0; y <= years; y++) {
      const invested = monthly * 12 * y;
      const compounded = monthly * ((Math.pow(1 + 0.12 / 12, 12 * y) - 1) / (0.12 / 12));
      data.push({
        year: `Year ${y}`,
        'Without Investing': Math.round(invested),
        'With SIP (12% p.a.)': Math.round(compounded),
      });
    }
    return data;
  };

  const data = generateData();
  const finalValue = data[data.length - 1]['With SIP (12% p.a.)'];
  const totalInvested = data[data.length - 1]['Without Investing'];
  const profit = finalValue - totalInvested;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.logo}>🪙 Mudassir</span>
        <span style={styles.title}>Wealth Visualiser</span>
      </div>

      <div style={styles.content}>
        <h2 style={styles.heading}>See Your Money Grow! 🚀</h2>
        <p style={styles.sub}>Move the sliders to see how small savings become big wealth!</p>

        <div style={styles.sliderBox}>
          <label style={styles.label}>
            Monthly Investment: <strong>Rs. {monthly.toLocaleString()}</strong>
          </label>
          <input type="range" min="500" max="10000" step="500"
            value={monthly} onChange={e => setMonthly(Number(e.target.value))}
            style={styles.slider} />

          <label style={styles.label}>
            Time Period: <strong>{years} Years</strong>
          </label>
          <input type="range" min="1" max="30" step="1"
            value={years} onChange={e => setYears(Number(e.target.value))}
            style={styles.slider} />
        </div>

        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Total Invested</div>
            <div style={styles.statValue}>Rs. {totalInvested.toLocaleString()}</div>
          </div>
          <div style={{ ...styles.statCard, background: '#0A2342' }}>
            <div style={{ ...styles.statLabel, color: '#AED6F1' }}>Final Value</div>
            <div style={{ ...styles.statValue, color: '#F39C12' }}>Rs. {finalValue.toLocaleString()}</div>
          </div>
          <div style={{ ...styles.statCard, background: '#1E8449' }}>
            <div style={{ ...styles.statLabel, color: '#A9DFBF' }}>Profit Earned</div>
            <div style={{ ...styles.statValue, color: 'white' }}>Rs. {profit.toLocaleString()}</div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="year" tick={{ fontSize: 11 }} interval={Math.floor(years / 5)} />
            <YAxis tickFormatter={v => `Rs.${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11 }} />
            <Tooltip formatter={v => `Rs. ${v.toLocaleString()}`} />
            <Legend />
            <Line type="monotone" dataKey="Without Investing" stroke="#BDC3C7" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="With SIP (12% p.a.)" stroke="#F39C12" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>

        <p style={styles.disclaimer}>
          Based on illustrative 12% annual returns. Not a guarantee. Past performance does not indicate future results. Consult a SEBI-registered advisor before investing.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#F4F6F9' },
  header: {
    background: '#0A2342', padding: '16px 24px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
  },
  logo: { color: 'white', fontWeight: 'bold', fontSize: 20 },
  title: { color: '#F39C12', fontWeight: 'bold' },
  content: { padding: '24px', maxWidth: 800, margin: '0 auto' },
  heading: { color: '#0A2342', marginBottom: 8 },
  sub: { color: '#666', marginBottom: 24 },
  sliderBox: { background: 'white', padding: 24, borderRadius: 16, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' },
  label: { display: 'block', marginBottom: 8, color: '#0A2342', fontSize: 15 },
  slider: { width: '100%', marginBottom: 20, accentColor: '#F39C12' },
  statsRow: { display: 'flex', gap: 16, marginBottom: 24 },
  statCard: { flex: 1, background: '#EBF5FB', borderRadius: 12, padding: 16, textAlign: 'center' },
  statLabel: { fontSize: 12, color: '#666', marginBottom: 6 },
  statValue: { fontSize: 18, fontWeight: 'bold', color: '#0A2342' },
  disclaimer: { fontSize: 11, color: '#999', textAlign: 'center', marginTop: 16, lineHeight: 1.5 }
};