import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import HomepageDesktop1 from './assets/HomepageDesktop1';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/homepage" element={<HomepageDesktop1 />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;