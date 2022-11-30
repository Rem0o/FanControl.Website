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

export { useInterval, useTimeoutBooleanState, useRefreshState };
