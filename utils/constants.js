exports.devPort = 3000;
exports.devDBLink = 'mongodb://127.0.0.1:27017/bitfilmsdb';
exports.apiLink = 'https://kinopoiskapiunofficial.tech/api/';
// exports.apiKey = process.env.API_KEY;
exports.apiConfig = {
  headers: { 'X-API-KEY': process.env.API_KEY },
};
