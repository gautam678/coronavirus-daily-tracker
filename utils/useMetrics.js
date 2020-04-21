import { useState, useEffect } from "react";
import alasql from "alasql";
export default function useMetrics(today, yesterday) {
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchData();
  }, [today]);

  async function callService(date) {
    const data = await fetch(`https://covid19.mathdro.id/api/daily/${date}`);
    let newData = await data.json();
    newData = newData.filter((item) => {
      return item.countryRegion === "US";
    });
    newData = newData.map((item) => {
      return { ...item, confirmed: parseInt(item.confirmed) };
    });
    let aggStateData = alasql(
      "SELECT provinceState, SUM(confirmed) as confirmed FROM ? GROUP BY provinceState",
      [newData]
    );
    return aggStateData;
  }
  async function fetchData() {
    try {
      setLoading(true);
      setError();
      let todayData = await callService(today);
      let yesterdayData = await callService(yesterday);
      let dailyData = [];
      for (let i = 0; i < todayData.length; i++) {
        let newObj = {};
        const yesterdayStateMatch = yesterdayData.filter((item) => {
          return item.provinceState === todayData[i].provinceState;
        });
        if (yesterdayStateMatch.length >= 1) {
          let dailyConfirmed =
            parseInt(todayData[i].confirmed) -
            parseInt(yesterdayStateMatch[0].confirmed);
          newObj = {
            ...todayData[i],
            dailyConfirmed: dailyConfirmed,
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
  return { results, loading, error };
}
