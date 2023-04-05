import React, { FC } from 'react';
import CrossHairIconSvg from '@assets/icons/hints/crosshair.svg?url';
import config from '@config';
import Box from '@mui/material/Box/Box';
import { useAppSelector } from '@store/hooks';
import { mapZoomSelector } from '@store/map';

const MapHints: FC = () => {
  const zoom = useAppSelector(mapZoomSelector);

  const nearbyAreaDiameter: number | undefined = config.app.nearbyAreaHintDiameter[zoom];

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        {nearbyAreaDiameter ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={nearbyAreaDiameter}
            height={nearbyAreaDiameter}
            viewBox={`0 0 ${nearbyAreaDiameter} ${nearbyAreaDiameter}`}
            fill="#000000"
          >
            <circle
              cx={nearbyAreaDiameter / 2}
              cy={nearbyAreaDiameter / 2}
              r={nearbyAreaDiameter / 2 - 1}
              stroke="#406090"
              strokeWidth="1"
              fill="none"
              opacity="0.4"
              strokeDasharray="5"
            />
          </svg>
        ) : null}
        <img style={{ position: 'absolute' }} src={CrossHairIconSvg} alt="Your SVG" />
      </Box>
    </>
  );
};

export default MapHints;
