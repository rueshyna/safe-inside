// App.tsx
import MainContent from './component/MainContent';
import Sidebar from './component/Sidebar';
import React from 'react';

const App: React.FC = (): JSX.Element => {
  return (
    <div className="flex">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default App;
