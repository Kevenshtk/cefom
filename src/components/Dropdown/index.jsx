import { Link } from 'react-router-dom';

const Dropdown = ({ items, setOpenDropdown }) => {
  return (
    <div className="absolute left-0 mt-2 w-48 bg-surface rounded-md shadow-md z-10 py-1 ring-1 ring-black ring-opacity-5">
      <ul className="flex flex-col">
        {items.map((item, index) => (
          <li key={index}>
            <Link 
              to={item.url} 
              onClick={() => setOpenDropdown(null)}
              className="block px-4 py-2 text-sm text-text-primary hover:bg-surface-2 hover:text-primary transition-colors"
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
