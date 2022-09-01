const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  material: {
    type: String,
    default: ""
  },

  sections: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model("course", Schema);

// [ 
//   {
//     _id: "1",
//     totalLectures: 10,
//     time: 420,
//     name: "Introduction",
//     videos: [
//       {_id: "1", name: "Getting Started", time: 30, videos: ["link1", "link2", "link3"]},
//     ]
//   }
// ]