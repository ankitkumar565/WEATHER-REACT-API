import React from 'react';

function SimpleApp() {
  return (
    <div style={{padding: '20px', backgroundColor: '#1f4ea3', minHeight: '100vh', color: 'white'}}>
      <h1>Weather App Test</h1>
      <p>If you can see this, React is working!</p>
      <button onClick={() => alert('Button works!')}>Test Button</button>
    </div>
  );
}

export default SimpleApp;