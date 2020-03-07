import React, { Component, useEffect, useState } from 'react';
import SearchBox from '../../primitive/SearchBox/SearchBox';
import ImageSelect from '../../primitive/ImageSelect/ImageSelect';
import { cyphersResource, getCharacter } from '../../../http/cyphers';
import { quickConnect } from '../../../redux/quick';

const CypherSelect = ({ onUpdate, inits, popup, uiKit }) => {
  const [cyphers, setCyphers] = useState(null);
  const [selects, setSelects] = useState(inits);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    getCharacter()
      .then(response => {
        const { characters } = response.data;
        setCyphers(characters);
      })
      .catch(e => {
        uiKit.toaster.cooking(e);
        console.log(e);
      });
    return () => {
      uiKit.destroyAll();
    };
  }, []);

  if (!cyphers) {
    uiKit.loading.start();
    return (
      <div>
        <h4>캐릭터 리스트 로딩 중 입니다</h4>
      </div>
    );
  }

  // const { img, label, id, shape, height } = icon;
  const cypherList = cyphers
    .map(cypher => {
      return {
        img: cyphersResource.getClearThumbnail(cypher.nameEN),
        id: cypher.nameEN,
        style: {
          height: '48px'
        },
        nameKR: cypher.nameKR
      };
    })
    .filter(cypher => {
      if (keyword && !cypher.nameKR.includes(keyword)) return false;
      return true;
    });

  uiKit.loading.end();
  return (
    <div>
      <h4>사이퍼 선택</h4>
      <SearchBox
        onChange={keyword => {
          setKeyword(keyword);
        }}
      />
      <br />
      <br />
      <div style={popup ? { overflow: 'scroll', maxHeight: '300px' } : {}}>
        <ImageSelect
          icons={cypherList}
          multiple={5}
          selections={selects => {
            setSelects(selects);
            onUpdate(selects);
          }}
          inits={selects}
        />
      </div>
    </div>
  );
};

CypherSelect.defaultProps = {
  inits: [],
  onUpdate: selects => {},
  popup: false
};

export default quickConnect(CypherSelect);
