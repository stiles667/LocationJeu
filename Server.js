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
app.get("/panier/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const query = `
      SELECT Locations.LocationID, Jeux.Titre, Jeux.Description, Jeux.NoteMoyenne, Jeux.Prix
      FROM Locations
      INNER JOIN Jeux ON Locations.JeuxID = Jeux.JeuxID
      WHERE Locations.UtilisateurID = ?
    `;
    const userGames = await pool.query(query, [userId]);

    res.status(200).json(userGames);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

app.post("/locations", async (req, res) => {
  const { JeuxID, DateDebut, UtilisateurID } = req.body;

  let conn;
  try {
    conn = await pool.getConnection();

    // Vérifie si le jeu existe dans la table "Jeux"
    const checkJeuQuery = "SELECT * FROM Jeux WHERE JeuxID = ?";
    const checkJeuResult = await conn.query(checkJeuQuery, [JeuxID]);

    if (checkJeuResult.length > 0) {
      // Le jeu existe, ajoute la location à la table "Locations"
      const addLocationQuery =
        "INSERT INTO Locations (JeuxID, DateDebut, UtilisateurID) VALUES (?, ?, ?)";
      const addLocationResult = await conn.query(addLocationQuery, [JeuxID, DateDebut, UtilisateurID]);

      res.status(201).json({ message: 'Location ajoutée au panier' });
    } else {
      // Le jeu n'existe pas dans la table "Jeux"
      res.status(404).json({ error: 'JeuxID not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (conn) conn.release();
  }
});


app.get("/api/panier", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM locations");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (conn) conn.release();
  }
});

app.delete("/api/panier/:jeuId", async (req, res) => {
  const { jeuId } = req.params;

  let conn;
  try {
    conn = await pool.getConnection();

    // Vérifie d'abord si le jeu existe dans la table "locations"
    const checkQuery = "SELECT * FROM locations WHERE JeuxID = ?";
    const checkResult = await conn.query(checkQuery, [jeuId]);

    if (checkResult.length > 0) {
      // Le jeu existe dans le panier, procède à la suppression
      const deleteQuery = "DELETE FROM locations WHERE JeuxID = ?";
      await conn.query(deleteQuery, [jeuId]);

      res.status(200).json({ message: 'Jeu retiré du panier' });
    } else {
      // Le jeu n'existe pas dans le panier
      res.status(404).json({ error: 'JeuxID not found in the panier' });
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

