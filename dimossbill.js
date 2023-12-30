document.getElementById("goldrate").value = localStorage.getItem("goldrate");
document.getElementById("remark").value = localStorage.getItem("remark");
document.getElementById("name").value = localStorage.getItem("name");

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
                <link rel="stylesheet" href="dimossbillprint.css">
                <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"
                    integrity="sha512-BNaRQnYJYiPSqHHDb58B0yaPfCu+Wgds8Gp/gU33kqBtgNS4tSPHuGibyoeqMV/TJlSKda6FXzoEyYGjTe+vXA=="
                    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
            </head>
            
            <body>
                <div id="previewImg"></div>
                <div id="maindata">
                    <div id="heading">
                        <span>From :: Dimoss</span>
                        <span>${getCurrentTime()}</span>
                    </div>
                    <div id="heading">
                        <span>To :: ${localStorage.getItem("name")}</span>
                        <span>Rought Estimate / Quotation</span>
                    </div>
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
        "prefix": document.getElementById("prefix").value,
        "ornament": document.getElementById("ornament").value,
        "purity": document.getElementById("purity").value,
        "tagnumber": document.getElementById("tagnumber").value,
        "grossweight": document.getElementById("grossweight").value,
        "netweight": document.getElementById("netweight").value,
        "labour": document.getElementById("labour").value,
        "wastage": document.getElementById("wastage").value,
        "stone": []
    }
    let data = localStorage.getItem('dimossbilldata');
    data = data ? JSON.parse(data) : JSON.parse("[]");
    data.push(temp);
    localStorage.setItem('dimossbilldata', JSON.stringify(data));
    buildTable();
    buildEditor();
    let form = document.getElementById("itemform");
    form.reset();
}

function stoneForm(event) {
    event.preventDefault();
    let temp = {
        "stonetype": document.getElementById("stonetype").value,
        "stoneweight": document.getElementById("stoneweight").value,
        "stonerate": document.getElementById("stonerate").value,
    }
    let data = localStorage.getItem('dimossbilldata');
    data = data ? JSON.parse(data) : JSON.parse("[]");
    data[data.length - 1]["stone"].push(temp);
    localStorage.setItem('dimossbilldata', JSON.stringify(data));
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
    let json = `[`;
    let tempind = 0;
    for (let i = 1; i < rows.length; i++) {
        if (rows[i].id === "type1") {
            if (i !== 1)
                json += `]},`;
            json +=
                `{
                    "prefix": "${ele[tempind++].getElementsByTagName("select")[0].value}",
                    "ornament": "${ele[tempind++].getElementsByTagName("select")[0].value}",
                    "purity": "${ele[tempind++].getElementsByTagName("select")[0].value}",
                    "tagnumber": "${ele[tempind++].getElementsByTagName("input")[0].value}",
                    "grossweight": "${ele[tempind++].getElementsByTagName("input")[0].value}",
                    "netweight": "${ele[tempind++].getElementsByTagName("input")[0].value}",
                    "labour": "${ele[tempind++].getElementsByTagName("input")[0].value}",
                    "wastage": "${ele[tempind++].getElementsByTagName("input")[0].value}",
                    "stone": [`;
            tempind++
        } else {
            json +=
                `{
                    "stonetype": "${ele[tempind++].getElementsByTagName("select")[0].value}",
                    "stoneweight": "${ele[tempind++].getElementsByTagName("input")[0].value}",
                    "stonerate": "${ele[tempind++].getElementsByTagName("input")[0].value}"
                },`;
            tempind++
            tempind++
            tempind++
            tempind++
            tempind++
            tempind++
        }
    }
    json += `]}]`;
    json = json.replaceAll("},]", "}]");
    localStorage.setItem('dimossbilldata', JSON.stringify(JSON.parse(json)));
    location.reload();
}

function buildEditor() {
    let data = localStorage.getItem('dimossbilldata');
    data = data ? JSON.parse(data) : JSON.parse("[]");
    document.getElementById("editor").innerHTML = "";
    let tempHTML =
        `<tr>
            <th>Prefix</th>
            <th>Ornament</th>
            <th>Purity</th>
            <th>Tag Number</th>
            <th>Gross Weight</th>
            <th>Net Weight</th>
            <th>Labour</th>
            <th>Wastage</th>
        </tr>`;
    data.forEach(in1 => {
        tempHTML +=
            `<tr id="type1">
                <td>
                    <select id="prefix" required>
                        <option value="">Select Start Name</option>
                        <option ${in1.prefix==="MP." ?"selected":"${rows[i].childNodes[0].value}"==="MP." ?"selected":""} value="MP.">MP</option>
                        <option ${in1.prefix==="MD." ?"selected":""} value="MD.">MD</option>
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
                        <option ${in1.purity==="18$75" ?"selected":""} value="18$75">18 | 75</option>
                        <option ${in1.purity==="14$60" ?"selected":""} value="14$60">14 | 60</option>
                    </select>
                </td>
                <td><input value="${in1.tagnumber}" type="number" id="tagnumber" placeholder="Tag Number" required></td>
                <td><input value="${in1.grossweight}" type="number" id="grossweight" placeholder="Gross Weight" step="0.001" required></td>
                <td><input value="${in1.netweight}" type="number" id="netweight" placeholder="Net Weight" step="0.001" required></td>
                <td><input value="${in1.labour}" type="number" id="labour" placeholder="Labour" step="0.001"></td>
                <td><input value="${in1.wastage}" type="number" id="wastage" placeholder="Wastage" step="0.001"></td>
                <td><button type="button" id="deletebutton" onclick="deleteRow(this)">Delete</button></td>
            </tr>`;
        in1.stone.forEach(in2 => {
            tempHTML +=
                `<tr id="type2">
                    <td>
                        <select id="stonetype" required>
                            <option value="">Select Stone Type</option>
                            <option ${in2.stonetype==="Stone" ?"selected":""} value="Stone">Stone</option>
                            <option ${in2.stonetype==="Diamond" ?"selected":""} value="Diamond">Diamond</option>
                        </select>
                    </td>
                    <td><input value="${in2.stoneweight}" type="number" id="stoneweight" placeholder="Stone Weight" step="0.001" required></td>
                    <td><input value="${in2.stonerate}" type="number" id="stonerate" placeholder="Stone Rate" step="0.01" required></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><button type="button" id="deletebutton" onclick="deleteRow(this)">Delete</button></td>
                </tr>`;
        });
    });
    document.getElementById("editor").innerHTML += tempHTML
}

function buildTable() {
    if (!localStorage.getItem('dimossbilldata')) {
        return;
    }
    let data = localStorage.getItem('dimossbilldata');
    data = data ? JSON.parse(data) : JSON.parse("[]");
    data.sort((a, b) => {
        let ornamentA = a.ornament.toUpperCase();
        let ornamentB = b.ornament.toUpperCase();
        return ornamentA < ornamentB ? -1 : ornamentB < ornamentA ? 1 : 0;
    });
    // variable fill
    {
        for (let i = 0; i < data.length; i++) {
            data[i].stoneprice = 0;
            for (let j = 0; j < data[i]["stone"].length; j++) {
                data[i].stoneprice += data[i]["stone"][j]["stoneweight"] * data[i]["stone"][j]["stonerate"];
            }
            let tempstone = {};
            tempstone["Diamond"] = [];
            tempstone["Stone"] = [];
            data[i]["stone"].forEach((item) => {
                let {
                    stonetype
                } = item;
                tempstone[stonetype].push(item);
            });
            data[i]["stone"] = tempstone;
            data[i].diamondweight = 0;
            data[i].diamondamount = 0;
            for (let j = 0; j < data[i]["stone"]["Diamond"].length; j++) {
                data[i].diamondweight += 1 * data[i]["stone"]["Diamond"][j]["stoneweight"];
                data[i].diamondamount += data[i]["stone"]["Diamond"][j]["stoneweight"] * data[i]["stone"]["Diamond"][j]["stonerate"];
            }
            data[i].stoneweight = 0;
            data[i].stoneamount = 0;
            for (let j = 0; j < data[i]["stone"]["Stone"].length; j++) {
                data[i].stoneweight += 1 * data[i]["stone"]["Stone"][j]["stoneweight"];
                data[i].stoneamount += data[i]["stone"]["Stone"][j]["stoneweight"] * data[i]["stone"]["Stone"][j]["stonerate"];
            }
        }
    }
    let ornaments = {};
    data.forEach((item) => {
        let {
            ornament
        } = item;
        if (!ornaments[ornament])
            ornaments[ornament] = [];
        ornaments[ornament].push(item);
    });
    let result = Object.values(ornaments);
    let tempHeader = localStorage.getItem('goldrate');
    tempHeader = tempHeader ? JSON.parse(tempHeader) : JSON.parse("{}");
    result.goldrate = localStorage.getItem('goldrate') ? localStorage.getItem('goldrate') : 0;
    document.getElementById("table").innerHTML =
        `<tr class="highlight">
            <td class="double-right"></td>
            <td colspan="2" class="double-bottom double-right"><b>Item</b></td>
            <td colspan="3" class="double-bottom double-right"><b>Moissanite</b></td>
            <td colspan="3" class="double-bottom double-right"><b>Stone</b></td>
            <td colspan="8" class="double-bottom double-right"><b>Metal</b></td>
            <td colspan="2" class="double-bottom double-right"><b>Labour</b></td>
            <td class="double-right"></td>
        </tr>
        <tr class="highlight">
            <th class="double-right">S.No</th>
            <th>Name</th>
            <th class="double-right">Tag No.</th>
            <th>MD. Wt.</th>
            <th>MD. Rate</th>
            <th class="double-right">MD. Amt.</th>
            <th>St. Wt.</th>
            <th>St. Rate</th>
            <th class="double-right">St. Amt.</th>
            <th>Purity</th>
            <th>Tounch</th>
            <th>Wastage</th>
            <th>Gross Wt.</th>
            <th>Net Wt.</th>
            <th>Pure Wt.</th>
            <th>M. Rate</th>
            <th class="double-right">M. Amount</th>
            <th>L. Rate</th>
            <th class="double-right">L. Amount</th>
            <th class="double-bottom double-right">Amount</th>
        </tr>`;


    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].length; j++) {

            result[i][j].amount = ((
                    result.goldrate * (result[i][j].netweight * (
                        (result[i][j].purity.split("$")[1] * 1) + (result[i][j].wastage * 1)
                    ) / 100)
                ) +
                (result[i][j].stoneprice * 1) +
                (result[i][j].labour * result[i][j].netweight)).toFixed(0);

            let row = returnRow([
                j + 1,
                result[i][j].prefix + " " + result[i][j].ornament,
                result[i][j].tagnumber,
                result[i][j]["stone"]["Diamond"][0] ? (result[i][j]["stone"]["Diamond"][0]["stoneweight"] * 1).toFixed(2) : "",
                result[i][j]["stone"]["Diamond"][0] ? (result[i][j]["stone"]["Diamond"][0]["stonerate"] * 1) : "",
                result[i][j]["stone"]["Diamond"][0] ? (result[i][j]["stone"]["Diamond"][0]["stoneweight"] * result[i][j]["stone"]["Diamond"][0]["stonerate"]).toFixed(0) : "",
                result[i][j]["stone"]["Stone"][0] ? (result[i][j]["stone"]["Stone"][0]["stoneweight"] * 1).toFixed(2) : "",
                result[i][j]["stone"]["Stone"][0] ? (result[i][j]["stone"]["Stone"][0]["stonerate"] * 1) : "",
                result[i][j]["stone"]["Stone"][0] ? (result[i][j]["stone"]["Stone"][0]["stoneweight"] * result[i][j]["stone"]["Stone"][0]["stonerate"]).toFixed(0) : "",
                result[i][j].purity.split("$")[0] + "K",
                result[i][j].purity.split("$")[1],
                (result[i][j].wastage * 1).toFixed(0),
                (result[i][j].grossweight * 1).toFixed(3),
                (result[i][j].netweight * 1).toFixed(3),
                (result[i][j].netweight *
                    ((result[i][j].purity.split("$")[1] * 1) +
                        (result[i][j].wastage * 1)) / 100).toFixed(3),
                result.goldrate,
                (
                    result.goldrate * (result[i][j].netweight * (
                        (result[i][j].purity.split("$")[1] * 1) + (result[i][j].wastage * 1)
                    ) / 100)
                ).toFixed(2),
                (result[i][j].labour * 1).toFixed(0),
                (result[i][j].labour * result[i][j].netweight).toFixed(2),
                result[i][j].amount
            ]);

            if (j === 0)
                row.attr("class", "double-top");
            else
                row.attr("class", "single-top");
            row.attr("id", "datarow");

            table = $("#table");
            table.append(row);

            // Tempmax
            let tempmax = Math.max(
                result[i][j]["stone"]["Diamond"].length - 1,
                result[i][j]["stone"]["Stone"].length - 1
            );

            // Stones
            for (let k = 0; k < tempmax; k++) {
                let row = returnRow(["", "", "",
                    result[i][j]["stone"]["Diamond"][k + 1] ? (result[i][j]["stone"]["Diamond"][k + 1]["stoneweight"] * 1).toFixed(2) : "",
                    result[i][j]["stone"]["Diamond"][k + 1] ? (result[i][j]["stone"]["Diamond"][k + 1]["stonerate"] * 1) : "",
                    result[i][j]["stone"]["Diamond"][k + 1] ? (result[i][j]["stone"]["Diamond"][k + 1]["stoneweight"] * result[i][j]["stone"]["Diamond"][k + 1]["stonerate"]).toFixed(0) : "",
                    result[i][j]["stone"]["Stone"][k + 1] ? (result[i][j]["stone"]["Stone"][k + 1]["stoneweight"] * 1).toFixed(2) : "",
                    result[i][j]["stone"]["Stone"][k + 1] ? (result[i][j]["stone"]["Stone"][k + 1]["stonerate"] * 1) : "",
                    result[i][j]["stone"]["Stone"][k + 1] ? (result[i][j]["stone"]["Stone"][k + 1]["stoneweight"] * result[i][j]["stone"]["Stone"][k + 1]["stonerate"]).toFixed(0) : "",
                    "", "", "", "", "", "", "", "", "", "", ""
                ]);
                row.attr("id", "datarow");
                table = $("#table");
                table.append(row);
            }
            // total
            {
                let row = returnRow(["", "", "",
                    result[i][j].diamondweight.toFixed(2),
                    "",
                    result[i][j].diamondamount.toFixed(0),
                    result[i][j].stoneweight.toFixed(2),
                    "",
                    result[i][j].stoneamount.toFixed(0),
                    "", "", "", "", "", "", "", "", "", "", ""
                ]);
                row.attr("class", "bold");
                table = $("#table");
                table.append(row);
            }
        }
        //Section Total
        {
            let mdweight = 0,
                mdamt = 0,
                stwt = 0,
                stamt = 0,
                grosswt = 0,
                netwt = 0,
                purewt = 0,
                mamt = 0,
                lbramt = 0,
                amt = 0;

            result[i].forEach((item) => {
                mdweight += item.diamondweight;
                mdamt += item.diamondamount;
                stwt += item.stoneweight;
                stamt += item.stoneamount;
                grosswt += item.grossweight * 1;
                netwt += item.netweight * 1;
                purewt += item.netweight *
                    ((item.purity.split("$")[1] * 1) + (item.wastage * 1)) / 100;
                mamt += result.goldrate * item.netweight *
                    ((item.purity.split("$")[1] * 1) + (item.wastage * 1)) / 100;
                lbramt += item.netweight * item.labour;
                amt += (item.netweight * item.labour) +
                    (
                        result.goldrate * item.netweight *
                        ((item.purity.split("$")[1] * 1) + (item.wastage * 1)) /
                        100
                    ) +
                    item.stoneprice * 1;
            });
            let row = returnRow(["Total", "", "", mdweight.toFixed(2), "", mdamt.toFixed(0), stwt.toFixed(2), "", stamt.toFixed(0), "", "", "", grosswt.toFixed(3), netwt.toFixed(3), purewt.toFixed(3), "", mamt.toFixed(2), "", lbramt.toFixed(2), amt.toFixed(0)]);
            row.attr("class", "single-top highlight bold");
            table = $("#table");
            table.append(row);
        }
    }
    // Full Total
    {
        let TotalRowEle = document.querySelectorAll("#datarow");
        let TotalRowEleArr = [];
        for (let i = 0; i < TotalRowEle.length; i++)
            TotalRowEleArr.push(tableRowToDataObject(TotalRowEle[i]));
        let summedObject = {};
        TotalRowEleArr.forEach(function (obj) {
            Object.keys(obj).forEach(function (key) {
                if (!summedObject.hasOwnProperty(key))
                    summedObject[key] = parseFloat(obj[key]) || 0;
                else
                    summedObject[key] += parseFloat(obj[key]) || 0;
            });
        });

        let row = returnRow(["Grand Total",
            JSON.parse(localStorage.getItem('dimossbilldata')).length+" Items", "",
            (summedObject["MD. Wt."]).toFixed(2), "",
            (summedObject["MD. Amt."]).toFixed(0),
            (summedObject["St. Wt."]).toFixed(2), "",
            (summedObject["St. Amt."]).toFixed(0), "", "", "",
            (summedObject["Gross Wt."]).toFixed(3),
            (summedObject["Net Wt."]).toFixed(3),
            (summedObject["Pure Wt."]).toFixed(3), "",
            (summedObject["M. Amount"]).toFixed(2), "",
            (summedObject["L. Amount"]).toFixed(2),
            (summedObject["Amount"]).toFixed(0)
        ]);

        var temppureweigth = (summedObject["Pure Wt."]).toFixed(3);
        var tempamount = (summedObject["Amount"]).toFixed(0);
        row.attr('id', 'totalrow');
        row.attr('class', 'highlight');
        table = $("#table");
        table.append(row);
    }

    document.getElementById("table").innerHTML +=
        `<tr>
            <td rowspan="2" colspan="9" class="double-right" style="text-align: left;vertical-align:top;">
                <b>Remarks :- ${localStorage.getItem("remark")}</b>
            </td>
            <td colspan="9">
                <b>Pure Gold Weight :- ${temppureweigth}</b>
            </td>
        </tr>
        <tr>
            <td colspan="9">
                <b>Total Amount :- ${tempamount}</b>
            </td>
        </tr>`;
}

function returnRow(arr) {
    let row = $('<tr/>');
    row.append($('<td/>').html(arr[0]).attr("class", "double-right"));
    row.append($('<td/>').html(arr[1]));
    row.append($('<td/>').html(arr[2]).attr("class", "double-right"));
    row.append($('<td/>').html(arr[3]));
    row.append($('<td/>').html(arr[4]));
    row.append($('<td/>').html(arr[5]).attr("class", "double-right"));
    row.append($('<td/>').html(arr[6]));
    row.append($('<td/>').html(arr[7]));
    row.append($('<td/>').html(arr[8]).attr("class", "double-right"));
    row.append($('<td/>').html(arr[9]));
    row.append($('<td/>').html(arr[10]));
    row.append($('<td/>').html(arr[11]));
    row.append($('<td/>').html(arr[12]));
    row.append($('<td/>').html(arr[13]));
    row.append($('<td/>').html(arr[14]));
    row.append($('<td/>').html(arr[15]));
    row.append($('<td/>').html(arr[16]).attr("class", "double-right"));
    row.append($('<td/>').html(arr[17]));
    row.append($('<td/>').html(arr[18]).attr("class", "double-right"));
    row.append($('<td/>').html(arr[19]));
    return row;
}

function tableRowToDataObject(rowElement) {
    let rowData = {};
    let headers = [];
    $(rowElement).find('td').each(function (index) {
        let header = $(this).closest('table').find('th').eq(index).text();
        let value = $(this).text();
        rowData[header] = value;
        headers.push(header);
    });
    return rowData;
}
var abcd;

function deleteRow(input) {
    let table = document.getElementById("editor");
    table.deleteRow(input.parentElement.parentElement.rowIndex);
}

function randomFill() {
    let arr = ["prefix", "ornament", "purity", "tagnumber", "grossweight", "netweight", "stonetype", "stoneweight", "stonerate"];
    arr.forEach(element => {
        if (document.getElementById(element).nodeName === "INPUT") {
            document.getElementById(element).value = Math.floor(Math.random() * 100) + 1;
        } else if (document.getElementById(element).nodeName === "SELECT") {
            document.getElementById(element).selectedIndex = Math.floor(Math.random() * (document.getElementById(element).length - 1)) + 1;
        }
    });
}
// randomFill();