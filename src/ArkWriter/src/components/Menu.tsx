import React, { useState, useRef, useEffect } from 'react';

interface MenuItem {
  label: string;
  onClick?: () => void;
  type?: 'separator';
}

interface MenuProps {
  label: string;
  items: MenuItem[];
}

export const Menu: React.FC<MenuProps> = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative dropdown-menu">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 border border-white bg-black text-white rounded-md hover:bg-orange-500 hover:text-white hover:border-white transition-all"
      >
        {label}
      </button>
      
      {isOpen && (
        <div className="absolute left-0 mt-1 py-1 bg-white rounded-lg shadow-xl min-w-[160px] z-50">
          {items.map((item, index) => (
            item.type === 'separator' ? (
              <hr key={index} className="my-1 border-gray-200" />
            ) : (
              <button
                key={index}
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
                className="menu-item"
              >
                {item.label}
              </button>
            )
          ))}
        </div>
      )}
    </div>
  );
};