const QueryHelper = require("../utility/utility");
const ErrorExtender = require("../utility/errorExtender");

module.exports.createElement = function (ElementModel){
    return async function create(req, res){
        const receivedElement = req.body;
        try{
            let createElement = await ElementModel.create(receivedElement);
            res.status(201).json({
                status: "success",
                createdElement,
            });
        }catch(err){

            res.status(501).json({
                err,
                status: "Internal Server Error",
            });
        }
    };
}

module.exports.getAllElement = function (ElementModel) {
    return async function getAll(req, res) {
      try {
        // 
        let willGetAllElementsPromise = new QueryHelper(ElementModel.find(), req.query);
        // pageElements = filteredElements.slice(toSkip, toSkip + limit);
        let filteredElements = willGetAllElementsPromise.filter().sort().select().paginate();
        let finalans = await filteredElements.query;
        res.status(200).json({
          status: "all Elements recieved",
          data: finalans,
        });
      } catch (err) {
        res.status(400).json({
          err: err.message
        })
      }
    };
}

module.exports.getElement = function (ElementModel) {
    return async function get(req, res) {
      try {
        // recieve id through params
        const { id } = req.params;
        const Element = await ElementModel.findById(id);
        res.json({
          status: "successfull",
          data: Element,
        });
      } catch (err) {
        res.status(404).json({
          status: "Element Not found",
          err,
        });
      }
    }; 
}

module.exports.updateElement = function (ElementModel) {
    return async function update(req, res) {
      //  identifier => Element
      // const originalElement = Elements[id - 1];
      //fields to be updated in ur Element
      // local
      try {
        const id = req.params.id;
        const toupdateData = req.body;
        // mdb=> express server
        const originalElement = await ElementModel.findById(id);
        const keys = [];
        for (let key in toupdateData) {
          keys.push(key);
        }
        // express server => modify
        for (let i = 0; i < keys.length; i++) {
          originalElement[keys[i]] = toupdateData[keys[i]];
        }
        // express server=> modified=> mdb
        const updatedElement = await originalElement.save();
        // fs.writeFileSync("./data/Elements.json", JSON.stringify(Elements));
        // db********************************************************
        // update DB update =>old Element return
        res.status(200).json({
          status: "update request recieved",
          Element: updatedElement,
        });
      } catch (err) {
        console.log(err);
        res.status(501).json({
          status: "Element could not be updated",
          err,
        });
      }
    };
}

module.exports.deleteElement = function (ElementModel) {
    return async function (req, res) {
      try {
        const id = req.params.id; 
        const Element = await ElementModel.finByIdAndDelete(id);
        res.status(200).json({
          status: "Element Deleted",
          Element: Element,
        });
      } catch (err) {
        res.status(404).json({
          status: "Element could not be Deleted",
          err: err.message,
        });
      }  
    }  
}