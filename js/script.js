document.getElementById('formatButton').addEventListener('click', function() {
    updateFormattedText();
});

document.getElementById('copyButton').addEventListener('click', function() {
    const outputText = document.getElementById('outputText');
    outputText.select();
    document.execCommand('copy');

    const copyButton = document.getElementById('copyButton');
    copyButton.textContent = 'Copied!';
    setTimeout(() => copyButton.textContent = 'Copy to Clipboard', 2000);
});

document.getElementById('livePreviewToggle').addEventListener('change', function() {
    if (this.checked) {
        enableLivePreview();
        console.log("Live Preview Enabled");
    } else {
        disableLivePreview();
        console.log("Live Preview Disabled");
    }
});

function formatText(input, delimiter, lineLength) {
    const items = input.split(/\s+/).filter(item => item);
    let result = '';
    
    for (let i = 0; i < items.length; i++) {
        if (i > 0 && i % lineLength === 0) {
            result += '\n';
        }
        result += items[i];
        if (i < items.length - 1) {
            result += delimiter;
        }
    }
    
    return result;
}

function updateFormattedText() {
    const inputText = document.getElementById('inputText').value;
    const delimiter = document.getElementById('delimiter').value || ','; // Default to comma if empty
    const lineLength = parseInt(document.getElementById('lineLength').value, 10);
    const outputText = formatText(inputText, delimiter, lineLength);
    document.getElementById('outputText').value = outputText;
}

function enableLivePreview() {
    document.getElementById('inputText').addEventListener('input', updateFormattedText);
    document.getElementById('delimiter').addEventListener('input', updateFormattedText);
    document.getElementById('lineLength').addEventListener('input', updateFormattedText);
    updateFormattedText(); // Trigger initial update
}

function disableLivePreview() {
    document.getElementById('inputText').removeEventListener('input', updateFormattedText);
    document.getElementById('delimiter').removeEventListener('input', updateFormattedText);
    document.getElementById('lineLength').removeEventListener('input', updateFormattedText);
}
