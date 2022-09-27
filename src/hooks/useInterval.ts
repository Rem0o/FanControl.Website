import React from "react";

const useInterval = (delay: number, callback: (() => void)) => {
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

  export default useInterval;