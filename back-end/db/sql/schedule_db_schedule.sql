-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: schedule_db
-- ------------------------------------------------------
-- Server version	5.7.15-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schedule` (
  `idSchedule` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`idSchedule`),
  UNIQUE KEY `idSchedules_UNIQUE` (`idSchedule`),
  KEY `idUser_idx` (`idUser`),
  CONSTRAINT `schedule->user` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (15,4,'fifth'),(16,4,'fifth schedule'),(17,5,'first'),(19,4,'sixth schedule'),(20,5,'sixth schedule'),(22,4,'second'),(23,4,'first'),(24,4,'hhh'),(25,4,'hhhhhhhh'),(26,4,'hello'),(27,4,'hello1'),(28,4,'hello2'),(29,4,'hello3'),(30,4,'hello3'),(31,4,'hello4'),(32,4,'hello4'),(33,4,'hello4'),(34,4,'hello4'),(35,4,'hello4'),(36,4,'hello4'),(37,4,'hello4'),(38,4,'hello4'),(39,4,'hello4'),(40,4,'hello5'),(41,4,'hello6'),(42,4,'hello7'),(43,4,'hello8'),(44,4,'hello9'),(45,4,'hello10'),(46,4,'hello11'),(47,4,'fff'),(48,4,'1'),(49,4,'2'),(50,4,'first schedule'),(51,4,'my'),(52,4,'myy'),(53,14,'first'),(54,4,'ggg'),(55,4,'5tttt'),(56,4,'thh'),(57,4,'ppp');
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-12-05  1:11:33
