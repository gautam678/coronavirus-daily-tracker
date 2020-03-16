import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import useMetrics from "../utils/useMetrics";
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
import moment from "moment";
import { scaleQuantile } from "d3-scale";
const MapChart = () => {
  const { results, loading, error } = useMetrics(
    moment().format("M-DD-YYYY"),
    moment()
      .subtract(1, "days")
      .format("M-DD-YYYY")
  );
  console.log(results);
  if (!results) return <p> Loading...</p>;
  if (error) return <p> Error..</p>;
  const colorScale = scaleQuantile()
    .domain(results.map(d => d.dailyConfirmed))
    .range([
      "#ffedea",
      "#ffcec5",
      "#ffad9f",
      "#ff8a75",
      "#ff5533",
      "#e2492d",
      "#be3d26",
      "#9a311f",
      "#782618"
    ]);
  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => {
            const cur = results.find(
              s => s.provinceState === geo.properties.name
            );
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={cur ? colorScale(cur.dailyConfirmed) : "#EEE"}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};

export default MapChart;
