import React, { useEffect, useRef, useState } from "react";

const useInterval = (delay: number, callback: () => void) => {
  const savedCallback = React.useRef(() => {});

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};

const useTimeoutBooleanState = (
  defaultValue: boolean,
  delay: number
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [state, setState] = useState(defaultValue);
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (state) {
      timerRef.current = setTimeout(() => {
        setState(false);
      }, delay);
    }
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [state, delay]);

  return [state, setState];
};

const useRefreshState = (): [number, () => void] => {
  const [refreshId, setRefreshCount] = useState(0);
  return [refreshId, () => setRefreshCount(refreshId + 1)];
};

const useCursorGlow = <T extends HTMLElement>() => {
  const updateCursorPosition = (element: T, clientX: number, clientY: number) => {
    const rect = element.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    element.style.setProperty("--cursor-x", `${x}px`);
    element.style.setProperty("--cursor-y", `${y}px`);
  };

  const handlePointerMove = (event: React.PointerEvent<T>) => {
    updateCursorPosition(event.currentTarget, event.clientX, event.clientY);
  };

  const handleMouseMove = (event: React.MouseEvent<T>) => {
    updateCursorPosition(event.currentTarget, event.clientX, event.clientY);
  };

  const handleMouseLeave = (event: React.MouseEvent<T>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--cursor-x", `${rect.width / 2}px`);
    event.currentTarget.style.setProperty("--cursor-y", `${rect.height / 2}px`);
  };

  return {
    onPointerMove: handlePointerMove,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave
  };
};

export { useInterval, useTimeoutBooleanState, useRefreshState, useCursorGlow };
