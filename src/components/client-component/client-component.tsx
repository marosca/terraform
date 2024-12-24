'use client';

import { useEffect, useState } from 'react';

export const ClientComponet = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div>{loading ? <h2>Cargando...</h2> : <h2>Client Component</h2>}</div>
  );
};
