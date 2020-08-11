import * as geoip from 'geoip-lite';

export const getGeoLocation = async (req, res, next) => {
  const ip =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  const geo = await geoip.lookup(ip);
  req.where = geo;
  console.log(geo);
  next();
};
