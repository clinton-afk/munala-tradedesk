// components/Header.js
import Link from 'next/link';

export default function Header() {
  return (
    <header style={{ padding: '18px 24px', borderBottom: '1px solid #eee', marginBottom: 24 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 20 }}>Munala Trade Desk</h1>
          <div style={{ fontSize: 13, color: '#666' }}>Client portal & admin dashboard</div>
        </div>
        <nav>
          <Link href="/"><a style={{ marginRight: 12 }}>Home</a></Link>
          <Link href="/client"><a style={{ marginRight: 12 }}>Client Portal</a></Link>
          <Link href="/admin"><a>Admin</a></Link>
        </nav>
      </div>
    </header>
  );
}
