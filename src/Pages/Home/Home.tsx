import { IStackStyles, Stack, useTheme } from '@fluentui/react';
import UniverseMap from '../../Components/UniverseMap/UniverseMap';
import { useAppSelector } from '../../State/hooks';
import { selectFetchNumberOfJumps } from '../../State/Settings/settingsSlice';
import { selectLocatedAtSystemId } from '../../State/Universe/universeSlice';

function Home() {

  const locatedAt = useAppSelector(selectLocatedAtSystemId);
  const mapSize = useAppSelector(selectFetchNumberOfJumps);

  const theme = useTheme();

  const homeContainerStyle: IStackStyles = {
    root: {
      background: theme.palette.neutralTertiary,
      height: "100%"
    },
  };

  return (
    <Stack grow styles={homeContainerStyle}>
      <UniverseMap systemId={locatedAt} mapSize={mapSize} />
    </Stack>
  );
}

export default Home;
