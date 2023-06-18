import fs from 'fs';
import dotenv from 'dotenv';
import https from 'https';
import express from 'express';
import connectMongo from './data/db/mongoDB_connection.js';
import routers from './routes/router.js';

dotenv.config();

const app = express();
connectMongo();

app.use(express.json());
app.use('/', routers);

https
  .get('https://date.nager.at/api/v3/AvailableCountries', (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      // write json data to file
      fs.writeFileSync(
        './data/available_country_data.json',
        JSON.stringify(data)
      );
    });
  })
  .on('error', (error) => {
    console.log(error);
  });

// read json data to file
let data = fs.readFileSync('./data/available_country_data.json');
data = JSON.parse(data);
console.log(data);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}`);
});
