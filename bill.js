document.getElementById("goldrate").value = localStorage.getItem("goldrate");

document.getElementById("grossweight").addEventListener("change", () => {
    document.getElementById("netweight").value = document.getElementById("grossweight").value
});

buildTable();
buildEditor();

function printTable() {
    let table = document.getElementById("table");
    if (table) {
        let win = window.open('', '_blank');
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
                <center>${getCurrentTime()}</center>
                <center>Rought Estimate / Quotation</center>
                <center>GST 3% Applicable on Bill/Goods are not Delivered</center>
                <br>
                ${table.outerHTML}
            </div>
            <script>
                let element = document.getElementById("maindata");
                html2canvas(element).then(function (canvas) {
                    let anchorTag = document.createElement("a");
                    document.body.appendChild(anchorTag);
                    document.getElementById("previewImg").appendChild(canvas);
                    element.innerHTML = "";
                    anchorTag.download = "Image";
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

function itemForm(event) {
    event.preventDefault();
    let temp = {
        "type": "type1",
        "prefix": document.getElementById("prefix").value,
        "ornament": document.getElementById("ornament").value,
        "purity": document.getElementById("purity").value,
        "grossweight": document.getElementById("grossweight").value,
        "netweight": document.getElementById("netweight").value,
        "wastage": document.getElementById("wastage").value,
    }
    let data = localStorage.getItem('billdata');
    data = data ? JSON.parse(data) : JSON.parse("[]");
    data.push(temp);
    localStorage.setItem('billdata', JSON.stringify(data));
    buildTable();
    buildEditor();
    let form = document.getElementById("itemform");
    form.reset();
}

function stoneForm(event) {
    event.preventDefault();
    let temp = {
        "type": "type2",
        "stonetype": document.getElementById("stonetype").value,
        "stoneweight": document.getElementById("stoneweight").value,
        "stonerate": document.getElementById("stonerate").value,
    }
    let data = localStorage.getItem('billdata');
    data = data ? JSON.parse(data) : JSON.parse("[]");
    data.push(temp);
    localStorage.setItem('billdata', JSON.stringify(data));
    buildTable();
    buildEditor();
    let form = document.getElementById("stoneform");
    form.reset();
}

function submitEditor(event) {
    event.preventDefault();
    let table = document.getElementById("editor");
    let rows = table.getElementsByTagName("tr");
    let ele = table.getElementsByTagName("td");
    let json = [];
    let tempind = 0;
    for (let i = 1; i < rows.length; i++) {
        if (rows[i].id === "type1") {
            json.push({
                "type": "type1",
                "prefix": ele[tempind++].getElementsByTagName("select")[0].value,
                "ornament": ele[tempind++].getElementsByTagName("select")[0].value,
                "purity": ele[tempind++].getElementsByTagName("select")[0].value,
                "grossweight": ele[tempind++].getElementsByTagName("input")[0].value,
                "netweight": ele[tempind++].getElementsByTagName("input")[0].value,
                "wastage": ele[tempind++].getElementsByTagName("select")[0].value,
            })
            tempind++;
        } else if (rows[i].id === "type2") {
            json.push({
                "type": "type2",
                "stonetype": ele[tempind++].getElementsByTagName("select")[0].value,
                "stoneweight": ele[tempind++].getElementsByTagName("input")[0].value,
                "stonerate": ele[tempind++].getElementsByTagName("input")[0].value
            })
            tempind++;
            tempind++;
            tempind++;
            tempind++;
        }
    }
    localStorage.setItem('billdata', JSON.stringify(json));
    location.reload();
}

function buildEditor() {
    let data = localStorage.getItem('billdata');
    data = data ? JSON.parse(data) : JSON.parse("[]");
    document.getElementById("editor").innerHTML = "";
    let tempHTML =
        `<tr>
            <th>Prefix</th>
            <th>Ornament</th>
            <th>Purity</th>
            <th>Gross Weight</th>
            <th>Net Weight</th>
            <th>Wastage</th>
        </tr>`;
    data.forEach(in1 => {
        if (in1.type === "type1") {
            tempHTML +=
                `<tr id="type1">
                <td>
                    <select id="prefix" required>
                        <option value="">Select Start Name</option>
                        <option ${in1.prefix==="MD." ?"selected":""} value="MD.">MD</option>
                        <option ${in1.prefix==="D." ?"selected":""} value="D.">D</option>
                        <option ${in1.prefix==="CVD." ?"selected":""} value="CVD.">CVD</option>
                    </select>
                </td>
                <td>
                    <select id="ornament" required>
                        <option value="">Select Ornament</option>
                        <option ${in1.ornament==="B.Bali" ?"selected":""} value="B.Bali">B.Bali</option>
                        <option ${in1.ornament==="Bali" ?"selected":""} value="Bali">Bali</option>
                        <option ${in1.ornament==="Bangles" ?"selected":""} value="Bangles">Bangles</option>
                        <option ${in1.ornament==="Bracelet" ?"selected":""} value="Bracelet">Bracelet</option>
                        <option ${in1.ornament==="Chain" ?"selected":""} value="Chain">Chain</option>
                        <option ${in1.ornament==="CPS" ?"selected":""} value="CPS">CPS</option>
                        <option ${in1.ornament==="G.R." ?"selected":""} value="G.R.">G.R.</option>
                        <option ${in1.ornament==="K.Chain" ?"selected":""} value="K.Chain">K.Chain</option>
                        <option ${in1.ornament==="K.Set" ?"selected":""} value="K.Set">K.Set</option>
                        <option ${in1.ornament==="Kade" ?"selected":""} value="Kade">Kade</option>
                        <option ${in1.ornament==="L.R." ?"selected":""} value="L.R.">L.R.</option>
                        <option ${in1.ornament==="L.R.C." ?"selected":""} value="L.R.C.">L.R.C.</option>
                        <option ${in1.ornament==="L.R.N." ?"selected":""} value="L.R.N.">L.R.N.</option>
                        <option ${in1.ornament==="M.P." ?"selected":""} value="M.P.">M.P.</option>
                        <option ${in1.ornament==="M.S.L." ?"selected":""} value="M.S.L.">M.S.L.</option>
                        <option ${in1.ornament==="MSPS" ?"selected":""} value="MSPS">MSPS</option>
                        <option ${in1.ornament==="Nath" ?"selected":""} value="Nath">Nath</option>
                        <option ${in1.ornament==="PDL" ?"selected":""} value="PDL">PDL</option>
                        <option ${in1.ornament==="Set" ?"selected":""} value="Set">Set</option>
                        <option ${in1.ornament==="T.C." ?"selected":""} value="T.C.">T.C.</option>
                        <option ${in1.ornament==="T.J." ?"selected":""} value="T.J.">T.J.</option>
                        <option ${in1.ornament==="T.N." ?"selected":""} value="T.N.">T.N.</option>
                        <option ${in1.ornament==="Tika" ?"selected":""} value="Tika">Tika</option>
                        <option ${in1.ornament==="Tops" ?"selected":""} value="Tops">Tops</option>
                    </select>
                </td>
                <td>
                    <select id="purity" required>
                        <option value="">Select Purity</option>
                        <option ${in1.purity==="22/KDM$92-93$92" ?"selected":""} value="22/KDM$92-93$92">22/KDM | 92-93 | 92</option>
                        <option ${in1.purity==="23/20$83-85$96" ?"selected":""} value="23/20$83-85$96">23/20 | 83-85 | 96</option>
                        <option ${in1.purity==="22/18$78-80$92" ?"selected":""} value="22/18$78-80$92">22/18 | 78-80 | 92</option>
                        <option ${in1.purity==="18$75$76" ?"selected":""} value="18$75$76">18 | 75 | 76</option>
                        <option ${in1.purity==="14$60$60" ?"selected":""} value="14$60$60">14 | 60 | 60</option>
                    </select>
                </td>
                <td><input value="${in1.grossweight}" type="number" id="grossweight" placeholder="Gross Weight" step="0.001" required></td>
                <td><input value="${in1.netweight}" type="number" id="netweight" placeholder="Net Weight" step="0.001" required></td>
                <td>
                    <select id="wastage" required>
                        <option ${in1.wastage==="0" ?"selected":""} value="0">0</option>
                        <option ${in1.wastage==="5" ?"selected":""} value="5">5</option>
                        <option ${in1.wastage==="10" ?"selected":""} value="10">10</option>
                        <option ${in1.wastage==="15" ?"selected":""} value="15">15</option>
                        <option ${in1.wastage==="20" ?"selected":""} value="20">20</option>
                        <option ${in1.wastage==="25" ?"selected":""} value="25">25</option>
                        <option ${in1.wastage==="30" ?"selected":""} value="30">30</option>
                    </select>
                </td>
                <td><button type="button" id="deletebutton" onclick="deleteRow(this)">Delete</button></td>
            </tr>`;
        } else {
            tempHTML +=
                `<tr id="type2">
                <td>
                    <select id="stonetype" required>
                        <option value="">Select Stone Type</option>
                        <option ${in1.stonetype==="Stone" ?"selected":""} value="Stone">Stone</option>
                        <option ${in1.stonetype==="Diamond" ?"selected":""} value="Diamond">Diamond</option>
                        <option ${in1.stonetype==="M.Diamond" ?"selected":""} value="M.Diamond">M.Diamond</option>
                        <option ${in1.stonetype==="Mala" ?"selected":""} value="Mala">Mala</option>
                    </select>
                </td>
                <td><input value="${in1.stoneweight}" type="number" id="stoneweight" placeholder="Stone Weight" step="0.001" required></td>
                <td><input value="${in1.stonerate}" type="number" id="stonerate" placeholder="Stone Rate" step="0.01" required></td>
                <td></td>
                <td></td>
                <td></td>
                <td><button type="button" id="deletebutton" onclick="deleteRow(this)">Delete</button></td>
            </tr>`;
        }
    });
    document.getElementById("editor").innerHTML = tempHTML;
}

function buildTable() {
    if (!localStorage.getItem('billdata')) {
        return;
    }
    let data = localStorage.getItem('billdata');
    data = data ? JSON.parse(data) : JSON.parse("[]");
    let goldrate = localStorage.getItem('goldrate') ? localStorage.getItem('goldrate') : 0;
    document.getElementById("table").innerHTML =
        `<tr class="bold">
            <th>S.No</th>
            <th>Ornament</th>
            <th>Carat</th>
            <th>Purity</th>
            <th>Gross Wt.</th>
            <th>Net Wt.</th>
            <th>Stone Wt.</th>
            <th>Wastage (In gms)</th>
            <th>Charged Wt.</th>
            <th>Gold Rate</th>
            <th>KDM Rate</th>
            <th>Rate</th>
            <th>Amount</th>
            <th>With GST 3%</th>
        </tr>`;
    for (let i = 0; i < data.length; i++) {
        if (data[i].type === "type1") {
            data[i].carat = data[i].purity.split("$")[0];
            data[i].multiplier = data[i].purity.split("$")[2];
            data[i].purity = data[i].purity.split("$")[1];
            data[i].kdmrate = "";
            if (data[i].carat.includes("KDM"))
                data[i].kdmrate = (goldrate * data[i].multiplier / 100) / 10;
            data[i].rate = goldrate * data[i].multiplier / 100;
            if (data[i].carat.includes("KDM"))
                data[i].rate = goldrate * data[i].multiplier / 100 * 1.10;

            let row = returnRow([
                i + 1,
                data[i].prefix + " " + data[i].ornament,
                data[i].carat,
                data[i].purity,
                (data[i].grossweight * 1).toFixed(3),
                (data[i].netweight * 1).toFixed(3),
                "",
                (data[i].netweight * data[i].wastage / 100).toFixed(3),
                ((data[i].netweight * 1) + (data[i].netweight * data[i].wastage / 100)).toFixed(3),
                ((goldrate * data[i].multiplier / 100) * 1).toFixed(0),
                data[i].kdmrate ? data[i].kdmrate.toFixed(0) : 0,
                (data[i].rate * 1).toFixed(0),
                (((data[i].netweight * 1) + (data[i].netweight * data[i].wastage / 100)) * (data[i].rate * 1)).toFixed(0),
            ]);
            row.attr("id", "type1");
            table = $("#table");
            table.append(row);
        } else {
            let row = returnRow([
                i + 1,
                data[i].stonetype, "", "", "", "",
                data[i].stoneweight, "", "", "", "",
                data[i].stonerate,
                (data[i].stoneweight * data[i].stonerate).toFixed(0)
            ]);
            row.attr("id", "type2");
            table = $("#table");
            table.append(row);
        }

    }
    //Section Total
    {
        let wstg = 0,
            grosswt = 0,
            netwt = 0,
            stonewt = 0,
            chwt = 0,
            amt = 0;

        data.forEach((item) => {
            wstg += ((item.wastage ? (item.netweight * item.wastage / 100) : 0) * 1);
            grosswt += ((item.grossweight ? item.grossweight : 0) * 1);
            netwt += ((item.netweight ? item.netweight : 0) * 1);
            chwt += item.netweight ? (((item.netweight * 1) + (item.netweight * item.wastage / 100))) : 0;
            stonewt += ((item.stoneweight ? item.stoneweight : 0) * 1)
            if (item.type === "type1")
                amt += ((item.netweight * 1) + (item.netweight * item.wastage / 100)) * (item.rate * 1);
            else
                amt += (item.stoneweight * item.stonerate);
        });
        let row = returnRow(["Total", "", "", "", grosswt.toFixed(3), netwt.toFixed(3), stonewt.toFixed(3), wstg.toFixed(3), chwt.toFixed(3), "", "", "", (amt * 1).toFixed(0), (amt * 1.03).toFixed(0)]);
        row.attr("class", "bold");
        table = $("#table");
        table.append(row);
    }
}

function returnRow(arr) {
    let row = $('<tr/>');
    for (let i = 0; i < arr.length; i++) {
        row.append($('<td/>').html(arr[i]));
    }
    return row;
}

function deleteRow(input) {
    let table = document.getElementById("editor");
    table.deleteRow(input.parentElement.parentElement.rowIndex);
}

function randomFill() {
    let arr = ["prefix", "ornament", "purity", "grossweight", "netweight", "stonetype", "stoneweight", "stonerate", "wastage"];
    arr.forEach(element => {
        if (document.getElementById(element).nodeName === "INPUT") {
            document.getElementById(element).value = Math.floor(Math.random() * 100) + 1;
        } else if (document.getElementById(element).nodeName === "SELECT") {
            document.getElementById(element).selectedIndex = Math.floor(Math.random() * (document.getElementById(element).length - 1)) + 1;
        }
    });
}
// randomFill();