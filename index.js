const express = require('express')

const path = require ('path')

const members = require('./members')

const logger = require('./middleware/Logger')

const exphbs = require('express-handlebars')

const app = express();

//Handlebars Middleware
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars');

//Body 
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//init middleware
app.use('/api/members',require('./routes/api/members'));



//Homepage Route
app.get('/',(req,res)=>res.render('index',{
    title:'Members app',
    members
}));

const port = process.env.port || 5000

app.listen(port,()=>console.log(`server started on port ${port}`));