const express = require('express');
const morgan = require('morgan'); 
const app = express(); 
const {PORT} = require('./config'); 
const { router: userRouter } = require('./routers/user-router'); 
const { router: boardRouter } = require('./routers/board-router'); 

app.use(morgan('common')); 

app.use('/users', userRouter); 
app.use('/board', boardRouter); 


app.get('/', (req, res) => {
    res.json({message: "hey"})
});

app.get('*', (req, res) => {
    res.status(404).json({ message: 'Not Found'})
})

function runServer(port=PORT) {
    app.listen(port, () => {
        console.log(`App is listening on ${port}`)
    });
}

if(require.main === module) {
    runServer(); 
}