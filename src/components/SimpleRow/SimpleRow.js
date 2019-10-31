import React, {Component} from 'react';
import styles from './SimpleRow.module.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class SimpleRow extends Component {
    //if you want to know the accuracy array element type,
    //refer /component/SimpleRow/SimpleRow.js
    static defaultProps= {
        title: '',
        explain: '',
        onClick: '',
    }
    static propTypes= {
        title: PropTypes.string,
        explain: PropTypes.string,
        onClick: PropTypes.func,
    }

    render() {
        const {title, explain, onClick}= this.props;
        return (
            <div className={classNames(styles.row, {'clickable': !!onClick})} onClick={onClick? onClick: ()=>{}}>
                <h6>
                    {title}
                </h6>
                <p className={'explain'}>
                    {explain? explain: title}
                </p>
            </div>
        );
    }
}

export default SimpleRow;