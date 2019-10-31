import React, {Component} from 'react';
import styles from './NavTabs.module.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class NavTabs extends Component {
    state= {
        cursor: 0,
    };

    static propTypes= {
        tabs: PropTypes.arrayOf(PropTypes.string),
        content: PropTypes.arrayOf(PropTypes.element),
    }

    render() {
        const {tabs, contents}= this.props;
        return (
            <div>
                <div className={styles.tab}>
                    {
                        tabs.map((tab, idx)=>{
                            return (
                                <div
                                    onClick={()=>{this.setState({...this.state, cursor: idx})}}
                                    className={classNames({[styles.active]: this.state.cursor===idx})}>
                                    {tab}
                                </div>)
                        })
                    }
                </div>
                <br/>
                <div>
                    {
                        contents[this.state.cursor]
                    }
                </div>
            </div>
        );
    }
}

export default NavTabs;