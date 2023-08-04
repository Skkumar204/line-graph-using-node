const mqtt = require("mqtt");

const client = mqtt.connect("htpp://test.mosquitto.org");


client.on("connect", () => {
  console.log("Connected to MQTT broker");

  client.subscribe("cpu-usage", (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Subscribed to CPU usage topic");
    }
  });

  client.subscribe("ram-usage", (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Subscribed to RAM usage topic");
    }
  });

  client.subscribe("disk-usage", (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Subscribed to disk usage topic");
    }
  });
});

client.on("message", (topic, message) => {
  console.log(`Received ${topic}: ${message}`);
});
