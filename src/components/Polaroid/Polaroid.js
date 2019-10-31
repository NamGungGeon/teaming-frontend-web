import React, {Component} from 'react';
import {Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle} from "reactstrap";
import fullSizeIcon from "../../res/full_icon.png";
import {formatToMoney} from "../../lib/utils";
import PropTypes from 'prop-types';
import empty from '../../res/empty.png';
import classNames from 'classnames';

class Polaroid extends Component {
    static defaultProps= {
        title: '',
        explain: '',
        content: '',
        buttons: [],
    }
    static propTypes= {
        img: PropTypes.string,
        title: PropTypes.string,
        explain: PropTypes.string,
        content: PropTypes.string,
        onClick: PropTypes.func,
        style: PropTypes.object,
        buttons: PropTypes.arrayOf(PropTypes.element),
    };
    render() {
        const {img, title, explain, content, onClick, style, buttons}= this.props;

        return (
            <span onClick={onClick? onClick: ()=>{}}
                  style={style? style: {}}
                  className={classNames({'clickable': !!onClick})}>
                <Card>
                    <CardImg top width="100%" src={img? img: empty} alt="Card image cap"/>
                    <CardBody>
                        <CardTitle>{title}</CardTitle>
                        <CardSubtitle>
                            <p className={'explain'}>{explain}</p>
                        </CardSubtitle>
                        <CardText>{content}</CardText>
                        <br/>

                        <div className={'centering childMargin'}>
                            {
                                buttons.map((button)=>{
                                    return button;
                                })
                            }
                        </div>
                    </CardBody>
                </Card>
            </span>
        );
    }
}

export default Polaroid;
