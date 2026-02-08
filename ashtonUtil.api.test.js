const request = require('supertest');
const express = require('express');
const { deleteBlogPost } = require('../utils/ashtonUtil');
const fs = require('fs').promises;

// Mock the fs module
jest.mock('fs', () => ({
    promises: {
        readFile: jest.fn(),
        writeFile: jest.fn()
    }
}));

// Create Express app for testing
const app = express();
app.use(express.json());
app.delete('/api/posts/:id', deleteBlogPost);

describe('DELETE /api/posts/:id - API Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should return 200 and delete post successfully', async () => {
        const mockData = {
            resources: [
                { id: 1, title: 'Post 1', content: 'Content 1', author: 'Author 1' },
                { id: 2, title: 'Post 2', content: 'Content 2', author: 'Author 2' }
            ]
        };

        fs.promises.readFile.mockResolvedValueOnce(JSON.stringify(mockData));
        fs.promises.writeFile.mockResolvedValueOnce();

        const response = await request(app)
            .delete('/api/posts/1')
            .expect(200)
            .expect('Content-Type', /json/);

        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Blog post with ID 1 deleted successfully');
        expect(response.body.resources).toHaveLength(1);
        expect(response.body.resources[0].id).toBe(2);
    });

    test('should return 404 when post not found', async () => {
        const mockData = {
            resources: [
                { id: 1, title: 'Post 1', content: 'Content 1', author: 'Author 1' }
            ]
        };

        fs.promises.readFile.mockResolvedValueOnce(JSON.stringify(mockData));

        const response = await request(app)
            .delete('/api/posts/999')
            .expect(404)
            .expect('Content-Type', /json/);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Blog post with ID 999 not found');
    });

    test('should return 500 on server error', async () => {
        fs.promises.readFile
            .mockRejectedValueOnce(new Error('File system error'))
            .mockRejectedValueOnce(new Error('Template error'));

        const response = await request(app)
            .delete('/api/posts/1')
            .expect(500)
            .expect('Content-Type', /json/);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Internal server error while deleting blog post');
    });

    test('should handle string and numeric IDs correctly', async () => {
        const mockData = {
            resources: [
                { id: '1', title: 'Post 1', content: 'Content 1', author: 'Author 1' },
                { id: 2, title: 'Post 2', content: 'Content 2', author: 'Author 2' }
            ]
        };

        fs.promises.readFile.mockResolvedValueOnce(JSON.stringify(mockData));
        fs.promises.writeFile.mockResolvedValueOnce();

        const response = await request(app)
            .delete('/api/posts/2')
            .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.resources).toHaveLength(1);
        expect(response.body.resources[0].id).toBe('1');
    });
});
