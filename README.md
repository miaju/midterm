LHL Midterm Project: Decision Makr
=========

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Warnings & Tips

- Do not edit the `layout.css` file directly, it is auto-generated by `layout.scss`.
- Split routes into their own resource-based file names, as demonstrated with `users.js` and `widgets.js`.
- Split database schema (table definitions) and seeds (inserts) into separate files, one per table. See `db` folder for pre-populated examples. 
- Use helper functions to run your SQL queries and clean up any data coming back from the database. See `db/queries` for pre-populated examples.
- Use the `npm run db:reset` command each time there is a change to the database schema or seeds. 
  - It runs through each of the files, in order, and executes them against the database. 
  - Note: you will lose all newly created (test) data each time this is run, since the schema files will tend to `DROP` the tables and recreate them.

## Planning and Final Product
- [User stories and project planning](https://docs.google.com/document/d/1ItWgjM_ccWPtv-EIqeQDQ3-iT91uW4oHItH7x82KtnM/edit?usp=sharing)
- [Wireframe](https://www.figma.com/file/Q68LekRzeEsw6xQ4Dk9G3H/decisionMakr?node-id=0%3A1)
- Please see the screen shot of product below:
!["Home Page"](/docs/front.png)
Home Page. Product information is provided, and users can be directed to create a poll and learn more about Borda count through the link.
!["New Poll"](/docs/new.png)
Create a New Poll. After filling out the information for creating the poll, it will direct the user to the admin page. Upon creation of the poll, admin and voter links will be sent to the email provided by the user.
!["Vote on a Poll"](/docs/vote.png)
Vote on a Poll! Use can choose the desired rank for each choice and submit their vote. Email notification of getting a new vote will be sent to the admin of the poll.
!["Vote on a Poll"](/docs/admin.png)
Admin Page (can view/refresh results and close the poll).
The ranking of each choice is calculated based on the score.

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Express
- EJS
- morgan
- mailgun.js
- sass
- chalk
- nodemailer

