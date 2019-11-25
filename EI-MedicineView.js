"use strict";

Module.register("EI-MedicineView", {

	medicine: null,

	start: function() {
		Log.info("Starting module: " + this.name);
	},

	getTemplate: function () {
		return "ei_medicineView.njk";
	},

	getTemplateData: function() {
		return self.medicine;
	},

	resume: function() {
		this.sendNotification("MED_START_SCANNING");
	},

	suspend: function() {
		this.sendNotification("MED_STOP_SCANNING");
	},

	notificationReceived: function(notification, payload, sender) {
		const self = this;

		switch (notification) {
		case "MEDICINE":
			self.medicine = payload;
			self.updateDom();
			break;
		}
	},
});
