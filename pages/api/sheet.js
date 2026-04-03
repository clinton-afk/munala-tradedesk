// pages/api/sheet.js
import { getSheetValues } from '../../lib/googleSheets';

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end('Method Not Allowed');
    }

    const { name } = req.query;
    if (!name) return res.status(400).json({ error: 'Missing sheet name (name param)' });

    const values = await getSheetValues(name);
    const headers = values[0] || [];
    const rows = values.slice(1).map((r) => {
      const obj = {};
      headers.forEach((h, i) => (obj[h] = r[i] ?? ''));
      return obj;
    });

    return res.status(200).json({ headers, rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
