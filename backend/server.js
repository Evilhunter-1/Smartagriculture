const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/crops', require('./routes/crops'));
app.use('/api/soil', require('./routes/soil'));
app.use('/api/irrigation', require('./routes/irrigation'));
app.use('/api/weather', require('./routes/weather'));
app.use('/api/equipment', require('./routes/equipment'));
app.use('/api/fertilizer', require('./routes/fertilizer'));
app.use('/api/yield', require('./routes/yield'));
app.use('/api/recommendations', require('./routes/recommendations'));
app.use('/api/suppliers', require('./routes/suppliers'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));