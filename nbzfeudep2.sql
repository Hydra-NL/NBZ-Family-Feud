-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: nbzfamilyfeud
-- ------------------------------------------------------
-- Server version	10.4.24-MariaDB

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
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questions` (
  `questionTitle` varchar(255) NOT NULL,
  `answer1` varchar(255) NOT NULL,
  `answer2` varchar(255) NOT NULL,
  `answer3` varchar(255) DEFAULT NULL,
  `answer4` varchar(255) DEFAULT NULL,
  `answer5` varchar(255) DEFAULT NULL,
  `answer6` varchar(255) DEFAULT NULL,
  `answer7` varchar(255) DEFAULT NULL,
  `answer8` varchar(255) DEFAULT NULL,
  `points1` int(11) NOT NULL,
  `points2` int(11) NOT NULL,
  `points3` int(11) DEFAULT NULL,
  `points4` int(11) DEFAULT NULL,
  `points5` int(11) DEFAULT NULL,
  `points6` int(11) DEFAULT NULL,
  `points7` int(11) DEFAULT NULL,
  `points8` int(11) DEFAULT NULL,
  `totalPoints` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES ('Things to do in a park...','Walk','Sports/Play','Have a picnic','Relax/Chill','Read something','Bird related activities','','',30,29,21,8,8,4,0,0,100,1),('Name a pizza...','Pepperoni','Hawaiian','Margherita','(Quatro) Cheese','Mushroom','','','',35,28,20,12,5,0,0,0,100,2),('Name an ice cream flavor...','Vanilla','Chocolate','Cookie Dough','Strawberry','Mint Chocolatechip','','','',42,22,13,12,11,0,0,0,100,3),('Name a Pokémon from generation one...','#025 Pikachu ','#001 Bulbasaur','#006 Charizard','#004 Charmander','#007 Squirtle','#133 Eevee','#019 Rattata','#129 Magikarp',39,16,13,11,6,6,5,4,100,4),('I go on a camping trip and I bring with me... ','Tent','Food','Sleepingbag','Bugspray','Knife','Water (NOT drinks)','','',69,11,10,4,3,3,0,0,100,5),('Name a Star Wars character...','Obi-Wan Kenobi','Leia','Yoda','Han Solo','Chewbacca','Luke Skywalker','Darth Vader','Jar Jar Binks',18,16,13,13,12,10,9,9,100,6),('What sauce do you prefer with fries?','Ketchup','Mayonnaise','Barbeque','Curry sauce','','','','',65,25,6,4,0,0,0,0,100,7),('Name an animal you would see on safari...','Lion','Giraffe','Elephant','Zebra','Tiger','Rhinoceros','Monkey/Primate','Cheetah',36,36,10,10,3,2,2,1,100,8),('Name an alcoholic cocktail...','Margarita','Bloody Mary','Sex On The Beach','Martini','Mojito','Piña Colada','Screwdriver','Maitai',21,16,15,14,10,9,8,7,100,9),('Name a dinosaur...','T-rex','Triceratops','Stegosaurus','Velociraptor','Brontosaurus','Pterodactyl','Ankylosaurus','',39,18,16,8,8,7,4,0,100,10),('Name a Valorant agent...','Cypher','Jett','Viper','Killjoy','Sage','Raze','Sove','Omen',19,18,18,15,9,9,6,6,100,11),('What fruit would you put in a fruitsalad? ','Strawberry','Watermelon','Grapes','Apple','Pineapple','Melon','Mango','Banana',26,16,15,14,9,7,7,6,100,12),('Name an Overwatch 2 hero...','Tracer','Mercy','Winston','Cassidy','Sojourn','Reinhardt','D.va','Soldier 76',25,20,13,12,11,7,7,5,100,13),('Name something you bring INTO the pool...','Pool noodle','Floaties/(Rubber) Inflatables','Swimming Goggles','Ball/Toys','Swimsuit','','','',26,26,17,17,14,0,0,0,100,14),('Name a programminglanguage...','Python','C++','Java','C','JavaScript','C#','R','HTML',28,22,22,9,8,5,4,2,100,15),('Name a videogame character, that does NOT have a nose...','Kirby','Pac-Man','Voldemort','Toad','Lego Character (any really)','Sans','','',54,24,7,5,5,5,0,0,100,16),('I go to the beach and I bring with me...','Towel','Sunscreen','Swimsuit','Sand Castle utilities','Book','Parasol','Sunglasses','Drinks',55,23,6,4,3,3,3,3,100,17),('Name a character that SHOULD have been in Smash Ultimate...','Waluigi','Masterchief','','','','','','',83,17,0,0,0,0,0,0,100,18),('Name a sea animal...','Seal','Sea Otter','Whale','Sea Lion','Dolphin','Seahorse','Shark','Manatee',23,14,13,12,10,10,9,9,100,19),('What specific food item do you grill on a barbecue?','Burgers','Steak','Sausage','Ribs','Hot Dogs','Chicken (Wings, Breats, Thighs)','Corn (Veggies)','',24,17,16,11,11,11,10,0,100,20),('Name a Fortnite skin...','John Wick','Default (Jonesy)','Ninja','Spiderman','Ariana Grande','Stormtrooper','Rick \'n Morty','',30,23,10,10,10,9,8,0,100,21),('What color do you associate with summer?','Yellow','Orange','Green','Blue','Red','','','',62,14,12,7,5,0,0,0,100,22),('Name a fastfood chain...','McDonald\'s','Wendy\'s','Burger King','Kentucky Fried Chicken','Arby\'s','Taco Bell','Five Guys','',64,9,8,7,6,4,2,0,100,23),('Name an Apex Legends legend...','Gibraltar','Octane','Bloodhound','Pathfinder','Watson','Wraith','Mirage','Ash',19,16,13,13,10,10,10,9,100,24),('Name a Pokémon from generation two...','Cyndaquil','Chikorita','Lugia','Totodile','Bayleef','Suicune','Typhlosion','Dunsparce',30,18,11,9,9,9,7,7,100,25),('Name a water based sport...','Water Polo','Swimming','Surfing','Diving','Sailing','Jetskiing','','',48,31,9,5,4,3,0,0,100,26),('Name an Olympic sport, featured in Mario&Sonic On The Olympic Games 2008...','Table Tennis','100m Sprint','Trampoline','100m Freestyle ','Polevaulting','110m Hurdles','Archery','Javelin Throw',26,22,12,12,8,8,6,6,100,27),('Name a Grand Theft Auto game...','GTA: V','GTA: San Andreas','GTA: Vice City','GTA','GTA: IV','GTA: Chinatown Wars','','',40,34,16,4,4,2,0,0,100,28),('Name a letter of the alphabet...','A ','Z ','D ','L','S','B','H','J',29,15,11,10,9,9,9,8,100,29);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_players`
--

DROP TABLE IF EXISTS `team_players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team_players` (
  `teamId` int(11) DEFAULT NULL,
  `playerName` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `theirTurn` bit(1) DEFAULT b'0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_players`
--

LOCK TABLES `team_players` WRITE;
/*!40000 ALTER TABLE `team_players` DISABLE KEYS */;
/*!40000 ALTER TABLE `team_players` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teams` (
  `teamName` varchar(255) NOT NULL,
  `points` int(11) DEFAULT NULL,
  `strikes` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isPlaying` bit(1) DEFAULT b'0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-20 15:11:49
