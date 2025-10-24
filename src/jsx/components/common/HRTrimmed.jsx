// src/components/HRTrimmed.jsx
import React from 'react';

const HRTrimmed = ({
}) => {
  return (
    <div
      style={{
        height: '3px',
        width: '85%',
        margin: '0.75rem auto',
        background:
          'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(248, 248, 242, 0.4) 50%, rgba(255,255,255,0) 100%)',
        borderRadius: '1px',
      }}
    />
  );
};

export default HRTrimmed;
