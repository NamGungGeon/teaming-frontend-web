import React from "react";
import Loading from "../../primitive/Loading/Loading";

export const Loader = component => {
  return {
    start: () => {
      component.setState({
        ...component.state,
        isLoading: true
      });
    },
    end: () => {
      component.setState({
        ...component.state,
        isLoading: false
      });
    },
    render: () => {
      return component.state.isLoading ? <Loading /> : "";
    }
  };
};
