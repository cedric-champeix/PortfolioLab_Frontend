import Box from '@mui/material/Box';
import parse from 'html-react-parser';
import React from 'react';
import { Component } from '../../../../types/entities/Component.ts';

interface Props {
  component: Component;
}

export const ViewerTextComponent: React.FunctionComponent<Props> = ({
  component,
}) => {
  const text = parse(component.data.text || '');

  return <Box sx={{ width: '100%' }}>{text}</Box>;
};
