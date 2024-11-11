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

Follow these steps to install and run the application:

1. **Clone the Repository**:  
   Clone the repository to your local machine using the following command:

   ```bash
   git clone https://github.com/JesseKefa/Password-Manager.git

2. **Navigate to the Project Directory**:
    Change to the project directory:

    ```bash
    cd Password-Manager

3. **Install the Dependencies**:
    Install the required dependencies using npm:

    ```bash
    npm install

4. **Run the Application**:
    Start the application by running:

    ```bash
    npm start

## Usage

After starting the application, you'll be prompted to enter the master password. Once authenticated, you can choose one of the following actions:

**Set a Password**: Store a password for a specific domain.

**Get a Password**: Retrieve a password for a given domain.

**Remove a Password**: Delete a stored password.

**Dump the Database**: Display all stored passwords in the database.

**Load the Database**: Load an existing database from a file.

**Exit**: Exit the application.

## Contributing

Feel free to fork this repository and submit pull requests. If you find any bugs or have suggestions for improvements, please open an issue or contact me directly.

