export default function test_response(req, res) {
  const credential = {
    client_secret: process.env.client_secret,
    auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
    token_uri: process.env.token_uri,
    auth_uri: process.env.auth_uri,
    project_id: process.env.project_id,
    client_id: process.env.client_id,
  };
  res.status(200).json(credential);
};