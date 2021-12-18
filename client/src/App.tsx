import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import './App.less';
import Cats from './components/Cats/Cats';
import Breeds from './components/Breeds/Breeds';

const App : React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/breeds" />} />
          <Route path="/breeds" element={<Breeds />}/>
          <Route path="/cats" element={<Cats />}/>
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
