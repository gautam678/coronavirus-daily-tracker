import useStats from "../utils/useStats";
import styled from "styled-components";

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
`;
const StatBlock = styled.div`
  background: #f1f1f1;
  font-size: 2rem;
  padding: 2rem;
  border-radius: 2rem;
  display: grid;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

export default function Stats({ url }) {
  const { stats, loading, error } = useStats(url);
  if (!stats) return <p> Loading...</p>;
  if (error) return <p> Error..</p>;
  return (
    <StatGrid>
      <StatBlock>
        <h3>Confirmed:</h3>
        <span>{stats.confirmed.value}</span>
      </StatBlock>
      <StatBlock>
        <h3>Deaths:</h3>
        <span>{stats.deaths.value}</span>
      </StatBlock>
      <StatBlock>
        <h3>Recovered:</h3>
        <span>{stats.recovered.value}</span>
      </StatBlock>
    </StatGrid>
  );
}
