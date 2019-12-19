import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Collapse from "reactstrap/es/Collapse";
import styles from './HorizontalNavigation.module.css';
import {randStr} from "../../utils/utils";
import MenuItem from "@material-ui/core/MenuItem";

class HorizontalNavigation extends Component {
  state= {
    isOpen: [],
  };

  componentDidMount() {
    const {nav}= this.props;

    this.setState({
      ...this.state,
      isOpen: Object.keys(nav),
    });
  };

  render() {
    const {nav}= this.props;
    const {isOpen}= this.state;

    return (
      <div>
        {
          Object.keys(nav).map(topic=>{
            return (
              <div key={randStr(5)}>
                <b
                  className={styles.topic}
                  onClick={()=>{
                    const idx= isOpen.findIndex(t=> t===topic);
                    if(idx=== -1){
                      //do open
                      isOpen.push(topic);
                      this.setState({
                        ...this.state,
                        isOpen,
                      });
                    }else{
                      //do close
                      isOpen[idx]= '';
                      this.setState({
                        ...this.state,
                        isOpen,
                      });
                    }
                  }}>
                  {topic}
                </b>
                <Collapse
                  isOpen={isOpen.findIndex(t=>{
                    return t=== topic;
                  })!== -1}>
                  {
                    nav[topic].map(portal=>{
                      return (
                        <MenuItem
                          key={portal.label}
                          className={styles.portal}
                          onClick={portal.onClick}>
                          {portal.label}
                        </MenuItem>);
                    })
                  }
                  <br/>
                </Collapse>
              </div>
            );
          })
        }
      </div>
    );
  }
}

HorizontalNavigation.propTypes= {
  nav: PropTypes.object,
}

export default HorizontalNavigation;