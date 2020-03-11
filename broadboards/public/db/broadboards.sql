CREATE SCHEMA "BroadBoards"
    AUTHORIZATION test;

CREATE TABLE "BroadBoards".user (
  "username" varchar(20) PRIMARY KEY,
  "first" varchar(25),
  "last" varchar(25),
  "joined" timestamp,
  "email" varchar(64),
  "password" varchar(100)
);

--CREATE TABLE "group" (
--  "groupname" varchar(10) PRIMARY KEY,
--  "created" timestamp
--);

CREATE TABLE "BroadBoards".thread (
  "id" SERIAL PRIMARY KEY,
  "title" varchar(250),
  "content" varchar,
  "created" timestamp,
  --  "groupname" varchar(20),
  "username" varchar(20)

);

CREATE TABLE "BroadBoards".post (
  "id" SERIAL PRIMARY KEY,
  "response" varchar,
  "created" timestamp,
  "thread_id" int,
  "username" varchar(20)
);


ALTER TABLE "BroadBoards".thread
	ADD FOREIGN KEY ("username")
	REFERENCES "BroadBoards".user ("username");
--ALTER TABLE "thread"
--	ADD FOREIGN KEY ("groupname")
--	REFERENCES "group" ("groupname");
ALTER TABLE "BroadBoards".post
	ADD FOREIGN KEY ("thread_id")
	REFERENCES "BroadBoards".thread ("id");
ALTER TABLE "BroadBoards".post
	ADD FOREIGN KEY ("username")
	REFERENCES "BroadBoards".user ("username");
--ALTER TABLE "group"
--	ADD FOREIGN KEY ("username")
--	REFERENCES "users" ("username");

-- INSERT: Test cases for the dbms

INSERT INTO "BroadBoards".user(
	username, first, last, joined, email)
	VALUES  ('cteters', 'Christopher', 'Teters', '20200304 11:16:36 am',  'ccteterss@gmail.com'),
		('jsmith', 'John', 'Smith', '20200304 11:17:36 am',  'jsmith@gmail.com'),
   		('bgates', 'Bill', 'Gates', '20200304 11:18:36 am',  'bgates@live.com'),
		('dudeGuy', 'Dude', 'Guy', '20200304 11:19:36 am', 'dudeguy@gmail.com');

INSERT INTO "BroadBoards".thread(
	title, content, created, username)
	VALUES	('Welcome to BroadBoards!', 'BroadBoards is a project brought together by three undergraduate students from Portland State University. We took interest in the idea of building a forum-thread based website from the ground up for various reasons and hope to deliver a format that is refreshing compared to the traditional stack frames that are often associated with these sorts of things.', '20200304 11:20:35 am', 'cteters'),
		('Test thread one', 'This is a test thread', '20200304 11:21:36 am', 'cteters'),
		('Test thread two', 'This is a test thre ad', '20200304 11:22:36 am', 'cteters'),
		('Test thread three', 'This is a test thread', '20200304 11:23:36 am', 'cteters'),
		('Test thread four', 'This is a test thread', '20200304 11:24:36 am', 'cteters'),
		('Test thread five', 'This is a test thread', '20200304 11:25:36 am', 'cteters'),
		('Test thread six', 'This is a test thread', '20200304 11:26:36 am', 'cteters'),
		('Test thread seven', 'This is a test thread', '20200304 11:27:36 am', 'cteters'),
		('Test thread eight', 'This is a test thread', '20200304 11:28:36 am', 'cteters'),
		('Test thread nine', 'This is a test thread', '20200304 11:29:36 am', 'cteters'),
		('Test thread ten', 'This is a test thread', '20200304 11:30:36 am', 'cteters'),
		('Test thread eleven', 'This is a test thread', '20200304 11:31:36 am', 'cteters'),
		('Test thread twelve', 'This is a test thread', '20200304 11:32:36 am', 'cteters'),
		('Test thread thriteen', 'This is a test thread', '20200304 11:33:36 am', 'cteters'),
		('Test thread fourteen', 'This is a test thread', '20200304 11:34:36 am', 'cteters'),
		('Test thread fifteen', 'This is a test thread', '20200304 11:35:36 am', 'cteters'),
		('Test thread sixteen', 'This is a test thread', '20200304 11:36:36 am', 'cteters'),
		('Test thread seventeen', 'This is a test thread', '20200304 11:37:36 am', 'cteters'),
		('Test thread eightteen', 'This is a test thread', '20200304 11:38:36 am', 'cteters'),
		('Test thread nineteen', 'This is a test thread', '20200304 11:39:36 am', 'cteters'),
		('Test thread twenty', 'This is a test thread', '20200304 11:35:40 am', 'cteters'),
		('Test thread twentyone', 'This is a test thread', '20200304 11:41:36 am', 'cteters'),
		('Test thread twentytwo', 'This is a test thread', '20200304 11:42:36 am', 'cteters');

INSERT INTO "BroadBoards".post(
	response, thread_id, created, username)
	VALUES ('First post!', 1, '20200304 11:51:36 am', 'cteters');
