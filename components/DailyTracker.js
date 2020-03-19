import { useState, useEffect, useMemo } from "react";
import useMetrics from "../utils/useMetrics";
import styled from "styled-components";
import moment from "moment";
import MapChart from "./MapChart";
import Stats from "./Stats";

const RowElements = styled.div`
  display: flex;
  flex-direction: "row";
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export default function DailyTracker({ date }) {
  const yesterday = moment(date)
    .subtract(1, "days")
    .format("M-DD-YYYY");
  const { results, loading, error } = useMetrics(date, yesterday);
  console.log(results);
  if (!results) return <p> Loading...</p>;
  if (error) return <p> Error..</p>;
  return (
    <RowElements>
      {results.length > 0 ? (
        <>
          <div style={{ width: 750, height: 750 }}>
            <MapChart results={results} />
          </div>
          <div
            style={{ maxHeight: 750, overflowY: "scroll", overflowX: "hidden" }}
          >
            <Stats states={results} />
          </div>
        </>
      ) : (
        <h2>The data for this date is not available. Choose another date.</h2>
      )}
    </RowElements>
  );
}
