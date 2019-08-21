npm install
sudo pm2 del --silent itviec_30001
sudo pm2 start --silent server.js --name itviec_30001