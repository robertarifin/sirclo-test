import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '../alert';
import axios from 'axios';

export default class EditWeightDialog extends React.Component {
  state = {
    message: '',
    maxWeight: '',
    minWeight: '',
    date: '',
    id: ''
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        maxWeight: this.props.data.maxWeight,
        minWeight: this.props.data.minWeight,
        date: this.props.data.date,
        id: this.props.data._id
      }, () => {
        return true;
      })
    }
  }

  updateData = (e) => {
    e.preventDefault();
    const {maxWeight, minWeight, date, id } = this.state;
    
    const { data } = axios({
      method: 'patch',
      url: `http://localhost:3000/weight/${id}`,
      data: {
        maxWeight: maxWeight,
        minWeight: minWeight,
        date: date
      }
    })
      .then((data) => {
        this.setState({
          message: 'Successfully update data!',
          openAlert: true
        })

        this.props.handleClose();
      })
      .catch(({response: { data: { err }}}) => {
        this.setState({
          message: err,
          openAlert: true
        })
      })
  }

  handleInputOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleAlertClose = () => {
    this.setState({
      openAlert: false
    })
  }

  render() {
    let {date, maxWeight, minWeight } = this.state;
    console.log(date, 'adsadsad')

    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.handleClose}
        >
          <DialogTitle id="form-dialog-title">Edit weight data</DialogTitle>
          <form style={{ margin: '1em'}} onSubmit={this.updateData}>
            <TextField
              autoFocus
              margin="dense"
              name="maxWeight"
              label="Max Weight"
              type="number"
              error ={maxWeight.length === 0 ? true : false }
              onChange={this.handleInputOnChange}
              value={maxWeight}
              fullWidth
              required
            />
            <TextField
              margin="dense"
              name="minWeight"
              label="Min Weight"
              type="number"
              onChange={this.handleInputOnChange}
              error ={minWeight.length === 0 ? true : false }
              value={minWeight}
              fullWidth
              required
            />
            <TextField
              margin="dense"
              name="date"
              label="Date"
              type="text"
              placeholder="YYYY/MM/DD"
              onChange={this.handleInputOnChange}
              error ={date.length === 0 ? true : false }
              value={date.split('T')[0]}
              required
              fullWidth
            />
          <DialogActions>
            <Button onClick={this.props.handleClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Update
            </Button>
          </DialogActions>
          </form>
        </Dialog>
        <Alert
          open={this.state.openAlert}
          message={this.state.message}
          handleAlertClose={this.handleAlertClose}
        />
      </div>
    );
  }
}
