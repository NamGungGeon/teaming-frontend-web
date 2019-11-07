import React, { Component } from 'react';
import ImageSelect from '../../components/ImageSelect/ImageSelect';
import { quickConnect } from '../../redux';
import SearchBox from '../../components/SearchBox/SearchBox';

import champions from '../../res/lol/champions/champs';

class ChampionSelect extends Component {
  state = {
    keyword: ''
  };

  getChampions = () => {
    let champs = champions;
    if (this.state.keyword)
      champs = champions.filter(champ => {
        return champ.nameKR
          .toLowerCase()
          .includes(this.state.keyword.toLowerCase());
      });
    else champs = champions;

    champs = champs.map(champ => {
      return {
        img: require(`../../res/lol/champions/${champ.nameEN}.png`),
        label: champ.nameKR,
        id: champ.nameEN
      };
    });
    return champs;
  };

  render() {
    const { selections, inits, popup } = this.props;
    return (
      <div>
        <h4>챔피언 선택</h4>
        <SearchBox
          onChange={keyword => {
            this.setState({
              ...this.state,
              keyword
            });
          }}
        />
        <br />
        <br />
        <div style={popup ? { overflow: 'scroll', maxHeight: '400px' } : {}}>
          <ImageSelect
            multiple={5}
            icons={this.getChampions()}
            selections={selections}
            inits={inits}
          />
        </div>
      </div>
    );
  }
}

export default quickConnect(ChampionSelect);
