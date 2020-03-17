import { useState, useEffect } from "react";
import useMetrics from "../utils/useMetrics";
import styled from "styled-components";
import moment from "moment";
import MapChart from "./MapChart";
export default function Stats({ date }) {
  return (
    <div style={{ width: 750, height: 750 }}>
      <MapChart date={date} />
    </div>
  );
}
