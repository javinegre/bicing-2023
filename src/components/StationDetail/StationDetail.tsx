import React, { FC, useMemo } from 'react';
import CustomSvgIcon from '@components/Icons/CustomSvgIcon';
import StationStatusBar from '@components/StationStatusBar/StationStatusBar';
import useStation from '@hooks/useStation';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
import { useAppDispatch } from '@store/hooks';
import { selectStation } from '@store/ui';
import { Station } from 'src/types';

interface StationDetailProps {
  stationId: Station['id'];
}

const StationDetail: FC<StationDetailProps> = (props) => {
  const { stationId } = props;

  const stations = useStation();
  const dispatch = useAppDispatch();

  const station = useMemo(() => stations?.find((st) => st.id === stationId), [stationId, stations]);

  const iconOpacity = 0.5;

  const _onClick = () => {
    if (station) {
      dispatch(selectStation({ id: station.id, lat: station.lat, lng: station.lng }));
    }
  };

  if (!station) {
    return <></>;
  }

  return (
    <Box onClick={_onClick} sx={{ userSelect: 'none', cursor: 'pointer' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex' }}>
          <Box display="flex" alignItems="center" mr={1}>
            <Typography fontSize="1.8em">{station.mechanical + station.electrical}</Typography>
            <CustomSvgIcon
              icon="bike"
              size={24}
              sx={{ position: 'relative', top: 1, ml: 0.5, opacity: iconOpacity }}
            />
          </Box>
          <Box display="flex" alignItems="center" mr={1}>
            <Typography fontSize="1.2em">{station.mechanical}</Typography>
            <CustomSvgIcon icon="gears" size={12} sx={{ ml: 0.5, opacity: iconOpacity }} />
          </Box>
          <Box display="flex" alignItems="center">
            <Typography fontSize="1.2em">{station.electrical}</Typography>
            <CustomSvgIcon icon="bolt" size={12} sx={{ ml: 0.2, opacity: iconOpacity }} />
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography fontSize="1.8em">{station.docks}</Typography>
          <CustomSvgIcon
            icon="parking"
            size={20}
            sx={{ position: 'relative', top: 1, opacity: iconOpacity }}
          />
        </Box>
      </Box>
      <StationStatusBar station={station} size="default" />
      <Typography variant="h6">{station.name}</Typography>
    </Box>
  );
};

export default StationDetail;
