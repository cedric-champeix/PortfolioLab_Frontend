import Button from '@mui/material/Button';
import React from 'react';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import './css/components.css';

interface Props {
  id: string;
  move: (id: string, body: { newIndex: number; distance: number }) => void;
  prevIndex?: number;
  nextIndex?: number;
}

export const MoveComponent: React.FunctionComponent<Props> = ({
  id,
  move,
  prevIndex,
  nextIndex,
}) => {
  const moveUp = async () => {
    const body = {
      newIndex: prevIndex ?? -5,
      distance: 2,
    };

    move(id, body);
  };

  const moveDown = async () => {
    const body = {
      newIndex: nextIndex ?? -5,
      distance: 2,
    };

    move(id, body);
  };

  return (
    <div>
      {prevIndex ? (
        <Button
          style={{
            height: '100%',
            width: '100%',
            borderRadius: '15px',
          }}
          onClick={moveUp}
        >
          <SlArrowUp size="35px" className="move-arrow" />
        </Button>
      ) : (
        <Button
          style={{
            height: '100%',
            width: '100%',
            borderRadius: '15px',
          }}
          onClick={moveDown}
        >
          <SlArrowDown size="35px" className="move-arrow" />
        </Button>
      )}
    </div>
  );
};
