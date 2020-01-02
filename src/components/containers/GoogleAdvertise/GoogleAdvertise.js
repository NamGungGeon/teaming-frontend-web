import React, {Component} from 'react';
import Section from "../../primitive/Section/Section";
import AlignLayout from "../../layouts/AlignLayout/AlignLayout";

class GoogleAdvertise extends Component {

  adsbygoogle= [];

  componentDidMount() {
    (this.adsbygoogle || []).push({});
  }

  render() {
    return (
      <Section
        divideStyle={'fill'}>
        <h6>
          광고
        </h6>
        <AlignLayout align={'center'}>
          <ins
            className="adsbygoogle"
            style={{
              display: 'block',
            }}
            data-ad-client="ca-pub-7436352683918486"
            data-ad-slot="1364610805"
            data-ad-format="auto"
            data-full-width-responsive="true"/>
        </AlignLayout>
      </Section>
    );
  }
}

export default GoogleAdvertise;