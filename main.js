import express from "express";
import session from "express-session";
import { google } from "googleapis";

const app = express();
app.use(express.json());
app.use(session({ secret: "keyboardcat", resave: false, saveUninitialized: true }));

const CLIENT_ID = "308977655386-u3fu62uspm9nj7fhv574mmk5ll6tm5ag.apps.googleusercontent.com";
const CLIENT_SECRET = "AIzaSyBJ8z23ydjTBaHRfevTeGEfySNAxRD6pzg";
const REDIRECT_URI = "https://your-server.com/oauth2callback";

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

app.post("/addEvent", async (req, res) => {
  if(!req.session.tokens){
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/calendar.events"]
    });
    return res.json({ authUrl });
  }

  const { title, description, date, start, end } = req.body;
  oauth2Client.setCredentials(req.session.tokens);

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  try {
    await calendar.events.insert({
      calendarId: "primary",
      resource: {
        summary: title,
        description,
        start: { dateTime: `${date}T${start}:00+09:00` },
        end:   { dateTime: `${date}T${end}:00+09:00` }
      }
    });
    res.json({ message: "Google Calendarに登録しました" });
  } catch(e){
    console.error(e);
    res.status(500).json({ message: "登録失敗" });
  }
});

// OAuth callback
app.get("/oauth2callback", async (req,res) => {
  const code = req.query.code;
  if(!code) return res.send("認証コードがありません");

  const { tokens } = await oauth2Client.getToken(code);
  req.session.tokens = tokens;

  res.send("認証完了！ WOFFアプリに戻り、再度送信してください");
});

app.listen(3000, ()=>console.log("Server running"));
