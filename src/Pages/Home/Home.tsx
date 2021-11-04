import { IStackStyles, Stack } from '@fluentui/react';
import { IntelNotifications } from '../../Components/Intel/IntelNotifications';
import { IntelPicture } from '../../Components/Intel/IntelPicture';
import UniverseMap from '../../Components/UniverseMap/UniverseMap';
import { useAppSelector } from '../../State/hooks';
import { selectEnabledNotifications, selectFetchNumberOfJumps } from '../../State/Settings/settingsSlice';
import { selectLocatedAtSystemId } from '../../State/Universe/universeSlice';

function Home() {

  const locatedAt = useAppSelector(selectLocatedAtSystemId);
  const mapSize = useAppSelector(selectFetchNumberOfJumps);
  const enabledNotifications = useAppSelector(selectEnabledNotifications);

  const homeContainerStyle: IStackStyles = {
    root: {
      height: "100%"
    },
  };

  return (
    <Stack grow styles={homeContainerStyle}>
      <IntelPicture />
      {enabledNotifications && <IntelNotifications />}
      <UniverseMap systemId={locatedAt} mapSize={mapSize} />
    </Stack>
  );
}

export default Home;
