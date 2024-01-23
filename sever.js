
const express = require('express');
const app = express();
const port = 2000;
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('signup');
});

app.post('/signup', (req, res) => {
  // Extract form data
  const { username,  password } = req.body;
    console.log(req.body);
  // Connection URL
  const url = 'mongodb://localhost:27017';

  // Database Name
  const dbName = 'user';

  // Create a new MongoClient
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  // Connect to the server
  client.connect()
    .then(() => {
      console.log('Connected to MongoDB');

      // Specify the database
      const db = client.db(dbName);

      // Specify the collection (assuming a collection named 'users')
      const collection = db.collection('users');

      // Insert the form data into the collection
      return collection.insertOne({
        username: username,
        
        password: password
      });
    })
    .then(() => {
      // Close the connection after insertion
      client.close();
      res.send('Data inserted into the database');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
      res.status(500).send('Internal Server Error');
    });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
