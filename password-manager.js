const crypto = require('crypto'); // Node's built-in crypto module
const fs = require('fs'); // For file system operations
const path = require('path');

// Hashing function using SHA-256 in Node.js
function hashData(data) {
  const hash = crypto.createHash('sha256');
  hash.update(data);
  const hashHex = hash.digest('hex');
  return hashHex;
}

// AES encryption using AES-256-CBC in Node.js
function encryptData(data, key) {
  const iv = crypto.randomBytes(16); // Generate random IV
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return {
    encryptedData: encrypted,
    iv: iv.toString('hex')
  };
}

// AES decryption using AES-256-CBC in Node.js
function decryptData(encryptedData, key, ivHex) {
  const iv = Buffer.from(ivHex, 'hex'); // Convert the IV back from hex
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Save data to a file (JSON format)
function savePasswordData(passwords) {
  const filePath = path.join(__dirname, 'passwords.json');
  fs.writeFileSync(filePath, JSON.stringify(passwords, null, 2)); // Store passwords as JSON
}

// Load data from the file
function loadPasswordData() {
  const filePath = path.join(__dirname, 'passwords.json');
  if (fs.existsSync(filePath)) {
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData);
  }
  return {}; // Return empty object if file doesn't exist
}

// Example: Save and load passwords
function managePassword(data, key) {
  let passwords = loadPasswordData();
  
  const hash = hashData(data); // Hash the password
  console.log('Password hash:', hash);

  // Encrypt and save the password
  const { encryptedData, iv } = encryptData(data, key);
  passwords[hash] = { encryptedData, iv };
  savePasswordData(passwords);

  console.log('Password encrypted and saved successfully.');
  return hash;
}

// Example usage
const key = crypto.randomBytes(32); // AES key (32 bytes for AES-256)
const password = "MySuperSecretPassword123!";

const passwordHash = managePassword(password, key);

// To decrypt, you would call decryptData() with the encrypted password and IV
