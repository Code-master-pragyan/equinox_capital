require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const mongoSanitize = require('express-mongo-sanitize');

const connectDB = require('./config/db');
const holdingsRoutes = require("./routes/holdingsRoutes");
const positionsRoutes = require("./routes/positionsRoutes");
const ordersRoutes = require("./routes/ordersRoutes");
const authRoutes = require('./routes/authRoutes');
const stockRoutes = require("./routes/stockRoutes");

const PORT = process.env.PORT || 3002;
const MONGODB_URL = process.env.MONGODB_URL;

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174','https://equinox-capital.onrender.com','https://equinox-dashboard.onrender.com'],
  credentials: true, // Allow cookies and authorization headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());

// Passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);

// Connect MongoDB
connectDB();

app.get('/', (req, res) => {
  res.send('Hello hello');
})

// API routes

app.use("/holdings", holdingsRoutes);
app.use("/positions", positionsRoutes);
app.use("/neworders", ordersRoutes);
app.use('/auth', authRoutes);
app.use("/api/stocks", stockRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})