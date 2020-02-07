import React, { Component } from 'react';
import ImageSelect from '../../primitive/ImageSelect/ImageSelect';
import SearchBox from '../../primitive/SearchBox/SearchBox';
import { championSquareImage, getChampions } from '../../../http/lol';
import { errMsg } from '../../../http/util';

class ChampionSelect extends Component {
  state = {
    keyword: '',
    champions: null
  };

  componentDidMount() {
    console.log('mount champion selects', this.props.id);
    this.loadChampions();
  }
  componentWillUnmount() {
    console.log('unmount champion selects', this.props.id);
  }

  loadChampions = async () => {
    await getChampions()
      .then(response => {
        this.setState({
          ...this.state,
          champions: Object.keys(response.data.data).map(key => {
            return response.data.data[key];
          })
        });
      })
      .catch(e => {
        console.log(errMsg(e));
      });
  };

  getChampions = () => {
    const { keyword, champions } = this.state;

    let champs = champions;
    if (keyword)
      champs = champions.filter(champ => {
        return champ.name.includes(keyword);
      });

    champs = champs.map(champ => {
      return {
        img: championSquareImage(champ.id),
        id: champ.id
      };
    });
    return champs;
  };

  render() {
    const { selections, inits, popup } = this.props;
    const { champions } = this.state;

    if (!champions) return <div />;

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
        <div style={popup ? { overflow: 'scroll', maxHeight: '300px' } : {}}>
          <ImageSelect
            multiple={5}
            icons={this.getChampions()}
            selections={selects => {
              console.log('championSelect', selects);
              selections(selects);
            }}
            inits={inits}
          />
        </div>
      </div>
    );
  }
}

export default ChampionSelect;
