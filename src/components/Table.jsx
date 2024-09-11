import { MoreVertical } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const Table = ({ columns, data, actions, onRowAction }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = (rowIndex) => {
    setActiveDropdown(activeDropdown === rowIndex ? null : rowIndex);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index} className="px-4 py-2 bg-gray-200 text-center">{column.Header}</th>
          ))}
          {actions && <th className="px-4 py-2 bg-gray-200 text-center">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-gray-100">
            {columns.map((column, colIndex) => (
              <td key={colIndex} className="px-4 py-2 text-center">
                {row[column.accessor]}
              </td>
            ))}
            {actions && (
              <td className="px-4 py-2 text-center">
                <div className="relative inline-block text-left">
                  <button
                    onClick={() => handleDropdownToggle(rowIndex)}
                    className="flex items-center justify-center hover:bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded"
                    aria-expanded={activeDropdown === rowIndex}
                    aria-haspopup="true"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                  {activeDropdown === rowIndex && (
                    <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 transition-transform transform scale-100">
                      <div className="py-1">
                        {/* <button
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            onRowAction(row, 'details');
                            setActiveDropdown(null); // Close dropdown after action
                          }}
                        >
                          Details
                        </button> */}
                        <button
                          className="block w-full text-left px-4 py-2 text-yellow-600 hover:bg-yellow-100"
                          onClick={() => {
                            onRowAction(row, 'edit');
                            setActiveDropdown(null); // Close dropdown after action
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                          onClick={() => {
                            onRowAction(row, 'delete');
                            setActiveDropdown(null); // Close dropdown after action
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
