import React from 'react';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Avatar from '@material-ui/core/Avatar';

const pages = (min, max, current, paging) => {
  const pageList = [];

  //start from current- 2
  let cursor = Math.max(min, current - 2);
  while (pageList.length <= 3 && cursor <= max) {
    const _cursor = cursor;
    pageList.push(
      <IconButton
        onClick={() => {
          paging(_cursor);
        }}
      >
        <Avatar
          style={{
            backgroundColor: cursor === current ? '#303f9f' : '#999999'
          }}
        >
          {cursor}
        </Avatar>
      </IconButton>
    );
    cursor++;
  }

  return pageList;
};

const Pagenation = ({ min, max, current, paging }) => {
  console.log('min', min, 'max', max, 'current', current);
  if (min === max) {
    return <div />;
  }

  return (
    <AlignLayout align={'center'}>
      <IconButton
        onClick={() => {
          if (current - 1 >= min) paging(current - 1);
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      {pages(min, max, current, paging)}
      <IconButton
        onClick={() => {
          if (current + 1 <= max) paging(current + 1);
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </AlignLayout>
  );
};

Pagenation.defaultProps = {
  max: 5,
  min: 1,
  current: 1,
  paging: page => {}
};

export default Pagenation;
