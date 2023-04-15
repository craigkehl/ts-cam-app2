import React, {
  useReducer,
  useCallback,
  useEffect,
  useRef
} from 'react';
import { move } from "../../../util/cam-http-requests";
import classes from "./PtzPad.module.css";

type TwoDimensionSliderProps = {
  className?: string;
  xMax: string;
  yMax: string;
  resolution: number;
};

type State = {
  x: number;
  y: number;
  isPointerDown: boolean;
}

type Action = {
  type: string;
  payload?: {
    x: number;
    y: number;
  }
}

function TwoDimensionSlider(props: TwoDimensionSliderProps) {
  const [state, dispatch] = useReducer((state: State, action: Action): State => {
    switch (action.type) {
      case "SET_POINTER_DOWN":
        return { ...state, isPointerDown: true }
      case "SET_POINTER_UP":
        return {
          ...state,
          isPointerDown: false,
          x: 0,
          y: 0,
        }
      case "SET_RATE":
        if (action && action.payload) {
        return {
          ...state,
          x: action.payload.x,
          y: action.payload.y,
          }
        }
        return state
      default:
        return state
    }
  }, {
    x: 0,
    y: 0,
    isPointerDown: false,
  })

  const xMax = (parseInt(props.xMax) * props.resolution) || 24;
  const yMax = (parseInt(props.yMax) * props.resolution) || 20;

  const divRef = useRef<HTMLDivElement>(null);
  
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dispatch({ type: "SET_POINTER_DOWN" })
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    dispatch({ type: "SET_POINTER_UP" })
    e.currentTarget.releasePointerCapture(e.pointerId);
  };
   
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (state.isPointerDown) {
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
      
      if (state.x !== xValueBounded || state.y !== yValueBounded) {
        dispatch({
          type: "SET_RATE",
          payload: {
            x: Number(xValueBounded),
            y: Number(yValueBounded * -1),
          }
        })
      }
    }
  }, [state.isPointerDown, state.x, state.y, xMax, yMax]);

  useEffect(() => {
    move(
      (state.x / props.resolution).toFixed(0),
      (state.y / props.resolution).toFixed(0)
    );
  }, [state.x, state.y, props.resolution]);

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
