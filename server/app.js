const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const {MONGOURI} = require('./config/key');
 
mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
mongoose.connection.on('connected',() => {
    console.log('connected to mongo yehh');
})
mongoose.connection.on('error',(err)=>{
    console.log('err connecting',err)
})

require('./models/userModel');
require('./models/postModel');

app.use(express.json());   // for read the json data
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));

if(process.env.NODE_ENV == "production"){
    app.use(express.static('client/build'));
    const path = require('path');
    app.get("*",(req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build','index.html'));
    })
}



app.listen(PORT, () => {
    console.log('server is running on', PORT);
})