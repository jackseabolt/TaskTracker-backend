const express = require('express');
const morgan = require('morgan'); 
const passport = require('passport');
const app = express(); 
const {PORT} = require('./config'); 
const { router: userRouter } = require('./routers/user-router'); 
const { router: boardRouter } = require('./routers/board-router'); 
const { router: authRouter } = require('./routers/auth-router');
const { localStrategy, jwtStrategy } = require('./strategies/strategies');

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use(morgan('common')); 
app.use('/auth', authRouter);
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