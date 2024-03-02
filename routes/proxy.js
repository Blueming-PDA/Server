const express = require("express");
const router = express.Router();
const axios = require('axios');

router.get('/:link', async function (req, res) {
  const { link } = req.params;

  try {
    const response = await axios.get(link);
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching data: ", error);
    res.status(500).send({ error: 'Error fetching data' });
  }
});


module.exports = router;