import React from 'react';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';
import Fab from '@material-ui/core/Fab';
import { IoIosThumbsDown, IoIosThumbsUp } from 'react-icons/io';
import PropTypes from 'prop-types';

const PostEvaluator = ({ good, onGood, bad, onBad }) => {
  return (
    <AlignLayout align={'center'}>
      <Fab onClick={onGood} color={'primary'} variant="extended">
        <IoIosThumbsUp
          style={{
            fontSize: '20px'
          }}
        />
        &nbsp;
        {good}
      </Fab>
      &nbsp;&nbsp;&nbsp;
      <Fab onClick={onBad} color={'secondary'} variant="extended">
        <IoIosThumbsDown
          style={{
            fontSize: '20px'
          }}
        />
        &nbsp;
        {bad}
      </Fab>
    </AlignLayout>
  );
};

PostEvaluator.propTypes = {
  good: PropTypes.number,
  onGood: PropTypes.func,
  bad: PropTypes.number,
  onBad: PropTypes.func
};

export default PostEvaluator;
