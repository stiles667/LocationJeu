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

// pour récupérer les données de la table "Articles"
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
    
    // Assuming you have a table named "Users" with columns: Email, MotDePasse
    const query = "SELECT * FROM Users WHERE Email = ? AND MotDePasse = ?";
    
    const result = await conn.query(query, [Email, MotDePasse]);

    if (result.length > 0) {
      // User found, login successful
      res.status(200).json({ message: 'Login successful' });
    } else {
      // User not found or incorrect credentials
      res.status(401).json({ error: 'Invalid credentials' });
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
    
    const result = await conn.query(query, [Nom, Prenom, Email, hashedPassword]);
    
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
    
    const query = "SELECT * FROM Users WHERE Email = ?";
    
    const result = await conn.query(query, [Email]);

    if (result.length > 0) {
      const user = result[0];
      if (user.MotDePasse === MotDePasse) {
        res.status(200).json({ message: 'Login successful' });
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

app.listen(3002, () => {
  console.log(`Server is running on port 3002`);
});

