const express = require('express');
const router = express.Router();
const pool = require('./db'); // Assuming db.js exports the pool



function validateUser(data) {    return data.name && data.email && data.age;
}

router.get("/users", async (req, res) => {
    try {
        const users = await pool.query('SELECT * FROM users');
        res.status(200).json(users.rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get("/users/:id", async (req, res) => {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }
    try {
        const user = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
        if (user.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user.rows[0]);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post("/users", async (req, res) => {
    const newUser = req.body;
    if (!validateUser(newUser)) {
        return res.status(400).json({ message: 'Invalid user data' });
    }
    try {
      const existingUser = await pool.query(
            'SELECT * FROM users WHERE name = $1',
            [newUser.name]
        );
        if (existingUser.rows.length > 0) {
            return res.status(409).json({ message: 'User with this Name already exists' });
        }
        const result = await pool.query(
            'INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *',
            [newUser.name, newUser.email, newUser.age]
        );
        res.status(201).json({ message: 'User Added successfully', user: result.rows[0] });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.put("/users/:id", async (req, res) => {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }
    const updatedUser = req.body;
    if (!validateUser(updatedUser)) {
        return res.status(400).json({ message: 'Invalid user data' });
    }
    try {
        const result = await pool.query(
            'UPDATE users SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING *',
            [updatedUser.name, updatedUser.email, updatedUser.age, userId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user: result.rows[0] });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.delete("/users/:id", async (req, res) => {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }
    try {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', user: result.rows[0] });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})









module.exports = router;

