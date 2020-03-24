import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import ImageView from '../../../primitive/ImageView/ImageView';
import { cyphersResource, openApiRes } from '../../../../http/cyphers';
import CardContent from '@material-ui/core/CardContent';
import PositionDetail from '../PositionDetail/PositionDetail';
import { quickConnect } from '../../../../redux/quick';

const AttributeCombination = ({ positionName, explain, attributes, uiKit }) => {
  const openDetailPopup = positionId => {
    uiKit.popup.make(<PositionDetail positionId={positionId} />);
  };

  return (
    <Card
      style={{
        background: 'none',
        boxShadow: 'none'
      }}
    >
      <CardHeader
        style={{
          padding: 0,
          paddingBottom: '16px'
        }}
        avatar={
          <Avatar aria-label="recipe">
            <ImageView img={cyphersResource.getPositionIcon(positionName)} />
          </Avatar>
        }
        title={positionName}
        subheader={explain}
      />
      <CardContent
        style={{
          padding: 0
        }}
      >
        <div>
          {attributes.map(attribute => {
            return (
              <>
                <ImageView
                  onClick={() => {
                    openDetailPopup(attribute);
                  }}
                  style={{
                    width: '48px'
                  }}
                  img={openApiRes.getPositionIcon(attribute)}
                />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default quickConnect(AttributeCombination);
