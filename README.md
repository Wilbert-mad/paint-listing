# Paint listing

A nother discord listing!

# TODO

- [x] server: discord auth
- [ ] server: prop data (temp only)
- [ ] frontend: make the it cleaner
- [ ] frontend: reqest some data from the server

### Database

Database is Mysql.

# Schemas

(In progress)

## User

(
UserId TEXT NOT NULL PRIMARY KEY,

UserServers TEXT,

UserBots TEXT,
)

## Bot

(
BotId TEXT NOT NULL,

\_Name TEXT NOT NULL,

ownerIDs JSON NOT NULL,

\_accessToken TEXT NOT NULL,

\_Description TEXT NOT NULL DEFAULT "A super cool bot made by {}",

PRIMARY KEY(`UserId`, `BotId`)
)

## Server

(
ServerId TEXT NOT NULL,

\_Name TEXT NOT NULL,

ownerID TEXT NOT NULL,

emojis JSON NOT NULL DEFAULT "[]"

PRIMARY KEY(`UserId`, `ServerId`)
)
