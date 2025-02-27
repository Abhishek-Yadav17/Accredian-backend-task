const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const referralRoutes = require('./routes/referralRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', referralRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server running on http://localhost:5000');
});
