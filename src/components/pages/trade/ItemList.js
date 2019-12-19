import React, {Component} from 'react';
import HorizontalSlicedLayout from "../../layouts/HorizontalSlicedLayout/HorizontalSlicedLayout";
import Window from "../../primitive/Window/Window";
import ItemSearchFilter from "../../containers/ItemSearchFilter/ItemSearchFilter";
import PageTitle from "../../primitive/PageTitle/PageTitle";
import {Button, Table} from "reactstrap";
import {formatToMoney, randStr} from "../../utils/utils";
import BoardWrapper from "../../primitive/Board/BoardWrapper/BoardWrapper";
import icon from '../../resource/icon.png';

class ItemList extends Component {
  state={
    items: [
      {id: randStr(20), title: '오른이 되세요', date: '3일 전', price: 30000, type: 'cash', user: '잉', commentCnt: 3},
      {id: randStr(20), title: '오른이 되세요', date: '3일 전', price: 30000, type: 'cash', user: '잉', commentCnt: 3},
      {id: randStr(20), title: '오른이 되세요', date: '3일 전', price: 30000, type: 'cash', user: '기', commentCnt: 3},
      {id: randStr(20), title: '오른이 되세요', date: '3일 전', price: 30000, type: 'cash', user: '뭐', commentCnt: 36},
      {id: randStr(20), title: '오른이 되세요', date: '3일 전', price: 30000, type: 'cash', user: '링', commentCnt: 0},
      {id: randStr(20), title: '오른이 되세요', date: '3일 전', price: 30000, type: 'cash', user: '아이구', commentCnt: 3},
      {id: randStr(20), title: '오른이 되세요', date: '3일 전', price: 30000, type: 'cash', user: '만원', commentCnt: 1},
      {id: randStr(20), title: '오른이 되세요', date: '3일 전', price: 30000, type: 'cash', user: '감사합니다', commentCnt: 6},
    ]
  };

  componentDidMount() {
    window.scrollTo(0,0);
  }


  render() {
    const {items}= this.state;
    const {match, history}= this.props;

    return (
      <div>
        <PageTitle title={'아이템 거래소'} explain={'사기 등에 주의하세요. 티밍은 유저간의 거래에 일체 책임지지 않습니다'} align={'center'}/>
        <HorizontalSlicedLayout>
          <Window title={'옵션'} foldable>
            <Button
              color={'primary'}
              onClick={()=>{
                history.push(`${match.url}/write`);
              }}
              block>
              물품 등록
            </Button>

            <br/>
            <ItemSearchFilter/>
          </Window>
          <div>
            <BoardWrapper
              boards={
                items.map(item=>{
                  return {
                    title: `${item.title} [${item.commentCnt}]`,
                    exp_l: `${item.user}    (${item.date})`,
                    exp_r: `(${item.type==='cash'? '현금': '게임머니'}) ${formatToMoney(item.price)}원`,
                    thumbnail: icon,
                    onClick: ()=>{
                      history.push(`${match.url}/read/${item.id}`);
                    }
                  }
                })
              }
              history={history}
            />
              <Button color={'secondary'} block>
                더 블러오기
              </Button>
          </div>
        </HorizontalSlicedLayout>
      </div>
    );
  }
}

export default ItemList;