import CountrySelector from "../components/CountrySelector";
import { createGlobalStyle } from "styled-components";
import DailyTracker from "../components/DailyTracker";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import { useState } from "react";
import styled from "styled-components";
moment.locale("en");

const GlobalStyle = createGlobalStyle`
html{
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default function IndexPage() {
  const [date, setDate] = useState(moment().format("M-DD-YYYY"));

  return (
    <MuiPickersUtilsProvider
      libInstance={moment}
      utils={MomentUtils}
      locale={"en"}
    >
      <GlobalStyle />
      <div>
        <h1>{`COVID-19 Daily Tracker`}</h1>
        <Content>
          <h3> Number of cases on: </h3>
          <div style={{ paddingLeft: 20 }}>
            <DatePicker value={date} onChange={setDate} />
          </div>
        </Content>
      </div>
      <DailyTracker date={date} />
    </MuiPickersUtilsProvider>
  );
}
