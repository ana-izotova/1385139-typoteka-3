'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const {HttpCode, API_PREFIX} = require(`../../const`);
const routes = require(`../api`);

const DEFAULT_PORT = 3000;

const app = express();

app.use(express.json());

app.use(API_PREFIX, routes);

app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not found`));

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = parseInt(customPort, 10) || DEFAULT_PORT;

    app.listen(port, (err) => {
      if (err) {
        return console.error(chalk.bgRed.black(`Ошибка при создании сервера:`, err));
      }

      return console.info(chalk.bgGreen.black(`Сервер ожидает соединений на порту ${port}`));
    });
  }
};
