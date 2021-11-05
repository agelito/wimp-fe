import { IStackStyles, Stack } from '@fluentui/react';
import { DesktopNotifications } from '../../Components/Intel/DesktopNotifications';
import { IntelPicture } from '../../Components/Intel/IntelPicture';
import UniverseMap from '../../Components/UniverseMap/UniverseMap';
import { useAppSelector } from '../../State/hooks';
import { selectDesktopNotifications, selectFetchNumberOfJumps } from '../../State/Settings/settingsSlice';
import { selectLocatedAtSystemId } from '../../State/Universe/universeSlice';

function Home() {

  const locatedAt = useAppSelector(selectLocatedAtSystemId);
  const mapSize = useAppSelector(selectFetchNumberOfJumps);
  const desktopNotifications = useAppSelector(selectDesktopNotifications);

  const homeContainerStyle: IStackStyles = {
    root: {
      height: "100%"
    },
  };

  return (
    <Stack grow styles={homeContainerStyle}>
      <IntelPicture />
      {desktopNotifications && <DesktopNotifications />}
      <UniverseMap systemId={locatedAt} mapSize={mapSize} />
    </Stack>
  );
}

export default Home;
