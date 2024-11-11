
# Password Manager

This is a simple password manager created as part of the CS255 Project 1. The application allows users to securely store and manage their passwords for various domains using a master password. The project is built using Node.js and is intended to be a CLI-based application.

## Features

- **Set a Password**: Store passwords for various domains securely.
- **Get a Password**: Retrieve stored passwords for a given domain.
- **Remove a Password**: Remove passwords from the storage.
- **Dump the Database**: Output all stored passwords in the database.
- **Load the Database**: Load an existing password database from a file.
- **Master Password Authentication**: Users must authenticate with a master password to access the application.

## Technologies Used

- **Node.js**: For backend logic and handling user input via the command line.
- **SubtleCrypto**: Used for cryptographic operations like hashing passwords.
- **File System**: For saving and loading the password database.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/JesseKefa/Password-Manager.git
Navigate to the project directory:

bash
Copy code
cd Password-Manager
Install the necessary dependencies:

bash
Copy code
npm install
Run the application:

bash
Copy code
npm start
Usage
After starting the application, you'll be prompted to enter the master password. Once authenticated, you can choose one of the following actions:

Set a password
Get a password
Remove a password
Dump the database
Load the database
Exit
Contributing
Feel free to fork this repository and submit pull requests. If you find any bugs or have suggestions for improvements, please open an issue or contact me directly.

License
This project is licensed under the MIT License - see the LICENSE file for details.

sql
Copy code

### Steps to create the `README.md` file:
1. Open your project directory.
2. Create a new file named `README.md`.
3. Paste the above content into the file.
4. Save the file.

Once this is done, you can commit and push the `README.md` file to your GitHub repository:

```bash
git add README.md
git commit -m "Added README file"
git push origin master