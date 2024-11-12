
# Password Manager - Computer Security Project

## Project Description

This project is a password manager designed to securely store and retrieve passwords for various domains. The manager is implemented in Node.js, utilizing AES encryption to protect stored passwords. The primary focus of this project is on implementing robust security features to safeguard passwords from unauthorized access, including defense against common attacks like swap attacks and rollback attacks. This project also explores various cryptographic techniques such as HMAC for domain-specific password hashing and ensuring that the system leaks minimal information about the stored passwords.

## Features

- **Master Password**: Uses a master password to generate encryption keys for encrypting and decrypting individual passwords for each domain.

- **Password Storage**: Securely stores encrypted passwords using AES-256-CBC encryption and a randomly generated IV (Initialization Vector).

- **Password Retrieval**: Retrieves encrypted passwords and decrypts them using the correct master password.

- **Database Dump**: Allows users to dump the entire password database along with a checksum for integrity verification.

- **Database Loading**: Loads the password database from a dump file after verifying the checksum.

- **Password Removal**: Users can remove passwords from the database securely.

## Installation

To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/password-manager.git
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Run the command-line interface:
   ```bash
   node cli.js
   ```

## Short-answer Questions

### 1. Briefly describe your method for preventing the adversary from learning information about the lengths of the passwords stored in your password manager.

**Answer**:  
To prevent an adversary from learning information about the lengths of passwords, we encrypt the passwords using AES encryption with a fixed key length. This ensures that regardless of the password length, the output ciphertext has a constant size. Additionally, we pad the password before encryption to ensure all encrypted passwords have the same length, further masking any pattern based on the original password length.

### 2. Briefly describe your method for preventing swap attacks (Section 2.2). Provide an argument for why the attack is prevented in your scheme.

**Answer**:  
To prevent swap attacks, we use a deterministic encryption scheme where the ciphertext always has the same length for identical inputs. The padding of passwords ensures that no two passwords differ in size after encryption. Since the attacker cannot predict or observe any difference in size between encrypted passwords, they cannot infer the plaintext password or successfully swap encrypted password entries for a different domain.

### 3. In our proposed defense against the rollback attack (Section 2.2), we assume that we can store the SHA-256 hash in a trusted location beyond the reach of an adversary. Is it necessary to assume that such a trusted location exists, in order to defend against rollback attacks? Briefly justify your answer.

**Answer**:  
Yes, it is necessary to assume a trusted location to defend against rollback attacks. The SHA-256 hash stored in this trusted location acts as a marker for the most recent valid state of the password database. Without this secure reference, an attacker could potentially modify the password database and rollback to an earlier version without detection. The existence of a trusted location ensures that any rollback attempt can be detected by comparing the hash of the current database with the trusted reference.

### 4. Because HMAC is a deterministic MAC (that is, its output is the same if it is run multiple times with the same input), we were able to look up domain names using their HMAC values. There are also randomized MACs, which can output different tags on multiple runs with the same input. Explain how you would do the look up if you had to use a randomized MAC instead of HMAC. Is there a performance penalty involved, and if so, what?

**Answer**:  
If we used a randomized MAC, we would need to store the MAC tag itself along with the domain. Since the output of a randomized MAC varies on each run, performing a lookup by directly comparing the MAC tags would not be possible. To handle this, we could modify the lookup process to store the MAC tag for each domain in a separate index or database, ensuring that the randomized tags are consistent across queries. This would introduce a performance penalty, as each lookup would require the computation of the randomized MAC for comparison, which is slower than a deterministic HMAC-based lookup.

### 5. In our specification, we leak the number of records in the password manager. Describe an approach to reduce the information leaked about the number of records. Specifically, if there are k records, your scheme should only leak log2(k) (that is, if k1 and k2 are such that log2(k1) = log2(k2), the attacker should not be able to distinguish between a case where the true number of records is k1 and another case where the true number of records is k2).

**Answer**:  
To reduce the leakage of information about the number of records, we can use a padding scheme. Instead of storing records sequentially, we could pad the password manager’s internal structure (e.g., using dummy entries) to ensure that the number of actual records is hidden. By padding the number of records such that the total number of entries is always close to a power of two, we can limit the amount of information an attacker can deduce from the database size. This approach ensures that the number of records leaks only the logarithm of the true record count, making it difficult to distinguish between two cases with the same log2 value.

### 6. What is a way we can add multi-user support for specific sites to our password manager system without compromising security for other sites that these users may wish to store passwords of? That is, if Alice and Bob wish to access one stored password (say for nytimes) that either of them can get and update, without allowing the other to access their passwords for other websites.

**Answer**:  
To enable multi-user support for specific sites, we can introduce a user-specific access control mechanism. For each site, we could store a list of user keys (or public keys) that are authorized to access the password. Each password could be encrypted with a unique key for each user, ensuring that Alice and Bob can both decrypt the password for `nytimes` but not passwords for other domains. The decryption process would involve verifying that the user's credentials match the encrypted key for that specific domain. This approach ensures that the password manager maintains secure isolation of passwords for different users while enabling shared access for specific sites.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

### Steps to Use:
1. Copy the above content into a file named `README.md` in the root directory of your GitHub repository.
2. Push your code and README file to your GitHub repository.
3. Share the link to your repository in the submission as required.

This `README.md` contains both the project details and answers to the short questions as requested. Let me know if you need further adjustments!