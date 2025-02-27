const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const referralRoutes = require('./routes/referralRoutes');

dotenv.config();

const app = express();
const allowedOrigins = ['https://accredian-frontend-task-7q3g.vercel.app'];
app.use(cors({
  origin: function(origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());

app.use('/api', referralRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server running on http://localhost:5000');
});
