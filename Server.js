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
        // If the passwords match, send a success response
        res.status(200).json({ message: 'Successfully logged in' });
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

// app.post("/locations", async (req, res) => {
//   let conn;
//   const { jeuxid, UtilisateurID, dateDebut, dateFin } = req.body;

//   try {
//     conn = await pool.getConnection();
    
//     // Vérifier si le jeu est disponible ou s'il est déjà loué pour ces dates
//     const existingLocation = await conn.query(
//       "SELECT * FROM Locations WHERE jeuxid = ? AND ((DateDebut BETWEEN ? AND ?) OR (DateFin BETWEEN ? AND ?))",
//       [jeuxid, dateDebut, dateFin, dateDebut, dateFin]
//     );

//     if (existingLocation.length > 0) {
//       return res.status(400).json({ error: 'Jeu non disponible pour ces dates' });
//     }

//     // Insérer la nouvelle location
//     const query = "INSERT INTO Locations (jeuxid, UtilisateurID, DateDebut, DateFin) VALUES (?, ?, ?, ?)";
//     const result = await conn.query(query, [jeuxid, UtilisateurID, dateDebut, dateFin]);

//     res.status(201).json({ id: result.insertId, jeuxid, UtilisateurID, dateDebut, dateFin });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   } finally {
//     if (conn) conn.release();
//   }
// });
app.listen(3002, () => {
  console.log(`Server is running on port 3002`);
});

