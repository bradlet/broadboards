-- SCHEMA: BroadBoards

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "user_name" varchar(20) UNIQUE NOT NULL,
  "first" varchar(25),
  "last" varchar(25),
  "joined" timestamp,
  "email" varchar(64),
  "password" varchar(50)
);

--CREATE TABLE "group" (
--  "id" SERIAL PRIMARY KEY,
--  "name" varchar(10) UNIQUE NOT NULL,
--  "created" timestamp
--);

CREATE TABLE "thread" (
  "id" SERIAL PRIMARY KEY,
  "subject" varchar(250),
  "content" varchar,
  "created" timestamp,
  "user_id" int
--  "group_id" int
);

CREATE TABLE "post" (
  "id" SERIAL PRIMARY KEY,
  "response" varchar,
  "created" timestamp,
  "thread_id" int,
  "user_id" int
);


ALTER TABLE "thread"
	ADD FOREIGN KEY ("user_id")
	REFERENCES "user" ("id");
--ALTER TABLE "thread"
--	ADD FOREIGN KEY ("group_id")
--	REFERENCES "group" ("id");
ALTER TABLE "post"
	ADD FOREIGN KEY ("thread_id")
	REFERENCES "thread" ("id");
ALTER TABLE "post"
	ADD FOREIGN KEY ("user_id")
	REFERENCES "user" ("id");
--ALTER TABLE "group"
--	ADD FOREIGN KEY ("id")
--	REFERENCES "users" ("id");

-- INSERT: Test cases for the dbms

INSERT INTO "user"(
	user_name, first, last, joined, email)
	VALUES  ('cteters', 'Christopher', 'Teters', '20200304 11:16:36 am',  'ccteterss@gmail.com'),
		('jsmith', 'John', 'Smith', '20200304 11:17:36 am',  'jsmith@gmail.com'),
   		('bgates', 'Bill', 'Gates', '20200304 11:18:36 am',  'bgates@live.com'),
		('dudeGuy', 'Dude', 'Guy', '20200304 11:19:36 am', 'dudeguy@gmail.com');

INSERT INTO "thread"(
	subject, content, created, user_id)
	VALUES	('Welcome to BroadBoards!', 'BroadBoards is a project brought together by three undergraduate students from Portland State University. We took interest in the idea of building a forum-thread based website from the ground up for various reasons and hope to deliver a format that is refreshing compared to the traditional stack frames that are often associated with these sorts of things.', '20200304 11:20:35 am', 1),
		('Test thread one', 'This is a test thread', '20200304 11:21:36 am', 1),
		('Test thread two', 'This is a test thread', '20200304 11:22:36 am', 1),
		('Test thread three', 'This is a test thread', '20200304 11:23:36 am', 1),
		('Test thread four', 'This is a test thread', '20200304 11:24:36 am', 1),
		('Test thread five', 'This is a test thread', '20200304 11:25:36 am', 1),
		('Test thread six', 'This is a test thread', '20200304 11:26:36 am', 1),
		('Test thread seven', 'This is a test thread', '20200304 11:27:36 am', 1),
		('Test thread eight', 'This is a test thread', '20200304 11:28:36 am', 1),
		('Test thread nine', 'This is a test thread', '20200304 11:29:36 am', 1),
		('Test thread ten', 'This is a test thread', '20200304 11:30:36 am', 1),
		('Test thread eleven', 'This is a test thread', '20200304 11:31:36 am', 1),
		('Test thread twelve', 'This is a test thread', '20200304 11:32:36 am', 1),
		('Test thread thriteen', 'This is a test thread', '20200304 11:33:36 am', 1),
		('Test thread fourteen', 'This is a test thread', '20200304 11:34:36 am', 1),
		('Test thread fifteen', 'This is a test thread', '20200304 11:35:36 am', 1),
		('Test thread sixteen', 'This is a test thread', '20200304 11:36:36 am', 1),
		('Test thread seventeen', 'This is a test thread', '20200304 11:37:36 am', 1),
		('Test thread eightteen', 'This is a test thread', '20200304 11:38:36 am', 1),
		('Test thread nineteen', 'This is a test thread', '20200304 11:39:36 am', 1),
		('Test thread twenty', 'This is a test thread', '20200304 11:35:40 am', 1),
		('Test thread twentyone', 'This is a test thread', '20200304 11:41:36 am', 1),
		('Test thread twentytwo', 'This is a test thread', '20200304 11:42:36 am', 1);

INSERT INTO "post"(
	response, thread_id, created, user_id)
	VALUES ('First post!', 1, '20200304 11:51:36 am', 1);
