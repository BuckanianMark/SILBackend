import https from 'https'

console.log('Node.js TLS version:', process.versions.tls);

https.get('https://www.howsmyssl.com/a/check', (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    const result = JSON.parse(data);
    console.log('Server TLS version:', result.tls_version);
  });
});
