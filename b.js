function createVCard() {
    let starttext = document.getElementsByTagName("input")[0].value;
    let inputText = document.getElementsByTagName("textarea")[0].value;
    let lines = inputText.trim().split('\n');
    let vCardStrings = [];
    for (let i = 0; i < lines.length; i += 2) {
        let name = lines[i].trim();
        if (starttext) {
            name = starttext + "-" + name;
        }
        let phone = lines[i + 1].trim();
        if (name && phone) {
            let vCard = [
                `BEGIN:VCARD`,
                `VERSION:2.1`,
                `FN:${name}`,
                `TEL;CELL:${phone}`,
                `END:VCARD`
            ].join('\n');

            vCardStrings.push(vCard);
        }
    }
    return vCardStrings.join('\n');
}
function downloadTextAsFile(text, filename) {
    let blob = new Blob([text], { type: 'text/plain' });
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}
function myFunction() {
    downloadTextAsFile(createVCard(), "abc.vcf")
}