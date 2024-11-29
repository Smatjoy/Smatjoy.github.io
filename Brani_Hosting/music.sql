-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Creato il: Nov 29, 2024 alle 18:20
-- Versione del server: 10.4.28-MariaDB
-- Versione PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `music`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `brani`
--

CREATE TABLE `brani` (
  `ID` int(11) NOT NULL,
  `Titolo` varchar(50) NOT NULL,
  `Album` int(11) NOT NULL,
  `Link` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dump dei dati per la tabella `brani`
--

INSERT INTO `brani` (`ID`, `Titolo`, `Album`, `Link`) VALUES
(1, 'Alba chiara', 0, ''),
(2, 'C\'è chi dice no', 0, ''),
(111, 'Alaska Baby', 12, 'https://smatjoy.github.io/Brani_Hosting/Alaska_Baby/1-Alaska%20Baby.mp3'),
(222, 'Ora che non ho più te', 12, 'https://smatjoy.github.io/Brani_Hosting/Alaska_Baby/2-Ora%20che%20non%20ho%20pi%C3%B9%20te.mp3'),
(333, 'Aurore Boreali', 12, 'https://smatjoy.github.io/Brani_Hosting/Alaska_Baby/3-Aurore%20Boreali.mp3');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `brani`
--
ALTER TABLE `brani`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Album` (`Album`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `brani`
--
ALTER TABLE `brani`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=334;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `brani`
--
ALTER TABLE `brani`
  ADD CONSTRAINT `brani_ibfk_1` FOREIGN KEY (`Album`) REFERENCES `album` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
