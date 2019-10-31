import React, {Component} from 'react';
import styles from './Polaroids.module.css';
import {Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle} from "reactstrap";
import fullSizeIcon from "../../res/full_icon.png";
import {formatToMoney, randStr} from "../../lib/utils";
import {getPath} from "../../lib/url";
import {quickConnect} from "../../redux";
import PropTypes from 'prop-types';
import Polaroid from "../../components/Polaroid/Polaroid";


class Polaroids extends Component {
    //if you want to know the accuracy array element type,
    //refer /component/Polaroid/Polaroid.js
    static propTypes= {
        polaroidContents: PropTypes.array,
    };
    static defaultProps= {
        polaroidContents: [],
    }

    render() {
        const {polaroidContents}= this.props;
        return (
            <div className={styles.wrapper}>
                {
                    polaroidContents.map((polaroidContent)=>{
                        return (
                            <Polaroid
                                img={polaroidContent.img}
                                title={polaroidContent.title}
                                explain={polaroidContent.explain}
                                content={polaroidContent.content}
                                onClick={polaroidContent.onClick}
                                style={polaroidContent.style}
                                buttons={polaroidContent.buttons}
                                />
                        );
                    })
                }
            </div>
        );
    }
}

export default Polaroids;