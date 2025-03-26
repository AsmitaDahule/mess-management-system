const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true
    },
    date: {
        type: Date, 
        default: Date.now ,
        required: true
    },
    status: { 
        type: String, 
        enum: ['Present', 'Absent'],
         required: true 
    }
});

module.exports = mongoose.model("attendance", attendanceSchema);