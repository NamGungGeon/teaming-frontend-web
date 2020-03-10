import React, { Component } from 'react';
import { quickConnect } from '../../../redux/quick';
import {
  getCharacter,
  getCharacterPosition,
  cyphersResource
} from '../../../http/cyphers';
import { errMsg } from '../../../http/util';
import ImageViewGroup from '../../containers/ImageViewGroup/ImageViewGroup';
import Section from '../../primitive/Section/Section';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import CharacterPosition from '../../containers/cyphers/CharacterPosition/CharacterPosition';
import CypherComment from '../../containers/cyphers/CypherComment/CypherComment';
import ImageView from '../../primitive/ImageView/ImageView';
import Divider from '@material-ui/core/Divider';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import { Tooltip } from '@material-ui/core';
import RecommendItems from '../../containers/cyphers/RecommendItems/RecommendItems';
import CreateCypherComment from '../../containers/cyphers/CreateCypherComment/CreateCypherComment';

class Characters extends Component {
  state = {
    characters: null,
    character: null,
    characterPosition: null,
    openCharacterList: true,

    requireUpdate: false
  };

  async componentDidMount() {
    const { uiKit } = this.props;
    uiKit.loading.start();
    await getCharacter()
      .then(response => {
        console.log(response);
        this.setState({
          ...this.state,
          characters: response.data.characters
        });
      })
      .catch(e => {
        uiKit.toaster.cooking(errMsg(e));
      });
    uiKit.loading.end();
  }

  loadCharacterDetail = async (nameEN, nameKR) => {
    const { uiKit } = this.props;

    uiKit.loading.start();
    await getCharacter(nameEN)
      .then(response => {
        console.log(response);
        this.setState({
          ...this.state,
          character: response.data.characters[0]
        });
      })
      .catch(e => {
        uiKit.toaster.cooking(errMsg(e));
      });
    await getCharacterPosition(nameKR)
      .then(response => {
        console.log(response.data);
        this.setState({
          ...this.state,
          characterPosition: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
    uiKit.loading.end();
  };

  render() {
    const {
      characters,
      character,
      openCharacterList,
      characterPosition
    } = this.state;
    const { uiKit } = this.props;

    console.log(characterPosition);
    if (!characters) return <div />;

    return (
      <div>
        <ExpansionPanel expanded={openCharacterList}>
          <ExpansionPanelSummary
            onClick={() => {
              this.setState({
                ...this.state,
                openCharacterList: !openCharacterList
              });
            }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <b>
              {openCharacterList
                ? '원하시는 캐릭터를 선택하세요'
                : '캐릭터 리스트 펼치기'}
            </b>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <ImageViewGroup
                style={{
                  justifyContent: 'flex-start'
                }}
                icons={characters.map(character => {
                  return {
                    img: cyphersResource.getClearThumbnail(character.nameEN),
                    onClick: () => {
                      this.loadCharacterDetail(
                        character.nameEN,
                        character.nameKR
                      );
                      this.setState({
                        ...this.state,
                        openCharacterList: false
                      });
                    }
                  };
                })}
              />
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <br />
        {character && (
          <Section divideStyle={'fill'}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <ImageView
                img={cyphersResource.getClearThumbnail(character.nameEN)}
              />
              &nbsp;&nbsp;&nbsp;
              <h3>{character.nameKR}</h3>
            </div>
            <br />
            <Divider />
            <br />
            <CharacterPosition position={characterPosition} />
            <br />
            <Divider />
            <RecommendItems nameEN={character.nameEN} />
            <br />
            <Divider />
            <h3
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '4px'
              }}
            >
              코멘트
              <div>
                <Tooltip title={'코멘트 작성'}>
                  <IconButton
                    onClick={() => {
                      uiKit.popup.make(
                        <CreateCypherComment
                          nameEN={character.nameEN}
                          nameKR={character.nameKR}
                          onSubmit={() => {
                            uiKit.popup.destroy();
                            this.setState({
                              ...this.state,
                              requireUpdate: !this.state.requireUpdate
                            });
                          }}
                        />
                      );
                    }}
                  >
                    <CreateIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={'코멘트 전체보기'}>
                  <IconButton
                    onClick={() => {
                      uiKit.popup.make(
                        <CypherComment nameEN={character.nameEN} />
                      );
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </h3>
            <CypherComment
              nameEN={character.nameEN}
              limit={5}
              tick={this.state.requireUpdate}
            />
          </Section>
        )}
      </div>
    );
  }
}

export default quickConnect(Characters);
