import React, { FC } from 'react';
import Button from '@mui/material/Button/Button';

const CircleButton: FC<{
  size: number;
  children: React.ReactNode;
  opacity?: number;
  mb?: number;
  mr?: number;
  disabled?: boolean;
  pointerEvents?: 'auto' | 'none';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}> = (props) => {
  const {
    size,
    children,
    opacity,
    mb,
    mr,
    pointerEvents = 'auto',
    disabled = false,
    onClick,
  } = props;

  return (
    <Button
      variant="contained"
      color="primary"
      sx={(theme) => ({
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        borderRadius: '50%',
        background: theme.palette.gradients.main,
        mr,
        mb,
        opacity,
        pointerEvents,
      })}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default CircleButton;
