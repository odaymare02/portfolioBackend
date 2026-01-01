const router = require("express").Router();
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");
const {
  createPortfolio,
  getPortfolioByUsername,
  updatePortfolio,
  deletePortfolio,
  uploadProfileImage,
  updateTheme,
  uploadProjectImage,
uploadCertificateImage,
getThemes
} = require("../controllers/portfolio.controller");
const { createPortfolioValidator } = require("../validators/portfolio.validator");
const Portfolio = require("../models/Portfolio");
const { default: mongoose } = require("mongoose");

router.post("/", auth, createPortfolioValidator, createPortfolio);
router.get("/themes", getThemes);
router.get("/:username", getPortfolioByUsername);
router.put("/:id", auth, updatePortfolio);
router.delete("/:id", auth, deletePortfolio);
router.post("/upload-profile", auth, upload.single("image"), uploadProfileImage);
router.post("/upload-project/:projectId", auth, upload.single("image"), uploadProjectImage);
router.post("/upload-certificate/:certificateId", auth, upload.single("image"), uploadCertificateImage);

router.put("/theme", auth, updateTheme);
router.post("/:id/add-project", auth, async (req, res) => {
  const { name, description } = req.body;
  const portfolio = await Portfolio.findById(req.params.id);
  const newProject = { _id: new mongoose.Types.ObjectId(), name, description, link: "", image: "" };
  portfolio.projects.push(newProject);
  await portfolio.save();
  res.json(newProject); // return the new project with _id
});


module.exports = router;
