# Bus-Pass

 A Web-Platform to solve the problem faced by student for the issuance 
of bus-pass.Project is still in under development.
   
## Technology Used

    - Used nodejs to create server
    - sequelize for ORM(object relation mapping)
    - multer to upload document
    - passportjs for authentication
    - Bootstrap and Jquery
    - mailgun to send mails to the applicants
    - pdfCrowd api to get pdf of registration forms
## Setup
**clone the repository and install node packages**
>Please insure that latest version of NPM and NodeJs is install on your machine!

```
- git clone https://github.com/Villan-98/BusPass.git

- cd BusPass

- npm install 
```
**configure the database**
>Install mysql, and use the following commands to setup the 
database and new role. The following commands are written as per
 the default configuration specified in secrets.json. You can 
 change config.json to fit your preferences and modify
  the commands accordingly.
```
CREATE DATABASE busPass; 
CREATE USER 'busAdmin'@'localhost' IDENTIFIED BY 'password';  
use busPass;
GRANT ALL PRIVILEGES ON *.* TO 'busPass'@'localhost';
```
**api keys**

_Please read their terms and conditions before registering for these api!_

[get your mailgun api ](https://www.mailgun.com/)

[get your pdfCrowd api](https://pdfcrowd.com)
## Run App
`npm start`

_Pull request are invited_