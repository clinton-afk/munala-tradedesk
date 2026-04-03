// pages/api/requests.js
import { getSheetValues, appendRow } from '../../lib/googleSheets';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const values = await getSheetValues('Raw_Form_Responses');
      if (!values.length) return res.status(200).json({ headers: [], rows: [] });

      const headers = values[0];
      const rows = values.slice(1).map((r) => {
        const obj = {};
        headers.forEach((h, i) => {
          obj[h] = r[i] ?? '';
        });
        return obj;
      });

      return res.status(200).json({ headers, rows });
    }

    if (req.method === 'POST') {
      // Accept the posted object and append it (map to header order)
      const payload = req.body;
      const values = await getSheetValues('Raw_Form_Responses');
      const headers = values[0] || [];

      // Build a row in the same column order as the sheet headers
      const row = headers.map((h) => (payload[h] !== undefined ? payload[h] : ''));
      await appendRow('Raw_Form_Responses', row);

      return res.status(201).json({ ok: true });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
