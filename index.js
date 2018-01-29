const http = require('http');
const https = require('https');

const get = url => new Promise((resolve, reject) => {
  // select http or https module, depending on reqested url
  const lib = url.startsWith('https') ? https : http;
  const request = lib.get(url, (response) => {
    if (response.statusCode < 200 || response.statusCode > 299) {
      return reject(new Error(`Failed to load page, status code: ${response.statusCode}`));
    }

    const body = [];
    response.on('data', chunk => body.push(chunk));
    response.on('end', () => resolve(body.join('')));

    return null;
  });

    // handle connection errors of the request
  request.on('error', reject);
});

module.exports = {
  get,
};
