
import React, { useLayoutEffect, useState, useRef } from 'react';

interface ResponsiveWrapperProps {
  children: React.ReactNode;
  baseWidth: number;
}

export default function ResponsiveWrapper({ children, baseWidth }: ResponsiveWrapperProps) {
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);


  useLayoutEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const s = windowWidth / baseWidth;
      setScale(s);

      if (containerRef.current) {
        setHeight(containerRef.current.scrollHeight * s);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    // Also update on mutation or timeout to catch late loading content if needed
    // For now, resize is the main trigger.

    return () => window.removeEventListener('resize', handleResize);
  }, [baseWidth]);

  return (
    <div
      className="w-full overflow-hidden origin-top-left"
      style={{
        height: height > 0 ? height : 'auto',
      }}
    >
      <div
        ref={containerRef}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: baseWidth,
          position: 'relative', // Ensure absolute children are contained
        }}
      >
        {children}
      </div>
    </div>
  );
}
