const WATCHLIST_KEY = 'watchlist';

export function getWatchlist() {
  try {
    return JSON.parse(localStorage.getItem(WATCHLIST_KEY) || '[]');
  } catch {
    return [];
  }
}

export function setWatchlist(list) {
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
}

export function notifyWatchlistChange() {
  window.dispatchEvent(new CustomEvent('watchlist-updated'));
}

export function isInWatchlist(item, mediaType) {
  if (!item?.id) return false;
  return getWatchlist().some((i) => i.id === item.id && i.type === mediaType);
}

export function toggleWatchlistItem(item, mediaType) {
  const list = getWatchlist();
  const exists = list.some((i) => i.id === item.id && i.type === mediaType);
  const updated = exists
    ? list.filter((i) => !(i.id === item.id && i.type === mediaType))
    : [...list, { ...item, type: mediaType }];
  setWatchlist(updated);
  notifyWatchlistChange();
}
