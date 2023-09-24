const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

// const UserService = require('./services/user-service');

const app = express();


const prepareAndStartServer =() => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', apiRoutes);

    app.listen(PORT, ()=> {
        console.log(`Server Started at ${PORT}`);


    //For creating and verifying the token 
        // const service = new UserService();
        // const newToken = service.createToken({email:"abh@gmai.com", id:1});
        // console.log( "new token is", newToken );
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaEBnbWFpLmNvbSIsImlkIjoxLCJpYXQiOjE2OTU1NTgyMzgsImV4cCI6MTY5NTU2MTgzOH0.XQIiWUhNpyNS9MDF9fwyT5AjKifGIn82w_giJwKiui4';
        // const response = service.verifyToken( token );
        // console.log(response);

    });
}

prepareAndStartServer();