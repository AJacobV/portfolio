import React, { useState } from 'react';

function WizBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="wiz-demo-banner">
      <div className="wiz-demo-banner-content">
        <strong>Notice:</strong> This is a frontend replica demo. Data (like user accounts and quizzes) are only saved in session storage and will be wiped out once the browser tab is closed or cleared.
      </div>
      <button className="wiz-demo-banner-close" onClick={() => setIsVisible(false)}>
        &times;
      </button>
    </div>
  );
}

export default WizBanner;
