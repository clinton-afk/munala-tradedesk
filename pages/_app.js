// pages/_app.js
import '../styles/globals.css';
import Header from '../components/Header';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '0 18px 60px' }}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
