import React, { useState } from 'react';
import styles from './SearchBox.module.css';
import PropTypes from 'prop-types';
import { quickConnect } from '../../../redux/quick';
import { MdSearch } from 'react-icons/md';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';

const SearchBox = ({
  className,
  hint,
  type,
  submit,
  onChange,
  buttonContent,
  initValue
}) => {
  const [value, setValue] = useState(initValue);

  const flush = () => {
    setValue('');
  };

  return (
    <div className={classNames(styles.wrapper, className)}>
      <TextField
        style={{
          flex: 1
        }}
        fullWidth
        size={'small'}
        value={value}
        variant={'outlined'}
        type={type}
        placeholder={hint}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            if (submit(value)) flush();
          }
        }}
        onChange={e => {
          if (onChange) onChange(e.target.value);
          setValue(e.target.value);
        }}
      />
      <Button
        variant={'contained'}
        color={'secondary'}
        onClick={() => {
          if (submit(value)) flush();
        }}
      >
        {buttonContent}
      </Button>
    </div>
  );
};

SearchBox.propTypes = {
  hint: PropTypes.string,
  type: PropTypes.string,
  submit: PropTypes.func,
  onChange: PropTypes.func,
  buttonContent: PropTypes.oneOf([PropTypes.element, PropTypes.string]),
  initValue: PropTypes.string,
  className: PropTypes.string
};
SearchBox.defaultProps = {
  hint: '',
  type: 'text',
  submit: () => {},
  onChange: value => {},
  buttonContent: <MdSearch color={'white'} />,
  initValue: '',
  className: ''
};
export default quickConnect(SearchBox);
