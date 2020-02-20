import React, { Component } from 'react';
import Section from '../../primitive/Section/Section';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';

class Advertise extends Component {
  adsbygoogle = [];

  componentDidMount() {
    //(this.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    return (
      <Section divideStyle={'fill'}>
        <h6>광고</h6>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
          className={'ad-coupang'}
        >
          <a href="https://coupa.ng/bqancq" target="_blank">
            <img
              src="https://static.coupangcdn.com/image/affiliate/banner/5850b998e1934cc19611f6bfafe3164b@2x.jpg"
              alt="COX 교체축 레인보우 LED 게이밍 기계식 키보드 갈축, CK420, 화이트"
              width="120"
              height="240"
            />
          </a>
          <a href="https://coupa.ng/bqan8M" target="_blank">
            <img
              src="https://static.coupangcdn.com/image/affiliate/banner/51282a5dfb0847994b765fc5d972b792@2x.jpg"
              alt="로지텍 Prodigy 유선 게이밍 마우스 G102, 블랙"
              width="120"
              height="240"
            />
          </a>
          <a href="https://coupa.ng/bqaoHr" target="_blank">
            <img
              src="https://static.coupangcdn.com/image/affiliate/banner/68fdc52fcd25f7345260405772e39f17@2x.jpg"
              alt="한성컴퓨터 86.4 cm WQHD 커브드 게이밍 모니터, ULTRON 3479UC(일반)"
              width="120"
              height="240"
            />
          </a>
          <a href="https://coupa.ng/bqao4V" target="_blank">
            <img
              src="https://static.coupangcdn.com/image/affiliate/banner/0045f04b8fa9e2c793d525b11d4082ac@2x.jpg"
              alt="컴맹닷컴 게이밍 조립 PC (i5-9500F WIN10 DDR4 16G SSD240G GTX1660 6G), CM955FC-166H"
              width="120"
              height="240"
            />
          </a>
          <a href="https://coupa.ng/bqapwp" target="_blank">
            <img
              src="https://static.coupangcdn.com/image/affiliate/banner/45c2ea6714e4a4a57416c540a199db07@2x.jpg"
              alt="한성컴퓨터 SIROCO LED PC 사운드바, GS100, 건메탈"
              width="120"
              height="240"
            />
          </a>
          <a href="https://coupa.ng/bqaqJN" target="_blank">
            <img
              src="https://static.coupangcdn.com/image/affiliate/banner/7b09978213bbd1d2d71e5b7b008c15e1@2x.jpg"
              alt="에이픽스 컴퓨터 게이밍 의자 GC003 화이트, 단일상품"
              width="120"
              height="240"
            />
          </a>
        </div>

        <AlignLayout align={'center'}>
          <ins
            className="adsbygoogle"
            style={{
              display: 'block'
            }}
            data-ad-client="ca-pub-7436352683918486"
            data-ad-slot="1364610805"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </AlignLayout>
      </Section>
    );
  }
}

export default Advertise;
