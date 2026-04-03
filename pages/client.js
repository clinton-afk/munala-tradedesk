// pages/client.js
import { useEffect, useState } from 'react';

export default function Client() {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetch('/api/requests');
      const json = await res.json();
      setHeaders(json.headers || []);
      setRows(json.rows || []);
      // Initialize form fields from headers
      const init = {};
      (json.headers || []).forEach(h => (init[h] = ''));
      setForm(init);
      setLoading(false);
    }
    load();
  }, []);

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    // Basic minimal fields fill: ensure Timestamp and Request_ID if present
    const payload = { ...form };
    // timestamp
    if (payload.Timestamp === '') payload.Timestamp = new Date().toISOString();
    try {
      const r = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!r.ok) throw new Error('Failed to submit');
      // reload
      const res = await fetch('/api/requests');
      const json = await res.json();
      setRows(json.rows || []);
      alert('Submitted — thanks!');
    } catch (err) {
      alert('Submit error: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <div>Loading portal...</div>;

  return (
    <div>
      <h2>Client Portal</h2>
      <p>Submit a new request or view past requests.</p>

      <section style={{ display: 'flex', gap: 24 }}>
        <div style={{ flex: 1 }}>
          <h3>Submit request</h3>
          <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8 }}>
            {headers.slice(0, 12).map((h) => ( // show first 12 fields (avoid overwhelming)
              <div key={h}>
                <label style={{ fontSize: 13 }}>{h}</label><br />
                <input name={h} value={form[h] || ''} onChange={onChange} style={{ width: '100%', padding: 8 }} />
              </div>
            ))}

            <button type="submit" disabled={submitting} style={{ marginTop: 10, padding: '8px 12px' }}>
              {submitting ? 'Submitting…' : 'Submit Request'}
            </button>
            <div style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
              Tip: If you need more fields, the sheet will accept them — this form maps to the sheet headers.
            </div>
          </form>
        </div>

        <div style={{ flex: 1 }}>
          <h3>Recent requests</h3>
          <div style={{ maxHeight: 420, overflow: 'auto', border: '1px solid #eee', padding: 8 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Request_ID','Timestamp','Client_Name','Service','Ops_Status','Payment_Status'].map(c => (
                    <th key={c} style={{ textAlign: 'left', fontSize: 13, padding: '6px 8px', borderBottom: '1px solid #eee' }}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.slice().reverse().slice(0, 40).map((r, idx) => (
                  <tr key={idx}>
                    <td style={{ padding: '6px 8px' }}>{r['Request_ID']}</td>
                    <td style={{ padding: '6px 8px' }}>{r['Timestamp']}</td>
                    <td style={{ padding: '6px 8px' }}>{r['Client_Name']}</td>
                    <td style={{ padding: '6px 8px' }}>{r['Service']}</td>
                    <td style={{ padding: '6px 8px' }}>{r['Ops_Status']}</td>
                    <td style={{ padding: '6px 8px' }}>{r['Payment_Status']}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
