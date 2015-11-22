#!/usr/bin/node

var heatmiser = require("../lib/heatmiser");

var hm = new heatmiser.Netmonitor("192.168.1.50", 1234);

hm.on('success', function(data) {
	for (i = 0; i < data.dcb.stats.length; i++) {
		console.log("ID:" + data.dcb.stats[i].id);
		console.log("Name:" + data.dcb.stats[i].name);
		console.log("Model:" + data.dcb.stats[i].model);
		console.log("Current Temp:" + data.dcb.stats[i].current_temp);
		console.log("Set Temp:" + data.dcb.stats[i].set_temp);
		console.log("Lock:" + data.dcb.stats[i].lock);
		console.log("Heating:" + data.dcb.stats[i].heating);
		console.log("Frost:" + data.dcb.stats[i].frost);
		console.log("Away:" + data.dcb.stats[i].away);
		console.log("Holiday:" + data.dcb.stats[i].holiday);
		console.log("\n");
	}
});
hm.on('error', function(data) {
  console.log(data);
});


//hm.read_device();

hm.getSummary();
