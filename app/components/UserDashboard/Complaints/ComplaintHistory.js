import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ComplaintCard from './ComplaintCard';
import NavigationButtons from './NavigationButtons'; 

const ComplaintHistory = ({ complaintsMessage, token_username }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Navigate to the previous message
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  // Navigate to the next message
  const goToNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, complaintsMessage.length - 1));
  };

  return (
    <div className="shadow-lg rounded-lg w-full p-6 sticky">
      <div className="flex items-center mb-4 mt-10 static">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth="1.5" 
          stroke="currentColor" 
          className="size-10 text-primary dark:text-text-dark mr-2"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" 
          />
        </svg>
        <h2 className="text-2xl font-semibold text-text-dark dark:text-text-light">
          Message History
        </h2>
      </div>

      {/* Display ComplaintCard with animation */}
      <div className="relative mb-6">
        {/* فقط البطاقات داخل TransitionGroup */}
        <TransitionGroup>
          {complaintsMessage.length > 0 && (
            <CSSTransition
              key={currentIndex}
              timeout={600} // Increase the duration for the flip effect
              classNames="flip"
            >
              <div>
                <ComplaintCard 
                  message={complaintsMessage[currentIndex]} 
                  token_username={token_username} 
                />
              </div>
            </CSSTransition>
          )}
        </TransitionGroup>
        {complaintsMessage.length === 0 && (
          <p className="text-center text-gray-500">No complaints available</p>
        )}
      </div>

      {/* Navigation Buttons Component */}
      <NavigationButtons
        currentIndex={currentIndex}
        maxIndex={complaintsMessage.length - 1}
        goToPrevious={goToPrevious}
        goToNext={goToNext}
      />
    </div>
  );
};

export default ComplaintHistory;
