import { MoreVertical } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const Table = ({ columns, data, actions, onRowAction, isLoading }) => {
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
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-4 py-2 bg-gray-200 text-center text-sm font-medium text-gray-700"
              >
                {column.Header}
              </th>
            ))}
            {actions && <th className="px-4 py-2 bg-gray-200 text-center">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-4">
                <div className="text-gray-500">Loading...</div>
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-100">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-4 py-2 text-center text-sm">
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
                        aria-haspopup="menu"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                      {activeDropdown === rowIndex && (
                        <div
                          ref={dropdownRef}
                          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
                          role="menu"
                        >
                          <div className="py-1">
                            <button
                              className="block w-full text-left px-4 py-2 text-yellow-600 hover:bg-yellow-100"
                              role="menuitem"
                              onClick={() => {
                                onRowAction(row, 'edit');
                                setActiveDropdown(null);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                              role="menuitem"
                              onClick={() => {
                                onRowAction(row, 'delete');
                                setActiveDropdown(null);
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
