'use client'

import { useState, useEffect, useRef } from 'react';

export const useActiveSection = (sectionIds, options) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);
  const observer = useRef(null);

  useEffect(() => {
    // Inisialisasi IntersectionObserver
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    // Mulai mengamati setiap elemen section
    const elements = sectionIds.map(id => document.getElementById(id));
    elements.forEach(el => {
      if (el) {
        observer.current.observe(el);
      }
    });

    // Cleanup: berhenti mengamati saat komponen di-unmount
    return () => {
      elements.forEach(el => {
        if (el) {
          observer.current.unobserve(el);
        }
      });
    };
  }, [sectionIds, options]);

  return activeSection;
};