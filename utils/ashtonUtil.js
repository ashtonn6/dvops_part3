const fs = require('fs');
const path = require('path');

const RESOURCES_FILE = path.join(__dirname, 'resources.json');
const TEMPLATE_FILE = path.join(__dirname, 'resources.template.json');

/**
 * Deletes a blog post by ID
 * @param {Object} req - Express request object with params.id
 * @param {Object} res - Express response object
 */
async function deleteBlogPost(req, res) {
    try {
        const postId = req.params.id;
        
        // Try to read from main resources file, fall back to template
        let data;
        try {
            const fileContent = await fs.readFile(RESOURCES_FILE, 'utf-8');
            data = JSON.parse(fileContent);
        } catch (error) {
            // If resources.json doesn't exist, use template
            const templateContent = await fs.readFile(TEMPLATE_FILE, 'utf-8');
            data = JSON.parse(templateContent);
        }

        // Convert postId to number for comparison (handle both string and number)
        const targetId = parseInt(postId, 10);
        
        // Find the index of the post to delete
        const initialLength = data.resources.length;
        const filteredResources = data.resources.filter(post => {
            const currentId = typeof post.id === 'string' ? parseInt(post.id, 10) : post.id;
            return currentId !== targetId;
        });

        // Check if any post was deleted
        if (filteredResources.length === initialLength) {
            return res.status(404).json({
                success: false,
                message: `Blog post with ID ${postId} not found`
            });
        }

        // Update the data
        data.resources = filteredResources;

        // Write back to file
        await fs.writeFile(RESOURCES_FILE, JSON.stringify(data, null, 2));

        // Return success response
        return res.status(200).json({
            success: true,
            message: `Blog post with ID ${postId} deleted successfully`,
            resources: data.resources
        });

    } catch (error) {
        console.error('Error deleting blog post:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error while deleting blog post',
            error: error.message
        });
    }
}

module.exports = {
    deleteBlogPost
};
