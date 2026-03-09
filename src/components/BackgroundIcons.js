import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import '../styles/backgroundIcons.scss';

// Import all background icons
import robot from '../images/backgroundIcons/robot.svg';
import aerial from '../images/backgroundIcons/aerial.svg';
import hand1 from '../images/backgroundIcons/hand1.svg';
import hand2 from '../images/backgroundIcons/hand2.svg';
import hand3 from '../images/backgroundIcons/hand3.svg';
import pet from '../images/backgroundIcons/pet.svg';
import computer from '../images/backgroundIcons/computer.svg';
import rover1 from '../images/backgroundIcons/rover1.svg';
import rover2 from '../images/backgroundIcons/rover2.svg';
import arms from '../images/backgroundIcons/arms.svg';
import robot2 from '../images/backgroundIcons/robot2.svg';
import arm from '../images/backgroundIcons/arm.svg';
import industry from '../images/backgroundIcons/industry.svg';
import aiResearch from '../images/backgroundIcons/ai-research.svg';
import aiSophia from '../images/backgroundIcons/ai-sophia.svg';
import ai from '../images/backgroundIcons/ai.svg';
import robotAlien from '../images/backgroundIcons/robot-alien.svg';
import aerialImaging from '../images/backgroundIcons/aerial-imaging.svg';
import artificialIntelligence from '../images/backgroundIcons/artificial-intelligence.svg';
import robot3 from '../images/backgroundIcons/robot3.svg';
import petRobot from '../images/backgroundIcons/pet-robot.svg';
import robot4 from '../images/backgroundIcons/robot4.png';
import robot5 from '../images/backgroundIcons/robot5.png';
import robotAssistant from '../images/backgroundIcons/robot-assistant.png';
import dummy from '../images/backgroundIcons/dummy.svg';
import robot6 from '../images/backgroundIcons/robot6.svg';

const BackgroundIcons = () => {
  const [icons, setIcons] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const resizeTimeout = useRef(null);
  const generatedGrid = useRef(false);
  const lastGridSize = useRef(0);
  
  const iconRefs = useRef([]);

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= 768);
      }
    };
    checkMobile();
    try { window.addEventListener('resize', checkMobile); } catch (e) {}
    return () => { try { window.removeEventListener('resize', checkMobile); } catch (e) {} };
  }, []);

  const allIcons = useMemo(() => [
    robot, aerial, hand1, hand2, hand3, pet, computer, rover1, rover2, arms, robot2, arm,
    industry, aiResearch, aiSophia, ai, robotAlien, aerialImaging, artificialIntelligence, 
    robot3, petRobot, robot4, robot5, robotAssistant, dummy, robot6
  ], []);

  const getHeaderHeight = useCallback(() => {
    if (typeof window === 'undefined') return 0;
    const viewportHeight = window.innerHeight;
    const headerHeight = Math.max(80, viewportHeight * 0.15);
    const currentPath = window.location.pathname;
    if (currentPath.includes('resume')) return Math.min(headerHeight, 60);
    return headerHeight;
  }, []); 
  
  const generateGrid = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    const grid = [];
    const width = window.innerWidth;
    const height = window.innerHeight;
    const path = window.location.pathname;
    const isMobileView = isMobile;
    
    // --- CHANGED: Ye block hata diya gaya hai taaki chote screens par bhi icons generate hon ---
    /* if (width <= 480) {
      if (lastGridSize.current !== 0) {
        setIcons([]);
        lastGridSize.current = 0;
      }
      return;
    }
    */
    
    let horizontalSpacing = 450; 
    let verticalSpacing = 160;    
    
    if (path.includes('resume')) verticalSpacing = 350; 
    
    if (isMobileView) {
      // Mobile ke liye spacing thodi kam kar di taaki zyada icons fit hon
      horizontalSpacing = path.includes('resume') ? 350 : 150; 
      verticalSpacing = path.includes('resume') ? 250 : 120;
    }
    
    const numCols = Math.ceil(width / horizontalSpacing) + 1;
    const numRows = Math.ceil(height / verticalSpacing);
    const headerHeight = getHeaderHeight();
    const headerHeightPercent = (headerHeight / height) * 100;
    
    for (let row = 0; row < numRows; row++) {
      const rowOffset = (row % 2 === 1) ? (horizontalSpacing / 2) : 0;
      
      for (let col = 0; col < numCols; col++) {
        const jitterX = (Math.random() - 0.5) * 30; 
        const jitterY = (Math.random() - 0.5) * 10;
        
        const pixelX = (col * horizontalSpacing) + rowOffset + jitterX;
        const x = (pixelX / width) * 100;
        const y = headerHeightPercent + ((row * verticalSpacing / height) * 100) + (jitterY / height * 100);
        
        if (y < headerHeightPercent) continue;
        
        const initialRotation = Math.random() * 360;
        
        const opacity = 0.2; 
        
        const iconIndex = Math.floor(Math.random() * allIcons.length);
        
        grid.push({
          id: `${row}-${col}`,
          src: allIcons[iconIndex],
          x, y, initialRotation, opacity
        });
      }
    }
    
    if (grid.length !== lastGridSize.current) {
      setIcons(grid);
      lastGridSize.current = grid.length;
      iconRefs.current = new Array(grid.length);
    }
    generatedGrid.current = true;
    if (typeof window !== 'undefined') window.shouldRegenerateBackgroundGrid = false;
  }, [getHeaderHeight, allIcons, isMobile]);

  // Interaction Logic
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleInteraction = (clientX, clientY) => {
      const interactionRadius = 150; 

      iconRefs.current.forEach((ref) => {
        if (!ref) return;

        const rect = ref.getBoundingClientRect();
        const iconCenterX = rect.left + rect.width / 2;
        const iconCenterY = rect.top + rect.height / 2;

        const distX = clientX - iconCenterX;
        const distY = clientY - iconCenterY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        if (distance < interactionRadius) {
          const force = (interactionRadius - distance) / interactionRadius;
          const moveX = -(distX / distance) * force * 60; 
          const moveY = -(distY / distance) * force * 60;
          ref.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
          if (ref.style.transform !== '' && ref.style.transform !== 'translate(0px, 0px)') {
            ref.style.transform = 'translate(0px, 0px)';
          }
        }
      });
    };

    const handleMouseMove = (e) => handleInteraction(e.clientX, e.clientY);
    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [icons]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkRegeneration = () => {
      if (window.shouldRegenerateBackgroundGrid === true) generateGrid();
    };
    checkRegeneration();
    const intervalId = setInterval(checkRegeneration, 2000);
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') checkRegeneration();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    const handleResize = () => {
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
      resizeTimeout.current = setTimeout(() => {
        if (typeof window !== 'undefined') window.shouldRegenerateBackgroundGrid = true;
      }, 500);
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
    };
  }, [generateGrid]);

  // --- CHANGED: Ye line hata di gayi hai jo mobile par null return kar rahi thi ---
  // if (isMobile && typeof window !== 'undefined' && window.innerWidth <= 480) return null;

  const renderIconSet = (setIndex) => (
    <div className="icon-set">
      {icons.map((icon, index) => {
        const uniqueKey = `${setIndex}-${icon.id}`;
        const refIndex = setIndex === 0 ? index : index + icons.length;
        return (
          <div
            key={uniqueKey}
            ref={el => iconRefs.current[refIndex] = el}
            className="icon-wrapper"
            style={{ left: `${icon.x}%`, top: `${icon.y}%` }}
          >
            <img
              src={icon.src}
              alt=""
              className="wallpaper-icon"
              style={{
                transform: `rotate(${icon.initialRotation}deg)`,
                opacity: icon.opacity
              }}
            />
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="background-wallpaper">
      <div className="sliding-track">
        {renderIconSet(0)}
        {renderIconSet(1)}
      </div>
    </div>
  );
};

export default BackgroundIcons;