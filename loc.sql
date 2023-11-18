-- MariaDB dump 10.19-11.1.2-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: loc
-- ------------------------------------------------------
-- Server version	11.1.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `jeux`
--

DROP TABLE IF EXISTS `jeux`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jeux` (
  `JeuxID` int(11) NOT NULL AUTO_INCREMENT,
  `Titre` varchar(100) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `NoteMoyenne` decimal(3,2) DEFAULT NULL,
  `Prix` decimal(8,2) DEFAULT NULL,
  `lien_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`JeuxID`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jeux`
--

LOCK TABLES `jeux` WRITE;
/*!40000 ALTER TABLE `jeux` DISABLE KEYS */;
INSERT INTO `jeux` VALUES
(1,'DBZ Kakarot','Plongez dans la nostalgie de votre enfance avec la Team Z.',4.75,4.99,'https://image.jeuxvideo.com/medias-sm/163232/1632318596-3728-jaquette-avant.png'),
(2,'Cyberpunk 2077','Plongez dans un futur dystopique avec des choix impactants.',4.20,49.99,'https://image.jeuxvideo.com/medias-sm/163835/1638354762-4961-jaquette-avant.gif'),
(3,'FIFA 23','Dominez le terrain avec les dernières équipes et joueurs.',4.60,54.99,'https://m.media-amazon.com/images/I/71k5N7rxjCL.__AC_SX300_SY300_QL70_ML2_.jpg'),
(4,'Assassin\'s Creed Valhalla','Explorez l\'âge des Vikings dans cette aventure épique.',4.85,59.99,NULL),
(5,'Gta 6','Plongez dans un futur dystopique avec des choix impactants.',4.20,49.99,'https://cdn-uploads.gameblog.fr/img/news/429822_64a51c2256401.jpg'),
(6,'The Witcher 3: Wild Hunt','Vivez l\'épopée du sorceleur Geralt dans ce monde ouvert.',4.90,39.99,NULL),
(7,'FIFA 22','Dominez le terrain avec les dernières équipes et joueurs.',4.60,54.99,NULL),
(8,'Minecraft','Construisez et explorez des mondes infinis dans ce jeu culte.',4.80,29.99,NULL),
(9,'Red Dead Redemption 2','Voyagez dans le Far West avec Arthur Morgan.',4.75,44.99,NULL),
(10,'Overwatch','Affrontez d\'autres joueurs dans ce jeu de tir en équipe.',4.40,19.99,NULL),
(11,'The Elder Scrolls V: Skyrim','Explorez un vaste monde ouvert rempli de dragons.',4.70,34.99,NULL),
(12,'Among Us','Démasquez l\'imposteur parmi l\'équipage dans ce jeu multijoueur.',4.50,3.99,NULL),
(13,'Hades','Affrontez les dieux de l\'Olympe dans ce rogue-like captivant.',4.90,24.99,NULL),
(14,'The Legend of Zelda: Breath of the Wild','Explorez le royaume d\'Hyrule dans cette aventure épique de la série Zelda.',4.95,49.99,NULL),
(15,'Call of Duty: Warzone','Affrontez d\'autres joueurs dans ce jeu de tir en ligne battle royale.',4.40,0.00,NULL),
(16,'Sekiro: Shadows Die Twice','Maîtrisez les arts du shinobi dans ce jeu d\'action exigeant.',4.80,39.99,NULL),
(17,'Fortnite','Plongez dans le monde de Fortnite et affrontez d\'autres joueurs pour être le dernier survivant.',4.30,0.00,NULL),
(18,'Grand Theft Auto V','Explorez la ville de Los Santos dans ce jeu d\'action en monde ouvert.',4.70,29.99,NULL),
(19,'Fall Guys: Ultimate Knockout','Participez à des courses loufoques et défis en multijoueur dans ce jeu déjanté.',4.60,19.99,NULL),
(20,'Doom Eternal','Affrontez les démons de l\'enfer dans ce jeu de tir à la première personne intense.',4.85,29.99,NULL),
(21,'League of Legends','Plongez dans l\'univers des champions et affrontez d\'autres joueurs dans ce MOBA.',4.50,0.00,NULL),
(22,'Animal Crossing: New Horizons','Créez votre propre île paradisiaque dans ce jeu de simulation relaxant.',4.90,49.99,NULL),
(23,'Star Wars Jedi: Fallen Order','Vivez une histoire captivante dans l\'univers de Star Wars en tant que Jedi fugitif.',4.75,44.99,NULL),
(24,'Death Stranding','Explorez un monde post-apocalyptique dans cette aventure mystérieuse de Hideo Kojima.',4.60,49.99,NULL),
(25,'Marvel\'s Spider-Man: Miles Morales','Incarnez Miles Morales et combattez le crime à New York dans cet univers Marvel.',4.80,39.99,NULL),
(26,'Hollow Knight','Plongez dans un monde souterrain sombre et magnifique dans ce jeu d\'action-aventure.',4.90,14.99,NULL),
(27,'Tom Clancy\'s Rainbow Six Siege','Affrontez d\'autres joueurs dans des affrontements tactiques en équipe.',4.70,29.99,NULL),
(28,'Resident Evil Village','Survivez à l\'horreur dans ce village hanté par des créatures terrifiantes.',4.75,54.99,NULL),
(29,'Persona 5 Strikers','Rejoignez les Phantom Thieves dans ce mélange d\'action et de RPG.',4.60,49.99,NULL),
(30,'Cyber Shadow','Explorez un monde cybernétique et affrontez des ennemis redoutables dans ce jeu d\'action rétro.',4.50,19.99,NULL),
(31,'Demon\'s Souls','Découvrez une aventure sombre et immersive dans ce remake du classique de FromSoftware.',4.90,69.99,NULL),
(32,'Genshin Impact','Explorez le vaste monde de Teyvat et maîtrisez les éléments dans ce RPG en monde ouvert.',4.70,0.00,NULL),
(33,'Monster Hunter Rise','Chassez d\'énormes monstres dans ce jeu d\'action RPG de la série Monster Hunter.',4.80,59.99,NULL),
(34,'Outriders','Plongez dans un monde de science-fiction en tant qu\'Outrider et combattez pour la survie.',4.40,49.99,NULL),
(35,'Ratchet & Clank: Rift Apart','Voyagez à travers les dimensions dans cette aventure épique avec Ratchet et Clank.',4.85,69.99,NULL),
(36,'Watch Dogs: Legion','Rejoignez la résistance à Londres et piratez le système dans ce jeu d\'action-aventure.',4.20,44.99,NULL),
(37,'It Takes Two','Explorez un monde fantastique en coopération dans cette aventure pleine d\'énigmes.',4.90,39.99,NULL),
(38,'Scarlet Nexus','Plongez dans un futur où des psioniques combattent des créatures mystérieuses.',4.60,49.99,NULL),
(39,'Returnal','Survivez sur une planète extraterrestre hostile dans ce jeu de tir à la troisième personne.',4.75,69.99,NULL),
(40,'Astro\'s Playroom','Explorez le monde charmant d\'Astro dans ce jeu conçu pour mettre en valeur la PS5.',4.80,0.00,NULL),
(41,'Chicory: A Colorful Tale','Redonnez vie au monde en noir et blanc avec un pinceau magique dans ce jeu artistique.',4.70,19.99,NULL),
(42,'Kena: Bridge of Spirits','Guidez Kena à travers un monde mystique et découvrez des esprits en détresse.',4.90,39.99,NULL),
(43,'The Medium','Explorez deux réalités simultanément dans ce thriller psychologique surnaturel.',4.40,49.99,NULL);
/*!40000 ALTER TABLE `jeux` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `location` (
  `LocationID` int(11) NOT NULL AUTO_INCREMENT,
  `UtilisateurID` int(11) DEFAULT NULL,
  `JeuxID` int(11) DEFAULT NULL,
  `DateDebut` date DEFAULT NULL,
  `DateFin` date DEFAULT NULL,
  `Commentaire` text DEFAULT NULL,
  `Note` int(11) DEFAULT NULL,
  PRIMARY KEY (`LocationID`),
  KEY `UtilisateurID` (`UtilisateurID`),
  KEY `JeuxID` (`JeuxID`),
  CONSTRAINT `location_ibfk_1` FOREIGN KEY (`UtilisateurID`) REFERENCES `users` (`UtilisateurID`),
  CONSTRAINT `location_ibfk_2` FOREIGN KEY (`JeuxID`) REFERENCES `jeux` (`JeuxID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES
(1,12,5,'2222-02-01','9000-11-01','Nouvel avis',5),
(2,12,5,'2222-02-01','9000-11-01','Nouvel avis',5),
(3,12,43,'2222-02-22','3000-01-04','Nouvel avis',5),
(4,12,4,'2222-02-22','5555-05-05','Nouvel avis',5),
(5,12,4,'2222-02-22','5555-05-05','Nouvel avis',5),
(6,12,17,'0322-02-04','2222-03-31','Nouvel avis',5),
(7,12,17,'0322-02-04','2222-03-31','Nouvel avis',5),
(8,12,41,'2023-11-17','2025-02-13','Nouvel avis',5),
(9,12,6,'1111-11-11','3222-03-31','Nouvel avis',5),
(10,12,6,'1111-11-11','3222-03-31','Nouvel avis',5),
(11,18,1,'2023-11-18','2023-11-19','Nouvel avis',5),
(12,18,1,'2023-11-18','2023-11-19','Nouvel avis',5),
(13,18,3,'2023-11-18','2023-12-03','Nouvel avis',5),
(14,12,1,'2023-11-18','2023-12-10','Nouvel avis',5),
(15,12,2,'2023-11-18','2023-12-09','Nouvel avis',5);
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `UtilisateurID` int(11) NOT NULL AUTO_INCREMENT,
  `Nom` varchar(50) DEFAULT NULL,
  `Prenom` varchar(50) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `MotDePasse` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`UtilisateurID`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'elyamani','ilyass','ilyassel870@gmail.com','ilyass'),
(2,'elyamani','ilyass','ilyass@ipsi.com','ilyass'),
(3,'elyamani','ilyass','ilyassel870@gmail.comrgre','regerg'),
(4,'elyamani','ilyass','ilyassel870@gmail.comdd','sssss'),
(5,'elyamani','ilyass','ilyassel870@gmail.comdd','$2b$10$6dB0xsuwaW5rkCZlYHeb9uK7akAHTqhORGvG39JJfKrHCltVRE.CG'),
(6,'ds','ds','ilyassel870dsdd@gmail.com','$2b$10$EHS0soO56fNwVHstX661puvvS2nfnrz9agw.0RGtqLTix0k95L5Su'),
(7,'elyamani','ilyass','ilyassel870@gmail.comvvv','$2b$10$J.kiqFrhvE/vq756kl2k8.w2y5mrZiZVEPd1fQ6N0Nw2eNUuio59m'),
(8,'elyamani','ilyass','ilyasselff870@gmail.com','$2b$10$piF8Lba878ZTD3OvstOKVuP21285kk7ZHeO86rUxz7FR.P61gJJLe'),
(9,'elyamani','ilyass','ilyassel870@gmail.ss','$2b$10$3phtijYui0..U5DkOWEYruxaGB0fhmCSUdH7Wfkm9j99pibMU5/WW'),
(10,'elyamani','ilyass','ilyassel870@gmail.pp','$2b$10$mwD2oRDCTWZpOmS382tqvOHXzJpWc1M8PGVlyP4BNeZvrw173wH4W'),
(11,'elyamani','ilyass','ilyassel@gmail.com','$2b$10$PmcgELQDcSOBJcFPJjqZ8uqzVt6oh4lUM0Q.dUbeFDFELlT0ktZy.'),
(12,'elyamani','ilyass','ilyassel870@gmail.fr','$2b$10$smF/5LR9JwtCEPMjpPVGUOObF34G/AK3iEhrXYgfdvbQ41RU5gQde'),
(13,'elyamani','ilyass','870@gmail.com','$2b$10$nLkLnMcXSBeu5WasIUc2p./z52lRVN81.nzp9h72SbxAqxjUr6zG6'),
(14,'elyamani','ilyass','ilyassel870@gmail.comp','$2b$10$.rESWGkNVaH/Vh1tXjvRSezwSRD4T2R/xzS3cE3XUBHJ0JfsCpLKG'),
(15,'elyamani','ilyass','ilyassel870@gmail.comsss','$2b$10$eIeI6YRkwa6tbp2Bx5e5v.lHLuA8voML4qvOTwMIc7e8PjCkGX.Py'),
(16,'elyamani','ilyass','ilyassel870@gmail.comssskj','$2b$10$GpSFZJfKmCLLEj.7kqSaKeR60IugEhCm/eCAPj0N1Tn606mDUkoZK'),
(17,'elyamani','ilyass','ilyassel870@gmail.comdda','$2b$10$TJSFOMQZPtqSji9Ru2W.sO47DUfQDZ.kxf2G/QdFPZWoa4CbZartC'),
(18,'elyamani','ilyass','i@gmail.com','$2b$10$z/UM3K1nom6biEFRr/rZz.lI7PTq7K3/.BSKVQXJv7wf6GM.VK4U.');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-18 16:32:29
