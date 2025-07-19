import {
    validateEmail,
    validatePassword,
    validateUsername,
    formatDate,
    truncateText
} from '../../utils/validation';

describe('Validation Utilities', () => {
    describe('validateEmail', () => {
        it('should return true for valid email addresses', () => {
            expect(validateEmail('test@example.com')).toBe(true);
            expect(validateEmail('user.name@domain.co.uk')).toBe(true);
            expect(validateEmail('user+tag@example.org')).toBe(true);
        });

        it('should return false for invalid email addresses', () => {
            expect(validateEmail('invalid-email')).toBe(false);
            expect(validateEmail('test@')).toBe(false);
            expect(validateEmail('@example.com')).toBe(false);
            expect(validateEmail('')).toBe(false);
            expect(validateEmail(null)).toBe(false);
            expect(validateEmail(undefined)).toBe(false);
        });
    });

    describe('validatePassword', () => {
        it('should return true for valid passwords', () => {
            expect(validatePassword('Password123')).toBe(true);
            expect(validatePassword('MySecurePass1')).toBe(true);
            expect(validatePassword('Complex@Pass1')).toBe(true);
        });

        it('should return false for invalid passwords', () => {
            expect(validatePassword('password')).toBe(false); // no uppercase, no number
            expect(validatePassword('PASSWORD')).toBe(false); // no lowercase, no number
            expect(validatePassword('Password')).toBe(false); // no number
            expect(validatePassword('pass1')).toBe(false); // too short, no uppercase
            expect(validatePassword('')).toBe(false);
        });
    });

    describe('validateUsername', () => {
        it('should return true for valid usernames', () => {
            expect(validateUsername('john_doe')).toBe(true);
            expect(validateUsername('user123')).toBe(true);
            expect(validateUsername('test_user_123')).toBe(true);
            expect(validateUsername('abc')).toBe(true); // minimum length
            expect(validateUsername('a'.repeat(20))).toBe(true); // maximum length
        });

        it('should return false for invalid usernames', () => {
            expect(validateUsername('ab')).toBe(false); // too short
            expect(validateUsername('a'.repeat(21))).toBe(false); // too long
            expect(validateUsername('user-name')).toBe(false); // contains hyphen
            expect(validateUsername('user name')).toBe(false); // contains space
            expect(validateUsername('')).toBe(false);
        });
    });

    describe('formatDate', () => {
        it('should format valid dates correctly', () => {
            const testDate = new Date('2023-12-25');
            expect(formatDate(testDate)).toBe('Dec 25, 2023');
        });

        it('should handle invalid dates', () => {
            expect(formatDate('')).toBe('');
            expect(formatDate(null)).toBe('');
            expect(formatDate(undefined)).toBe('');
        });
    });

    describe('truncateText', () => {
        it('should truncate long text', () => {
            const longText = 'This is a very long text that needs to be truncated';
            expect(truncateText(longText, 20)).toBe('This is a very long ...');
        });

        it('should not truncate short text', () => {
            const shortText = 'Short text';
            expect(truncateText(shortText, 20)).toBe('Short text');
        });

        it('should handle edge cases', () => {
            expect(truncateText('', 10)).toBe('');
            expect(truncateText(null, 10)).toBe('');
            expect(truncateText(undefined, 10)).toBe('');
        });

        it('should use default maxLength of 100', () => {
            const text = 'a'.repeat(150);
            expect(truncateText(text)).toBe('a'.repeat(100) + '...');
        });
    });
}); 