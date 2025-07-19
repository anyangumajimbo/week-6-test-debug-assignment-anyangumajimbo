import React from 'react';

const Button = ({
    children,
    onClick,
    disabled = false,
    className = '',
    variant = 'primary',
    size = 'md',
    ...props
}) => {
    const baseClasses = 'btn';
    const variantClasses = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        danger: 'btn-danger'
    };
    const sizeClasses = {
        sm: 'btn-sm',
        md: 'btn-md',
        lg: 'btn-lg'
    };
    const disabledClass = disabled ? 'btn-disabled' : '';

    const buttonClasses = [
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabledClass,
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={buttonClasses}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button; 