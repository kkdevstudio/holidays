// server/index.js
import https from 'https';
import express from 'express';
import fs from 'fs';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

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

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
