const mongoose = require('mongoose');

const commonSchema = new mongoose.Schema({
    isActive: { type: Boolean, require: true, default: true },
    createdBy: { type: mongoose.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
    isDeleted: { type: Boolean, require: true, default: false },
    createdAt: { type: Date, default: new Date },
    updatedAt: { type: Date, default: new Date }
}, { timestamps: true })

module.exports = commonSchema;