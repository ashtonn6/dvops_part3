const { deleteBlogPost } = require('../utils/ashtonUtil');
const fs = require('fs');
const path = require('path');

// Mock the fs module
jest.mock('fs', () => ({
    promises: {
        readFile: jest.fn(),
        writeFile: jest.fn()
    }
}));

describe('deleteBlogPost - Backend Unit Tests', () => {
    let mockReq;
    let mockRes;

    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();

        // Mock request and response objects
        mockReq = {
            params: {}
        };

        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });

    test('should successfully delete an existing blog post', async () => {
        const mockData = {
            resources: [
                { id: 1, title: 'Post 1', content: 'Content 1', author: 'Author 1' },
                { id: 2, title: 'Post 2', content: 'Content 2', author: 'Author 2' },
                { id: 3, title: 'Post 3', content: 'Content 3', author: 'Author 3' }
            ]
        };

        mockReq.params.id = '2';
        fs.promises.readFile.mockResolvedValueOnce(JSON.stringify(mockData));
        fs.promises.writeFile.mockResolvedValueOnce();

        await deleteBlogPost(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: true,
            message: 'Blog post with ID 2 deleted successfully',
            resources: [
                { id: 1, title: 'Post 1', content: 'Content 1', author: 'Author 1' },
                { id: 3, title: 'Post 3', content: 'Content 3', author: 'Author 3' }
            ]
        });
        expect(fs.promises.writeFile).toHaveBeenCalled();
    });

    test('should return 404 when blog post ID is not found', async () => {
        const mockData = {
            resources: [
                { id: 1, title: 'Post 1', content: 'Content 1', author: 'Author 1' },
                { id: 2, title: 'Post 2', content: 'Content 2', author: 'Author 2' }
            ]
        };

        mockReq.params.id = '999';
        fs.promises.readFile.mockResolvedValueOnce(JSON.stringify(mockData));

        await deleteBlogPost(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: 'Blog post with ID 999 not found'
        });
        expect(fs.promises.writeFile).not.toHaveBeenCalled();
    });

    test('should fall back to template file if resources.json does not exist', async () => {
        const mockTemplateData = {
            resources: [
                { id: 1, title: 'Template Post 1', content: 'Content 1', author: 'Author 1' },
                { id: 2, title: 'Template Post 2', content: 'Content 2', author: 'Author 2' }
            ]
        };

        mockReq.params.id = '1';
        
        // First readFile fails (resources.json doesn't exist)
        fs.promises.readFile
            .mockRejectedValueOnce(new Error('File not found'))
            .mockResolvedValueOnce(JSON.stringify(mockTemplateData));
        
        fs.promises.writeFile.mockResolvedValueOnce();

        await deleteBlogPost(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: true,
            message: 'Blog post with ID 1 deleted successfully',
            resources: [
                { id: 2, title: 'Template Post 2', content: 'Content 2', author: 'Author 2' }
            ]
        });
    });

    test('should handle numeric and string ID formats correctly', async () => {
        const mockData = {
            resources: [
                { id: '1', title: 'Post 1', content: 'Content 1', author: 'Author 1' },
                { id: 2, title: 'Post 2', content: 'Content 2', author: 'Author 2' }
            ]
        };

        mockReq.params.id = '1';
        fs.promises.readFile.mockResolvedValueOnce(JSON.stringify(mockData));
        fs.promises.writeFile.mockResolvedValueOnce();

        await deleteBlogPost(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: true,
            message: 'Blog post with ID 1 deleted successfully',
            resources: [
                { id: 2, title: 'Post 2', content: 'Content 2', author: 'Author 2' }
            ]
        });
    });

    test('should return 500 when file system error occurs', async () => {
        mockReq.params.id = '1';
        
        // Both readFile attempts fail
        fs.promises.readFile
            .mockRejectedValueOnce(new Error('File system error'))
            .mockRejectedValueOnce(new Error('Template file also missing'));

        await deleteBlogPost(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: 'Internal server error while deleting blog post',
            error: 'Template file also missing'
        });
    });
});
