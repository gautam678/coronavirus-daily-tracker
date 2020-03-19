import styled from "styled-components";

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StatBlock = styled.div`
  background: ${props => (props.inputColor ? "#e6634c" : "#84de64")};
  font-size: 1rem;
  padding: 1rem;
  border-radius: 2rem;
  display: grid;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

export default function Stats({ states }) {
  return (
    <StatGrid>
      {states.map(state => {
        return (
          <StatBlock
            key={state.provinceState}
            inputColor={state.dailyConfirmed > 0}
          >
            <h3>{state.provinceState}</h3>
            <span>{Math.abs(state.dailyConfirmed)}</span>
          </StatBlock>
        );
      })}
    </StatGrid>
  );
}
