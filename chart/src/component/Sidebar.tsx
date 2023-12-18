// Sidebar.tsx
import dataLastUpdatedTime from '../data/lastUpdatedTime.json';
import React from 'react';

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
          <a href="#link1" className="text-blue-600 hover:text-blue-800">
            Link 1
          </a>
        </li>
        <li>
          <a href="#link2" className="text-blue-600 hover:text-blue-800">
            Link 2
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
