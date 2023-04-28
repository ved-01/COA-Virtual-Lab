$(document).ready(function() {
    // Define input waveforms
    var waveforms = {
        "waveform1": [0, 1, 0, 1, 0, 1],
        "waveform2": [1, 0, 1, 0, 1, 0],
        "waveform3": [0, 0, 1, 1, 0, 0],
    };

    // Define logic gates
    function notGate(input) {
        var output = [];
        for (var i = 0; i < input.length; i++) {
            output.push(input[i] == 0 ? 1 : 0);
        }
        return output;
    }

    function xorGate(input1, input2) {
        var output = [];
        for (var i = 0; i < input1.length; i++) {
            output.push(input1[i] ^ input2[i]);
        }
        return output;
    }

    function norGate(input1, input2) {
        var output = [];
        for (var i = 0; i < input1.length; i++) {
            output.push(!(input1[i] || input2[i]) ? 1 : 0);
        }
        return output;
    }

    // Handle waveform selection
    $('#waveform').on('change', function() {
        var selected = $(this).val();
        var inputWaveform = waveforms[selected];
        var notOutput = notGate(inputWaveform);
        var xorOutput = xorGate(inputWaveform, notOutput);
        var norOutput = norGate(inputWaveform, notOutput);

        // Display output waveforms
        $('#output').html('<h2>NOT Gate Output:</h2><p>' + notOutput.join(', ') + '</p>'
                         + '<h2>XOR Gate Output:</h2><p>' + xorOutput.join(', ') + '</p>'
                         + '<h2>NOR Gate Output:</h2><p>' + norOutput.join(', ') + '</p>');
    });
});
