import React, { useState, useCallback, useEffect, useRef } from 'react';
import { move } from "../../../util/cam-http-requests"

import classes from "./TwoDimensionSlider.module.css"


type TwoDimensionSliderProps = {
  className: string
  xMax: string
  yMax: string
  resolution: number
}

function TwoDimensionSlider (props: TwoDimensionSliderProps)  {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const xMax = (parseInt(props.xMax) * props.resolution) || 24
  const yMax = (parseInt(props.yMax) * props.resolution) || 20

  const divRef = useRef<HTMLDivElement>(null)
  
  const handleMouseDown =(e: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseDown(true);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseDown(false);
    setX(0)
    setY(0)
  };
   
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement> | any ) => {
    e.preventDefault();
    
    if (isMouseDown || e.type === 'touchmove' || e.type === 'touchstart') {
      // Calculate x and y coordinates based on the mouse position
      const rect = e.currentTarget.getBoundingClientRect();
      const clientX = e.type === 'touchmove' ?
        (e as React.TouchEvent<HTMLDivElement>).touches[0].clientX :
        (e as React.MouseEvent<HTMLDivElement>).clientX;
      
      const clientY = e.type === 'touchmove' ?
        (e as React.TouchEvent<HTMLDivElement>).touches[0].clientY :
        (e as React.MouseEvent<HTMLDivElement>).clientY;
      
      const mouseX = clientX - rect.left;
      const mouseY = clientY - rect.top;
      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const xRange = xMax * 2;
      const yRange = yMax * 2;
      const xScale = xRange / width;
      const yScale = yRange / height;
      const xValue = ((mouseX - centerX) * xScale).toFixed(0);
      const yValue = ((centerY - mouseY) * yScale * -1).toFixed(0);
  
      setX(Number(xValue));
      setY(Number(yValue));
    }
  }, [isMouseDown, xMax, yMax]);

  const handleTouchStart = useCallback( (e: React.TouchEvent<HTMLDivElement> | any) => {
    setIsMouseDown(true);
    handleMouseMove(e);
  }, [handleMouseMove]);
  
  const handleTouchEnd = useCallback(() => {
    setIsMouseDown(false);
    setX(0)
    setY(0)
  }, []);
  
  useEffect(() => {
    move(
      Math.floor(x / props.resolution).toString(),
      Math.floor(y / props.resolution).toString()
    )
  }, [x, y, props.resolution]);

  useEffect(() => {
    let panTiltPad: HTMLDivElement | null;
    if (divRef && divRef.current) {
      panTiltPad = divRef.current
      panTiltPad.addEventListener("touchstart", handleTouchStart);
      panTiltPad.addEventListener("touchend", handleTouchEnd);
      panTiltPad.addEventListener("touchmove", handleMouseMove);
      panTiltPad.addEventListener("touchcancel", handleTouchEnd);
    };
    return () => {
      if (panTiltPad) {
        panTiltPad.removeEventListener("touchstart", handleTouchStart)
        panTiltPad.removeEventListener("touchend", handleTouchEnd)
        panTiltPad.removeEventListener("touchmove", handleMouseMove)
        panTiltPad.removeEventListener("touchcancel", handleTouchEnd)
      }
    }
  }, [handleMouseMove, handleTouchEnd, handleTouchStart])

  return (
    <React.StrictMode>
      <div
        className={classes.dblSlider}
        ref={divRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      />
    </React.StrictMode>
  );
};

export default TwoDimensionSlider;
