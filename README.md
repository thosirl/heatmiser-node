heatmiser-node
==============

A nodejs module to talk to Heatmiser WiFi and Neo thermostats

See more examples in the `examples` dir

# Heatmiser Neo

    var heatmiser = require('heatmiser');
    var neo = new heatmiser.Neo("192.168.1.100");

    neo.on('success', function(data) {
      console.log(data);
    });
    neo.on('error', function(data) {
      console.log(data);
    });

    neo.info();
    neo.statistics();
    neo.setAway(true, ["living","kitchen"]);


# Heatmiser WiFi

## Reading the thermostat status

    var heatmiser = require('heatmiser');
    var hm = new heatmiser.Wifi('localhost', 1234);

    hm.on('success', function(data) {
      console.log(data);
    });
    hm.on('error', function(data) {
      console.log(data);
    });

    hm.read_device();

## Writing to the thermostat

    var dcb;

    // set frost mode
    dcb = {
      runmode: 'frost'
    }
    hm.write_device(dcb);

    // set current date and time
    dcb = {
      time: new Date()
    }
    hm.write_device(dcb);

    // set the thermostat hold
    dcb = {
      heating: {
        target: 20, // C
        hold: 30 // minutes
      }
    }
    hm.write_device(dcb);

# Heatmiser Netmonitor

Still quite experimental, based on Wifi module above

The Netmonitor device is quite slow, and only likes single connection at a time, so work to be done to allow better error control and retry logic. It will also struggle reading/writing in succession, so some wait time needed also.

Ideally the settings syntax would be expanded to include stat ID and then allow multiple stats settings to be set with 1 pass, but for the moment I'm just passing stat ID seperately, so still based on very similar syntax to the Wifi module.

## Reading the Netmonitor for Summary of connected stats and their settings

    var heatmiser = require('heatmiser');
    var hm = new heatmiser.Netmonitor('localhost', 1234);

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

    hm.getSummary();

## Writing to a single thermostat

This is the same as the Wifi configuration and syntax, with the exception of passing the thermostat netwrok address ID on the write_device call.

	var dcb1 = {
	  heating: {
	    target: 21
	  }
	}

	hm.write_device(7,dcb1);



# Credits

* Ben Pirt for the Heatmiser WiFi reading functions in Node https://github.com/bjpirt/heatmiser-js
* heatmiser-wifi Perl project for the overall ideas and algorithms https://code.google.com/p/heatmiser-wifi/
