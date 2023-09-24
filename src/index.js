const express = require('express');

const { PORT } = require('./serverConfig');


const app = express();


const prepareAndStartServer =() => {
    app.listen(PORT, ()=> {
        console.log(`Server Started at ${PORT}`);
    })
}

prepareAndStartServer();