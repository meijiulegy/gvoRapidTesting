const myStoredDataHandle = localStorage.getItem('myDataHandle');
const myDataHandle = JSON.parse(myStoredDataHandle);

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('dataField').value = myStoredDataHandle;
    console.log(myDataHandle);
});

function copyToClipboard() {
    var textField = document.getElementById("dataField");
    textField.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copy was ' + msg);
    } catch (err) {
        console.error('Unable to copy', err);
    }
    window.getSelection().removeAllRanges();
}

function downloadData() {
    const blob = new Blob([myStoredDataHandle], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'myStoredDataHandle.json';
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

document.getElementById('downloadButton').addEventListener('click', downloadData);