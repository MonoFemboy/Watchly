// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar';
import MediaGrid from './components/MediaGrid';
import WatchPage from './components/WatchPage';
import MediaDetailPage from './components/MediaDetailPage';
import MyList from './pages/MyList';
import './App.css';

const MainContent = () => {
  const location = useLocation();
  const [params] = useSearchParams();
  const type = params.get('type') || 'movie';

  return (
    <>
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname + type}
          className="motion-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
        >
          <Routes location={location}>
            <Route path="/" element={<MediaGrid type={type} />} />
            <Route path="/my-list" element={<MyList />} />
            <Route path="/watch/:type/:id/:season?/:episode?" element={<WatchPage />} />
            <Route path="/details/:type/:id" element={<MediaDetailPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}
