import React, { useState } from 'react';

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', age: '', income: '', expenses: '', goal: ''
  });

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.logo}>🪙 Mudassir</h1>
        <p style={styles.tagline}>Your AI Wealth Coach</p>
        {step === 1 && (
          <div>
            <h2 style={styles.heading}>Hi there! 👋</h2>
            <p style={styles.sub}>I am Mudassir, your personal finance mentor. Let us get to know you!</p>
            <input style={styles.input} name="name" placeholder="Your name" onChange={update} />
            <input style={styles.input} name="age" placeholder="Your age" type="number" onChange={update} />
            <button style={styles.btn} onClick={() => setStep(2)}>Next</button>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 style={styles.heading}>Your Finances 💰</h2>
            <p style={styles.sub}>This stays private!</p>
            <input style={styles.input} name="income" placeholder="Monthly income (Rs.)" type="number" onChange={update} />
            <input style={styles.input} name="expenses" placeholder="Monthly expenses (Rs.)" type="number" onChange={update} />
            <input style={styles.input} name="goal" placeholder="Your savings goal" onChange={update} />
            <button style={styles.btn} onClick={() => onComplete(form)}>Meet Mudassir</button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0A2342, #1A5276)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    background: 'white',
    borderRadius: 20,
    padding: 40,
    width: 380,
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    textAlign: 'center'
  },
  logo: { fontSize: 40, margin: 0 },
  tagline: { color: '#888', marginBottom: 24 },
  heading: { color: '#0A2342', marginBottom: 8 },
  sub: { color: '#666', fontSize: 14, marginBottom: 20 },
  input: {
    width: '100%',
    padding: '12px 16px',
    marginBottom: 12,
    borderRadius: 10,
    border: '1px solid #ddd',
    fontSize: 15,
    boxSizing: 'border-box',
    outline: 'none'
  },
  btn: {
    width: '100%',
    padding: '14px',
    background: '#F39C12',
    color: 'white',
    border: 'none',
    borderRadius: 10,
    fontSize: 16,
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: 8
  }
};