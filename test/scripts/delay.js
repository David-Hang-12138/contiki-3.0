TIMEOUT(300000, log.log("Total PRR " + totalPRR + "\n"));

packetsReceived = new Array();
packetsSent = new Array();
serverID = 1;
nodeCount = 31;
totalPRR = 0;
t_total = 0;
throughput = 0;
data_length = 23;
Average_delay = 0;
timeReceived = new Array();
timeSent = new Array();
delay = new Array();
for (i = 0; i <= nodeCount; i++) {
    packetsReceived[i] = 0;
    packetsSent[i] = 0;
    timeReceived[i] = 0.0;
    timeSent[i] = 0.0;
    delay[i] = 0.0;
}

while (1) {
    YIELD();
    msgArray = msg.split(" ");
    if (msgArray[0].equals("DATA")) {
        if (msgArray.length == 9) {
            // Received packet

            senderID = parseInt(msgArray[8]);
            packetsReceived[senderID]++;
            timeReceived[senderID] = time;
            log.log(
                "\n" +
                    " SenderID " +
                    senderID +
                    " PRR " +
                    packetsReceived[senderID] / packetsSent[senderID] +
                    "timeReceived[senderID]" +
                    timeReceived[senderID] +
                    " timeSent[senderID] " +
                    timeSent[senderID] +
                    "\n"
            );
            totalReceived = totalSent = 0;
            totaldelay = 0;
            count1 = 0;
            for (i = serverID + 1; i <= nodeCount; i++) {
                totalReceived += packetsReceived[i];
                totalSent += packetsSent[i];
                if (timeReceived[i] > 0) {
                    delay[i] = timeReceived[i] - timeSent[i];
                    delay[i] = delay[i] / 10000000;
                    //   log.log("\n" + " delay[i] " + delay[i] + " iiii " + i + "\n");
                    if (delay[i] > 0) {
                        totaldelay = totaldelay + delay[i];
                        count1++;
                    }
                }
            }
            totalPRR = totalReceived / totalSent;
            t_total = totalPRR * 100;
            log.log("\n" + " Total_delay " + totaldelay + "\n");
        } else if (msgArray.length == 6) {
            // Sent packet

            packetsSent[id]++;
            timeSent[id] = time;
            log.log(
                "\n" +
                    " packetsSent[id]" +
                    packetsSent[id] +
                    " timeSent[id] " +
                    timeSent[id] +
                    " id " +
                    id +
                    "\n"
            );
        }
    }
}