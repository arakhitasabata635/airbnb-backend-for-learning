//external modules
const expess = require('express');

//Local modules
const userRouter = require('./routes/userRouters');
const hostRouter = require('./routes/hostRouter');

//app initialization
const app = expess();
app.use(expess.urlencoded());
app.use(userRouter);
app.use("/host",hostRouter);  

app.use((req,res)=>{
  res.status(404).send(`
    <h1>404! page not found</h1>
    <a href="/">back to home</a>
    `);
});


//server setup
const PORT=3000;
app.listen(PORT, ()=>{
  console.log(`server is runing on port http://localhost:${PORT}`);
})