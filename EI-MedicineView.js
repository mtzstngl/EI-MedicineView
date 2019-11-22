"use strict";

Module.register("EI-MedicineView", {
	start: function() {
		Log.info("Starting module: " + this.name);
	},

	getTemplate: function () {
		return "ei_medicineView.njk";
	},

	/*getTemplateData: function () {
		let data = {
			oth_image: this.file("othaw-logo.svg"),
			epp_image: this.file("epp-logo.jpg")
		};
		return data;
	}*/
});
