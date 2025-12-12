const https = require('https');

function fetchInput(day, callback) {
    const url = `https://adventofcode.com/2025/day/${day}/input`;
    const options = {
        headers: {
            'Cookie': 'session=YOUR_SESSION_COOKIE_HERE' // Replace  with your actual session cookie value
        }
    };

    https.get(url, options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            callback(data);
        });
    }).on('error', (err) => {
        console.error('Error fetching input:', err.message);
    });
}

exports.fetchInput = fetchInput;