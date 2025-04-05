const Listing=require("../models/listing");


const getListings=async(req,res)=>{
try{
 const allListings=await Listing.find({});
 if(!allListings){
  return res.status(404).json({message: "Listing not found"});
 }
 res.status(200).json(allListings);
}catch(err){
res.status(404).json({message:err.message});
}
}

//show listings routes read operation
const showListings=async(req,res)=>{
  try{
    let {id} =req.params;
    let listing=await Listing.findById(id);
    console.log(listing);
   if(!listing){
    return res.status(404).json({message: "Listing not found"});
   }
   res.status(200).json(listing);
  }catch(err){
  res.status(404).json({message:err.message});
  }
}


const createListings = async (req, res) => {
  try {
    const { image, title, description, price, country, location } = req.body;

    const newListing = new Listing({
      image,
      title,
      description,
      price,
      country,
      location,
    });

    const savedListing = await newListing.save();
    res.status(201).json(savedListing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//edit listing route with axios
const EditListings=async(req,res)=>{
try{
let {id}=req.params;
const updateListing=await Listing.findByIdAndUpdate(id,req.body,{
  new:true,
  runValidators: true,
})
if (!updateListing) {
  return res.status(404).json({ message: "Listing not found" });
}
res.status(200).json(updateListing);
}catch(err){
  res.status(500).json({message:err.message});
}
}

const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Listing.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports={getListings, showListings ,createListings ,EditListings,deleteListing}