'use client';

import { useEffect, useState } from 'react';

export default function CountryLookup() {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCountry = async () => {
      try {
        const response = await fetch(
          `https://ipinfo.io?token=${process.env.NEXT_PUBLIC_IPINFO_TOKEN}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const country = data.country;
        if (country) {
          setCountry(country);
        } else {
          setCountry('Country not found');
        }
      } catch (error) {
       // console.error('Error fetching country:', error);
        setError(`No country information available`);
      } finally {
        setLoading(false);
      }
    };

    getCountry();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>No country information available</div>;

  return <div>{country || 'Turkish'}</div>;
}