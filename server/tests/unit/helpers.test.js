const {
    generateSlug,
    sanitizeInput,
    validateObjectId,
    paginateResults,
    createErrorResponse,
    createSuccessResponse
} = require('../../src/utils/helpers');

describe('Server Utility Functions', () => {
    describe('generateSlug', () => {
        it('should generate valid slugs from titles', () => {
            expect(generateSlug('Hello World')).toBe('hello-world');
            expect(generateSlug('My Awesome Post!')).toBe('my-awesome-post');
            expect(generateSlug('Multiple   Spaces')).toBe('multiple-spaces');
            expect(generateSlug('Special@#$%Characters')).toBe('specialcharacters');
        });

        it('should handle edge cases', () => {
            expect(generateSlug('')).toBe('');
            expect(generateSlug(null)).toBe('');
            expect(generateSlug(undefined)).toBe('');
            expect(generateSlug('   ')).toBe('');
        });
    });

    describe('sanitizeInput', () => {
        it('should remove HTML tags and scripts', () => {
            expect(sanitizeInput('<p>Hello World</p>')).toBe('Hello World');
            expect(sanitizeInput('<script>alert("xss")</script>Hello')).toBe('Hello');
            expect(sanitizeInput('<div>Content</div>')).toBe('Content');
        });

        it('should handle non-string inputs', () => {
            expect(sanitizeInput(123)).toBe('');
            expect(sanitizeInput(null)).toBe('');
            expect(sanitizeInput(undefined)).toBe('');
            expect(sanitizeInput({})).toBe('');
        });

        it('should trim whitespace', () => {
            expect(sanitizeInput('  Hello World  ')).toBe('Hello World');
        });
    });

    describe('validateObjectId', () => {
        it('should validate correct MongoDB ObjectIds', () => {
            expect(validateObjectId('507f1f77bcf86cd799439011')).toBe(true);
            expect(validateObjectId('507f1f77bcf86cd799439012')).toBe(true);
        });

        it('should reject invalid ObjectIds', () => {
            expect(validateObjectId('invalid-id')).toBe(false);
            expect(validateObjectId('507f1f77bcf86cd79943901')).toBe(false); // too short
            expect(validateObjectId('507f1f77bcf86cd7994390111')).toBe(false); // too long
            expect(validateObjectId('')).toBe(false);
            expect(validateObjectId(null)).toBe(false);
        });
    });

    describe('paginateResults', () => {
        const testItems = Array.from({ length: 25 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));

        it('should paginate results correctly', () => {
            const result = paginateResults(testItems, 1, 10);

            expect(result.items).toHaveLength(10);
            expect(result.pagination.currentPage).toBe(1);
            expect(result.pagination.totalPages).toBe(3);
            expect(result.pagination.totalItems).toBe(25);
            expect(result.pagination.hasNextPage).toBe(true);
            expect(result.pagination.hasPrevPage).toBe(false);
        });

        it('should handle last page', () => {
            const result = paginateResults(testItems, 3, 10);

            expect(result.items).toHaveLength(5);
            expect(result.pagination.currentPage).toBe(3);
            expect(result.pagination.hasNextPage).toBe(false);
            expect(result.pagination.hasPrevPage).toBe(true);
        });

        it('should handle empty array', () => {
            const result = paginateResults([], 1, 10);

            expect(result.items).toHaveLength(0);
            expect(result.pagination.totalPages).toBe(0);
            expect(result.pagination.totalItems).toBe(0);
        });
    });

    describe('createErrorResponse', () => {
        it('should create error response with default status code', () => {
            const response = createErrorResponse('Something went wrong');

            expect(response.error).toBe(true);
            expect(response.message).toBe('Something went wrong');
            expect(response.statusCode).toBe(400);
        });

        it('should create error response with custom status code', () => {
            const response = createErrorResponse('Not found', 404);

            expect(response.error).toBe(true);
            expect(response.message).toBe('Not found');
            expect(response.statusCode).toBe(404);
        });
    });

    describe('createSuccessResponse', () => {
        it('should create success response with default message', () => {
            const data = { id: 1, name: 'Test' };
            const response = createSuccessResponse(data);

            expect(response.success).toBe(true);
            expect(response.data).toEqual(data);
            expect(response.message).toBe('Success');
        });

        it('should create success response with custom message', () => {
            const data = { id: 1, name: 'Test' };
            const response = createSuccessResponse(data, 'Created successfully');

            expect(response.success).toBe(true);
            expect(response.data).toEqual(data);
            expect(response.message).toBe('Created successfully');
        });
    });
}); 