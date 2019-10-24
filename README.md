# Web Front-end Development (CPSC 349) - Project 1

This is a project for Web Front-end Development (CPSC 349). The project is based on [about.me](https://about.me/). A user is able to create a landing page promoting who they are and what they are.

## Dependencies
- Install [XAMPP Control Panel](https://www.apachefriends.org/download.html)
- Install [Node.js](https://nodejs.org/en/)
- Install [composer](https://getcomposer.org/download/)
- Install [Git](https://git-scm.com)

## Development

1. `cd` into your projects folder, should be C:\xampp\htdocs\
2. Clone repository: `git clone https://github.com/nhoang53/CPSC349-Project1.git`
3. Go to CPSC349-Project1: `cd CPSC349-Project1/`
4. Add your contributions

_To run project_

1. Open XAMPP Control Panel, start service Apache and MySQL.
2. Go to http://localhost/phpmyadmin/ in browser, create database name: fewdprojecttone.
    Then import sql file name fewdprojectone.sql in project folder/api/db
3. Open command line in directory `api`, then run: `composer install`, `composer start`
4. Go to directory `web` install dependencies: `npm install`
5. To run the project on browser, open shell in web folder: `npm run start`


_To see your changes use: npm run start or npm start_
_To create a production ready package use: npm run build_

After every pull: make sure you use `npm install` and `composer install` to install any dependencies added.
