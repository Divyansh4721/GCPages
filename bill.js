let index = 1;
if (localStorage.getItem('mydata') === "") {} else {
    let savedData = JSON.parse(localStorage.getItem('mydata'));
    for (let i = 0; i < savedData.length; i++) {
        savedData[i][0] = i + 1;
        addLine(savedData[i]);
        index++;
    }
    calculateAndAppendTotal();
}

document.getElementById("grossweight").addEventListener("change", () => {
    document.getElementById("netweight").value = document.getElementById("grossweight").value
});


function calculateAndAppendTotal() {
    let table = document.getElementById('table');
    if (table) {
        let rows = table.querySelectorAll('tbody tr');
        let columnsToSum = [4, 7, 12];
        let totalRow = table.insertRow();
        let cell = totalRow.insertCell();
        cell.textContent = 'Total';
        cell.style.fontWeight = 'bold';
        let sum = 0;
        for (let i = 1; i < 13; i++) {
            let cell = totalRow.insertCell();
            if (columnsToSum.includes(i)) {
                sum = 0;
                for (let j = 1; j < rows.length; j++) {
                    let rowData = rows[j].querySelectorAll('td');
                    sum += parseFloat(rowData[columnsToSum[columnsToSum.indexOf(i)]].textContent) || 0;
                }
                cell.textContent = sum.toFixed(3);
                cell.style.fontWeight = 'bold';
            } else {}
        }
        cell = totalRow.insertCell();
        cell.textContent = (sum * 1.03).toFixed(2);
        cell.style.fontWeight = 'bold';
    }
}

function ItemForm(event) {
    event.preventDefault();
    let table = document.getElementById('table');
    if (table.rows.length !== 1)
        table.deleteRow(table.rows.length - 1);
    let prefix = document.getElementById("prefix").value;
    let ornament = document.getElementById("ornament").value;
    let carat = document.getElementById("purity").value.split("$")[0];
    let purity = document.getElementById("purity").value.split("$")[1];
    let grossweight = document.getElementById("grossweight").value * 1.000;
    let netweight = document.getElementById("netweight").value * 1.000;
    let goldrate = document.getElementById("goldrate").value * 1.00;
    let wastage = document.getElementById("wastage").value * 1.000;
    let kdmrate = "";
    if (carat.includes("KDM"))
        kdmrate = goldrate / 10;
    let rate = goldrate * 1;
    if (carat.includes("KDM"))
        rate = goldrate * 1.10;
    let data = [
        [
            index,
            prefix + ornament,
            carat,
            purity,
            grossweight.toFixed(3),
            (grossweight - netweight).toFixed(3),
            netweight.toFixed(3),
            (netweight * wastage / 100).toFixed(3),
            ((netweight * 1) + (netweight * wastage / 100)).toFixed(3),
            goldrate.toFixed(0),
            kdmrate ? kdmrate.toFixed(0) : "",
            rate.toFixed(0),
            (((netweight * 1) + (netweight * wastage / 100)) * (rate * 1)).toFixed(0),
        ]
    ];
    localStorage.getItem('mydata') === "" ?
        localStorage.setItem('mydata', JSON.stringify(data)) :
        localStorage.setItem('mydata', JSON.stringify(JSON.parse(localStorage.getItem('mydata')).concat(data)));
    addLine(data[0]);
    index++;
    calculateAndAppendTotal();
    let form = document.getElementById("itemform");
    form.reset();
}

function addLine(input) {
    let row = $('<tr/>');
    for (let i = 0; i < input.length; i++) {
        row.append($('<td/>').html(input[i]));
    }
    row.append($('<td/>').html(`<button id="deletebutton" onclick="deleteRow(${input[0]+1})">Delete</button>`));
    table = $("#table");
    table.append(row);
}

function StoneForm(event) {
    event.preventDefault();
    let table = document.getElementById('table');
    if (table.rows.length !== 1)
        table.deleteRow(table.rows.length - 1);
    let stonetype = document.getElementById("stonetype").value;
    let stoneweight = document.getElementById("stoneweight").value;
    let stonerate = document.getElementById("stonerate").value;
    let data = [
        [
            index,
            stonetype, , , ,
            (stoneweight * 1).toFixed(2), , , , , ,
            (stonerate * 1).toFixed(0)
        ]
    ];
    if (stoneweight)
        data[0].push((stoneweight * stonerate).toFixed(0));
    else
        data[0].push((stonerate * 1).toFixed(0));
    localStorage.getItem('mydata') === "" ?
        localStorage.setItem('mydata', JSON.stringify(data)) :
        localStorage.setItem('mydata', JSON.stringify(JSON.parse(localStorage.getItem('mydata')).concat(data)));
    addLine(data[0]);
    index++;
    calculateAndAppendTotal();
    let form = document.getElementById("stoneform");
    form.reset();
}

function getCurrentTime() {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let now = new Date();
    let dayOfWeek = days[now.getDay()];
    let dayOfMonth = now.getDate();
    let month = months[now.getMonth()];
    let year = now.getFullYear();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let formattedTime = `${dayOfWeek} ${dayOfMonth}-${month}-${year} at ${hours}:${minutes}`;
    return formattedTime;
}

function printTable() {
    let table = document.getElementById("table");
    if (table) {
        let win = window.open('', '_blank');
        let temp = table.outerHTML;
        while (temp.includes("button")) {
            temp = temp.substring(0, temp.indexOf("<button")) + temp.substring(temp.indexOf("</button>") + 9);
        }
        win.document.write(
            `<html>

            <head>
                <title>Print Table</title>
                <link rel="stylesheet" href="billprint.css">
                <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"
                    integrity="sha512-BNaRQnYJYiPSqHHDb58B0yaPfCu+Wgds8Gp/gU33kqBtgNS4tSPHuGibyoeqMV/TJlSKda6FXzoEyYGjTe+vXA=="
                    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
            </head>
            
            <body>
                <div id="previewImg"></div>
                <div id="maindata">
                    <img id="gclogo" src="GCLogo.png">
                    <center>${getCurrentTime()}</center>
                    <center>Rought Estimate / Quotation</center>
                    <center>GST 3% Applicable on Bill/Goods are not Delivered</center>
                    <br>
                    ${temp}
                </div>
                <script>
                    let element = document.getElementById("maindata");
                    html2canvas(element).then(function (canvas) {
                        let anchorTag = document.createElement("a");
                        document.body.appendChild(anchorTag);
                        document.getElementById("previewImg").appendChild(canvas);
                        element.innerHTML = "";
                        anchorTag.download = "Image.jpg";
                        anchorTag.href = canvas.toDataURL();
                        anchorTag.target = '_blank';
                        anchorTag.click();
                        window.print();
                    });
                </script>
            </body>
            
            </html>`);
        win.document.close();
        win.open();
    }
}

function randomFill() {
    let arr = ["prefix", "ornament", "purity", "grossweight", "netweight", "wastage", "stonetype", "stoneweight", "stonerate"];
    arr.forEach(element => {
        if (document.getElementById(element).nodeName === "INPUT") {
            document.getElementById(element).value = Math.floor(Math.random() * 100) + 1;
        } else if (document.getElementById(element).nodeName === "SELECT") {
            document.getElementById(element).selectedIndex = Math.floor(Math.random() * (document
                .getElementById(element).length - 1)) + 1;
        }
    });
    document.getElementById("goldrate").value = "6250";
}
// randomFill();