#!/usr/bin/node

var heatmiser = require("../lib/heatmiser");

var hm = new heatmiser.Netmonitor("192.168.1.50", 1234);

hm.on('success', function(data) {
  console.log(data);
});
hm.on('error', function(data) {
  console.log(data);
});

// Pass stat network ID to address the stat
hm.getInfo(7);

// SEttings work the same, just pass the stat network ID to set things
var dcb1 = {
  heating: {
    target: 21
  }
}

hm.write_device(7,dcb1);

