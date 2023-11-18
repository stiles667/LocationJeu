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
    const rows = await conn.query("SELECT * FROM Jeux");
    res.status(200).json(rows);
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

    const users = await conn.query("SELECT * FROM Users WHERE Email = ?", [Email]);

    if (users.length > 0) {
      const user = users[0];
      const match = await bcrypt.compare(MotDePasse, user.MotDePasse);

      if (match) {
        console.log(user);
        res.status(200).json({ message: 'Successfully logged in', id: user.UtilisateurID });
      } else {
        res.status(400).json({ error: 'Invalid password' });
      }
    } else {
      res.status(400).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (conn) conn.release();
  }
});

app.post("/inscription", async (req, res) => {
  let conn;
  const { Nom, Prenom, Email, MotDePasse } = req.body;

  try {
    conn = await pool.getConnection();

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

app.post('/location', async (req, res) => {
  const { JeuxID, DateDebut, DateFin, UtilisateurID } = req.body;
  let conn;

  try {
    conn = await pool.getConnection();
    const INSERT_LOCATION_QUERY = 'INSERT INTO Location (JeuxID, DateDebut, DateFin, UtilisateurID) VALUES (?, ?, ?, ?)';
    
    await conn.query(INSERT_LOCATION_QUERY, [JeuxID, DateDebut, DateFin, UtilisateurID]);
    
    res.status(200).send('Jeu loué avec succès !');
  } catch (err) {
    console.error('Erreur lors de l\'insertion des données de location : ', err);
    res.status(500).send('Erreur lors de la location du jeu.');
  } finally {
    if (conn) conn.release();
  }
});

app.get('/location', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT Location.*, Jeux.Titre, Jeux.Prix FROM Location JOIN Jeux ON Location.JeuxID = Jeux.JeuxID');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (conn) conn.release();
  }
});

app.get('/location/users/:UtilisateurID', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const UtilisateurID = req.params.UtilisateurID;

    const rows = await conn.query(`
      SELECT Location.*, Jeux.Titre, Jeux.Prix
      FROM Location
      JOIN Jeux ON Location.JeuxID = Jeux.JeuxID
      WHERE Location.UtilisateurID = ?
    `, [UtilisateurID]);

    res.status(200).json(rows);
  } catch (err) {
    console.error("Erreur lors de la récupération des locations :", err);
    res.status(500).send("Erreur interne du serveur");
  } finally {
    if (conn) {
      conn.release();
    }
  }
});

app.post("/note", async (req, res) => {
  let conn;
  const { UtilisateurID, JeuxID, Commentaire, Note } = req.body;

  try {
    conn = await pool.getConnection();
    const query = "INSERT INTO Note (UtilisateurID, JeuxID, Commentaire, Note) VALUES (?, ?, ?, ?)";
    const result = await conn.query(query, [UtilisateurID, JeuxID, Commentaire, Note]);
    res.status(201).json({ id: result.insertId, UtilisateurID, JeuxID, Commentaire, Note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (conn) conn.release();
  }
});

app.get("/note", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM Note");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (conn) conn.release();
  }
});

app.get('/jeux/:jeuxID/commentaires', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const { jeuxID } = req.params;
    const rows = await conn.query('SELECT Commentaire, UtilisateurID FROM Location WHERE JeuxID = ?', [jeuxID]);
    res.status(200).json(rows);
    console.log("error "+rows);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Internal Server Error');
  } finally {
    if (conn) conn.release();
  }
});


app.post("/commentaire", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const { jeuxID } = req.params;
    const rows = await conn.query('SELECT Commentaire, UtilisateurID FROM Location WHERE JeuxID = ?', [jeuxID]);
    res.status(200).json(rows);
    console.log("error "+rows);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Internal Server Error');
  } finally {
    if (conn) conn.release();
  }
});

app.listen(3002, () => {
  console.log(`Server is running on port 3002`);
});
