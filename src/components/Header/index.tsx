import { useState } from 'react';

import { contentBtn } from './contentBtnHeader';

import Button from '../Button';
import Dropdown from '../Dropdown';

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenDropdown((prev) => (prev === index ? null : index));
  };

  return (
    <header>
      <nav>
        <ul>
          {contentBtn.map((item, index) => (
            <li key={index} style={{ position: 'relative' }}>
              <Button
                className="btn-simples"
                text={item.text}
                onClick={
                  item.dropdown ? () => toggleDropdown(index) : undefined
                }
              />
              {item.dropdown && <i className="fa-solid fa-angle-down"></i>}

              {item.dropdown &&
                openDropdown === index &&
                item.itensDropdown && <Dropdown items={item.itensDropdown} />}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
