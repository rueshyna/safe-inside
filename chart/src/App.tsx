// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './component/Sidebar';
import Chart from './component/Chart';
import SortableTable from './component/SortableTable'


const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow">
          <Routes>
            <Route path="/chart" element={<Chart />} />
            <Route path="/sortabletable" element={<SortableTable />} />
            <Route path="/" element={<Chart />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;