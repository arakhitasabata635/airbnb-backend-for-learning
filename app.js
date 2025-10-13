//external modules
const expess = require('express');

//Local modules
const userRouter = require('./routes/userRouters');
const hostRouter = require('./routes/hostRouter');

//app initialization
const app = expess();
app.use(expess.urlencoded());
app.use(userRouter);
app.use(hostRouter);  


//server setup
const PORT=3000;
app.listen(PORT, ()=>{
  console.log(`server is runing on port http://localhost:${PORT}`);
})