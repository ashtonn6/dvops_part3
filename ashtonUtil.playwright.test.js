const { test, expect } = require('@playwright/test');
const path = require('path');

const HTML_FILE_PATH = `file://${path.join(__dirname, '..', 'utils', 'ashtonUtil.html')}`;

test.describe('Blog Post Deletion - Frontend E2E Tests', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto(HTML_FILE_PATH);
    });

    test('should load the page with correct title', async ({ page }) => {
        await expect(page).toHaveTitle('Blog Post Management');
        
        const heading = page.locator('h1');
        await expect(heading).toContainText('Blog Post Manager');
    });

    test('should display all blog posts on initial load', async ({ page }) => {
        const postCards = page.locator('.post-card');
        await expect(postCards).toHaveCount(3);
        
        const postCount = page.locator('#postCount');
        await expect(postCount).toHaveText('3');
    });

    test('should display correct post information', async ({ page }) => {
        const firstPost = page.locator('.post-card').first();
        
        await expect(firstPost.locator('.post-title')).toContainText('Getting Started with Node.js');
        await expect(firstPost.locator('.post-id')).toContainText('ID: 1');
        await expect(firstPost.locator('.post-author')).toContainText('John Doe');
    });

    test('should show delete button for each post', async ({ page }) => {
        const deleteButtons = page.locator('.delete-btn');
        await expect(deleteButtons).toHaveCount(3);
        
        const firstDeleteBtn = deleteButtons.first();
        await expect(firstDeleteBtn).toContainText('Delete Post');
    });

    test('should delete a post when delete button is clicked and confirmed', async ({ page }) => {
        // Setup dialog handler to accept confirmation
        page.on('dialog', dialog => dialog.accept());
        
        // Click delete button on first post
        await page.locator('.delete-btn').first().click();
        
        // Wait for animation and re-render
        await page.waitForTimeout(500);
        
        // Check that post count decreased
        const postCards = page.locator('.post-card');
        await expect(postCards).toHaveCount(2);
        
        const postCount = page.locator('#postCount');
        await expect(postCount).toHaveText('2');
    });

    test('should not delete post when deletion is cancelled', async ({ page }) => {
        // Setup dialog handler to dismiss confirmation
        page.on('dialog', dialog => dialog.dismiss());
        
        // Click delete button
        await page.locator('.delete-btn').first().click();
        
        // Wait a bit
        await page.waitForTimeout(300);
        
        // Check that post count is unchanged
        const postCards = page.locator('.post-card');
        await expect(postCards).toHaveCount(3);
    });

    test('should show empty state when all posts are deleted', async ({ page }) => {
        // Setup dialog handler to accept all confirmations
        page.on('dialog', dialog => dialog.accept());
        
        // Delete all posts
        for (let i = 0; i < 3; i++) {
            await page.locator('.delete-btn').first().click();
            await page.waitForTimeout(400);
        }
        
        // Check for empty state
        const emptyState = page.locator('.empty-state');
        await expect(emptyState).toBeVisible();
        await expect(emptyState.locator('h2')).toContainText('No Posts Found');
        
        const postCount = page.locator('#postCount');
        await expect(postCount).toHaveText('0');
    });

    test('should delete specific post by ID', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept());
        
        // Delete the second post (ID: 2)
        await page.locator('.post-card').nth(1).locator('.delete-btn').click();
        await page.waitForTimeout(500);
        
        // Verify remaining posts
        const postCards = page.locator('.post-card');
        await expect(postCards).toHaveCount(2);
        
        // Verify the deleted post is gone by checking IDs
        const firstPostId = await postCards.first().locator('.post-id').textContent();
        const secondPostId = await postCards.nth(1).locator('.post-id').textContent();
        
        expect(firstPostId).toContain('ID: 1');
        expect(secondPostId).toContain('ID: 3');
    });

    test('should update post count correctly after multiple deletions', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept());
        
        const postCount = page.locator('#postCount');
        
        // Initial count
        await expect(postCount).toHaveText('3');
        
        // Delete first post
        await page.locator('.delete-btn').first().click();
        await page.waitForTimeout(400);
        await expect(postCount).toHaveText('2');
        
        // Delete another post
        await page.locator('.delete-btn').first().click();
        await page.waitForTimeout(400);
        await expect(postCount).toHaveText('1');
    });
});
