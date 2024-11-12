const inquirer = require('inquirer');
const { hashData, encryptData, decryptData, managePassword, loadPasswordData } = require('./password-manager');

// Function to display a menu of options to the user
function mainMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'Add a new password',
          'Retrieve a password',
          'Exit'
        ]
      }
    ])
    .then(answers => {
      switch (answers.action) {
        case 'Add a new password':
          addNewPassword();
          break;
        case 'Retrieve a password':
          retrievePassword();
          break;
        case 'Exit':
          console.log('Goodbye!');
          process.exit();
      }
    });
}

// Add a new password to the password manager
function addNewPassword() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'password',
        message: 'Enter the password to add:'
      }
    ])
    .then(answers => {
      const key = crypto.randomBytes(32); // AES key (32 bytes for AES-256)
      managePassword(answers.password, key);
      mainMenu(); // Return to the main menu
    });
}

// Retrieve a password from the password manager
function retrievePassword() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'passwordHash',
        message: 'Enter the hash of the password you want to retrieve:'
      }
    ])
    .then(answers => {
      const passwords = loadPasswordData();
      const passwordData = passwords[answers.passwordHash];
      
      if (passwordData) {
        const decryptedPassword = decryptData(passwordData.encryptedData, key, passwordData.iv);
        console.log('Decrypted password:', decryptedPassword);
      } else {
        console.log('Password not found.');
      }
      
      mainMenu(); // Return to the main menu
    });
}

// Start the password manager CLI
mainMenu();
