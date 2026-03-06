import { Link } from 'react-router-dom';

const Dropdown = ({ items }) => {
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
