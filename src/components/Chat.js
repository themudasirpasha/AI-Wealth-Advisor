import React, { useState } from 'react';

const SYSTEM_PROMPT = `You are Mudassir, a friendly AI wealth coach for first-time investors in India. 
You explain financial concepts in very simple language like a friendly elder sibling.
You only educate — never give specific investment advice.
Always use Indian context (Rs., SIP, FD, Mutual Funds, PPF, ELSS).
Keep responses under 100 words. Be warm and encouraging.
End every response with: "Remember, consult a SEBI advisor before investing! 😊"`;

const QUICK_QUESTIONS = [
  "What is SIP?",
  "FD vs Mutual Fund?",
  "How does compounding work?",
  "What is ELSS?",
  "How much should I save?",
];

export default function Chat({ user }) {
  const [messages, setMessages] = useState([
    {
      role: 'mudassir',
      text: `Hi ${user.name}! 👋 I'm Mudassir, your personal wealth coach!\n\nYou earn Rs. ${user.income}/month and save around Rs. ${user.income - user.expenses}/month. That's a great start! 🎉\n\nWhat would you like to learn today?`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    const question = text || input;
    if (!question.trim()) return;

    const newMessages = [...messages, { role: 'user', text: question }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
            ...newMessages.map(m => ({
              role: m.role === 'mudassir' ? 'model' : 'user',
              parts: [{ text: m.text }]
            }))
          ]
        })
      });

      if (res.status === 429) {
        const msg = "I'm getting too many requests! Please wait a moment and try again 😊";
        setMessages([...newMessages, { role: 'mudassir', text: msg }]);
        setLoading(false);
        return;
      }

      const data = await res.json();
      const rawReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that. Try again!";
      const reply = rawReply
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1');

      setMessages([...newMessages, { role: 'mudassir', text: reply }]);

    } catch (error) {
      const msg = "Oops! Something went wrong. Please try again! 😊";
      setMessages([...newMessages, { role: 'mudassir', text: msg }]);
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.logo}>🪙 Mudassir</span>
        <span style={styles.status}>● Online</span>
      </div>

      <div style={styles.messages}>
        {messages.map((m, i) => (
          <div key={i} style={{ ...styles.bubble, ...(m.role === 'user' ? styles.userBubble : styles.mudassirBubble) }}>
            {m.role === 'mudassir' && <div style={styles.avatar}>🪙</div>}
            <div style={{ ...styles.text, ...(m.role === 'user' ? styles.userText : styles.mudassirText) }}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ ...styles.bubble, ...styles.mudassirBubble }}>
            <div style={styles.avatar}>🪙</div>
            <div style={{ ...styles.text, ...styles.mudassirText }}>Mudassir is thinking... 💭</div>
          </div>
        )}
      </div>

      <div style={styles.quickRow}>
        {QUICK_QUESTIONS.map((q, i) => (
          <button key={i} style={styles.quickBtn} onClick={() => sendMessage(q)}>{q}</button>
        ))}
      </div>

      <div style={styles.inputRow}>
        <input
          style={styles.input}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Ask Mudassir anything about investing..."
        />
        <button style={styles.sendBtn} onClick={() => sendMessage()}>Send</button>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', flexDirection: 'column', height: '100vh', background: '#F4F6F9' },
  header: {
    background: '#0A2342', padding: '16px 24px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
  },
  logo: { color: 'white', fontWeight: 'bold', fontSize: 20 },
  status: { color: '#2ECC71', fontSize: 13 },
  messages: { flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 12 },
  bubble: { display: 'flex', alignItems: 'flex-start', gap: 8 },
  mudassirBubble: { justifyContent: 'flex-start' },
  userBubble: { justifyContent: 'flex-end' },
  avatar: { fontSize: 24, marginTop: 4 },
  text: { maxWidth: '70%', padding: '12px 16px', borderRadius: 16, fontSize: 14, lineHeight: 1.5, whiteSpace: 'pre-line' },
  mudassirText: { background: 'white', color: '#1C1C1C', borderTopLeftRadius: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  userText: { background: '#0A2342', color: 'white', borderTopRightRadius: 4 },
  quickRow: { display: 'flex', gap: 8, padding: '8px 16px', overflowX: 'auto', background: 'white' },
  quickBtn: {
    padding: '8px 14px', background: '#EBF5FB', border: '1px solid #AED6F1',
    borderRadius: 20, cursor: 'pointer', fontSize: 12, whiteSpace: 'nowrap', color: '#0A2342'
  },
  inputRow: { display: 'flex', padding: '12px 16px', gap: 8, background: 'white', borderTop: '1px solid #eee' },
  input: {
    flex: 1, padding: '12px 16px', borderRadius: 24,
    border: '1px solid #ddd', fontSize: 14, outline: 'none'
  },
  sendBtn: {
    padding: '12px 24px', background: '#F39C12', color: 'white',
    border: 'none', borderRadius: 24, fontWeight: 'bold', cursor: 'pointer'
  }
};