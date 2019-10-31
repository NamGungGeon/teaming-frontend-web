import React, {Component} from 'react';
import styles from './SimpleList.module.css';
import PropTypes from "prop-types";
import SimpleRow from "../../components/SimpleRow/SimpleRow";

class SimpleList extends Component {
    static defaultProps= {
        rows: [],
    }
    static propTypes= {
        rows: PropTypes.array,
    }
    render() {
        const {rows}= this.props;
        return (
            <div>
                {
                    rows.map(row=>{
                        return (<SimpleRow title={row.title} explain={row.explain} onClick={row.onClick}/>);
                    })
                }
            </div>
        );
    }
}

export default SimpleList;