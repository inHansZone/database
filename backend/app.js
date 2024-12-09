// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // Routes
// // const accountRoutes = require('./routes/accountRoutes');
// // app.use('/api/accounts', accountRoutes);

// const productRoutes = require('./routes/productRoutes');
// app.use('/api/products', productRoutes);


// // Start server
// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server chạy tại http://localhost:${PORT}`));
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dataRoutes = require('./routes/dataRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// Routes
app.use('/api/data', dataRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
