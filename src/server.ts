import app from './app';
import { AddressInfo } from 'net';
import axios from 'axios';
const debug: any = require('debug')('riot-service:server');

const server = app.listen(0);
const port = (<AddressInfo>server.address()).port;

const register = async () => {
  await axios.put(`${process.env.REGISTRY_URL}:${process.env.REGISTRY_PORT}`
  + `/service/register/${process.env.SERVICE_NAME}/${process.env.npm_package_version}/${port}`);
};

const unregister = async () => {
  await axios.delete(`${process.env.REGISTRY_URL}:${process.env.REGISTRY_PORT}`
  + `/service/register/${process.env.SERVICE_NAME}/${process.env.npm_package_version}/${port}`);
};

const interval = setInterval(register, Number(process.env.REGISTER_INTERVAL) * 1000);

const cleanup = async () => {
  clearInterval(interval);
  await unregister();
};

process.on('uncaughtException', async () => {
  await cleanup();
  process.exit(0);
}).on('SIGINT', async () => {
  await cleanup();
  process.exit(0);
}).on('SIGTERM', async () => {
  await cleanup();
  process.exit(0);
});

register();
debug(`Service listening on port ${port}...`);

export default server;
