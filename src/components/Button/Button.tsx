import React from "react";

export interface ButtonProps {
    label: string;
    onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
    return (
        <button onClick={onClick} className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
            {label}
        </button>
    )
}