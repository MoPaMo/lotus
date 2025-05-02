import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${(props) => props.theme.base};
`;

const Head = styled.h1`
  font-size: 24px;
  color: ${(props) => props.theme.text};
  margin-bottom: 20px;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
`;

const Card = styled.div`
  background-color: ${(props) => props.theme.surface0};
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  text-align: center;
  width: 200px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      { title: 'Atmen', href: '/relaxation/breathing', symbol: 'lungs', color: 'pink' },
      { title: 'LoFi', href: '/relaxation/lofi', symbol: 'headphones', color: 'blue' },
      { title: 'White Noise', href: '/relaxation/noise', symbol: 'wave-square', color: 'mauve' },
      { title: 'Sport', href: '/sport', symbol: 'broom-ball', color: 'green' },
      { title: '54321', href: '/relaxation/54321', symbol: 'list-ol', color: 'red' },
      { title: 'Meditation', href: '/relaxation/meditation', symbol: 'om', color: 'yellow' },
    ]);
  }, []);

  return (
    <Container>
      <Head>Lotus</Head>
      <Grid>
        {data.map((item, index) => (
          <Card key={index} onClick={() => window.location.href = item.href}>
            <h2>{item.title}</h2>
            <p>{item.symbol}</p>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
