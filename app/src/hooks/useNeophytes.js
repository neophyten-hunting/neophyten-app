import { useEffect } from 'react';
import distanceBetweenPoints from '../helpers/coordinateCalc.js'

export default (items, getItems, userLocation) => {
  const calculateDistance = (items, location) => {
    items.forEach(d => {
      if (location) {
        const dist = distanceBetweenPoints(d.lat, d.lon, location.latitude, location.longitude);
        d.distance = dist;
      }
    });
  };

  useEffect(() => {
    getItems();
    const timerId = setTimeout(() => getItems(), 60000);

    return () => {
      clearTimeout(timerId);
    }
  }, [])

  useEffect(() => {
    calculateDistance(items, userLocation);
  }, [items, userLocation])
}