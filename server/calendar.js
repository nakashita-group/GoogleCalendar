import path from 'node:path';
import process from 'node:process';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';

// The scope for reading calendar events.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// The path to the credentials file.
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Lists the next 10 events on the user's primary calendar.
 */
async function listEvents() {
    // Authenticate with Google and get an authorized client.
    const auth = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });

    const event = {
        'summary': 'テストタイトル',
        'description': 'テスト送信',
        'start': {
            'dateTime': '2025-11-28T09:00:00+09:00',
            'timeZone': 'Asia/Tokyo',
        },
        'end': {
            'dateTime': '2025-11-28T17:10:00+09:00',
            'timeZone': 'Asia/Tokyo',
        },
        'reminders': {
            'useDefault': false,
            'overrides': [
                { 'method': 'email', 'minutes': 24 * 60 },
                { 'method': 'popup', 'minutes': 10 },
            ],
        },
    };

    // Create a new Calendar API client.
    const calendar = google.calendar({ version: 'v3', auth });
    // Get the list of events.
    const result = await calendar.events.insert({
        auth: auth,
        calendarId: 'nakashita0224@gmail.com',
        resource: event
    });

    console.log('registered');

}

await listEvents();