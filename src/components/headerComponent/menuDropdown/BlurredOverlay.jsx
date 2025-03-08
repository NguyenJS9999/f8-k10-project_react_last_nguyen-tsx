import React from "react";

const BlurredOverlay = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed top-[60px] left-0 w-full h-[calc(100vh-60px)] bg-black bg-opacity-50 flex justify-center items-start"
          onClick={onClose} 
        >
          <div
            className="bg-white w-full max-w-md shadow-lg rounded-b-2xl p-4"
            onClick={(e) => e.stopPropagation()} // Ngăn click trong menu đóng overlay
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default BlurredOverlay;
