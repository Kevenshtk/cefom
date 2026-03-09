import { Link } from 'react-router-dom';

const Dropdown = ({ items, setOpenDropdown }) => {
  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <Link to={item.url} onClick={() => setOpenDropdown(null)}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
