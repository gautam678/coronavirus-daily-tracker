import Stats from "../components/Stats";
import CountrySelector from "../components/CountrySelector";
import { createGlobalStyle } from "styled-components";
import DailyTracker from "../components/DailyTracker";
import moment from "moment";
const GlobalStyle = createGlobalStyle`
html{
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
`;

export default function IndexPage() {
  return (
    <div>
      <GlobalStyle />
      <h1> {`Coronavirus Daily Tracker: ${moment().format("M-DD-YYYY")}`}</h1>
      <h3> Are there new cases today?</h3>
      <DailyTracker />
      {/* <Stats url="https://covid19.mathdro.id/api"></Stats>
      <CountrySelector /> */}
    </div>
  );
}
