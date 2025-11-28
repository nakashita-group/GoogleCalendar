let tokenClient;
let gapiInited = false;
let gisInited = false;

document.getElementById("authorize_button").onclick = handleAuthClick;

function gapiLoaded() {
  gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
}

function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '',
  });
  gisInited = true;
}

async function handleAuthClick() {
  if (!gapiInited || !gisInited) {
    alert("Google API の準備中です。");
    return;
  }

  tokenClient.callback = async (resp) => {
    if (resp.error) {
      alert("Google 認証エラー");
      return;
    }

    document.getElementById("signout_button").style.display = "block";
    document.getElementById("insert_button").style.display = "block";

    console.log("Google Token:", gapi.client.getToken());
  };

  tokenClient.requestAccessToken({ prompt: 'consent' });
}
