const express = require('express');
const path = require('path');
const { deleteBlogPost } = require('./utils/ashtonUtil');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('utils'));

// API Routes
app.delete('/api/posts/:id', deleteBlogPost);

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'utils', 'ashtonUtil.html'));
});

// Start server only if not in test environment
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;
