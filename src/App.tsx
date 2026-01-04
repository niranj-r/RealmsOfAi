import { useEffect, useState } from 'react';
import Frame5 from './imports/Frame39';
import Frame6 from './imports/Frame45';
import ResponsiveWrapper from './components/ResponsiveWrapper';

export default function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </div>
  );
}

function DesktopLayout() {
  return (
    <ResponsiveWrapper baseWidth={1520}>
      <div className="w-[1520px]">
        <Frame5 />
      </div>
    </ResponsiveWrapper>
  );
}

function MobileLayout() {
  return (
    <ResponsiveWrapper baseWidth={412}>
      <div className="w-[412px]">
        <Frame6 />
      </div>
    </ResponsiveWrapper>
  );
}
