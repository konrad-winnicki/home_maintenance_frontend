import { createContext, useContext, useEffect, useRef, useState } from "react";
import "./swipeBackground.css";
import { AppContext } from "./appContext";
import { APP_STATES } from "../applicationStates";

export const SwipeRightContext = createContext({
  actionFunctionSetter: () => {},
  isMovingRight: null,
});

export default function SwipeRightProvider({
  swipeRText,
  directionRestriction,
  children,
}) {
  const [swipeLeftActionFunction, setSwipeLeftActionFunction] =
    useState(undefined);
  const [swipeRightActionFunction, setSwipeRightActionFunction] =
    useState(undefined);

  const [isMovingRight, setMovingRight] = useState(null);
  const actionFunctionSetter = (actionFunction, swipeDirection) => {
    if (swipeDirection === "left") {
      setSwipeLeftActionFunction(() => actionFunction);
    } else {
      setSwipeRightActionFunction(() => actionFunction);
    }
  };
  const transform = useRef("none");
  const startPositionX = useRef(null);
  const startPositionY = useRef(null);

  const endPositionX = useRef(null);

  const transformationDistanceX = useRef(0);
  const transformationDistanceY = useRef(0);
  const deltaY = useRef(null);

  const maxPixels = window.innerWidth;
  const subliminalSwipeDistanceReaction = maxPixels / 3;

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicked, setClicked] = useState(false);

  const appContext = useContext(AppContext);
  const handleMouseStart = (event) => {
    startPositionX.current = event.clientX;
    startPositionY.current = event.clientY;
    setClicked(true);
  };

  const checkIfMoveRight = (actualMousePosition) => {
    const moveRight = actualMousePosition.clientX > startPositionX.current;
    console.log("ffff", moveRight);
    return moveRight;
  };

  const handleMouseMove = (event) => {
    if (!isClicked) {
      return;
    }
    const actualMousePosition = event;
    transformationDistanceX.current =
      actualMousePosition.clientX - startPositionX.current;
    deltaY.current = Math.abs(event.clientY - startPositionY.current);
    endPositionX.current = actualMousePosition.clientX;
    setMovingRight(checkIfMoveRight(actualMousePosition));
    transform.current = `translate(${position.x}px, ${position.y}px)`;
    if (
      directionRestriction === "right" &&
      transformationDistanceX.current < 0
    ) {
      setMovingRight(null);
      transform.current = "none";
      return;
    }
    if (
      directionRestriction === "left" &&
      transformationDistanceX.current > 0
    ) {
      setMovingRight(null);
      transform.current = "none";
      return;
    }
    
    if (deltaY.current > 20 ) {
      setClicked(false);
      setMovingRight(null);
      transform.current = "none";
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
    //TODO: check end position with event
    const endP = endPositionX.current ? endPositionX.current : startPositionX;
    const swipeDistance = Math.abs(endP - startPositionX.current);

    if (swipeDistance > subliminalSwipeDistanceReaction && isMovingRight===false) {
      if (swipeLeftActionFunction === undefined) {
      } else {
        swipeLeftActionFunction();
      }
    }
    if (swipeDistance > subliminalSwipeDistanceReaction && isMovingRight) {
      if (swipeRightActionFunction === undefined) {
      } else {
        swipeRightActionFunction();
      }
    }
    setMovingRight(null);
    setPosition({
      x: 0,
      y: 0,
    });

    startPositionX.current = null;
    startPositionY.current = null;
    transformationDistanceX.current = 0
    transformationDistanceY.current = 0
    endPositionX.current = null;
    deltaY.current = null;
    transform.current = "none";

    //appContext.setAppState(APP_STATES.DEFAULT);
    return;
  };

  useEffect(()=>{
    console.log(transform)
  },[isMovingRight])
  const style = isMovingRight
    ? { zIndex: 0, backgroundColor: "#0d62ea" }
    : { zIndex: 0, backgroundColor: "#f61f07"};
  const textContainerStyle = isMovingRight? {justifyContent: "flex-start"} :{justifyContent: "flex-end" }
    const divText = isMovingRight ? swipeRText : "DELETE";
  return (
    <div className="container_item"
    style={style} >
      <div className="background_sheet"
      style={textContainerStyle}>
        {divText}
      </div>

      <div
        className="movable-div"
        style={{ position: "relative", transform: transform.current, flex:1 }}
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
            actionFunctionSetter: actionFunctionSetter,
          }}
        >
          {children}
        </SwipeRightContext.Provider>
      </div>
    </div>
  );
}
