import { createContext, useRef, useState } from "react";

export const SwipeRightContext = createContext({
  stateHandler: () => {},
  isMoving: false,
});

export default function SwipeRightProvider({ children }) {
  const [actionFunction, setActionFunction] = useState(() => {});
  const [isMoving, setMoving] = useState(false);
  const stateHandler = (a) => {
    setActionFunction(() => a);
  };

  const startPositionX = useRef(null);
  const startPositionY = useRef(null);

  const endPositionX = useRef(null);
  const endPositionY = useRef(null);

  const transformationDistanceX = useRef(0);
  const transformationDistanceY = useRef(0);
  const deltaY = useRef(null);

  const maxPixels = window.innerWidth;
  const subliminalSwipeDistanceReaction = maxPixels / 3;

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicked, setClicked] = useState(false);

  const handleMouseStart = (event) => {
    startPositionX.current = event.clientX;
    startPositionY.current = event.clientY;

    setClicked(true);
  };

  const handleMouseMove = (event) => {
    if (!isClicked) {
      return;
    }
    setMoving(true);
    const actualMousePosition = event;
    console.log("variable", actualMousePosition.clientX);
    transformationDistanceX.current =
      actualMousePosition.clientX - startPositionX.current;
    deltaY.current = Math.abs(event.clientY - startPositionY.current);
    endPositionX.current = actualMousePosition.clientX;
    if (deltaY.current > 20) {
      setClicked(false);
      setPosition({
        x: 0,
        y: 0,
      });
      return;
    } else {
      setPosition({
        x: transformationDistanceX.current,
        y: transformationDistanceY.current,
      });
    }
  };

  const handleMouseEnd = () => {
    setClicked(false);
    const swipeDistance = endPositionX.current - startPositionX.current;
    if (swipeDistance > subliminalSwipeDistanceReaction) {
      if (actionFunction() === undefined) {
        return;
      }
    }
    setPosition({
      x: 0,
      y: 0,
    });

    startPositionX.current = null;
    endPositionX.current = null;
  };

  return (
    <div
      className="movable-div"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onMouseDown={(event) => {
        handleMouseStart(event);
      }}
      onTouchStart={(touchEvent) => {
        const event = touchEvent.touches[0];
        handleMouseStart(event);
      }}
      onMouseMove={handleMouseMove}
      onTouchMove={(touchEvent) => {
        const event = touchEvent.touches[0];
        handleMouseMove(event);
      }}
      onMouseUp={handleMouseEnd}
      onTouchEnd={handleMouseEnd}
    >
      <SwipeRightContext.Provider
        value={{
          isMoving,
          stateHandler,
        }}
      >
        {children}
      </SwipeRightContext.Provider>
    </div>
  );
}
