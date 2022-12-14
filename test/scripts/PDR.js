TIMEOUT(120000); // simulation duration in milliseconds

g_aMotes = sim.getMotes();
g_nMoteCount = g_aMotes.length;
g_anRxPacketsCount = new Array();
g_anRxBytes = new Array();
g_anMTxPacketsCount = new Array();
g_anMTxBytes = new Array();
g_anUTxPacketsCount = new Array();
g_anUTxBytes = new Array();

for (i = 1; i <= g_nMoteCount; i++) {
    g_anRxPacketsCount[i] = 0;
    g_anRxBytes[i] = 0;
    g_anMTxPacketsCount[i] = 0;
    g_anMTxBytes[i] = 0;
    g_anUTxPacketsCount[i] = 0;
    g_anUTxBytes[i] = 0;
}

g_nTotalRxPackesCount = 0;
g_nTotalRxBytes = 0;
g_nTotalMTxPackesCount = 0;
g_nTotalMTxBytes = 0;
g_nTotalUTxPackesCount = 0;
g_nTotalUTxBytes = 0;

timeout_function = function () {
    for (i = 1; i <= g_nMoteCount; i++) {
        log.log("Mote [" + i + "]");
        if (0 < g_anRxPacketsCount[i]) {
            log.log(" rx_packets = " + g_anRxPacketsCount[i]);
        }
        if (0 < g_anMTxPacketsCount[i]) {
            log.log(" mtx_packets = " + g_anMTxPacketsCount[i]);
        }
        if (0 < g_anUTxPacketsCount[i]) {
            log.log(" utx_packets = " + g_anUTxPacketsCount[i]);
        }
        if (0 < g_anRxBytes[i]) {
            log.log(" rx_bytes = " + g_anRxBytes[i]);
        }
        if (0 < g_anMTxBytes[i]) {
            log.log(" mtx_bytes = " + g_anMTxBytes[i]);
        }
        if (0 < g_anUTxBytes[i]) {
            log.log(" utx_bytes = " + g_anUTxBytes[i]);
        }
        log.log("\n");
        log.log(
            "Throughput = " +
                Math.round(
                    (g_anRxBytes[i] * 1000000) / sim.getSimulationTime()
                ) +
                " bytes/s, "
        );
        log.log(
            "PDR = " +
                Math.round(
                    (g_anRxPacketsCount[i] * 100) /
                        (g_anMTxPacketsCount[i] + g_anUTxPacketsCount[i])
                ) +
                " %\n"
        );
    }
    log.log("[TOTAL]");
    if (0 < g_nTotalRxPackesCount) {
        log.log(" rx_packets = " + g_nTotalRxPackesCount);
    }
    if (0 < g_nTotalMTxPackesCount) {
        log.log(" mtx_packets = " + g_nTotalMTxPackesCount);
    }
    if (0 < g_nTotalUTxPackesCount) {
        log.log(" utx_packets = " + g_nTotalUTxPackesCount);
    }
    if (0 < g_nTotalRxBytes) {
        log.log(" rx_bytes = " + g_nTotalRxBytes);
    }
    if (0 < g_nTotalMTxBytes) {
        log.log(" mtx_bytes = " + g_nTotalMTxBytes);
    }
    if (0 < g_nTotalUTxBytes) {
        log.log(" utx_bytes = " + g_nTotalUTxBytes);
    }
    log.log("\n");
    log.log(
        "Throughput = " +
            Math.round((g_nTotalRxBytes * 1000000) / sim.getSimulationTime()) +
            " bytes/s, "
    );
    log.log(
        "PDR = " +
            Math.round(
                (g_nTotalRxPackesCount * 100) /
                    (g_nTotalMTxPackesCount + g_nTotalUTxPackesCount)
            ) +
            " %\n"
    );
    log.testOK();
};

while (true) {
    YIELD();
    if (!msg) continue;
    aMsg = msg.split(" ");
    if (5 > aMsg.length) {
        continue;
    }

    if (!aMsg[0].equals("[RPL]")) {
        continue;
    }
    if (aMsg[2].equals("[RX]")) {
        g_anRxPacketsCount[id] += 1;
        g_nTotalRxPackesCount += 1;
        g_anRxBytes[id] += parseInt(aMsg[4]);
        g_nTotalRxBytes += parseInt(aMsg[4]);
    } else if (aMsg[2].equals("[MTX]")) {
        g_anMTxPacketsCount[id] += 1;
        g_nTotalMTxPackesCount += 1;
        g_anMTxBytes[id] += parseInt(aMsg[4]);
        g_nTotalMTxBytes += parseInt(aMsg[4]);
    } else if (aMsg[2].equals("[UTX]")) {
        g_anUTxPacketsCount[id] += 1;
        g_nTotalUTxPackesCount += 1;
        g_anUTxBytes[id] += parseInt(aMsg[4]);
        g_nTotalUTxBytes += parseInt(aMsg[4]);
    }
}
