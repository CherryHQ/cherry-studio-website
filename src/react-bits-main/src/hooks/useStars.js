import { useState } from "react";
import { useSingleEffect } from "react-haiku";
import { getStarsCount } from "../utils/utils";

const CACHE_KEY = 'github_stars_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000;

export const useStars = () => {
  const [stars, setStars] = useState(0);

  useSingleEffect(() => {
    const fetchStars = async () => {
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        
        if (cachedData) {
          const { count, timestamp } = JSON.parse(cachedData);
          const now = Date.now();
          
          if (now - timestamp < CACHE_DURATION) {
            setStars(count);
            return;
          }
        }
        
        const count = await getStarsCount();
        
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          count,
          timestamp: Date.now()
        }));
        
        setStars(count);
      } catch (error) {
        console.error('Error fetching stars:', error);
        
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const { count } = JSON.parse(cachedData);
          setStars(count);
        }
      }
    };

    fetchStars();
  }, []);

  return stars;
};