import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './component/Sidebar';
import Chart from './component/Chart';
import SortableTable from './component/SortableTable';

const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow">
          <Routes>
            <Route path="/stats" element={<Chart />} />
            <Route path="/safes" element={<SortableTable />} />
            <Route path="/" element={<Chart />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;