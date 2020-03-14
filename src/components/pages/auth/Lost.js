import React, { useState } from 'react';
import Section from '../../primitive/Section/Section';
import PageTitle from '../../primitive/PageTitle/PageTitle';

import { Validator } from 'class-validator';
import { quickConnect } from '../../../redux/quick';
import HashTable from '../../primitive/HashTable/HashTable';
import { Button, TextField } from '@material-ui/core';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';
import { delay } from '../../../utils/utils';

const Lost = ({ uiKit, history }) => {
  const [email, setEmail] = useState('');
  const validator = new Validator();

  const submit = async () => {
    if (!email) {
      uiKit.toaster.cooking('이메일을 입력하세요');
      return;
    }
    if (validator.isEmail(email)) {
      uiKit.toaster.cooking('올바른 이메일 형식이 아닙니다');
      return;
    }

    uiKit.loading.start();
    await delay(1000);
    uiKit.loading.end();

    uiKit.popup.make(
      <div>
        <h4>이메일 전송 완료</h4>
        <p>입력하신 메일로 비밀번호 초기화 메일이 발송되었습니다</p>
        <br />
        <AlignLayout align={'right'}>
          <Button
            onClick={() => {
              uiKit.popup.destroy();
            }}
            variant={'contained'}
            color={'primary'}
          >
            닫기
          </Button>
        </AlignLayout>
      </div>
    );
  };

  return (
    <div>
      <PageTitle
        title={'PW찾기'}
        explain={'이메일 찾기는 지원되지 않습니다'}
        align={'center'}
      />
      <Section>
        <HashTable
          table={[
            {
              key: '이메일',
              value: (
                <TextField
                  type={'email'}
                  fullWidth
                  placeholder={'가입 시 사용한 이메일을 입력하세요'}
                  onChange={e => {
                    setEmail(e.target.value);
                  }}
                />
              )
            }
          ]}
        />
        <br />
        <AlignLayout align={'right'}>
          <Button onClick={submit} color={'primary'} variant={'contained'}>
            찾기
          </Button>
        </AlignLayout>
      </Section>
    </div>
  );
};

export default quickConnect(Lost);
