// lib/googleSheets.js
import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

/**
 * Create a JWT client from the JSON service account stored in env.
 * Expects process.env.GOOGLE_SERVICE_ACCOUNT_JSON to be the full JSON string.
 */
function getJwtClient() {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    throw new Error('Missing GOOGLE_SERVICE_ACCOUNT_JSON environment variable.');
  }
  const creds = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);

  // private_key often contains escaped newlines; restore them
  const privateKey = (creds.private_key || '').replace(/\\n/g, '\n');

  const jwt = new google.auth.JWT(
    creds.client_email,
    null,
    privateKey,
    SCOPES
  );

  return jwt;
}

export async function getSheetValues(sheetName, range = 'A1:Z1000') {
  if (!process.env.SPREADSHEET_ID) {
    throw new Error('Missing SPREADSHEET_ID environment variable.');
  }
  const auth = getJwtClient();
  await auth.authorize();
  const sheets = google.sheets({ version: 'v4', auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: `${sheetName}!${range}`
  });

  return res.data.values || [];
}

export async function appendRow(sheetName, rowValues) {
  if (!process.env.SPREADSHEET_ID) {
    throw new Error('Missing SPREADSHEET_ID environment variable.');
  }
  const auth = getJwtClient();
  await auth.authorize();
  const sheets = google.sheets({ version: 'v4', auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: `${sheetName}!A1:Z1000`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [rowValues]
    }
  });
}
