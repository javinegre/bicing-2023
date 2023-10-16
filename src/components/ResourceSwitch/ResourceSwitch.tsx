import React, { FC } from 'react';
import CustomSvgIcon from '@components/Icons/CustomSvgIcon';
import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { resourceShownSelector, toggleResourceShown } from '@store/ui';
import { StationResourceTypeEnum } from 'src/types';

const ResourceSwitch: FC = () => {
  const resourceShown = useAppSelector(resourceShownSelector);
  const isBikesActive = resourceShown === StationResourceTypeEnum.bikes;

  const dispatch = useAppDispatch();

  return (
    <Box
      position="relative"
      sx={{
        width: 90,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#000000A0',
        cursor: 'pointer',
      }}
      onClick={() => {
        dispatch(toggleResourceShown());
      }}
    >
      <Button
        variant="contained"
        color="primary"
        sx={(theme) => ({
          width: '48px',
          height: '48px',
          minWidth: '48px',
          background: theme.palette.gradients.main,
          borderRadius: '50%',
          position: 'relative',
          transform: `translateX(${isBikesActive ? 0 : 42}px)`,
          transition: 'transform ease 200ms',
        })}
      />
      <Box
        position="absolute"
        display="flex"
        sx={{
          top: 0,
          left: 0,
          width: 48,
          height: 48,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CustomSvgIcon icon="bike" size="28" />
      </Box>
      <Box
        position="absolute"
        display="flex"
        sx={{
          top: 0,
          right: 0,
          width: 48,
          height: 48,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CustomSvgIcon icon="parking" size="18" />
      </Box>
    </Box>
  );
};

export default ResourceSwitch;
