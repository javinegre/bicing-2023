import React, { FC } from 'react';
import config from '@config';
import Box from '@mui/material/Box/Box';
import { useAppSelector } from '@store/hooks';
import { mapZoomSelector } from '@store/map';

const MapHints: FC = () => {
  const zoom = useAppSelector(mapZoomSelector);

  const nearbyAreaDiameter: number | undefined = config.app.nearbyAreaHintDiameter[zoom];

  const crossSize = zoom <= 14 ? 2 : 4;

  return (
    <>
      {nearbyAreaDiameter ? (
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
            <path
              d={`M${nearbyAreaDiameter / 2} ${nearbyAreaDiameter / 2 - crossSize} L${
                nearbyAreaDiameter / 2
              } ${nearbyAreaDiameter / 2 + crossSize} Z`}
              stroke="#406090"
              strokeWidth="1"
              transform="translate(0,-2)"
            />{' '}
            <path
              d={`M${nearbyAreaDiameter / 2 - crossSize} ${nearbyAreaDiameter / 2} L${
                nearbyAreaDiameter / 2 + crossSize
              } ${nearbyAreaDiameter / 2} Z`}
              stroke="#406090"
              strokeWidth="1"
              transform="translate(0,-2)"
            />
          </svg>
        </Box>
      ) : null}
    </>
  );
};

export default MapHints;
