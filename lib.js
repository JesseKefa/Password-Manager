const crypto = require('crypto');

function encodeBuffer(input) {
    return Buffer.from(input, 'utf8').toString('base64');
}

function decodeBuffer(input) {
    return Buffer.from(input, 'base64').toString('utf8');
}

function generateChecksum(data) {
    return crypto.createHash('sha256').update(data).digest('base64');
}

module.exports = { encodeBuffer, decodeBuffer, generateChecksum };
