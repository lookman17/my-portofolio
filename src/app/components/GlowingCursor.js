"use client";
import { useEffect } from "react";

export default function GlowingCursor() {
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.id = "glowing-cursor";
    document.body.appendChild(cursor);

    cursor.style.position = "fixed";
    cursor.style.top = "0";
    cursor.style.left = "0";
    cursor.style.width = "80px";
    cursor.style.height = "80px";
    cursor.style.borderRadius = "50%";
    cursor.style.pointerEvents = "none";
    cursor.style.background = "radial-gradient(circle, rgba(0,255,255,0.4) 0%, rgba(0,255,255,0) 70%)";
    cursor.style.transform = "translate(-50%, -50%)";
    cursor.style.zIndex = "9999";
    cursor.style.mixBlendMode = "screen";

    const moveCursor = (e) => {
      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.removeChild(cursor);
    };
  }, []);

  return null; // Tidak render apa-apa, cuma inject cursor glowing
}
