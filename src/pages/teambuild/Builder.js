import React, {Component} from 'react';
import Wait from "../../components/Wait/Wait";

class Builder extends Component {
    render() {
        return (
            <div>
                <Wait msg={'팀 빌딩 중입니다'}/>
            </div>
        );
    }
}

export default Builder;