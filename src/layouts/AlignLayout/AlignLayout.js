import React from 'react';
import PropTypes from 'prop-types';

export default function AlignLayout({ align, children, className, style }) {
  return (
    <div className={className} style={{ ...style, textAlign: align }}>
      {children}
    </div>
  );
}

AlignLayout.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right']),
  className: PropTypes.string,
  style: PropTypes.object
};

AlignLayout.defaultProps = {
  align: 'left',
  className: '',
  style: {}
};
