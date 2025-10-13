const expess = require("express");
const hostRouter = expess.Router();

hostRouter.get("/host/add-home", (req, res) => {
  res.send(`
    <h1>add your home</h1>
    <form action="/host/add-home" method="POST"> 
      <input type="text" name="name" placeholder="name" />
      <input type="submit" />
    </form>
    `);
});
hostRouter.post("/host/add-home", (req, res) => {
  console.log(req.body);
  res.send(`
    <h1>your home is added successfully</h1>
    <a href="/">back to home</a>
    `);
});

module.exports = hostRouter;
