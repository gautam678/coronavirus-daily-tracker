import { useState, useEffect } from "react";

export default function useStats(today, yesterday) {
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function callService(date) {
    const data = await fetch(`https://covid19.mathdro.id/api/daily/${date}`);
    let newData = await data.json();
    newData = newData.filter(item => {
      return item.countryRegion === "US";
    });

    return newData;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError();
        let todayData = await callService(today);
        let yesterdayData = await callService(yesterday);
        let dailyData = [];
        for (let i = 0; i < todayData.length; i++) {
          let newObj = {};
          const yesterdayStateMatch = yesterdayData.filter(item => {
            return item.provinceState === todayData[i].provinceState;
          });
          if (yesterdayStateMatch.length >= 1) {
            let dailyConfirmed =
              parseInt(todayData[i].confirmed) -
              parseInt(yesterdayStateMatch[0].confirmed);
            newObj = {
              ...todayData[i],
              dailyConfirmed: dailyConfirmed
            };
            dailyData.push(newObj);
          }
        }
        setResults(dailyData);
        setLoading(false);
      } catch (e) {
        setError(e);
      }
    }
    fetchData();
  }, [today, yesterday]);
  return { results, loading, error };
}
