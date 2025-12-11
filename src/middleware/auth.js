const { rapidapiKey } = require('../config');

module.exports = function requireRapidApiKey(req, res, next) {
  const headerKey = req.header('x-rapidapi-key') || req.header('x-api-key');
  if (!headerKey) return res.status(401).json({ error: 'Missing x-rapidapi-key header' });
  if (!rapidapiKey) return res.status(500).json({ error: 'Server not configured with RAPIDAPI_KEY' });
  if (headerKey !== rapidapiKey) return res.status(403).json({ error: 'Invalid API key' });
  next();
};