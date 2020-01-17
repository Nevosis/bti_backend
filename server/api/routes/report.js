const Reports = require("../models/reports");
const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
	Reports.find(function(err, reports) {
		if (err) return console.error(err);
		res.send(reports);
	});
});

router.post("/:channelName", function(req, res) {
	let channelName = req.params.channelName;
	let channelId = req.body.channelId;

	if (req.body && channelName && channelId) {
		Reports.find(
			{ reportedName: channelName, reportedId: channelId },
			function(err, reports) {
				if (err) return console.error(err);
				res.send(reports);
			}
		);
	} else {
		res.status(400).send("channelName and channelId mandatory");
	}
});

router.post("/", function(req, res) {
	const { reporterId, reporterMail, reportedName, reportedId } = req.body;
	if (req.body && reporterId && reporterMail && reportedName && reportedId) {
		let report = new Reports({
			reporterId,
			reporterMail,
			reportedName,
			reportedId
		});

		Reports.find(
			{ reporterId, reporterMail, reportedName, reportedId },
			function(err, reports) {
				if (err) return console.error(err);
				if (reports.length) {
					// report already exist
					res.status(400).send("Report already exist for this user");
				} else {
					report.save(function(err, rep) {
						if (err) res.status(500).send("Broken");
						else
							res.json({
								createdReport: report
							});
					});
				}
			}
		);
	} else {
		res.status(400).send("reporter and reported mandatory");
	}
});

module.exports = router;
