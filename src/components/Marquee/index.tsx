// import React from 'react';
import './Marquee.css';

const Marquee = () => {
  const text = "ingeniously crafted master piece • ";

  return (
    <div className="marquee-container max-md:mt-[150px]">
      <div className="marquee-bar" style={{ transform: 'rotate(3deg)', top: '25%' }}>
        <div className="marquee">
          <div className="marquee-content">{text.repeat(10)}</div>
        </div>
      </div>
      <div className="marquee-bar" style={{ transform: 'rotate(-3deg)', bottom: '25%' }}>
        <div className="marquee">
          <div className="marquee-content">{text.repeat(5)}</div>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
