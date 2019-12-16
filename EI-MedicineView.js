"use strict";

Module.register("EI-MedicineView", {

    medicine: {
        display: false,
        scanning: false,
        name: ""
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

        wrapper.innerHTML = " \
        <div id=\"ei_medicineViewparent\" class=\"ei_medicineView\" style=\"left: 50%\"> \
            <div class=\"ei_innercontainer\"> \
                  <div class=\"ei_innermedicineView ei_medicineButton\">Medikament scannen</div> \
            </div> \
          </div>";

        // Add scanning text
        let scanInfo = document.createElement("p");
        if (self.medicine.scanning) {
            scanInfo.textContent = "Es wird gescannt, bitte warten...";
            // deactivate scanning
            setTimeout(function(ViewSelf) {
                ViewSelf.medicine.scanning = false;
                ViewSelf.sendUpdate(ViewSelf);
            }, 7000, self);
        } else {
            scanInfo.textContent = "Bitte Button auswählen und Medikament vor die Kamera halten.";
        }
        wrapper.appendChild(scanInfo);

        // Add info text
        if (self.medicine.display) {
            let info = document.createElement("p");
            if (self.medicine.name !== null)
                info.textContent = "Bitte 1 Pille " + self.medicine.name + " nehmen.";
            else
                info.textContent = "Einlesen fehlgeschlagen.";
            wrapper.appendChild(info);
        }

        // Add table
        let table = document.createElement("table");
        table.style = "padding-top: 200px";
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
            <td>ACC</td>\
            <td>Paracetamol</td>\
            <td>Dolormin Extra</td>\
            <td>ACC</td>\
            <td>Paracetamol</td>\
            <td>Dolormin Extra</td>\
            </tr>";
        wrapper.appendChild(table);

        return wrapper;
    },

    suspend: function() {
        const self = this;

        self.medicine.name = null;
        self.medicine.display = false;
        self.sendUpdate(self);
    },

    sendUpdate: function(self) {
        MM.updateDom(self).then(() => {
      //      self.sendNotification("UPDATE_OBS_ELEMENT", "ei_medicineButton");
        })
    },

    notificationReceived: function(notification, payload, sender) {
        const self = this;

        switch (notification) {
        case "MEDICINE":
            self.medicine.name = payload.medicine;
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
