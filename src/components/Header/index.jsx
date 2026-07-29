import { useState } from 'react';

import { contentBtn } from './contentBtnHeader';

import Button from '../Button';
import Dropdown from '../Dropdown';

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown((prev) => (prev === index ? null : index));
  };

  return (
    <header className="bg-surface shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <ul className="flex items-center gap-4">
          {contentBtn.map((item, index) => (
            <li key={index} className="relative">
              <Button
                variant={item.dropdown && openDropdown === index ? 'secondary' : 'primary'}
                onClick={
                  item.dropdown ? () => toggleDropdown(index) : undefined
                }
              >
                <div className="flex items-center gap-2">
                  {item.text}
                  {item.dropdown && <i className="fa-solid fa-angle-down text-sm"></i>}
                </div>
              </Button>

              {item.dropdown &&
                openDropdown === index &&
                item.itensDropdown && (
                  <Dropdown items={item.itensDropdown} setOpenDropdown={setOpenDropdown}/>
                )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
