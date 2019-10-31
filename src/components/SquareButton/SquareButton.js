import React, {Component} from 'react';
import styles from './SquareButton.module.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class SquareButton extends Component {
    static defaultProps= {
        img: '',
        backgroundColor: '#ffd000',
        onClick: ()=>{},
        minHeight: '350px',
    };
    static propTypes= {
        img: PropTypes.string,
        backgroundColor: PropTypes.oneOf(['#ffd000', '#fc0474', '#03d8fe']),
        onClick: PropTypes.func,
        minHeight: PropTypes.string,
    }

    render() {
        const {children, img, backgroundColor, onClick, minHeight}= this.props;
        return (
            <div className={classNames([styles.button, `${onClick? styles.enable: ''}`])} style={{backgroundColor, minHeight}} onClick={onClick}>
                {children}
                {img}
            </div>
        );
    }
}

export default SquareButton;