/**
 * Functions for weight CRUD
 * 
 * @author Robert Arifin<arifinrobert2012@gmail.com>
 */

const Weight = require('../models/Weight.js');

module.exports = {
  createNewWeightItem(req, res) {
    /**
     * function create new Weight Item with date, maxWeight, and minWeight as parameters 
     *  and return the created object as result
     * @param req
     * @param res
     * 
     * @author Robert Arifin<arifinrobert2012@gmail.com>
     */

    if (Number(req.body.minWeight) > Number(req.body.maxWeight)) {
      console.log('ga masuk sini?')
      res.status(404).json({
        info: 'Failed to create new data',
        err:  'Max weight must be bigger than min weight'
      })

      return;
    }

    let newData = {
      date: req.body.date,
      maxWeight: req.body.maxWeight,
      minWeight: req.body.minWeight
    }

    Weight.create(newData)
      .then((data) => {
        res.status(201).json({
          info: 'New weight data is created successfully',
          data: data
        })
      })
      .catch((err) => {
        let errorString = '';

        if (err. errors) {
          const { errors } = err;
          for (let props in errors) {
            errorString += errors[props].message.substring(errors[props].message.indexOf(' '));
          }
        }
        res.status(404).json({
          info: 'Failed to create new data',
          err: errorString
        })
      })
  },

  getAllWeightItems(req, res) {
    /**
     * function that return all existing weight items if exist
     * @param req
     * @param res
     * 
     * @author Robert Arifin<arifinrobert2012@gmail.com>
     */
    Weight.find({})
      .then((data) => {
        if (data.length > 0) {
          let averageMaxWeight = 0;
          let averageMinWeight = 0;
          let averageDifferences = 0;
  
          let allData = data.map((datum) => {
            let obj = {};
            obj._id = datum._id;
            obj.date = datum.date;
            obj.maxWeight = datum.maxWeight;
            obj.minWeight = datum.minWeight;
            obj.differences = datum.maxWeight - datum.minWeight;
            averageMaxWeight += datum.maxWeight;
            averageMinWeight += datum.minWeight;
            averageDifferences += obj.differences;
  
            return obj;
          })
  
          averageMaxWeight = (averageMaxWeight / allData.length).toFixed(2);
          averageMinWeight = (averageMinWeight / allData.length).toFixed(2);
          averageDifferences = (averageDifferences / allData.length).toFixed(2);
  
          res.status(200).json({
            info: 'Successfully get all weight data',
            data: {
              items: allData,
              averageMaxWeight: averageMaxWeight,
              averageMinWeight: averageMinWeight,
              averageDifferences: averageDifferences
            }
          })
        } else {
          res.status(404).json({
            info: 'Failed to get all weight data',
            err: 'Data does not exist'
          })
        }
      })
      .catch((err) => {
        res.status(500).json({
          info: 'Failed to get all weight data',
          err: err
        })
      })
  },

  getOneWeightItem(req, res) {
  /**
   * function that return one item details based on id on request parameter if it is exist
   * @param req
   * @param res
   * 
   * @author Robert Arifin<arifinrobert2012@gmail.com>
   */
    Weight.findById(req.params.weightId)
      .then((data) => {
        if (data) {
          res.status(200).json({
            info: 'Successfully get one data',
            data: data
          })
        } else {
          res.status(404).json({
            info: 'Failed to get data',
            err: 'Data is not exist'
          })
        }
      })
      .catch((err) => {
        res.status(500).json({
          info: 'Failed to get data',
          err: err
        })
      })
  },

  deleteOneWeightItem(req, res) {
    /**
     * Function that delete weight item from id based on request parameter if it does exists
     * @param req
     * @param res
     * 
     * @author Robert Arifin<arifinrobert2012@gmail.com>
     */

     Weight.findByIdAndDelete(req.params.weightId)
      .then((data) => {
        if (data) {
          res.status(204).json( )
        } else {
          res.status(404).json({
            info: 'Failed to delete data',
            err: 'Data is not exist'
          })
        }
      })
      .catch((err) => {
        res.status(500).json({
          info: 'Failed to delete data',
          err: err
        })
      })
  },

  updateWeightItem(req, res) {
    /**
     * function that update weight item data from id based on request paramater and body if it does exists
     * @param req
     * @param res
     * 
     * @author Robert Arifin<arifinrobert2012@gmail.com>
     */

     let updateData = req.body; 

     if (updateData.minWeight && updateData.maxWeight && updateData.maxWeight < updateData.minWeight) {
      res.status(404).json({
        info: 'Failed to update weight data',
        err:  'Max weight must be bigger than min weight'
      })

      return ;
    }

     Weight.findById(req.params.weightId)
      .then((data) => {
        if (data) {
          if (updateData.maxWeight && !updateData.minWeight && updateData.maxWeight < data.minWeight) {
            res.status(404).json({
              info: 'Failed to update weight data',
              err:  'Max weight must be bigger than min weight'
            })

            return ;

          } else if (!updateData.maxWeight && updateData.minWeight && updateData.minWeight > data.maxWeight) {
            res.status(404).json({
              info: 'Failed to update weight data',
              err:  'Max weight must be bigger than min weight'
            })

            return ;
          } else {
            return Weight.findByIdAndUpdate(req.params.weightId, updateData, { new: true })    
          }
        } else {
          res.status(404).json({
            info: 'Failed to update weight data',
            err: 'Data not found'
          })

          return ;
        } 
      })
      .then((data) => {
        if (data) {
          res.status(200).json({
            info: 'Successfully update data',
            data: data
          })

          return ;
        } else {
          res.status(404).json({
            info: 'Failed to update weight data',
            data: 'Data not found'
          })

          return ;
        }
      })
      .catch((err) => {
        res.status(500).json({
          info: 'Failed to update weight data',
          err: err
        })
      })
  }
}