# broadboards
A forum-based social media solution to echo chambers and other social media-based problems.

### License
This project is licensed under the MIT License. For more information, please refer to LICENSE.

Copyright (c) 2020 Bradley Thompson, Chris Teters and Suliman Alsarraf

### Tech Stack
- HMTL5
- CSS3, Bootstrap
- ReactJS
- NodeJS, ExpressJS
- PostgreSQL

### Deployment Instructions
1. Git clone the repository onto whatever box you'll be deploying to.
2. Run 'npm install' on both the outer (server) and inner (client) directories.
3. In the inner directory, run 'npm run build'.
4. In the outer directory run 'npm start'.

- If you want to launch the app as a service, you can use "npm forever", a module
that trivializes daemonizing apps.
	- Command: 'forever start -c "npm start" ./'

- To deploy with a non-default secret for the login session, use the SECRET env. variable.
