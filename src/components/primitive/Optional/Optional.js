import React, { useEffect, useState } from 'react';
import { getMyProfile } from '../../../http/tming';
import { quickConnect } from '../../../redux/quick';
import { authorized } from '../../../utils/utils';

const Optional = ({ auth, visible, onlyAdmin, children }) => {
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    if (authorized(auth) && onlyAdmin) {
      getMyProfile(auth).then(response => {
        const { role } = response.data;
        if (role === 'ADMIN') setAdmin(true);
      });
    }
  }, [auth, onlyAdmin]);

  if (visible || admin) return <span>{children}</span>;
  else return <div />;
};

Optional.defaultProps = {
  visible: false
};

export default quickConnect(Optional);
