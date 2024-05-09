import express from "express";
import config from "config";
import connect from "./utils/connect";
import log from "./utils/logger";
import routes from "./routes";

const app = express();
app.use(express.json());
const port = config.get<number>("port");
app.listen(port, () => {
  log.info(`app is running http://localhost:${port}`);
  connect();
  routes(app);
});




