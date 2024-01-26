const resturantModel = require("../models/resturantModel");

// CREATE RESTURANT
const createResturantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    // validation
    if (!title || !coords) {
      return res.status(400).json({
        success: false,
        message: "Please Provide Title and Address",
      });
    }
    const newResturant = new resturantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newResturant.save();

    res.status(201).json({
      success: true,
      message: "New Resturant Created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create Resturant api",
      error,
    });
  }
};

// GET ALL RESTURNATS
const getAllResturantController = async (req, res) => {
  try {
    const resturants = await resturantModel.find({});
    if (!resturants) {
      return res.status(404).json({
        success: false,
        message: "No Resturant Availible",
      });
    }
    res.status(200).json({
      success: true,
      totalCount: resturants.length,
      resturants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error In Get ALL Resturat API",
      error,
    });
  }
};

// GET RESTURNAT BY ID
const getResturantByIdController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(400).json({
        success: false,
        message: "Resturnat ID Required",
      });
    }
    //find resturant
    const resturant = await resturantModel.findById(resturantId);
    if (!resturant) {
      return res.status(404).json({
        success: false,
        message: "No Resturant Found",
      });
    }
    res.status(200).json({
      success: true,
      resturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error In GetResturarntByID Api",
      error,
    });
  }
};

//DELETE RESTRURNAT
const deleteResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).json({
        success: false,
        message: "No Resturant Found OR Provide Resturant ID",
      });
    }
    await resturantModel.findByIdAndDelete(resturantId);
    res.status(200).json({
      success: true,
      message: "Resturant Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Eror in delete resturant api",
      error,
    });
  }
};

module.exports = {
  createResturantController,
  getAllResturantController,
  getResturantByIdController,
  deleteResturantController,
};
