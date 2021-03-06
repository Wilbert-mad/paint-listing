CREATE DATABASE paintlisting

CREATE TABLE Users (
  UserId VARCHAR(20) NOT NULL PRIMARY KEY,
  avatar TEXT,
  UserServers JSON,
  UserBots JSON
);

CREATE TABLE Bots (
  BotId TEXT NOT NULL PRIMARY KEY,
  _Name TEXT NOT NULL,
  ownerIDs JSON NOT NULL DEFAULT JSON_ARRAY(),
  _accessToken TEXT NOT NULL,
  _Description TEXT NOT NULL DEFAULT "A super cool bot made by {}",
);

CREATE TABLE Servers (
  ServerId TEXT NOT NULL,
  _Name TEXT NOT NULL,
  ownerID TEXT NOT NULL,
  emojis JSON NOT NULL DEFAULT JSON_ARRAY();
  PRIMARY KEY(`UserId`, `ServerId`)
);
