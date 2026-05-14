import React from 'react';
import { Link } from '@inertiajs/react';

const CustomButton = ({
    type = 'button',
    className = '',
    processing,
    children,
    onClick,
    variant = 'primary',
    href = null
}) => {
    const baseClasses = "inline-flex items-center px-6 py-2.5 rounded-lg font-telex text-[14px] font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shadow-sm";

    const variants = {
        primary: "bg-[#1E293B] text-white hover:bg-[#334155] focus:ring-[#1E293B] border border-transparent",
        secondary: "bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-200 border border-gray-300",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border border-transparent",
        success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 border border-transparent",
        blue: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 border border-transparent",
        action: "p-2 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
    };

    const combinedClasses = `${baseClasses} ${variants[variant]} ${className}`;

    if (href) {
        return (
            <Link href={href} className={combinedClasses}>
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={combinedClasses}
            disabled={processing}
        >
            {children}
        </button>
    );
};

export default CustomButton;
