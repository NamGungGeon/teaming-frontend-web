import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ButtonGroup from 'reactstrap/es/ButtonGroup';
import { Button } from 'reactstrap';

const ButtonSelector = ({ onUpdate, defaultItemId, items }) => {
  const [selectedItemId, setSelectedItemId] = useState(defaultItemId);

  return (
    <ButtonGroup>
      {items.map(item => {
        return (
          <Button
            key={item.id}
            color={item.color ? item.color : 'primary'}
            outline={selectedItemId !== item.id}
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
