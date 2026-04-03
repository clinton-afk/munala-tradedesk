// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h2>Welcome to Munala Trade Desk</h2>
      <p>
        This site is the demo client portal and admin dashboard for your trade desk system.
      </p>

      <div style={{ marginTop: 18 }}>
        <Link href="/client"><a style={{ marginRight: 12 }}>Open Client Portal</a></Link>
        <Link href="/admin"><a>Open Admin Dashboard</a></Link>
      </div>
    </div>
  );
}
