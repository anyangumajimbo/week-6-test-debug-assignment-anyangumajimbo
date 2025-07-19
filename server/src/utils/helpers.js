// Server-side utility functions

const generateSlug = (title) => {
    if (!title) return '';
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');
};

const sanitizeInput = (input) => {
    if (typeof input !== 'string') return '';
    return input
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<[^>]*>/g, '')
        .trim();
};

const validateObjectId = (id) => {
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    return objectIdRegex.test(id);
};

const paginateResults = (items, page = 1, limit = 10) => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const totalPages = Math.ceil(items.length / limit);

    return {
        items: items.slice(startIndex, endIndex),
        pagination: {
            currentPage: page,
            totalPages,
            totalItems: items.length,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
        }
    };
};

const createErrorResponse = (message, statusCode = 400) => {
    return {
        error: true,
        message,
        statusCode
    };
};

const createSuccessResponse = (data, message = 'Success') => {
    return {
        success: true,
        data,
        message
    };
};

module.exports = {
    generateSlug,
    sanitizeInput,
    validateObjectId,
    paginateResults,
    createErrorResponse,
    createSuccessResponse
}; 