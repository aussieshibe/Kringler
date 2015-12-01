# Kringler

Kringler is a simple web app used for setting up Kris Kringles (aka Secret Santa).

It allows users to log in via Facebook, create a "room" for the Kringle, share an invite link, and randomly select matches.

##Requirements

Kringler requires a local install of MongoDB and Node.js. Node module requirements are all included in the package.json and can be grabbed with 'npm install' in the root directory of the project.

##Installation

- Install MongoDB localally with the default config
- Clone the repository with git clone https://github.com/aussieshibe/Kringler.git
- Run 'npm install' from within the Kringler directory to grab the required node modules
- Run 'npm start' to start the server

PLEASE NOTE: Currently there are a couple of static references to my domain in the code (specifically in the Facebook login callback) and so this code WILL NOT WORK out of the box.
