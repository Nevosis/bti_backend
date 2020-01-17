var mongoose = require("mongoose");

var reportSchema = new mongoose.Schema(
	{
		reporterId: { type: String, require: true },
		reporterMail: { type: String, require: true },
		reportedName: { type: String, require: true },
		reportedId: { type: String, require: true },
		date: { type: Date, default: Date.now }
	},
	{
		versionKey: false // Remove the __v field
	}
);

var Reports = mongoose.model("Reports", reportSchema);

module.exports = Reports;
