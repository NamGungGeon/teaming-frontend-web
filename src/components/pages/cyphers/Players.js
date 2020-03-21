import React, { useEffect, useState } from 'react';
import Section from '../../primitive/Section/Section';
import { ExpansionPanel, ExpansionPanelDetails } from '@material-ui/core';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import SearchBox from '../../primitive/SearchBox/SearchBox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { urlQuery } from '../../../utils/url';
import PlayerLog from '../../containers/cyphers/PlayerLog/PlayerLog';
import { quickConnect } from '../../../redux/quick';

const Players = ({ location, history, uiKit }) => {
  const query = urlQuery(location);
  const [nickname, setNickname] = useState(query.nickname);
  const [openSearchPanel, setOpenSearchPanel] = useState(!nickname);

  return (
    <div>
      <ExpansionPanel expanded={openSearchPanel}>
        <ExpansionPanelSummary
          onClick={() => {
            setOpenSearchPanel(!openSearchPanel);
          }}
          expandIcon={<ExpandMoreIcon />}
        >
          <h4>플레이어 검색</h4>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <SearchBox
            initValue={nickname}
            submit={name => {
              setOpenSearchPanel(false);
              setNickname(name);

              history.replace(`/cyphers/players?nickname=${name}`);
            }}
            buttonContent={'검색'}
            hint={'검색할 플레이어의 닉네임을 입력하세요'}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <br />
      {nickname && (
        <PlayerLog
          onFail={e => {
            console.log('PlayerLog Error', e);
            setOpenSearchPanel(true);
            setNickname('');
            uiKit.toaster.cooking('해당 유저는 존재하지 않습니다');
            history.replace('/cyphers/players');
          }}
          nickname={nickname}
        />
      )}
    </div>
  );
};

export default quickConnect(Players);
