import React, { useEffect, useState } from 'react';
import PageTitle from '../../primitive/PageTitle/PageTitle';
import { quickConnect } from '../../../redux/quick';
import {
  cyphersResource,
  getAttributes,
  openApiRes
} from '../../../http/cyphers';
import {
  ExpansionPanel,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ImageView from '../../primitive/ImageView/ImageView';
import Avatar from '@material-ui/core/Avatar';
import PositionDetail from '../../containers/cyphers/PositionDetail/PositionDetail';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Attributes = ({ uiKit }) => {
  const positionNames = ['공용', '근거리딜러', '원거리딜러', '탱커', '서폿'];
  const [attributes, setAttributes] = useState();
  const [openAttribute, setOpenAttribute] = useState(
    positionNames.map(() => true)
  );
  const splitAttributes = () => {
    if (!attributes) return {};

    const result = {};
    positionNames.map((name, positionCode) => {
      result[name] = attributes.filter(attribute => {
        return attribute.position === positionCode;
      });
    });
    return result;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      uiKit.loading.start();
      await getAttributes()
        .then(response => {
          setAttributes(response.data.attribute);
        })
        .catch(e => {
          uiKit.toaster.cooking(e);
        });
      uiKit.loading.end();
    })();
  }, []);
  return (
    <div>
      <PageTitle
        title={'포지션 특성'}
        explain={'각 포지션별 특성에 대한 정보입니다'}
      />
      <br />
      {attributes &&
        positionNames.map((positionName, positionCode) => {
          const splited = splitAttributes();
          return (
            <ExpansionPanel expanded={openAttribute[positionCode]}>
              <ExpansionPanelSummary
                onClick={() => {
                  setOpenAttribute(
                    openAttribute.map((opened, idx) => {
                      if (idx === positionCode) return !opened;
                      return opened;
                    })
                  );
                }}
                expandIcon={<ExpandMoreIcon />}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <ImageView
                    style={{
                      width: '38px',
                      height: 'auto'
                    }}
                    img={cyphersResource.getPositionIcon(positionCode)}
                  />
                  &nbsp;&nbsp;
                  <h3>{positionName}</h3>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List>
                  {splited[positionName].map(attribute => {
                    console.log(attribute);
                    return (
                      <ListItem
                        onClick={() => {
                          uiKit.popup.make(
                            <PositionDetail positionId={attribute.code} />
                          );
                        }}
                        style={{
                          cursor: 'pointer'
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            src={openApiRes.getPositionIcon(attribute.code)}
                          />
                        </ListItemAvatar>
                        <ListItemText>
                          <h4>{attribute.name}</h4>
                          <p className={'explain'}>{attribute.explain}</p>
                        </ListItemText>
                      </ListItem>
                    );
                  })}
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        })}
    </div>
  );
};

export default quickConnect(Attributes);
