import { createContext, useRef } from "react";


export const SwipeRightContext = createContext({
  handleTouchStart: ()=>{},
  handleTouchMove: ()=>{},
  handleTouchEnd: ()=>{},
  handleMouseStart: ()=>{},
  handleMouseMove: ()=>{},
  handleMouseEnd: ()=>{},
});




export default function SwipeRightProvider({ children }) {
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const maxPixels = window.innerWidth
  const moveDistanceReaction = maxPixels / 5

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    if (touchStartX.current !== null) {    
      touchEndX.current = event.touches[0].clientX
    }
  };

  const handleTouchEnd = (callback) => {
    if (touchStartX.current && touchEndX.current) {
      const swipeDistance = touchEndX.current - touchStartX.current;
      
      if (swipeDistance > moveDistanceReaction) {
        console.log("Swiped to the right");
        callback()
      }else{console.log('to short move')}

    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleMouseStart = (event) => {
    touchStartX.current = event.clientX;
    console.log(event.clientX);
  };

  const handleMouseMove = (event) => {
    if (touchStartX.current !== null) {    
      touchEndX.current = event.clientX
    }
  };

  const handleMouseEnd = (callback) => {
    if (touchStartX.current && touchEndX.current) {
      const swipeDistance = touchEndX.current - touchStartX.current;
      if (swipeDistance > moveDistanceReaction) {
        console.log("Swiped to the right");
        callback()
      }else{console.log('to short move')}
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseStart}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseEnd}
    >
      <SwipeRightContext.Provider
        value={{
          handleTouchStart,
          handleTouchMove,
          handleTouchEnd,
          handleMouseStart,
          handleMouseMove,
          handleMouseEnd,
        }}
      >
        {children}
      </SwipeRightContext.Provider>
    </div>
  );
}
