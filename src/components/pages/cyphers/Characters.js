import React, { Component } from 'react';
import { quickConnect } from '../../../redux/quick';
import {
  getCharacter,
  getCharacterPosition,
  CyphersResource
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

class Characters extends Component {
  state = {
    characters: null,
    character: null,
    characterPosition: null,
    openCharacterList: true
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
            <b>캐릭터 리스트</b>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <ImageViewGroup
                style={{
                  justifyContent: 'flex-start'
                }}
                icons={characters.map(character => {
                  return {
                    img: CyphersResource.getClearThumbnail(character.nameEN),
                    onClick: () => {
                      this.loadCharacterDetail(
                        character.nameEN,
                        character.nameKR
                      );
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
            <h4>{character.nameKR}</h4>
            <br />
            <CharacterPosition position={characterPosition} />
          </Section>
        )}
      </div>
    );
  }
}

export default quickConnect(Characters);
