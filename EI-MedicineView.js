"use strict";

Module.register("EI-MedicineView", {

	medicine: {
		display: false,
		scanning: false,
		amount: 0,
		name: "",
		day: ""
	},

	start: function() {
		Log.info("Starting module: " + this.name);
	},

	// Define styles.
	getStyles: function() {
		return ["ei_medicine_styles.css"];
	},
	
	getDom: function() {
		const self = this;
		var wrapper = document.createElement("div");
		
		// Add button
		let button = document.createElement("div");
		button.className = "ei_medicineButton";
		button.id = "ei_medicineButton";
		button.textContent = "Medikament scannen";
		wrapper.appendChild(button);

		// Add scanning text
		if (self.medicine.scanning) {
			let scanInfo = document.createElement("p");
			scanInfo.textContent = "Es wird gescannt, bitte warten...";
			wrapper.appendChild(scanInfo);

			// deactivate scanning
			setTimeout(function(ViewSelf) {
				ViewSelf.medicine.scanning = false;
				ViewSelf.updateDom();
			}, 5000, self);
		}

		// Add info text
		if (self.medicine.display) {
			let info = document.createElement("p");
			info.textContent = self.medicine.amount + " Pillen am " + self.medicine.day + " nehmen.";
			wrapper.appendChild(info);
		}

		// Add table
		let table = document.createElement("table");
		table.innerHTML = "\
			<tr>\
			<th>Montag</th>\
			<th>Dienstag</th>\
			<th>Mittwoch</th>\
			<th>Donnerstag</th>\
			<th>Freitag</th>\
			<th>Samstag</th>\
			<th>Sonntag</th>\
			</tr>\
			<tr>\
			<td>TODO(MSt): Add data</td>\
			<td></td>\
			<td></td>\
			<td></td>\
			<td></td>\
			<td></td>\
			</tr>";
		wrapper.appendChild(table);

		return wrapper;
	},

	suspend: function() {
		this.sendNotification("MED_STOP_SCANNING");
	},

	sendUpdate: function(self) {
        MM.updateDom(self).then(() => {
            self.sendNotification("UPDATE_OBS_ELEMENT", "ei_medicineButton");
            self.sendNotification("UPDATE_OBS_ELEMENT", "ei_medicineButton");
        })
    },

	notificationReceived: function(notification, payload, sender) {
		const self = this;

		switch (notification) {
		case "MEDICINE":
			self.medicine.amount = payload.amount;
			self.medicine.name = payload.name;
			self.medicine.day = payload.day;
			self.medicine.display = true;
			self.sendUpdate(self);
			break;
		case "MED_START_SCANNING":
			self.medicine.scanning = true;
			self.sendUpdate(self);
			break;
		}
	},
});
