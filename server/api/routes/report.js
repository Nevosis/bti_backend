const Reports = require("../models/reports");
const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
	Reports.find(function(err, reports) {
		if (err) return console.error(err);
		res.send(reports);
	});
});

router.post("/", function(req, res) {
	if (
		req.body &&
		req.body.reporterId &&
		req.body.reporterMail &&
		req.body.reportedName &&
		req.body.reportedId
	) {
		let report = new Reports({
			reporterId: req.body.reporterId,
			reporterMail: req.body.reporterMail,
			reportedName: req.body.reportedName,
			reportedId: req.body.reportedId
		});
		report.save(function(err, rep) {
			if (err) res.status(500).send("Broken");
			else
				res.json({
					createdReport: report
				});
		});
	} else {
		res.status(400).send("reporter and reported mandatory");
	}
});

module.exports = router;
