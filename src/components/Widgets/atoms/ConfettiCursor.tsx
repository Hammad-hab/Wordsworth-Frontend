import { useEffect, useState } from "react";
import Confetti from "react-confetti";

interface ConfettiCursorProps {}
const ConfettiCursor = (props: ConfettiCursorProps) => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [windSpeed, setWindSpeed] = useState(0);
  const [dimension, setDimensions] = useState({ w: 0, h: 0 });
  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      setCursorPos({
        x: e.clientX,
        y: e.clientY,
      });
    });

    window.addEventListener("keydown", e => {
      if (e.key == " ") {
        setWindSpeed(.5)
      }
    })

    window.addEventListener("keyup", e => {
      if (e.key == " ") {
        setWindSpeed(0)
      }
    })
    setDimensions({ w: window.innerWidth, h: innerHeight });
  }, []);
  return (
      <Confetti
        width={dimension.w}
        height={dimension.h}
        confettiSource={{
          x: cursorPos.x,
          y: cursorPos.y,
          w: 10,
          h: 10,
        }}
        wind={windSpeed}
      />
  );
};

export default ConfettiCursor;
