import React from 'react';
import { getPath } from '../../utils/url';
import GameList from './GameList';
import { Route } from 'react-router-dom';
import Lol from './lol/Lol';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";


export default function TeamBuild({ match }) {
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <div>
      <Route
        exact path={getPath(`/teambuild`)}
        component={(props)=>
          (<GameList {...props}/>)
        }/>
      <Route
        path={getPath(`/teambuild/lol`)}
        component={(props)=>
          (<Lol {...props}/>)
        } />
    </div>
  );
}
