import React, {Component} from 'react';
import ImageView from "../ImageView/ImageView";
import styles from './ImageSelect.module.css';
import PropTypes from "prop-types";

class ImageSelect extends Component {
    state= {
        selected: [],
    };

    static defaultProps= {
        icons: [],
        multiple: 1,
        selections: (selects)=>{},
        inits: [],
    };

    static propTypes= {
        icons: PropTypes.array,
        multiple: PropTypes.number,
        selections: PropTypes.func,
        inits: PropTypes.array,
    };
    componentDidMount() {
        this.setState({
            ...this.state,
            selected: this.props.inits,
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const {multiple}= this.props;
        const {selected}= this.state;
        const {selected:prevSelected}= prevState;

        console.log('prev', prevState.selected);
        console.log('current', selected);
        if(selected!== prevSelected) {
            console.log('update!', this.props.selections);
            this.props.selections(
                multiple===1?
                    selected.length===0? '': selected[0]
                    :
                    selected
            );
        }
    }

    select= (id)=>{
        const {selected}= this.state;
        const {multiple, selections}= this.props;

        let newSelected= selected.slice();

        if(newSelected.findIndex((s)=>s=== id)=== -1){
            //not selected
            if(selected.length=== multiple)
                newSelected.pop();
            newSelected.push(id);
        }else{
            //already selected
            newSelected= selected.filter(s=>{
                return s!== id;
            });
        }
        this.setState({
            ...this.state,
            selected: newSelected,
        });
    }


    render() {
        const {icons, style}= this.props;
        const {selected}= this.state;

        return (
            <div className={styles.group} style={style}>
                {
                    icons.map(icon=>{
                        const {img, label, id, shape}= icon;
                        return (
                            <div onClick={()=>{
                                this.select(id);
                            }}>
                                <ImageView img={img} shape={shape} className={`${selected.findIndex((s)=>s===id)!==-1? styles.selected: ''}`}/>
                                {
                                    icon.label&& (<span className={styles.label}>{label}</span>)
                                }
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default ImageSelect;