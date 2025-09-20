import { useEffect, useState } from "react";
import "./WelcomeAnimation.css";

const WelcomeAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Welcome to The Unique Tuition Classes";

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
        setTimeout(onComplete, 1000); // Hold for 1 second before completing
      }
    }, 70); // Typing speed (100ms per character)

    return () => clearInterval(typingInterval);
  }, [onComplete]);

  return (
    <div className="welcome-container">
      <h1 className="welcome-text">{displayText}<span className="cursor">|</span></h1>
    </div>
  );
};

export default WelcomeAnimation;