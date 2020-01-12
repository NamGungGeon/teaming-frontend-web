import React, {Component} from 'react';
import Input from "reactstrap/es/Input";
import Button from "@material-ui/core/Button";

class Lab extends Component {
  state={
    input: '',
  }

  render() {
    return (
      <div>
        <Modal ref={ref=> this.modal= ref}/>
        <Button
          onClick={()=>{
            this.modal.setBody((
                <ChildComponent>
                  <Input
                    type={'text'}
                    onChange={e=>{
                      this.setState({
                        ...this.state,
                        input: e.target.value,
                      })
                    }}/>
                </ChildComponent>
              ));
          }}
          color={'primary'}
          variant={'contained'}>
          시~작!
        </Button>
      </div>
    );
  }
}
class Modal extends Component{
  state={
    html: '',
  }

  setBody= (html)=>{
    this.setState({
      ...this.state,
      html,
    })
  }

  render() {
    const {html}= this.state;

    return (
      <div>
        {
          html && html
        }
      </div>
    );
  }
}

class ChildComponent extends Component{
  render(){
    const {children}= this.props;
    return (
      <div>
        {children}
      </div>
    );
  }
}

export default Lab;