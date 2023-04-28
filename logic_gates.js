$(document).ready(function() {
    // Define logic gates
    function notGate(input) {
        var output = [];
        for (var i = 0; i < input.length; i++) {
            output.push(input[i] == 0 ? 1 : 0);
        }
        if (output.length < input.length) {
            for (var i = output.length; i < input.length; i++) {
                output.push(0);
            }
        }
        return output;
    }
    

    function xorGate(input1, input2) {
        var output = [];
        for (var i = 0; i < input1.length; i++) {
            output.push(input1[i] ^ input2[i]);
        }
        if (output.length < input1.length) {
            for (var i = output.length; i < input1.length; i++) {
                output.push(0);
            }
        }
        return output;
    }
    
    function norGate(input1, input2) {
        var output = [];
        for (var i = 0; i < input1.length; i++) {
            output.push((input1[i] | input2[i]) == 0 ? 1 : 0);
        }
        if (output.length < input1.length) {
            for (var i = output.length; i < input1.length; i++) {
                output.push(0);
            }
        }
        return output;
    }
    

    // Handle waveform selection and user input
    $('#waveform, #submitBtn').on('click', function() {
        var selected = $('#waveform').val();
        var userInput = $('#userInput').val();
        var inputWaveform = userInput ? userInput.split('').map(Number) : waveforms[selected];
        var notOutput = notGate(inputWaveform);
        var xorOutput = xorGate(inputWaveform, notOutput);
        var norOutput = norGate(inputWaveform, notOutput);

        // Display output waveforms
        $('#output').html('<h2>NOT Gate Output:</h2><p>' + notOutput.join(', ') + '</p>'
                         + '<h2>XOR Gate Output:</h2><p>' + xorOutput.join(', ') + '</p>'
                         + '<h2>NOR Gate Output:</h2><p>' + norOutput.join(', ') + '</p>');
    });
});
