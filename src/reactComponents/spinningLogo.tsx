import { twMerge } from "tailwind-merge";
import { useState, useEffect, useRef } from "react";
import { icons } from "../common/icons";

interface Props {
  spinInitially?: boolean;
}

const SpinningLogo = (props: React.SVGProps<SVGSVGElement> & Props) => {
  const { onMouseEnter, onMouseLeave, className, viewBox, spinInitially, ...restOfProps } = props;
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const animationRef = useRef<number>(0);
  const velocityRef = useRef<number>(spinInitially ? 360 : 0); // degrees per second
  const lastTimeRef = useRef<number>(0);
  const initialSpinTimeRef = useRef<number>(spinInitially ? 2.5 : 0); // seconds to spin initially

  useEffect(() => {
    const maxVelocity = 360; // degrees per second
    const acceleration = 720; // degrees per second squared
    const deceleration = 540; // degrees per second squared

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = (timestamp - lastTimeRef.current) / 1000; // convert to seconds
      lastTimeRef.current = timestamp;

      // Countdown initial spin time
      if (initialSpinTimeRef.current > 0) {
        initialSpinTimeRef.current = Math.max(0, initialSpinTimeRef.current - deltaTime);
      }

      // Update velocity based on hovering state and initial spin time
      if (isSpinning || initialSpinTimeRef.current > 0) {
        // Accelerate or maintain max velocity during initial spin
        velocityRef.current = Math.min(velocityRef.current + acceleration * deltaTime, maxVelocity);
      } else {
        // Decelerate
        velocityRef.current = Math.max(velocityRef.current - deceleration * deltaTime, 0);
      }

      // Update rotation based on current velocity
      if (velocityRef.current > 0 || isSpinning || initialSpinTimeRef.current > 0) {
        setRotation((prev) => (prev + velocityRef.current * deltaTime) % 360);
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    // Always start animation if there's any velocity, spinning, or initial spin time
    if (velocityRef.current > 0 || isSpinning || initialSpinTimeRef.current > 0) {
      lastTimeRef.current = 0; // Reset time reference
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isSpinning]);

  return (
    <svg
      onMouseEnter={(e) => {
        setIsSpinning(true);
        if (onMouseEnter) {
          onMouseEnter(e);
        }
      }}
      onMouseLeave={(e) => {
        setIsSpinning(false);
        if (onMouseLeave) {
          onMouseLeave(e);
        }
      }}
      className={twMerge(`h-10 w-10`, className)}
      style={{
        transform: `rotate(${rotation}deg)`
      }}
      viewBox={viewBox ? viewBox : "0 0 24 24"}
      {...restOfProps}
    >
      <path fill="currentColor" d={icons.fan} />
    </svg>
  );
};

export { SpinningLogo };
