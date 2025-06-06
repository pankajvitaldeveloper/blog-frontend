import React from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollTopPage = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]); // Only trigger when pathname changes

  return null;
};

export default ScrollTopPage;