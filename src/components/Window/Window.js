import React, {Component} from 'react';
import styles from './Window.module.css';
import classNames from 'classnames';
import {ArrowDropDown, ArrowDropUp} from '@material-ui/icons';

class Window extends Component {
    state= {
        folded: false,
    }
    static defaultProps= {
        title: '',
        children: '',
        position: null,
        startBottom: false,
        foldable: false,
        styles: {},
        className: '',
    };


    render() {
        const {title, children, foldable, style}= this.props;
        return (
            <div className={classNames([styles.frame, classNames()])} style={style}>
                <div className={classNames([styles.title, `${foldable? 'clickable': ''}`])} onClick={()=>{
                    if(foldable)
                        this.setState({
                           ...this.state,
                           folded: !this.state.folded,
                        });
                }}>
                    {title}
                    {
                        foldable &&
                        (<div className={styles.mileStone}>
                            {
                                this.state.folded?
                                <ArrowDropDown/>
                                :
                                <ArrowDropUp/>
                            }
                        </div>)
                    }
                </div>
                <div className={classNames({[styles.body]: true, [styles.folded]: this.state.folded})}>
                    {children}
                </div>
            </div>
        );
    }
}

export default Window;