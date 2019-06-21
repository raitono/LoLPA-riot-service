import app from './app';
import { AddressInfo } from 'net';
import axios from 'axios';
const debug: any = require('debug')('summoner-service:server');

const server = app.listen(0);
const port = (<AddressInfo>server.address()).port;

const register = () => {
  debug('registering...');

  // tslint:disable-next-line: max-line-length
  axios.put(`${process.env.REGISTRY_URL}:${process.env.REGISTRY_PORT}/service/register/${process.env.SERVICE_NAME}/${process.env.SERVICE_VERSION}/${port}`)
    .then((res) => {
      debug(res.data);
      debug('registed!');
    });
};

register();

const interval = setInterval(register, Number(process.env.REGISTER_INTERVAL) * 1000);

debug(`Service listening on port ${port}...`);

export default server;
