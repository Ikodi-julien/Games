-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : lun. 21 déc. 2020 à 14:57
-- Version du serveur :  8.0.22-0ubuntu0.20.04.3
-- Version de PHP : 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `games`
--

-- --------------------------------------------------------

--
-- Structure de la table `player`
--

CREATE TABLE `player` (
  `id` int NOT NULL,
  `gameName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `pseudo` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `score` int NOT NULL,
  `comment` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `player`
--

INSERT INTO `player` (`id`, `gameName`, `pseudo`, `score`, `comment`, `date`) VALUES
(1, 'doodleJump', 'julien', 10, '', '2020-11-08 11:36:14'),
(2, 'doodleJump', 'Bob', 45, '', '2020-11-08 11:45:42'),
(3, 'doodleJump', 'Dave', 5, '', '2020-11-08 11:45:42'),
(11, 'doodleJump', 'Anonymous', 1, '', '2020-11-08 13:33:08'),
(12, 'doodleJump', 'Anonymous', 1, '', '2020-11-08 13:34:43'),
(13, 'doodleJump', 'Anonymous', 1, '', '2020-11-08 13:35:17'),
(14, 'doodleJump', 'Anonymous', 1, '', '2020-11-08 13:35:57'),
(15, 'doodleJump', 'Anonymous', 1, '', '2020-11-08 13:39:26'),
(16, 'doodleJump', 'Anonymous', 5, '', '2020-11-08 13:43:15'),
(17, 'doodleJump', 'Anonymous', 1, '', '2020-11-08 13:46:19'),
(18, 'doodleJump', 'Anonymous', 8, '', '2020-11-08 13:48:44'),
(19, 'doodleJump', 'Anonymous', 2, '', '2020-11-08 13:51:50'),
(20, 'doodleJump', 'the creator', 4, '', '2020-11-08 13:55:24'),
(21, 'doodleJump', 'the creator', 4, '', '2020-11-08 13:57:42'),
(22, 'doodleJump', 'Anonymous', 15, '', '2020-11-08 13:58:37'),
(23, 'doodleJump', 'Moi', 64, '', '2020-11-08 14:07:20'),
(24, 'doodleJump', 'Moi', 31, '', '2020-11-08 14:14:37'),
(25, 'doodleJump', 'Moi', 7, '', '2020-11-08 14:38:50'),
(26, 'doodleJump', 'Moi', 14, '', '2020-11-08 14:55:23'),
(27, 'doodleJump', 'Moi', 3, '', '2020-11-08 14:56:39'),
(28, 'doodleJump', 'Jacquy', 129, '', '2020-11-09 11:57:24'),
(29, 'doodleJump', 'Jacquy', 41, '', '2020-11-12 16:25:18'),
(30, 'doodleJump', 'Régis', 2, '&gt;', '2020-11-22 15:52:41'),
(31, 'doodleJump', 'Régis', 17, '&gt; Ben non', '2020-11-22 15:53:38'),
(32, 'doodleJump', 'Régis', 3, '', '2020-11-22 21:24:59'),
(33, 'doodleJump', 'Régis', 8, 'test2', '2020-11-22 21:43:26'),
(34, 'doodleJump', 'Régis', 11, '', '2020-11-24 15:04:47'),
(35, 'snake', 'Régis', 2, 'Cool ?', '2020-11-24 17:00:54'),
(36, 'doodleJump', 'Régis', 10, 'Bientôt fini ?', '2020-11-24 17:19:12'),
(37, 'snake', 'Ju', 2, 'content du snake ?', '2020-11-24 17:21:36'),
(38, 'snake', 'Régis', 3, 'C bon ?', '2020-11-27 13:20:39'),
(39, 'doodleJump', 'Régis', 2, 'ca marche déjà ?', '2020-12-07 20:17:10'),
(40, 'fb', 'Régis', 3, '1er commentaire ?', '2020-12-07 20:25:41'),
(41, 'fb', 'ju', 15, '2ème commentaire', '2020-12-07 20:27:14'),
(42, 'fb', 'ju', 5, 'test pour ?', '2020-12-07 21:11:38'),
(43, 'fb', 'ju', 7, 'LE 3ÈME ?', '2020-12-07 21:16:31'),
(44, 'fb', 'ju', 14, 'le 8/12', '2020-12-08 09:16:19'),
(45, 'fb', 'ju', 19, 'c cool', '2020-12-08 11:18:53'),
(46, 'fb', 'ju', 18, 'ben non', '2020-12-08 14:10:21'),
(47, 'fb', 'ju', 10, '1er commentaire !', '2020-12-08 15:24:45'),
(48, 'fb', 'ju', 33, 'Le score à battre (08/12)', '2020-12-08 19:22:40');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `player`
--
ALTER TABLE `player`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `player`
--
ALTER TABLE `player`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
