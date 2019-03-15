import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';
import EditWeightDialog from '../editWeightModal';

const styles = {
  root: {
    marginTop: '3em',
    marginLeft: '5em',
    marginRight: '5em'
  }
};


class CustomTable extends React.Component {
  state = {
    maxWeight: '',
    minWeight: '',
    date: '',
    _id: '',
    updateModal: false
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      return true
    }
  }

  deleteData = (id) => () => {
    this.props.deleteData(id);
  }

  updateData = (row) => () => {
    this.setState({
      ...row,
      updateModal: true
    }, () => {
      console.log(this.state)
    })
  }

  handleClose = () => {
    this.setState({
      updateModal: false
    }, () => {
      this.props.fetchData();
    })
  }

  render() {
    const { weightData, averageMaxWeight, averageMinWeight, averageDifferences } = this.props;
   
    return (
      <div style={styles.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Tanggal</TableCell>
              <TableCell align="center">Max</TableCell>
              <TableCell align="center">Min</TableCell>
              <TableCell align="center">Perbedaan</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {weightData.map(row => (
              <React.Fragment key={row._id}>
                <TableRow>
                  <TableCell align="center">{new Date(row.date).toISOString().split('T')[0]}</TableCell>
                  <TableCell align="center">{row.maxWeight}</TableCell>
                  <TableCell align="center">{row.minWeight}</TableCell>
                  <TableCell align="center">{row.differences}</TableCell>
                  <TableCell style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button variant="contained" color="primary" style={{ margin: '1em'}} onClick={this.updateData(row)}>Edit</Button>
                    <Button variant="contained" color="secondary" onClick={this.deleteData(row._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
                  <EditWeightDialog 
                    open={this.state.updateModal}
                    handleClose={this.handleClose}
                    data={this.state}
                  />
              </React.Fragment> 
            ))}
            <TableRow>
                <TableCell align="center" style={{ fontWeight: 'bold'}}>Rata-Rata</TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold'}}>{averageMaxWeight}</TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold'}}>{averageMinWeight}</TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold'}}>{averageDifferences}</TableCell>
                <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>      
      </div>
    );
  }
}

export default CustomTable;
