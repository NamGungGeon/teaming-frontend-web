import React, {Component} from 'react';
import Window from "../../components/Window/Window";

class Windows extends Component {
    render() {
        return (
            <div>
                <Window title={'Window Title'} foldable>
                    Window Body
                </Window>
                <br/><br/>
                <Window title={'Unfoldable Window Title'}>
                    This windows' body is not foldable
                </Window>
            </div>
        );
    }
}

export default Windows;