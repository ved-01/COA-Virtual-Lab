var inputWaveforms = []; // array to store input waveforms

// add waveform to inputWaveforms array
function addWaveform() {
    var waveformInput = document.getElementById("waveform-input").value;
    var waveform = waveformInput.split(",").map(Number);
    inputWaveforms.push(waveform);
    updateCharts();
}

// update input and output charts
function updateCharts() {
    var gateSelect = document.getElementById("gate-select");
    var selectedGate = gateSelect.options[gateSelect.selectedIndex].value;

    var inputLabels = [];
    var inputDatasets = [];
    for (var i = 0; i < inputWaveforms.length; i++) {
        var label = "Input " + (i + 1);
        var dataset = {
            label: label,
            data: inputWaveforms[i],
            borderColor: "rgba(0, 0, 255, 1)",
            fill: false,
            // borderColor: 'blue',
    borderWidth: 1
        };
        inputLabels.push(label);
        inputDatasets.push(dataset);
    }

    var outputLabels = [];
    var outputData = [];
    if (selectedGate == "not") {
        outputLabels = inputLabels;
        for (var i = 0; i < inputWaveforms.length; i++) {
            var output = notGate(inputWaveforms[i]);
            outputData.push(output);
        }
    } else {
        var waveform1 = inputWaveforms[0];
        var waveform2 = inputWaveforms[1];
        var label1 = "Input 1";
        var label2 = "Input 2";
        // if (inputWaveforms.length > 2) {
        //     waveform2 = inputWaveforms[2];
        //     label2 = "Input 3";
        // }
        outputLabels.push("Output");
        if (selectedGate == "xor") {
            var output = xorGate(waveform1, waveform2);
            outputData.push(output);
        } else if (selectedGate == "nor") {
            var output = norGate(waveform1, waveform2);
            outputData.push(output);
        }
        inputLabels = [label1, label2];
        inputDatasets = [
            {
                label: label1,
                data: waveform1,
                borderColor: "rgba(0, 0, 255, 1)",
                fill: false
                
},
{
label: label2,
data: waveform2,
borderColor: "rgba(255, 0, 0, 1)",
fill: false
}
];
}
// update input chart
var inputChartContext = document.getElementById("input-chart").getContext("2d");
var inputChart = new Chart(inputChartContext, {
    type: "line",
    data: {
        labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        datasets: inputDatasets
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: "Input Waveforms"
        }
    }
});

// update output chart
var outputChartContext = document.getElementById("output-chart").getContext("2d");
var outputChart = new Chart(outputChartContext, {
    type: "line",
    data: {
        labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        datasets: [
            {
                label: "Output",
                data: outputData[0],
                borderColor: "rgba(0, 255, 0, 1)",
                fill: false
            }
        ]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: "Gate Output"
        }
    }
});
}

// NOT gate function
function notGate(waveform) {
var output = [];
for (var i = 0; i < waveform.length; i++) {
    if (waveform[i] == 0) {
        output.push(1);
    } else {
        output.push(0);
    }
}
return output;
}

// XOR gate function
function xorGate(waveform1, waveform2) {
var output = [];
for (var i = 0; i < waveform1.length; i++) {
    if (waveform1[i] == waveform2[i]) {
        output.push(0);
    } else {
        output.push(1);
    }
}
return output;
}

// NOR gate function
function norGate(waveform1, waveform2) {
var output = [];
for (var i = 0; i < waveform1.length; i++) {
    if (waveform1[i] == 0 && waveform2[i] == 0) {
        output.push(1);
    } else {
        output.push(0);
    }
}
return output;
}
// reset function to clear all input and output waveforms
function reset() {
    // clear input waveforms array
    inputWaveforms = [];
    // clear waveform input field
    document.getElementById("waveform-input").value = "";
    // reset gate select to not gate
    var gateSelect = document.getElementById("gate-select");
    gateSelect.selectedIndex = 0;
    // clear input chart
    var inputChartContext = document.getElementById("input-chart").getContext("2d");
    inputChartContext.clearRect(0, 0, inputChartContext.canvas.width, inputChartContext.canvas.height);
    // clear output chart
    var outputChartContext = document.getElementById("output-chart").getContext("2d");
    outputChartContext.clearRect(0, 0, outputChartContext.canvas.width, outputChartContext.canvas.height);
  }
  