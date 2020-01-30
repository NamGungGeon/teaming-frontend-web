import React, { Component } from 'react';
import FormGroup from 'reactstrap/es/FormGroup';
import InputGroup from 'reactstrap/es/InputGroup';
import Input from 'reactstrap/es/Input';
import { InputGroupAddon, Label } from 'reactstrap';
import Button from 'reactstrap/es/Button';
import { MdSearch } from 'react-icons/md';

class ItemSearchFilter extends Component {
  state = {
    keyword: '',
    currency: ['cash', 'gameMoney']
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log(this.state);
    // console.log(this.state.currency.findIndex(value=> value==='cash'));
  }

  render() {
    const { currency } = this.state;

    return (
      <div>
        <b>아이템명</b>
        <FormGroup>
          <InputGroup>
            <Input
              className={'transparent'}
              type={'text'}
              placeholder={'아이템 이름을 입력하세요'}
              onKeyDown={e => {}}
              onChange={e => {}}
            />
            <InputGroupAddon addonType="append">
              <Button onClick={() => {}} color={'danger'}>
                <MdSearch color={'white'} />
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>

        <b>거래 수단</b>
        <FormGroup check>
          <Label check>
            <Input
              checked={currency.findIndex(value => value === 'cash') !== -1}
              type="checkbox"
              onChange={e => {
                const idx = currency.findIndex(value => value === 'cash');
                if (idx === -1) currency.push('cash');
                else delete currency[idx];

                this.setState({
                  ...this.state,
                  currency
                });
              }}
            />
            &nbsp;현금거래
          </Label>
          <br />
          <Label check>
            <Input
              checked={
                currency.findIndex(value => value === 'gameMoney') !== -1
              }
              type="checkbox"
              onChange={e => {
                const idx = currency.findIndex(value => value === 'gameMoney');
                if (idx === -1) currency.push('gameMoney');
                else delete currency[idx];

                this.setState({
                  ...this.state,
                  currency
                });
              }}
            />
            &nbsp;게임 재화
          </Label>
        </FormGroup>
        <br />

        <b>정렬</b>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio2" />
            가격순
          </Label>
        </FormGroup>
        <FormGroup check disabled>
          <Label check>
            <Input type="radio" name="radio2" />
            최신순
          </Label>
        </FormGroup>
      </div>
    );
  }
}

export default ItemSearchFilter;
