import React, { Component } from 'react';
import PageTitle from '../../primitive/PageTitle/PageTitle';
import Magazine from '../../containers/Magazine/Magazine';
import Section from '../../primitive/Section/Section';
import Optional from '../../primitive/Optional/Optional';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { pageDescription } from '../../../utils/utils';

class MagazineList extends Component {
  componentDidMount() {
    pageDescription('티밍: 매거진', '주요 소식들을 쉽고 빠르게 받아보세요');
  }

  componentWillUnmount() {
    pageDescription();
  }

  render() {
    const { history } = this.props;

    return (
      <div>
        <PageTitle
          title={'매거진'}
          explain={'주요 정보를 빠르고 쉽게 받아보세요'}
        />
        <br />
        <Optional onlyAdmin={true}>
          <Section>
            <h4>관리자 메뉴</h4>
            <br />
            <AlignLayout align={'right'}>
              <Button
                startIcon={<AddIcon />}
                onClick={() => {
                  history.push(`/magazine/write?category=magazine`);
                }}
                variant={'contained'}
                color={'primary'}
              >
                새 매거진 등록
              </Button>
            </AlignLayout>
          </Section>
        </Optional>

        <Section>
          <Magazine />
        </Section>
      </div>
    );
  }
}

export default MagazineList;
