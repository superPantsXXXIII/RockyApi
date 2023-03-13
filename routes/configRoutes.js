const indexRouter = require("./index");
const usersRouter = require("./users");
const RocksRouter = require("./rocks");



exports.routesInit = (app) => {
  app.use("/",indexRouter);
  app.use("/users",usersRouter);
  app.use("/rocks",RocksRouter);

  app.use((req,res)=>{
    res.status(404).send('<h1>404 page not found ;-;</h1>')
  })
}