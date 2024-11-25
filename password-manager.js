const fs = require('fs');
const crypto = require('crypto');

class PasswordManager {
    constructor() {
        this.database = {};  // In-memory password storage
    }

    // Encrypts data using master password
    encryptData(masterPassword, data) {
        const key = crypto.createHash('sha256').update(masterPassword).digest();
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        let encrypted = cipher.update(data, 'utf-8', 'hex');
        encrypted += cipher.final('hex');
        return iv.toString('hex') + ':' + encrypted;  // IV prepended for decryption
    }

    // Decrypts data using master password
    decryptData(masterPassword, encryptedData) {
        const key = crypto.createHash('sha256').update(masterPassword).digest();
        const [ivHex, encrypted] = encryptedData.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
        return decrypted;
    }

    // Stores a password in memory (encrypted)
    async set(masterPassword, domain, password) {
        this.database[domain] = this.encryptData(masterPassword, password);
    }

    // Retrieves a password from memory (decrypted)
    async get(masterPassword, domain) {
        if (this.database[domain]) {
            return this.decryptData(masterPassword, this.database[domain]);
        }
        return null; // Password not found
    }

    // Removes a password from memory
    async remove(masterPassword, domain) {
        if (this.database[domain]) {
            delete this.database[domain];
            return true;
        }
        return false;
    }

    // Dumps the encrypted password database to passwords.json
    async dump() {
        const serializedDatabase = JSON.stringify(this.database);  // Convert database to JSON string

        // Encrypt the serialized database
        const encryptedDatabase = this.encryptData(this.masterPassword, serializedDatabase);

        // Calculate checksum for data integrity
        const checksum = crypto.createHash('sha256').update(encryptedDatabase).digest('hex');

        // Create an object to store encrypted data and checksum
        const dumpObject = {
            data: encryptedDatabase,
            checksum: checksum
        };

        // Write the dump to passwords.json
        fs.writeFileSync('passwords.json', JSON.stringify(dumpObject, null, 2));

        console.log('Database dumped to passwords.json');
        return [encryptedDatabase, checksum];
    }

    // Loads the password database from passwords.json
    async load(masterPassword) {
        try {
            // Read and parse the JSON file
            const dumpContents = JSON.parse(fs.readFileSync('passwords.json'));

            // Verify checksum
            const currentChecksum = crypto.createHash('sha256').update(dumpContents.data).digest('hex');
            if (currentChecksum !== dumpContents.checksum) {
                throw new Error('Checksum verification failed');
            }

            // Decrypt the database and restore it to memory
            const decryptedData = this.decryptData(masterPassword, dumpContents.data);
            this.database = JSON.parse(decryptedData);

            console.log('Database loaded successfully');
            return true;
        } catch (error) {
            console.error('Failed to load database:', error.message);
            return false;
        }
    }
}

module.exports = PasswordManager;
