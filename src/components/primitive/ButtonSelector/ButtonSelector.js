import React, { useState } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

const ButtonSelector = ({ onUpdate, defaultItemId, items }) => {
  const [selectedItemId, setSelectedItemId] = useState(defaultItemId);

  return (
    <ButtonGroup>
      {items.map(item => {
        return (
          <Button
            key={item.id}
            color={item.color ? item.color : 'primary'}
            variant={selectedItemId !== item.id ? 'outlined' : 'contained'}
            onClick={() => {
              setSelectedItemId(item.id);
              onUpdate(item.id);
            }}
          >
            {item.label}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

ButtonSelector.defaultProps = {
  onUpdate: selectedItemId => {},
  items: [],
  defaultItemId: ''
};

export default ButtonSelector;
