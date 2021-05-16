const Nexmo = require('nexmo');

function main() {
    let nexmo = new Nexmo({
        apiKey: process.env.SMS_KEY,
        apiSecret: process.env.SMS_SECRET_KEY,
    });
    return nexmo
}

module.exports = {
    nexmo:main()
}