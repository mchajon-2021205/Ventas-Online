'use strcit'

require('dotenv').config()
const mongoCofig = require('./configs/mongo');
const app = require('./configs/app');
const categoryDef = require('./src/category/category.controller')

mongoCofig.connect();
app.initServer();
categoryDef.defautl();