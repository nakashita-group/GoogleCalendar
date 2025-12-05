export const config = {
  runtime: "nodejs",   // ← これを必ず追加
};

export default function test_response(req,res){
  console.log("controller fired")
  const credential = {
    client_secret: process.env.client_secret,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
    token_uri: process.env.TOKEN_URI,
    auth_uri: process.env.AUTH_URI,
    project_id: process.env.PROJECT_ID,
    client_id: process.env.CLIENT_ID
  };

  console.log("client_id",credential.client_id);
  res.json({message:"hello world"});
}
