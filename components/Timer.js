import React, { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import useMeasure from "./useMeasure";

function Timer2() {
  const [open, toggle] = useState(false);
  const [containerBind, containerProps] = useMeasure();
  const [barBind, barProps] = useMeasure();
  const [likes, setLikes] = useState(1);
  const [displayLikes, setDisplayLikes] = useState(false);
  const [message, setMessage] = useState(" ");

  useEffect(() => {
    const completed = barProps.width / containerProps.width;

    if (completed < 0.1) {
      setDisplayLikes(false);
      setMessage(" ");
    }
    if (completed > 0.1 && completed < 0.3) {
      setMessage("Keep Hyping!");
      setDisplayLikes(true);
    }
    if (completed > 0.3 && completed < 0.6) {
      setMessage("Don't Give Up!");
    }
    if (completed > 0.6) {
      setMessage("Almost Done!");
    }
    if (completed === 1) {
      setMessage(" ");
      setDisplayLikes(false);
    }
  }, [barProps.width]);

  const barAnimatedProps = useSpring({
    width: open ? containerProps.width : 0,
    config: { duration: 4000 },
  });

  return (
    <div className="main-container">
      <div {...containerBind} className="main" onClick={() => toggle(!open)}>
        <animated.div {...barBind} className="fill" style={barAnimatedProps} />
        <div className="message-container">
          <h2 className="bg">{message}</h2>
          {displayLikes && <h2 className="likes">+{likes}</h2>}
        </div>
      </div>
      <button className="like-button" onClick={() => setLikes(likes + 1)}>
        Like
      </button>
    </div>
  );
}

export default Timer2;
