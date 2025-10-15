//core modules
const path = require('path');
//external modules
const expess = require('express');

//Local modules
const userRouter = require('./routes/userRouters');
const hostRouter = require('./routes/hostRouter');
const rootDir = require('./utils/pathUtil');

//app initialization
const app = expess();
app.use(expess.static(path.join(rootDir, 'public')));
app.use(expess.urlencoded());
app.use(userRouter);
app.use("/host",hostRouter);  

app.use((req,res)=>{
  res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});


//server setup
const PORT=3000;
app.listen(PORT, ()=>{
  console.log(`server is runing on port http://localhost:${PORT}`);
})