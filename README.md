# munala-tradedesk
# Munala Trade Desk — Next.js site

This Next.js project is a client portal + admin dashboard for Munala Trade Desk. It reads/writes data from your Google Sheet by using a Google Service Account.

## What to set up before running

1. **Google Cloud service account**
   - Create a Google Cloud project and enable the **Google Sheets API**.
   - Create a **Service Account** and grant it the role `Editor` (or enough to modify the sheet).
   - Create and download a JSON key for the service account.
   - Copy the JSON contents — you will add this to environment variables.

2. **Share your Google Sheet with the service account**
   - Open your spreadsheet and share it (via `Share`) with the service account email (looks like `xxxx@xxxx.iam.gserviceaccount.com`). Give `Editor` permission.
   - Note the spreadsheet ID from its URL (the long string between `/d/` and `/edit`).

3. **Environment variables**
   - Add these variables to your environment (locally in `.env.local` during development; in Vercel via the dashboard when deploying):
     - `SPREADSHEET_ID` — the sheet id.
     - `GOOGLE_SERVICE_ACCOUNT_JSON` — the **entire** JSON you downloaded for the service account (paste JSON string). In case your platform requires it, replace newlines in the `private_key` with `\n`. The code handles both formats.

## Local development

1. Install dependencies:

```bash
npm install
