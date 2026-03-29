import React, { useState, useEffect, useCallback } from 'react';
import Card from '../components/Card';
import { getWatchlist } from '../utils/watchlist';
import './MyList.css';

const MyList = () => {
  const [items, setItems] = useState([]);

  const refresh = useCallback(() => {
    setItems(getWatchlist());
  }, []);

  useEffect(() => {
    refresh();
    const onUpdate = () => refresh();
    window.addEventListener('watchlist-updated', onUpdate);
    window.addEventListener('storage', onUpdate);
    return () => {
      window.removeEventListener('watchlist-updated', onUpdate);
      window.removeEventListener('storage', onUpdate);
    };
  }, [refresh]);

  return (
    <div className="my-list-page">
      <h1 className="my-list-heading">My List</h1>
      {items.length === 0 ? (
        <p className="my-list-empty">
          Your list is empty. Save shows and films by clicking the star on a poster.
        </p>
      ) : (
        <div className="my-list-row">
          {items.map((item) => (
            <Card
              key={`${item.type}-${item.id}`}
              item={item}
              type={item.type || 'movie'}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyList;
