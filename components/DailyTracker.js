import { useState, useEffect, useMemo } from "react";
import useMetrics from "../utils/useMetrics";
import styled from "styled-components";
import moment from "moment";
import MapChart from "./MapChart";
import Stats from "./Stats";

const RowElements = styled.div`
  display: flex;
  flex-direction: "row";
  @media (max-width: 412px) {
    flex-direction: column;
  }
`;

const ScrollBar = styled.div`
  max-height: 750px;
  overflow-y: scroll;
  @media (max-width: 412px) {
    overflow-x: visible;
  }
`;

export default function DailyTracker({ date }) {
  const yesterday = moment(date)
    .subtract(1, "days")
    .format("M-DD-YYYY");
  const { results, loading, error } = useMetrics(date, yesterday);
  if (!results) return <p> Loading...</p>;
  if (error) return <p> Error..</p>;
  return (
    <RowElements>
      {results.length > 0 ? (
        <>
          <div style={{ width: 750, height: 750 }}>
            <MapChart results={results} />
          </div>
          <ScrollBar>
            <Stats states={results} />
          </ScrollBar>
        </>
      ) : (
        <h2>The data for this date is not available. Choose another date.</h2>
      )}
    </RowElements>
  );
}
