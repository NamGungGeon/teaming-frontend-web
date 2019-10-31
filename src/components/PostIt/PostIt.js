import React, {Component} from 'react';
import FlexBox from "../FlexBox/FlexBox";
import styles from './PostIt.module.css';

class PostIt extends Component {
    static defaultProps= {
        texts: [],
    }
    render() {
        const {texts}= this.props;
        const flexStyle= {
            justifyContent: 'flex-start',
            alignItems: 'stretch'
        }
        return (
            <div>
                {
                    texts.map((v, i)=>{
                        if(i%3=== 0)
                            return (
                                <FlexBox responsive fixed={'31%'} style={flexStyle} margin={8}>
                                    {
                                        texts.map((text, idx)=>{
                                            if(idx>= i && idx< i+3) {
                                                if(typeof text === 'string')
                                                    return (<div className={styles.postIt}>
                                                        {text}
                                                    </div>);
                                                else{
                                                    const {txt, ps}= text;
                                                    return (
                                                        <div className={styles.postIt}>
                                                            {txt}
                                                            <br/>
                                                            {
                                                                ps ? <div className={styles.explain}>{ps}</div> : ''
                                                            }
                                                        </div>
                                                    );
                                                }
                                            }
                                        }).slice(i, i+3)
                                    }
                                </FlexBox>
                            )
                    })
                }
            </div>
        );
    }
}

export default PostIt;