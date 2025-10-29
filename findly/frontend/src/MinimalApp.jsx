import React from 'react';

const MinimalApp = () => {
  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center', 
      backgroundColor: '#f0f0f0',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ color: '#2196f3', fontSize: '3rem' }}>
        🎉 Findly is Working!
      </h1>
      <p style={{ fontSize: '1.5rem', margin: '20px 0' }}>
        If you can see this, React is working correctly.
      </p>
      <button 
        style={{
          padding: '15px 30px',
          fontSize: '1.2rem',
          backgroundColor: '#2196f3',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
        onClick={() => alert('Button clicked! React is working!')}
      >
        Test Button
      </button>
    </div>
  );
};

export default MinimalApp;

