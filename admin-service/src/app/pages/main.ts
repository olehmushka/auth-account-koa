export const mainPage = (_req, res, _next) => {
  res.render('main', { city: 'city', country: 'country' });
};
