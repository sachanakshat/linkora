// Dropdown.tsx
import { useState } from 'react';

interface DropdownProps {
    links: { link: string; count: number }[];
}

const Dropdown: React.FC<DropdownProps> = ({ links }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <button onClick={toggleDropdown} className="text-blue-600">
                More Links
            </button>
            {isOpen && (
                <div className="absolute z-10 mt-2 w-48 rounded-md bg-white shadow-lg max-h-60 overflow-auto">
                    <div className="py-1">
                        {links.map((link, index) => (
                            <a key={index} href={link.link} target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                {link.link}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export {Dropdown};
