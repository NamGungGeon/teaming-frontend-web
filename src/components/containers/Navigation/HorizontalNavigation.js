import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Collapse from "reactstrap/es/Collapse";
import styles from './HorizontalNavigation.module.css';
import {randStr} from "../../utils/utils";
import MenuItem from "@material-ui/core/MenuItem";

class HorizontalNavigation extends Component {

  render() {
    const {nav}= this.props;
    return (
      <div>
        {
          Object.keys(nav).map(topic=>{
            return (
              <div key={randStr(5)}>
                <b
                  className={styles.topic}>
                  {topic}
                </b>
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