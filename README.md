## Overview
A to-do list web application for everyone to create their own customized schedule. Users can decide the priority level as well as the due date of the task. Besides typing in the task description, the web can recognize human voices with great precision thanks to speech recognition functionality, which allows the users to generate tasks at a quicker rate.
Once the user logs in the page, the app displays all upcoming tasks as a friendly reminder to the user. Moreover, the app is integrated with interactive calendar, allowing users to see how much time they have left before tasks’ due date 

## Demo
![Demo Ing](/public/demo.png)
[Watch the video](https://youtu.be/f0_ENt83vZs)


## Installing
The following packages will be required to run the app: pg, cors, body-parser, express, bcrypt, jwt-simple, react, react-calendar, react-bootstrap, react-dark-theme, rsuite
```shell
npm install 
```

**POSTGRES**
In the app folder, have a file named 'env.json' that contains:
{
"user": "your-psql-username",
"host": "localhost",
"database": "final_proj",
"password": "your-psql-password"
}

1. In the command line, log into your account and create a database named "final_proj".
2. Create a table named "users" that has 2 columns: 
username CHAR(20)
hashed_password VARCHAR(60)



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm run dev`

The app will run the command 'run-p start server' which will run the following commands: 'nodemon --exec node server.js' and 'react-scripts start'. These commands will initiate the app and the server. Any changes made to the server or the app will cause a rerender of the whole page. 


