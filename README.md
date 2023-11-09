<h1>Book Store Backend</h1>

### About the Project 
An Express Application for Book Store, So Basically we are going to create a Backend for our Book Store, We will be storing our Book details into the Database, retrieving one or all the Books from the Book Store, modifying a book in the Book Store, Deleting one or all the Books in the Book Store. We are going to perform all the CRUD Operations.

<b><i>Note</i></b>: It is a Complete Backend Application using Node.js, Express Server and MongoDB Database.

<i>Tags - </i>
#express #server #Router #nodemon #mongoose #schema #model 

## To Install and Test
```bash
git clone git@github.com:Hanzalashaik/books-Store.git
cd Book-Store
npm install
npm start
```

## Development
### Basic Setup
<h3>Follow the below Steps In your Terminal</h3>

```bash
echo "!!! let's begin !!!"
```
### Create project folder & navigate into it
```bash
mkdir Book-Store-API 
```

```bash
cd Book-Store-API 
```

### Create the below folders
```bash
mkdir config controllers models utils
```

### Create app.js file (entry point of our API)
```bash
touch app.js
```

### Create package.json file 
```bash
npm init -y
```

### Install dependencies for the basic setup: </h4>

### Dev Dependencies 
```bash
npm i -D nodemon 
```

### Dependencies 
```bash
npm i express
```

<h4>Open the project and configure Express </h4>

```bash
// In app.js 
import express from "express"

const app = express(); 
const PORT = process.env.PORT || 3000; 

// For testing purposes 

app.get("/", (req, res) => { 
    res.send("<h2>It's Working!</h2>"); 
}); 

app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
});
```

<h4> Integrate a new script </h4>

- Add "type" : "module"
- Change "script" :{ "dev": "nodemon app.js"}

```bash
{
  "name": "Book-Store-API",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "type" : "module",
  "scripts": {
    "dev": "nodemon app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "nodemon": "^2.0.15"
  },
  "dependencies": {
    "express": "^4.17.3"
  }
}
```
### Why the Script inside package.json ??
The script makes sure that the development server restarts automatically when we make changes (thanks to nodemon).

### Now start your server
```bash
nodemon app.js
```
Look at your terminal, and there should be a message that the "API is listening on port 3000".

Visit localhost:3000 on your browser. Check everything is working correctly. <br> 



### Create APIs
```bash
echo "Happy Learning !!!"
```