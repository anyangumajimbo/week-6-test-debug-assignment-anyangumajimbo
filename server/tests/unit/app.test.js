const request = require('supertest');
const app = require('../../src/app');

describe('Express App', () => {
    describe('GET /api/posts', () => {
        it('should return an empty array', async () => {
            const res = await request(app).get('/api/posts');

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('POST /api/posts', () => {
        it('should create a post and return 201', async () => {
            const newPost = {
                title: 'Test Post',
                content: 'Test content'
            };

            const res = await request(app)
                .post('/api/posts')
                .send(newPost);

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('_id');
            expect(res.body.title).toBe(newPost.title);
        });
    });

    describe('GET /api/posts/:id', () => {
        it('should return a post by ID', async () => {
            const res = await request(app).get('/api/posts/test-id');

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id', 'test-id');
        });
    });
}); 