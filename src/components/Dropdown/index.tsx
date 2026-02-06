import { Link } from 'react-router-dom';

import type { DropdownItem } from '../Header/contentBtnHeader';

type DropdownProps = {
  items: DropdownItem[];
};

const Dropdown = ({ items }: DropdownProps) => {
  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <Link to={item.url}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
