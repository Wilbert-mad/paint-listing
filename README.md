# Paint listing

A nother discord listing!

# TODO

- [ ] server: discord auth
- [ ] server: prop data (temp only)
- [ ] frontend: make the it cleaner
- [ ] frontend: reqest some data from the server

### Database

UNKNOWN: sql type!

# Schemas

(In progress)

## User

(
UserId TEXT NOT NULL PRIMARY KEY,
UserServers TEXT,
)

## Bot

(
BotId TEXT NOT NULL,
PRIMARY KEY('UserId', 'BotId')
)

## Server

(
ServerId TEXT NOT NULL,
Name TEXT NOT NULL,
Owner TEXT NOT NULL,
PRIMARY KEY('UserId', 'ServerId')
)
