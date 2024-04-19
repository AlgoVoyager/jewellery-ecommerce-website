const Jewelry = require('../models/jewelleryModel');
exports.insertJewellry = async (req, res) => {
  try {
    console.log(req.body)
    // return res.json({status:"ok",infoMsg:"added Succesfully."})
    const newJewelry = new Jewelry(req.body);
    const savedJewelry = await newJewelry.save();
    console.log(savedJewelry)
    res.status(201).json({infoMsg:"Added Succesfully",status:"ok"});
  } catch (error) {
    res.status(500).json({ infoMsg: error.message });
  }
};
exports.deleteJewellery = async (req,res) =>{
    console.log("deleted ",res.body)
}
exports.editJewellery = async (req,res) =>{
    console.log("edit  ",res.body)
}
exports.getJewelryByMerchant = async (req, res) => {
    try {
      const merchant = req.body.merchant; // Assuming you pass the merchant ID in the request parameters
      const jewelry = await Jewelry.find({ merchant: merchant });
      res.json(jewelry);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msgInfo: 'Failed to get Data.!' });
    }
  };

exports.getAllJewelleries =async (req,res)=>{
  try {
    const category = req.query.category;
    console.log(category)
    if (category=="all"){
       let jewelleryItems= await Jewelry.find();
      console.log(jewelleryItems.map((item)=>item.jewelleryType.split("|")[1]))
      res.json(jewelleryItems);
    }
    else{
      let products="";
    switch (category) {
      case "Earrings":
          products = "Earring"
          break;
      case "Pendants":
          products = "Pendants"
          break;
      case "Mangalsutra":
          products = "Mangalsutra"
          break;
      case "Necklace":
          products = "Necklace"
          break;
      case "Chains":
          products = "Chains"
          break;
      case "Bangles":
          products = "Bangles"
          break;
      case "Finger-Rings":
          products = "Ring"
          break;
      case "Nose-Pins":
          products = "Nose Pins"
          break;
      case "Bracelets":
          products = "Bracelets"
          break;
      
      default:
          products="Bangles"
          break;
  }

  console.log(products)
  let jewelleryItems = await Jewelry.find({ jewelleryType: new RegExp('^' + products + '\\|') });
  console.log(jewelleryItems.length)
  res.json(jewelleryItems);
}


  } catch (error) {
    res.status(500).json({ infoMsg: 'Error fetching jewelry items', error: error.message });
  }
}
exports.getJewelleryById = async (req,res)=>{
  const { id } = req.params;

  try {
    const jewelryItem = await Jewelry.findById(id);
    if (!jewelryItem) {
      return res.status(404).json({ message: 'Jewelry item not found' });
    }
    res.json(jewelryItem);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jewelry item', error: error.message });
  }

}