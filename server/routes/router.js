import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await fetch(
      'https://date.nager.at/api/v3/AvailableCountries'
    );
    const json = await result.json();
    res.status(200).send(json);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

export default router;
