export default function test_response(req,res){
  const credential = {
    client_secret: process.env.CLIENT_SECRET,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
    token_uri: process.env.TOKEN_URI,
    auth_uri: process.env.AUTH_URI,
    project_id: process.env.PROJECT_ID,
    client_id: process.env.CLIENT_ID
  };

  console.log("client_id",credential.client_id);
  res.status(200).json(credential);
}
