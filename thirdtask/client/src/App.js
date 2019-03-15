import React, { Component } from 'react';
import Table from './components/table';
import './App.css';
import axios from 'axios';
import { Button } from '@material-ui/core';
import Alert from './components/alert';
import AddWeightDialog from './components/addWeightModal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        weightData: [],
        averageMaxWeight: 0,
        averageMinWeight: 0,
        averageDifferences: 0,
        createModal: false,
        openAlert: false,
        message: ''
    }
  }

  fetchData = () => {
    axios({
      method: 'get',
      url: 'http://localhost:3000/weight'
    })
      .then(({data:{ data } }) => {
        this.setState({
          weightData: data.items,
          averageMaxWeight: data.averageMaxWeight,
          averageMinWeight: data.averageMinWeight,
          averageDifferences: data.averageDifferences
        }, () => {
          console.log(this.state)
        })
    })
      .catch((err) => {
        this.setState({
          weightData: [],
          averageMaxWeight: 0,
          averageMinWeight: 0,
          averageDifferences: 0
        })
      })
  }

  componentDidMount() {
    this.fetchData();
  }


  openCreateModal = () => {
    this.setState({
      createModal: true
    })
  }

  handleClose = () => {
    this.setState({
      createModal: false
    }, () => {
        this.fetchData();
    })
  }

  deleteData = (id) => {
    axios.delete(`http://localhost:3000/weight/${id}`)
      .then(() => {
        this.setState({
          openAlert: true,
          message: 'Successfully delete data!'
        }, () => {
          this.fetchData();
        })
      })
      .catch(({response: { data: { err }}}) => {
        console.log(err, 'masuk sini')
        this.setState({
          openAlert: true,
          message: err || 'Please try again later'
        })
      })
  }

  handleAlertClose = () => {
    this.setState({
      openAlert: false,
    })
  }

  render() {
    return (
      <div className="App">
        <Button 
          variant="outlined" size="medium" color="primary" 
          style={{ display: 'inline', float: 'right', marginRight: '5em'}}
          onClick={this.openCreateModal}
          >Add new weight</Button>
        <Table
          weightData={this.state.weightData}
          averageMaxWeight={this.state.averageMaxWeight}
          averageMinWeight={this.state.averageMinWeight}
          deleteData={this.deleteData}
          fetchData={this.fetchData}
          averageDifferences={this.state.averageDifferences}
        />
        <AddWeightDialog 
          open={this.state.createModal}
          handleClose={this.handleClose}
        />
         <Alert
          open={this.state.openAlert}
          message={this.state.message}
          handleAlertClose={this.handleAlertClose}
        />
      </div>
    );
  }
}

export default App;
