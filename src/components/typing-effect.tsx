"use client";

import { useState, useEffect } from 'react';

const TypingEffect = ({ texts }: { texts: string[] }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(75);

  useEffect(() => {
    const handleTyping = () => {
      const currentText = texts[textIndex];
      if (isDeleting) {
        setDisplayedText((prev) => prev.substring(0, prev.length - 1));
        setTypingSpeed(50);
      } else {
        setDisplayedText((prev) => currentText.substring(0, prev.length + 1));
        setTypingSpeed(75);
      }

      if (!isDeleting && displayedText === currentText) {
        setTimeout(() => setIsDeleting(true), 4000);
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }
    };

    const typingTimeout = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(typingTimeout);
  }, [displayedText, isDeleting, texts, textIndex, typingSpeed]);

  return (
    <p className="mb-4 text-2xl md:text-3xl font-semibold md:font-extrabold text-primary h-16 md:h-10">
      {displayedText}
      <span className="inline-block h-8 w-1 animate-ping bg-primary" />
    </p>
  );
};

export default TypingEffect;
