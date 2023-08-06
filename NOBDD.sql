-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: tienda
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `ID_CATEGORIA` int NOT NULL AUTO_INCREMENT,
  `CATEGORIA` varchar(15) NOT NULL,
  `DESCRIPCION` varchar(50) NOT NULL,
  PRIMARY KEY (`ID_CATEGORIA`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Bebidas','Bebidas de todo tipo.'),(2,'Golosinas','Dulces deliciosos'),(3,'Frutas','Frutas de todo tipo, sin químicos.'),(4,'Mascotas','Comida de animales, accesorios, platos, etc.'),(5,'Ropa','Para toda ocasión.');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `CLI_CEDULA` char(10) NOT NULL,
  `CLI_NOMBRE` varchar(50) NOT NULL,
  `CLI_APELLIDO` varchar(50) NOT NULL,
  `CLI_DIRECCION` varchar(200) NOT NULL,
  `CLI_FECHA` date DEFAULT NULL,
  PRIMARY KEY (`CLI_CEDULA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES ('0000000000','El Chavo','del 8','La Vecindad','1970-03-03');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factura`
--

DROP TABLE IF EXISTS `factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `factura` (
  `FAC_ID` int NOT NULL AUTO_INCREMENT,
  `CLI_CEDULA` char(10) DEFAULT NULL,
  `FAC_FORMAPAGO` varchar(50) NOT NULL,
  `FAC_DESCUENTO` decimal(5,2) NOT NULL DEFAULT '0.00',
  `FAC_FECHA` datetime NOT NULL,
  `FAC_VALORTOTAL` decimal(5,2) NOT NULL DEFAULT '0.00',
  `FAC_SUBTOTAL` decimal(5,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`FAC_ID`),
  KEY `FK_HACE` (`CLI_CEDULA`),
  CONSTRAINT `FK_HACE` FOREIGN KEY (`CLI_CEDULA`) REFERENCES `cliente` (`CLI_CEDULA`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factura`
--

LOCK TABLES `factura` WRITE;
/*!40000 ALTER TABLE `factura` DISABLE KEYS */;
INSERT INTO `factura` VALUES (4,'0000000000','Efectivo',5.00,'2023-08-04 00:00:00',1.43,1.50),(5,'0000000000','Tarjeta',0.00,'2023-08-04 05:06:39',0.00,0.00),(8,'0000000000','Transferencia',10.00,'2023-08-04 05:10:06',0.00,0.00),(9,'0000000000','Tarjeta',1.00,'2023-08-04 05:10:45',0.00,0.00),(11,'0000000000','Efectivo',0.00,'2023-08-04 12:57:26',0.00,0.00),(12,'0000000000','Efectivo',0.00,'2023-08-04 13:00:53',0.00,0.00),(13,'0000000000','Efectivo',0.00,'2023-08-04 13:02:13',0.00,0.00),(14,'0000000000','Efectivo',0.00,'2023-08-04 13:03:49',0.00,0.00),(15,'0000000000','Transferencia',3.00,'2023-08-04 13:05:21',0.00,0.00),(16,'0000000000','Efectivo',2.00,'2023-08-04 13:06:57',0.00,0.00),(17,'0000000000','Efectivo',0.00,'2023-08-04 13:09:20',0.00,0.00),(18,'0000000000','Efectivo',8.00,'2023-08-04 13:10:35',0.00,0.00),(19,'0000000000','Efectivo',5.00,'2023-08-04 13:12:59',0.00,0.00),(20,'0000000000','Tarjeta',1.00,'2023-08-04 13:13:53',0.00,0.00),(21,'0000000000','Efectivo',1.00,'2023-08-04 13:15:15',0.00,0.00);
/*!40000 ALTER TABLE `factura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `PRO_ID` int NOT NULL AUTO_INCREMENT,
  `ID_CATEGORIA` int NOT NULL,
  `PRO_NOMBRE` varchar(50) NOT NULL,
  `PRO_PRECIO` decimal(7,2) NOT NULL,
  `PRO_STOCK` int NOT NULL DEFAULT '0',
  `ONSTOCK` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`PRO_ID`),
  KEY `FK_TIENE` (`ID_CATEGORIA`),
  CONSTRAINT `FK_TIENE` FOREIGN KEY (`ID_CATEGORIA`) REFERENCES `categoria` (`ID_CATEGORIA`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,2,'Nutella',2.00,20,1),(3,1,'Agua Dasani',0.50,50,1),(4,3,'Naranjas',1.50,99,1),(5,5,'Camisas',20.00,0,1);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provee`
--

DROP TABLE IF EXISTS `provee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provee` (
  `PROVE_ID` int NOT NULL,
  `PRO_ID` int NOT NULL,
  `CANTIDADPROVEEDOR` smallint NOT NULL,
  PRIMARY KEY (`PROVE_ID`,`PRO_ID`),
  KEY `FK_PROVEE` (`PRO_ID`),
  CONSTRAINT `FK_PROVEE` FOREIGN KEY (`PRO_ID`) REFERENCES `producto` (`PRO_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_PROVEE2` FOREIGN KEY (`PROVE_ID`) REFERENCES `proveedor` (`PROVE_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provee`
--

LOCK TABLES `provee` WRITE;
/*!40000 ALTER TABLE `provee` DISABLE KEYS */;
/*!40000 ALTER TABLE `provee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedor` (
  `PROVE_ID` int NOT NULL AUTO_INCREMENT,
  `PROVE_NOMBRE` varchar(50) NOT NULL,
  `PROVE_DIRECCION` varchar(200) NOT NULL,
  `PROVE_CONTACTO` char(10) NOT NULL,
  PRIMARY KEY (`PROVE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedor`
--

LOCK TABLES `proveedor` WRITE;
/*!40000 ALTER TABLE `proveedor` DISABLE KEYS */;
/*!40000 ALTER TABLE `proveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `US_CORREO` varchar(100) NOT NULL,
  `US_NOMBRE` varchar(60) NOT NULL,
  `US_APELLIDO` varchar(60) NOT NULL,
  `US_CONTRASENIA` varchar(250) NOT NULL,
  PRIMARY KEY (`US_CORREO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES ('adguarderas@espe.edu.ec','David','Leal','$2a$10$tVBVoErFnCXIkjuTkofh/O.yzTr6l1he.Pr22WZw4J7Ao5E5.K0xK');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venta`
--

DROP TABLE IF EXISTS `venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venta` (
  `FAC_ID` int NOT NULL,
  `PRO_ID` int NOT NULL,
  `CANTIDAD` int NOT NULL,
  PRIMARY KEY (`FAC_ID`,`PRO_ID`),
  KEY `FK_VENTA` (`PRO_ID`),
  CONSTRAINT `FK_VENTA` FOREIGN KEY (`PRO_ID`) REFERENCES `producto` (`PRO_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_VENTA2` FOREIGN KEY (`FAC_ID`) REFERENCES `factura` (`FAC_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venta`
--

LOCK TABLES `venta` WRITE;
/*!40000 ALTER TABLE `venta` DISABLE KEYS */;
INSERT INTO `venta` VALUES (4,4,1);
/*!40000 ALTER TABLE `venta` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-04 13:40:30
