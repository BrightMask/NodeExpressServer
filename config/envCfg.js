const devConfig = {
  dbHost: 'localhost',
  dbUser: 'root',
  dbPassword: 'XU159357xly_'
};

const prodConfig = {
  dbHost: 'xxxxx',
  dbUser: 'xxxxx',
  dbPassword: 'xxxx'
};

if(process.env.NODE_ENV == 'prod') {
  module.exports = prodConfig;
}
else {
  module.exports = devConfig;
}