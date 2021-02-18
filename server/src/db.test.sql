CREATE DATABASE paintlisting

CREATE TABLE Users (
  UserId TEXT NOT NULL PRIMARY KEY,
  UserServers TEXT,
  UserBots TEXT,
)

CREATE TABLE Bots (
  BotId TEXT NOT NULL,
  _Name TEXT NOT NULL,
  ownerIDs JSON NOT NULL,
  _accessToken TEXT NOT NULL,
  _Description TEXT NOT NULL DEFAULT "A super cool bot made by {}",
  PRIMARY KEY(`UserId`, `BotId`)
)

CREATE TABLE Servers (
  ServerId TEXT NOT NULL,
  _Name TEXT NOT NULL,
  ownerID TEXT NOT NULL,
  emojis JSON NOT NULL DEFAULT "[]"
  PRIMARY KEY(`UserId`, `ServerId`)
)