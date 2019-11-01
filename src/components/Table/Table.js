import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table as ReactStrapTable } from "reactstrap";

class Table extends Component {
  static defaultProps = {
    header: [],
    rows: [[]]
  };
  static propTypes = {
    header: PropTypes.array,
    rows: PropTypes.array
  };
  render() {
    const { rows, header } = this.props;
    return (
      <ReactStrapTable>
        <thead>
          <th>
            {header.map(col => {
              return <td>{col}</td>;
            })}
          </th>
        </thead>
        <tbody>
          {rows.map(row => {
            return (
              <tr>
                {row.map(col => {
                  return <td>{col}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </ReactStrapTable>
    );
  }
}

export default Table;
