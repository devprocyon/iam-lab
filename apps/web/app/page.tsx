'use client';

import { useState } from 'react';

export default function Home() {
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleLogin = () => {
    window.location.href = `${API_URL}/login`;
  };

  const fetchUserInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/user-info`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.status === 401) {
        throw new Error('(Unauthorized) Token is invalid or missing.');
      }

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setUserData(data);
    } catch (err) {
      const error = err as { message: string };
      setError(error.message);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Laboratory work</h1>
      
      <div style={styles.buttonGroup}>
        <button onClick={handleLogin} style={styles.loginButton}>
          Login
        </button>
        
        <button 
          onClick={fetchUserInfo} 
          style={styles.infoButton}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Get User Info'}
        </button>
      </div>

      {error && (
        <div style={styles.errorBox}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {userData && (
        <div style={styles.dataBox}>
          <h3>Profile data:</h3>
          <pre style={styles.pre}>
            {JSON.stringify(userData, null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
}

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    color: '#333',
    borderBottom: '2px solid #eaeaea',
    paddingBottom: '1rem',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    margin: '2rem 0',
  },
  loginButton: {
    padding: '12px 24px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  infoButton: {
    padding: '12px 24px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  errorBox: {
    color: '#d32f2f',
    backgroundColor: '#ffebee',
    padding: '1rem',
    border: '1px solid #ffcdd2',
    borderRadius: '5px',
    marginBottom: '1rem',
  },
  dataBox: {
    background: '#f9f9f9',
    padding: '1.5rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  pre: {
    whiteSpace: 'pre-wrap' as const,
    wordBreak: 'break-all' as const,
    fontSize: '0.9rem',
    backgroundColor: '#272822',
    color: '#f8f8f2',
    padding: '1rem',
    borderRadius: '5px',
  },
};
