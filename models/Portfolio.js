const mongoose=require('mongoose');

const PortfolioSchema=mongoose.Schema(
{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    title: String,
    about: String,
    profileImage: String,
    theme: { type: String, enum: ["classic","dark","modern"], default: "classic" },
    skills: [String],
    projects: [{ name: String, description: String, link: String, image: String }],
    experience: [{ company: String, role: String, startDate: Date, endDate: Date, description: String }],
    education: [{ institution: String, degree: String, startDate: Date, endDate: Date, description: String }],
    certificates: [{ name: String, issuer: String, link: String, image: String }],
    links: { github: String, linkedin: String, email: String, website: String }
  },
  { timestamps: true }
);

module.exports=mongoose.model('Portfolio',PortfolioSchema);