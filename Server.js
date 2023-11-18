const express = require("express");
const app = express();
const mariadb = require('mariadb');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_DTB,
});

app.get("/jeux", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM jeux");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (conn) conn.release();
  }
});



//  pour récupérer les données de la table "Utilisateurs"

app.post("/login", async (req, res) => {
  const { Email, MotDePasse } = req.body;
  let conn;

  try {
    conn = await pool.getConnection();

    // Get the user with the provided email
    const users = await conn.query("SELECT * FROM Users WHERE Email = ?", [Email]);

    if (users.length > 0) {
      const user = users[0];

      // Compare the hashed password with the provided password
      const match = await bcrypt.compare(MotDePasse, user.MotDePasse);

      if (match) {
        console.log(user);
        // If the passwords match, send a success response
        res.status(200).json({ message: 'Successfully logged in', id: user.UtilisateurID });
      } else {
        // If the passwords do not match, send an error response
        res.status(400).json({ error: 'Invalid password' });
      }
    } else {
      // If no user is found, send an error response
      res.status(400).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (conn) conn.release();
  }
});


app.post("/Users", async (req, res) => {
  let conn;
  const { Nom, Prenom, Email, MotDePasse } = req.body;

  try {
    conn = await pool.getConnection();

    // Hasher le mot de passe avec bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const query = "INSERT INTO Users (Nom, Prenom, Email, MotDePasse) VALUES (?, ?, ?, ?)";
    
    // const result = await conn.query(query, [Nom, Prenom, Email, hashedPassword]);
    
    res.status(201).json({ id: result.insertId, Nom, Prenom, Email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (conn) conn.release();
  }
});

app.post("/Inscription", async (req, res) => {
  let conn;
  const { Nom, Prenom, Email, MotDePasse } = req.body;

  try {
    conn = await pool.getConnection();

    // Check if email already exists
    const users = await conn.query("SELECT * FROM Users WHERE Email = ?", [Email]);

    if (users.length > 0) {
      // If a user is found, send an error response
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(MotDePasse, salt);

    const query = "INSERT INTO Users (Nom, Prenom, Email, MotDePasse) VALUES (?, ?, ?, ?)";
    
    const result = await conn.query(query, [Nom, Prenom, Email, hashedPassword]);
    
    res.status(201).json({ id: result.insertId, Nom, Prenom, Email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (conn) conn.release();
  }
});

app.post("/login", async (req, res) => {
  const { Email, MotDePasse } = req.body;
  let conn;

  try {
    conn = await pool.getConnection();
    
    const query = "SELECT * FROM users WHERE Email = ?";
    
    const result = await conn.query(query, [Email]);

    if (result.length > 0) {
      const user = result[0];
      if (user.MotDePasse === MotDePasse) {
        res.status(200).json({id : user.id}) ;

      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (conn) conn.release();
  }
});
app.post('/location',async (req, res) => {
  const { jeuxID, DateDebut, DateFin, UtilisateurID ,  } = req.body;
  conn = await pool.getConnection();

  const INSERT_LOCATION_QUERY = 'INSERT INTO location (jeuxID, dateDebut, dateFin, UtilisateurID) VALUES (?, ?, ?, ?)';
  conn.query(INSERT_LOCATION_QUERY, [jeuxID, DateDebut, DateFin, UtilisateurID], (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'insertion des données de location : ', err);
      res.status(500).send('Erreur lors de la location du jeu.');
    } else {
      console.log('Données de location insérées avec succès !');
      res.status(200).send('Jeu loué avec succès !');
    }
  });
});

app.get('/locations', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT location.*, jeux.Titre, jeux.Prix FROM location JOIN jeux ON location.JeuxID = jeux.JeuxID');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (conn) conn.release();
  }
});
app.post("/reviews", async (req, res) => {
  let conn;
  const { LocationID, Commentaire, Note } = req.body;

  try {
    conn = await pool.getConnection();

    // Mettez à jour la ligne de la location avec le commentaire et la note
    const query = "UPDATE location SET Commentaire = ?, Note = ? WHERE LocationID = ?";
    await conn.query(query, [Commentaire, Note, LocationID]);

    res.status(200).json({ message: 'Avis ajouté avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (conn) conn.release();
  }
});

app.listen(3002, () => {
  console.log(`Server is running on port 3002`);
});

