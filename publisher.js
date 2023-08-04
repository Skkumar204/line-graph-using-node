// const mqtt = require('mqtt');
// const os = require('os');
// const diskusage = require("diskusage");
// const client = mqtt.connect('mqtt://test.mosquitto.org');


// setInterval(() => {

//   const cpus = os.cpus();
//   const cpuCount = cpus.length;
//   for (let i = 0; i < cpuCount; i++) {
//           const cpu = cpus[i];
//           const totalTick = Object.values(cpu.times).reduce((sum, val) => sum + val);
//           const idleTick = cpu.times.idle;
    
//           const cpuUsagePercent = ((idleTick / totalTick) * 100).toFixed(1);
          
//           const cpuPayload = JSON.stringify({ cpuId: i, cpuUsagePercent });
//           client.publish('cpu-usage', cpuPayload);
//           console.log(`CPU ${i} usage: ${cpuUsagePercent}%`);
          
//         }

//         const ramUsagePercent = ((1 - os.freemem() / os.totalmem()) * 100).toFixed(2);
//         const ramPayload = JSON.stringify({ ramUsagePercent });
//         client.publish("ram-usage", ramPayload);
//         console.log(`RAM usage: ${ramUsagePercent}%`);
//         const totalDisk = os.totalmem();
//         const freeDisk = os.freemem();
//         const usedDisk = totalDisk - freeDisk;
//         const diskUsage = usedDisk / totalDisk * 100;
//         const partitions = diskusage.checkSync("/");
//         console.log("Partitions:", partitions, typeof partitions);
//         if (Array.isArray(partitions)) {
//           partitions.forEach((partition) => {
//             const partitionUsagePercent = ((1 - partition.available / partition.total) * 100).toFixed(2);
//             const partitionPayload = JSON.stringify({ partition: partition.fs, usagePercent: partitionUsagePercent });
//             client.publish("disk-usage", partitionPayload);
//             console.log(`Partition ${partition.fs} usage: ${partitionUsagePercent}%`);
//           });
//       }
// }, 3000);

// client.on('connect', () => {
//   client.subscribe(['cpu-usage', 'ram-usage', 'disk-usage', 'cpu-usage-percent', 'ram-usage-percent', 'disk-usage-percent'], (err) => {
//     if (!err) {
//       console.log('Subscribed to topics');
//     } else {
//       console.error(err);
//     }
//   });
// });



// client.on("error", (err) => {
//     console.error(err);
//     client.end();
//   });



const mqtt = require('mqtt');
const os = require('os');
const diskusage = require("diskusage");
const client = mqtt.connect('mqtt://test.mosquitto.org');

setInterval(() => {
  const cpus = os.cpus();
  const cpuCount = cpus.length;
  for (let i = 0; i < cpuCount; i++) {
    const cpu = cpus[i];
    const totalTick = Object.values(cpu.times).reduce((sum, val) => sum + val);
    const idleTick = cpu.times.idle;
    const cpuUsagePercent = ((idleTick / totalTick) * 100).toFixed(1);
    const cpuPayload = JSON.stringify({ cpuId: i, cpuUsagePercent });
    client.publish('cpu-usage', cpuPayload);
    console.log(`CPU ${i} usage: ${cpuUsagePercent}%`);
  }

  const ramUsagePercent = ((1 - os.freemem() / os.totalmem()) * 100).toFixed(2);
  const ramPayload = JSON.stringify({ ramUsagePercent });
  client.publish("ram-usage", ramPayload);
  console.log(`RAM usage: ${ramUsagePercent}%`);
  const disks = os.platform() === 'win32' ? ['C:'] : ['/'];
  disks.forEach((disk) => {
    const usage = 100 - (100 * os.freemem() / os.totalmem());
    const message = {
      partition: disk,
      usagePercent: usage.toFixed(2)
    };
    client.publish('disk-usage-percent', JSON.stringify(message));
    console.log(message);
  });
}, 3000);

client.on('connect', () => {
  client.subscribe(['cpu-usage', 'ram-usage', 'disk-usage', 'cpu-usage-percent', 'ram-usage-percent', 'disk-usage-percent'], (err) => {
    if (!err) {
      console.log('Subscribed to topics');
    } else {
      console.error(err);
    }
  });
});

client.on("error", (err) => {
  console.error(err);
  client.end();
});



// const mqtt = require('mqtt');
// const os = require('os');
// const diskusage = require("diskusage");
// const si = require('systeminformation');
// const client = mqtt.connect('mqtt://test.mosquitto.org');

// setInterval(() => {
//   const cpus = os.cpus();
//   const cpuCount = cpus.length;
//   for (let i = 0; i < cpuCount; i++) {
//     const cpu = cpus[i];
//     const totalTick = Object.values(cpu.times).reduce((sum, val) => sum + val);
//     const idleTick = cpu.times.idle;
//     const cpuUsagePercent = ((idleTick / totalTick) * 100).toFixed(2);
//     const cpuPayload = JSON.stringify({ cpuId: i, cpuUsagePercent });
//     client.publish('cpu-usage', cpuPayload);
//     console.log(`CPU ${i} usage: ${cpuUsagePercent}%`);
//   }

//   const ramUsagePercent = ((1 - os.freemem() / os.totalmem()) * 100).toFixed(2);
//   const ramPayload = JSON.stringify({ ramUsagePercent });
//   client.publish("ram-usage", ramPayload);
//   console.log(`RAM usage: ${ramUsagePercent}%`);
//   const disks = os.platform() === 'win32' ? ['C:'] : ['/'];
//   disks.forEach((disk) => {
//     const usage = 100 - (100 * os.freemem() / os.totalmem());
//     const message = {
//       partition: disk,
//       usagePercent: usage.toFixed(2)
//     };
//     client.publish('disk-usage-percent', JSON.stringify(message));
//     console.log(message);
//   });
  
//   // const interfaces = os.networkInterfaces();
//   // const networkUsageBytes = interfaces.eth0 ? interfaces.eth0[0].rx_bytes : 0;

// }, 3000);

// client.on('connect', () => {
//   client.subscribe(['cpu-usage', 'ram-usage', 'disk-usage'], (err) => {
//     if (!err) {
//       console.log('Subscribed to topics');
//     } else {
//       console.error(err);
//     }
//   });
// });

// client.on("error", (err) => {
//   console.error(err);
//   client.end();
// });

