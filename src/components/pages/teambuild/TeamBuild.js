import React from 'react';
import { getPath } from '../../utils/url';
import GameList from './GameList';
import { Route } from 'react-router-dom';
import Lol from './lol/Lol';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

const steps= [
  '게임 선택',
  '옵션 선택',
  '매칭 완료'
];

export default function TeamBuild({ match }) {
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <div>
      <Stepper
        style={{
          backgroundColor: '#202020'
        }}
        orientation={'horizontal'}
        activeStep={activeStep}>
        {steps.map(label => (
          <Step
            style={{
              backgroundColor: '#202020'
            }}
            key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <br/>
      <Route
        exact path={getPath(`/teambuild`)}
        component={(props)=>
          (<GameList {...props} stepping={setActiveStep}/>)
        }/>
      <Route
        path={getPath(`/teambuild/lol`)}
        component={(props)=>
          (<Lol {...props} stepping={setActiveStep}/>)
        } />
    </div>
  );
}
