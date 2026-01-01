const Portfolio = require("../models/Portfolio");
const { validationResult } = require("express-validator");
const cloudinary = require("../config/cloudinary");

exports.createPortfolio =async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())return res.status(400).json(errors.array());
    const portfolio=await Portfolio.findOneAndUpdate(
        {userId:req.user.id},
        {...req.body,userId:req.user.id},
        {new:true,upsert:true}
    );
      res.status(201).json(portfolio);
};

exports.getPortfolioByUsername = async (req, res) => {
  const portfolio = await Portfolio.findOne({ username: req.params.username });
  if (!portfolio) return res.status(404).json({ message: "Not found" });
  res.json(portfolio);
};

exports.updatePortfolio = async (req, res) => {
  const portfolio = await Portfolio.findOneAndUpdate(
    {  userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(portfolio);
};

exports.deletePortfolio = async (req, res) => {
  await Portfolio.findOneAndDelete({userId: req.user.id });
  res.json({ message: "Deleted" });
};

exports.uploadProfileImage  = async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  const portfolio = await Portfolio.findOneAndUpdate(
    { userId: req.user.id },
    { profileImage: result.secure_url },
    { new: true }
  );
  res.json(portfolio);
};

exports.uploadProjectImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  const portfolio = await Portfolio.findOneAndUpdate(
    { userId: req.user.id, "projects._id": req.params.projectId },
    { "projects.$.image": result.secure_url },
    { new: true }
  );
  res.json(portfolio);
};
exports.uploadCertificateImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  const portfolio = await Portfolio.findOneAndUpdate(
    { userId: req.user.id, "certificates._id": req.params.certificateId },
    { "certificates.$.image": result.secure_url },
    { new: true }
  );
  res.json(portfolio);
};

exports.updateTheme = async (req, res) => {
  const portfolio = await Portfolio.findOneAndUpdate(
    { userId: req.user.id },
    { theme: req.body.theme },
    { new: true }
  );
  res.json(portfolio);
};

exports.getThemes=(req,res)=>{
     const themes = ["classic", "dark", "modern"];
  res.json(themes);
}

