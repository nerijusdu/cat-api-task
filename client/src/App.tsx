import React from 'react';
import Layout from './components/Layout/Layout';
import './App.less';

const App : React.FC = () => {
  return (
    <Layout>
      <div className="app">
        Hello world
      </div>
    </Layout>
  );
};

export default App;
