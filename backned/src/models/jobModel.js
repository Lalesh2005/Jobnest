import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    salary: {
      type: String,
      required: true,
    },

    skills: {
      type: [String],
      required: true,
    },

    experience: {
      type: String,
      required: true,
      default: "0",
    },

    jobType: {
      type: String,
      required: true,
      enum: ["Internship", "Full Time", "Part Time", "Contract"],
    },

    workMode: {
      type: String,
      required: true,
      enum: ["Remote", "Hybrid", "Onsite"],
    },

    source: {
      type: String,
      required: true,
      enum: [
        "LinkedIn",
        "Indeed",
        "Internshala",
        "Naukri",
        "Foundit",
        "Wellfound",
        "Hirist",
      ],
    },

    sourceUrl: {
      type: String,
      required: true,
      unique: true,
    },

    datePosted: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;