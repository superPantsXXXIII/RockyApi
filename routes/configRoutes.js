const indexRouter = require("./index");
const usersRouter = require("./users");
const RocksRouter = require("./rocks");



exports.routesInit = (app) => {
  app.use("/",indexRouter);
  app.use("/users",usersRouter);
  app.use("/rocks",RocksRouter);

  app.use((req,res)=>{
    res.status(404).send('<div style="flex-direction: column;height:100vh;width:100%;display:flex;align-items: center;justify-content: center;"><h1 style="font-size:2.5em">404 page not found ;-;</h1> </br> <button style="background-color: rgb(185, 122, 87);padding:24px;font-size:1em"><a href="https://ill-pear-angelfish-cap.cyclic.app/" style="text-decoration: none;color: white;">go back to Documentation</a></button></div>')
  })
}