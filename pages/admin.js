// pages/admin.js
import { useEffect, useState } from 'react';

export default function Admin() {
  const [jobs, setJobs] = useState([]);
  const [dashboard, setDashboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const mj = await fetch('/api/sheet?name=Master_Jobs').then(r => r.json());
      const db = await fetch('/api/sheet?name=Dashboard').then(r => r.json());
      setJobs(mj.rows || []);
      setDashboard(db.rows || []);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div>Loading admin dashboard…</div>;

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <section>
        <h3>Key metrics</h3>
        <div style={{ display: 'flex', gap: 18 }}>
          {dashboard.slice(0, 6).map((item, idx) => (
            <div key={idx} style={{ padding: 12, border: '1px solid #eee', minWidth: 160 }}>
              <div style={{ fontSize: 12, color: '#666' }}>{item['Metric']}</div>
              <div style={{ fontSize: 20, marginTop: 6 }}>{item['Value']}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 18 }}>
        <h3>Master Jobs (recent)</h3>
        <div style={{ border: '1px solid #eee', padding: 8, overflow: 'auto', maxHeight: 420 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Request_ID','Timestamp','Client_Name','Service','Ops_Status','Payment_Status','Delivery_Date'].map(c => (
                  <th key={c} style={{ textAlign: 'left', fontSize: 13, padding: '6px 8px', borderBottom: '1px solid #eee' }}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jobs.slice(0, 80).map((r, idx) => (
                <tr key={idx}>
                  <td style={{ padding: '6px 8px' }}>{r['Request_ID']}</td>
                  <td style={{ padding: '6px 8px' }}>{r['Timestamp']}</td>
                  <td style={{ padding: '6px 8px' }}>{r['Client_Name']}</td>
                  <td style={{ padding: '6px 8px' }}>{r['Service']}</td>
                  <td style={{ padding: '6px 8px' }}>{r['Ops_Status']}</td>
                  <td style={{ padding: '6px 8px' }}>{r['Payment_Status']}</td>
                  <td style={{ padding: '6px 8px' }}>{r['Delivery_Date']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
