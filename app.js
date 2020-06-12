const express = require('express');
const checkListRouter = require('./src/routes/checklist'); 
const rootRouter = require('./src/routes/index'); 
require('./config/database');
const path = require('path');


const app = express();
app.use(express.json());

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use('/', rootRouter);
app.use('/checklists', checkListRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log('Servidor Iniciado')
})