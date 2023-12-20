import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import dataLastUpdatedTime from '../data/lastUpdatedTime.json';

const Sidebar: React.FC = () => {
  return (
    <div className="w-1/4 bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4">Sidebar</h2>
      <div className="mb-4">
        <h3 className="font-semibold">Last Updated:</h3>
        <p>{dataLastUpdatedTime.lastUpdatedTime}</p>
      </div>
      <ul>
        <li className="mb-2">
          <Link to="/chart" className="text-blue-600 hover:text-blue-800">
            Chart
          </Link>
        </li>
        <li>
          <Link to="/sortabletable" className="text-blue-600 hover:text-blue-800">
            Table
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;