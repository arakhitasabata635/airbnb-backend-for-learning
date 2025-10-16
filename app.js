//core modules
const path = require('path');
//external modules
const express = require('express');

//Local modules
const userRouter = require('./routes/userRouters');
const {hostRouter} = require('./routes/hostRouter');
const rootDir = require('./utils/pathUtil');

//app initialization
const app = express();
app.set('view engine', 'ejs');
app.set ('views', path.join(rootDir, 'views'));
app.use(express.static(path.join(rootDir, 'public')));
app.use(express.urlencoded());
app.use(userRouter);
app.use("/host",hostRouter);  

app.use((req,res)=>{
  res.status(404).render('404.ejs', { pageTitle: 'Page Not Found' });
});


//server setup
const PORT=3000;
app.listen(PORT, ()=>{
  console.log(`server is runing on port http://localhost:${PORT}`);
})