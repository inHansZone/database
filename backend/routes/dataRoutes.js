// const express = require('express');
// const router = express.Router();
// const { getProducts } = require('../controllers/productController');

// // Route lấy danh sách sản phẩm
// router.get('/', getProducts);

// module.exports = router;
const express = require('express');
const { getDataFromTable, insertDataIntoTable, updateRowInTable, deleteDataFromTable } = require('../controllers/dataController');

const router = express.Router();

// GET: Fetch data from a specific table
router.get('/:tableName', async (req, res) => {
    const { tableName } = req.params;

    try {
        const results = await getDataFromTable(tableName);
        res.json(results);
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).json({ error: `Failed to fetch data: ${err.message}` });
    }
});

// POST: Insert data into a specific table
router.post('/:tableName', async (req, res) => {
    const { tableName } = req.params;
    const data = req.body; // Data should be sent as JSON

    try {
        const message = await insertDataIntoTable(tableName, data);
        res.status(201).json({ message });
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).json({ error: `Failed to insert data: ${err.message}` });
    }
});

// PUT: Update a specific row in the table by ID
router.put('/:tableName/:id', async (req, res) => {
    const { tableName, id } = req.params;
    const updatedData = req.body; // The updated data should be sent in the request body

    try {
        const message = await updateRowInTable(tableName, id, updatedData);
        res.status(200).json({ message });
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).json({ error: `Failed to update row: ${err.message}` });
    }
});

// Delete route to remove a specific row from a table
router.delete('/:tableName/:id', async (req, res) => {
    const { tableName, id } = req.params;

    try {
        const message = await deleteDataFromTable(tableName, id);
        res.status(200).json({ message });
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).json({ error: `Failed to delete data: ${err.message}` });
    }
});

module.exports = router;
