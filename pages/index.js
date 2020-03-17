import Stats from "../components/Stats";
import CountrySelector from "../components/CountrySelector";
import { createGlobalStyle } from "styled-components";
import DailyTracker from "../components/DailyTracker";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import { useState } from "react";

const GlobalStyle = createGlobalStyle`
html{
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
`;

export default function IndexPage() {
  const [date, setDate] = useState(moment().format("M-DD-YYYY"));
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <GlobalStyle />
      <h1>{`Coronavirus Daily Tracker`}</h1>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <h3> Number of cases on: </h3>
        <div style={{ paddingLeft: 20 }}>
          <DatePicker value={date} onChange={setDate} />
        </div>
      </div>
      <DailyTracker date={date} />
      {/* <Stats url="https://covid19.mathdro.id/api"></Stats>
      <CountrySelector /> */}
    </MuiPickersUtilsProvider>
  );
}
