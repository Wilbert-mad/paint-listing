# Paint listing

A nother discord listing!

# TODO

- [ ] server: discord auth
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
Name TEXT NOT NULL,
ownerIDs TEXT NOT NULL,
PRIMARY KEY('UserId', 'BotId')
)

## Server

(
ServerId TEXT NOT NULL,
Name TEXT NOT NULL,
ownerID TEXT NOT NULL,
PRIMARY KEY('UserId', 'ServerId')
)
