import React, {Component} from 'react';
import Section from "../../primitive/Section/Section";
import AlignLayout from "../../layouts/AlignLayout/AlignLayout";

class GoogleAdvertise extends Component {
  render() {
    return (
      <Section
        divideStyle={'fill'}>
        <h5>
          광고
        </h5>
        <AlignLayout align={'center'}>
          <img
            style={{
              width: '100%',
            }}
            src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZalI-Hufx3Pz6wC-eDxaQ1492iMJKDoAVSyYBHaXB5MIfCUyS&s'}/>
        </AlignLayout>
      </Section>
    );
  }
}

export default GoogleAdvertise;