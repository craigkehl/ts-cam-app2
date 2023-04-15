import React, { useState, useCallback, useEffect, useRef } from 'react';
import { move } from "../../../util/cam-http-requests";
import classes from "./TwoDimensionSlider.module.css";

type TwoDimensionSliderProps = {
  className: string;
  xMax: string;
  yMax: string;
  resolution: number;
};

function TwoDimensionSlider(props: TwoDimensionSliderProps) {
  const [rate, setRate] = useState({
    x: 0,
    y: 0
  });
  const [isPointerDown, setIsPointerDown] = useState(false);

  const xMax = (parseInt(props.xMax) * props.resolution) || 24;
  const yMax = (parseInt(props.yMax) * props.resolution) || 20;

  const divRef = useRef<HTMLDivElement>(null);
  
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsPointerDown(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setRate(prevRate => {
      return {
        x: 0,
        y: 0
      }
    })
    setIsPointerDown(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };
   
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    if (isPointerDown) {
      // Calculate x and y coordinates based on the pointer position
      const rect = e.currentTarget.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const xRange = xMax * 2;
      const yRange = yMax * 2;
      const xScale = xRange / width;
      const yScale = yRange / height;
      const xValue = Math.floor((mouseX - centerX) * xScale);
      const yValue = Math.floor((centerY - mouseY) * yScale);
      // Check that the value is within the Max boundary
      const xValueBounded = (xValue > xMax) ? xMax :
        (xValue < xMax * -1) ? xMax * -1 : xValue;
      const yValueBounded = (yValue > yMax) ? yMax :
        (yValue < yMax * -1) ? yMax * -1 : yValue;
      
      setRate(prevRate => {
        if (prevRate.x !== xValueBounded || prevRate.y !== yValueBounded) {
          return {
            ...prevRate,
            x: Number(xValueBounded),
            y: Number(yValueBounded),
          };
        }
        return prevRate
      })
    }
  }, [isPointerDown, xMax, yMax]);

  useEffect(() => {
    move(
      (rate.x / props.resolution).toFixed(0),
      (rate.y / props.resolution).toFixed(0)
    );
  }, [rate.x, rate.y, props.resolution]);

  return (
    <React.StrictMode>
      <div
        className={classes.dblSlider}
        ref={divRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerUp}
      />
    </React.StrictMode>
  );
};

export default React.memo(TwoDimensionSlider);
