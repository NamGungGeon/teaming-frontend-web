import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Collapse from "reactstrap/es/Collapse";
import styles from './HorizontalNavigation.module.css';
import {randStr} from "../../../utils/utils";
import MenuItem from "@material-ui/core/MenuItem";
import uikit from "../../../redux/quick/uikit";
import {quickConnect} from "../../../redux/quick";

class HorizontalNavigation extends Component {

  render() {
    const {nav}= this.props;
    return (
      <div>
        {
          Object.keys(nav).map(topic=>{
            return (
              <div key={randStr(15)}>
                <b
                  className={styles.topic}>
                  {topic}
                </b>
                {
                  nav[topic].map(portal=>{
                    return (
                      <MenuItem
                        key={randStr(15)}
                        className={styles.portal}
                        onClick={
                          portal.onClick?
                            portal.onClick
                            :
                            ()=>{
                              alert('준비중인 기능입니다');
                            }
                        }>
                        {portal.label}
                      </MenuItem>);
                  })
                }
                <br/>
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
};
HorizontalNavigation.defaultProps={
  nav: {},
};

export default HorizontalNavigation;