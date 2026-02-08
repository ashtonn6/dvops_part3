// Simple test file for blog-post-app
// This is a basic example - expand as needed

const request = require('supertest');
const app = require('./server');

describe('Blog Post App API Tests', () => {
    
    test('GET / should return HTML with success message', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('Blog Post Application');
    });
    
    test('GET /health should return health status', async () => {
        const response = await request(app).get('/health');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('status', 'healthy');
        expect(response.body).toHaveProperty('timestamp');
    });
    
    test('GET /api/posts should return posts array', async () => {
        const response = await request(app).get('/api/posts');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('posts');
        expect(Array.isArray(response.body.posts)).toBe(true);
        expect(response.body.posts.length).toBeGreaterThan(0);
    });
    
    test('API posts should have correct structure', async () => {
        const response = await request(app).get('/api/posts');
        const firstPost = response.body.posts[0];
        expect(firstPost).toHaveProperty('id');
        expect(firstPost).toHaveProperty('title');
        expect(firstPost).toHaveProperty('content');
        expect(firstPost).toHaveProperty('author');
    });
});
