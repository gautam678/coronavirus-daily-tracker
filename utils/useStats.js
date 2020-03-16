import { useState, useEffect } from "react";

export default function useStats(url) {
  const [stats, setStats] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    console.log("mounting");
    async function fetchData() {
      try {
        setLoading(true);
        setError();
        console.log("fetch");
        const data = await fetch(url);
        const newData = await data.json();
        setStats(newData);
        setLoading(false);
      } catch (e) {
        setError(e);
      }
    }
    fetchData();
  }, [url]);
  return { stats, loading, error };
}
