import React, { Component } from 'react';

class DataGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 20,
      columns: 20,
      headers: "",
      data: ""
    }
    this.updateRows = this.updateRows.bind(this);
    this.updateColumns = this.updateColumns.bind(this);
  }

  componentWillMount() {
    this.interval = setInterval( () => {
      this.setState({
        headers: this.createHeaders(),
        data: this.createDataTable()
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateRows(e) {
    const updatedRows = e.target.value;
    console.log(updatedRows);
    this.setState({
      rows: updatedRows,
      headers: this.createHeaders(),
      data: this.createDataTable()
    });
  }

  updateColumns(e) {
    const updatedColumns = e.target.value;
    console.log(updatedColumns);
    this.setState({
      columns: updatedColumns,
      headers: this.createHeaders(),
      data: this.createDataTable()
    });
  }

  createHeaders() {
    let row = [];
    let cells = [];

    for (let j = 1; j <= this.state.columns; j++) {
      let cellID = `header-${j-1}`;
      cells.push(<td key={cellID}># {j}</td>);
    }
    row.push(<tr key="header-row0">{cells}</tr>);
    
    return row;
  }

  createDataTable() {
    let rows = [];

    let style = {
      color: "white",
      border: "1px solid white",
      textAlign: "center"
    }

    for (let i = 0; i < this.state.rows; i++) {
      let rowID = `row${i}`;
      let cells = []; 
      
      for (let j = 0; j < this.state.columns; j++) {
        let cellID = `row${i}-${j}`;
        let cellValue = Math.floor(Math.random() * 100) + 1;
        let color = cellValue >= 50 ? "#3FB618" : "#FF0039";  
        cells.push(<td key={cellID} id={cellID} style={{...style, backgroundColor: color}}>{cellValue}</td>);
      }
      rows.push(<tr key={i} id={rowID}>{cells}</tr>);
    }
    return rows;
  }

  render() {
    console.log(this.state.rows, this.state.columns);
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>React DataGrid <span role="img" aria-label="ghost">👻</span></h1>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="rows" className="col-form-label">Rows:</label> 
            <input type="number" name="rows" className="form-control" onChange={this.updateRows} value={this.state.rows} />
          </div>
          <div className="form-group">
            <label htmlFor="columns" className="col-form-label">Columns:</label>
            <input type="number" name="columns" className="form-control" onChange={this.updateColumns} value={this.state.columns} />
          </div>
        </form>
        <div className="table-responsive">
        <table className="table">
          <thead>
            {this.state.headers}
          </thead>
          <tbody>
            {this.state.data}
          </tbody>
        </table>
        </div>
      </div>
    )
  }
}

export default DataGrid;