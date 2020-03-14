import React, { useEffect, useState } from 'react';
import { cyphersResource, getRecommendItems } from '../../../../http/cyphers';
import styles from './RecommendItems.module.css';
import ImageView from '../../../primitive/ImageView/ImageView';
import ImageViewGroup from '../../ImageViewGroup/ImageViewGroup';
import { Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { quickConnect } from '../../../../redux/quick';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Spinner from '../../../primitive/Spinner/Spinner';

const slotOrder = [
  'HAND',
  'HEAD',
  'CHEST',
  'WAIST',
  'LEG',
  'FOOT',
  'ACCESSORY_1',
  'ACCESSORY_2',
  'ITEM_RECOVERY',
  'ITEM_MOVE',
  'ITEM_ATTACK',
  'ITEM_DEFENSE',
  'ITEM_SPECIAL',
  'NECK',
  'ACCESSORY_3',
  'ACCESSORY_4'
];

const tiers = [
  {
    label: '전체',
    id: 'GRADE_ALL',
    color: 'black'
  },
  {
    label: '에이스',
    id: 'ACE',
    color: 'red'
  },
  {
    label: '조커',
    id: 'JOKER',
    color: 'purple'
  },
  {
    label: '골드',
    id: 'GOLD',
    color: 'yellow'
  },
  {
    label: '실버',
    id: 'SILVER',
    color: 'silver'
  },
  {
    label: '브론즈',
    id: 'BRONZE',
    color: 'gold'
  }
];

const getItemCombination = (tier, items) => {
  const ordered = slotOrder.map(slot => {
    const item = items.find(item => {
      if (item && item.slotName === slot) return true;
      else return false;
    });

    console.log(item);
    if (item && item.searchList[0]) {
      return item.searchList[0];
    } else {
      return null;
    }
  });

  console.log('ordered', ordered);
  return ordered;
};

const RecommendItems = ({ nameEN, uiKit }) => {
  const [tier, setTier] = useState('JOKER');
  const [recommends, setRecommends] = useState(null);
  const itemsAsTier = {
    GRADE_ALL: [],
    ACE: [],
    JOKER: [],
    GOLD: [],
    SILVER: [],
    BRONZE: []
  };
  useEffect(() => {
    setRecommends(null);
    getRecommendItems(nameEN, tier)
      .then(response => {
        const { items } = response.data;
        setRecommends(items);
      })
      .catch(e => {
        console.log(e);
      });
  }, [nameEN, tier]);

  const openTierSetter = () => {
    uiKit.popup.make(
      <div>
        <List>
          {tiers.map(tier => {
            return (
              <ListItem
                button
                onClick={() => {
                  setTier(tier.id);
                  uiKit.popup.destroy();
                }}
              >
                <ListItemText
                  primary={tier.label}
                  style={{
                    fontWeight: 'bolder',
                    color: tier.color
                  }}
                />
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  };

  if (recommends) {
    //split items as tier
    Object.keys(itemsAsTier).forEach(key => {
      recommends.forEach(recommend => {
        if (key === recommend.tierName) {
          itemsAsTier[key].push(recommend);
        }
      });
    });
    console.log('itemAsTier', itemsAsTier[tier]);
    const itemCombination = getItemCombination(tier, itemsAsTier[tier]);
    console.log(itemCombination);
    const openItemDetailPopup = icoName => {
      const target = itemCombination.find(
        item => item && item.icoName === icoName
      );
      if (target) {
        uiKit.popup.make(
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <ImageView img={cyphersResource.getLegacyItemIcon(icoName)} />
              &nbsp;&nbsp;
              <h3>{target.itemName}</h3>
            </div>
            <br />
            <p dangerouslySetInnerHTML={{ __html: target.tooltip }} />
          </div>
        );
      }
    };

    return (
      <div>
        <h3
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '4px'
          }}
        >
          추천 아이템 ({tiers.find(value => value.id === tier).label})
          <div>
            <Tooltip title={'기준 티어 변경'}>
              <IconButton onClick={openTierSetter}>
                <MoreVertIcon />
              </IconButton>
            </Tooltip>
          </div>
        </h3>
        <div className={styles.itemWrapper}>
          <ImageViewGroup
            style={{
              maxWidth: 'calc( 95% / 8 )'
            }}
            icons={itemCombination
              .slice(0, itemCombination.length / 2)
              .map(item => {
                return {
                  style: {
                    maxWidth: '100%',
                    width: '64px',
                    margin: '4px'
                  },
                  tooltip: item ? item.itemName : '',
                  img: cyphersResource.getLegacyItemIcon(
                    item ? item.icoName : ''
                  ),
                  onClick: () => {
                    openItemDetailPopup(item ? item.icoName : '');
                  }
                };
              })}
          />
        </div>
        <div className={styles.itemWrapper}>
          <ImageViewGroup
            style={{
              maxWidth: 'calc( 95% / 8 )'
            }}
            icons={itemCombination
              .slice(itemCombination.length / 2, itemCombination.length)
              .map(item => {
                return {
                  style: {
                    maxWidth: '100%',
                    width: '64px',
                    margin: '4px'
                  },
                  tooltip: item ? item.itemName : '',
                  img: cyphersResource.getLegacyItemIcon(
                    item ? item.icoName : ''
                  ),
                  onClick: () => {
                    openItemDetailPopup(item ? item.icoName : '');
                  }
                };
              })}
          />
        </div>
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default quickConnect(RecommendItems);
