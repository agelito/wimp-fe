import { Container } from 'react-bootstrap';
import UniverseMap from '../../Components/UniverseMap/UniverseMap';
import { useAppSelector } from '../../State/hooks';
import { selectFetchNumberOfJumps } from '../../State/Settings/settingsSlice';
import { selectLocatedAtSystemId } from '../../State/Universe/universeSlice';
import './Home.css';

function Home() {

  const locatedAt = useAppSelector(selectLocatedAtSystemId);
  const mapSize = useAppSelector(selectFetchNumberOfJumps);

  return (
    <Container fluid className={"page-fill"}>
      <UniverseMap systemId={locatedAt} mapSize={mapSize} />
    </Container>
  );
}

export default Home;
