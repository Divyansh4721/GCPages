if (!localStorage.getItem('savedHeader') && !document.getElementById("goldrate").value) {
    localStorage.setItem('savedHeader', '{"goldrate":""}');
}

function printTable() {
    console.log("hi");
    let table = document.getElementById("table");
    console.log(table);
    if (table) {
        let win = window.open('', '_blank');
        win.document.write(
            `<html><head><title>Print Table</title><style>#previewImg {width: 100%;}canvas {width: 100% !important;height: auto !important;}body {width: 95vw;font-family: sans-serif;}#table {border: 2px solid black;border-collapse: collapse;text-align: center;transform-origin: top left;}#datarow td {border-top: 0;border-bottom: 0;}.double-top {border-top: 2px solid black;}.double-bottom {border-bottom: 2px solid black;}.double-left {border-left: 2px solid black;}.double-right {border-right: 2px solid black;}.single-top {border-top: 1px solid black;}.single-bottom {border-bottom: 1px solid black;}.single-left {border-left: 1px solid black;}.single-right {border-right: 1px solid black;}.no-top {border-top: 0;}.no-bottom {border-bottom: 0;}.no-left {border-left: 0;}.no-right {border-right: 0;}.bold {font-weight: bold;}.highlight {background-color: #ebecee;}#totalrow {font-weight: bold;border-bottom: 2px solid black;border-top: 2px solid black;}#table td,#table th {padding: 10px;white-space: nowrap;}#outerbox {display: flex;width: 100%;flex-direction: row;}form {border: 1px solid black;width: 50%;align-content: center;display: flex;flex-direction: column;align-items: center;}input {width: 80%;margin: 10px;padding: 0px 5px;font-size: 12px;border: 1px solid #dfe1e4;border-radius: 10px;outline: 0;}select {width: 90%;margin: 10px;padding: 0px 5px;font-size: 12px;border: 1px solid #dfe1e4;border-radius: 10px;outline: 0;}button {width: 90%;margin: 10px;border: 0;background-color: rgb(247, 194, 20);border-radius: 10px;cursor: pointer;font-size: 15px;font-weight: bold;color: white;}#table {font-size: 16px;}#editor {border-collapse: collapse;text-align: center;}#deletebutton {font-size: 4px;margin: 0;}div {width: min-content;}#heading {width: 99%;font-size: 20px;word-spacing: 5px;letter-spacing: 2px;background-color: lightgray;padding: 5px;display: flex;justify-content: space-between;}#maindata {padding:10px;}</style><script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></scri` +
            `pt></head><body><div id="previewImg"></div><div id="maindata"><center>` +
            `<div id="previewImg"></div><div id="maindata"><div id="heading"><span>From :: Dimoss</span><span>${getCurrentTime()}</span></div><div id="heading"><span>To :: ${document.getElementById("name").value}</span><span>Rought Estimate / Quotation</span></div>`
        );
        let temp = table.outerHTML;
        while (temp.includes("button")) {
            temp = temp.substring(0, temp.indexOf("<button")) + temp.substring(temp.indexOf("</button>") + 9);
        }
        win.document.write(temp);
        win.document.write(
            `</div><script>let element = document.getElementById("maindata");html2canvas(element).then(function (canvas) {let anchorTag = document.createElement("a");document.body.appendChild(anchorTag);document.getElementById("previewImg").appendChild(canvas);element.innerHTML="";` +
            `anchorTag.download = "Image.jpg";anchorTag.href = canvas.toDataURL();anchorTag.target = '_blank';anchorTag.click();window.print();` +
            `});</scri` + `pt></bod` + `y></htm` + `l>`);
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

function itemForm() {
    event.preventDefault();
    let prefix = document.getElementById("prefix").value;
    let ornament = document.getElementById("ornament").value;
    let purity = document.getElementById("purity").value;
    let tagnumber = document.getElementById("tagnumber").value;
    let grossweight = document.getElementById("grossweight").value;
    let netweight = document.getElementById("netweight").value;
    let labour = document.getElementById("labour").value;
    let wastage = document.getElementById("wastage").value;
    let temp = {
        "prefix": prefix,
        "ornament": ornament,
        "purity": purity,
        "tagnumber": tagnumber,
        "grossweight": grossweight,
        "netweight": netweight,
        "labour": labour,
        "wastage": wastage,
        "stone": []
    }
    let data = localStorage.getItem('savedData');
    data = data ? JSON.parse(data) : JSON.parse("[]");
    data.push(temp);
    localStorage.setItem('savedData', JSON.stringify(data));
    buildTable();
    buildEditor();
    document.getElementById("ornament").value = "";
    document.getElementById("purity").value = "";
    document.getElementById("tagnumber").value = "";
    document.getElementById("grossweight").value = "";
    document.getElementById("netweight").value = "";
    document.getElementById("labour").value = "";
    document.getElementById("wastage").value = "";
}

function stoneForm() {
    event.preventDefault();
    let stonetype = document.getElementById("stonetype").value;
    let stoneweight = document.getElementById("stoneweight").value;
    let stonerate = document.getElementById("stonerate").value;
    let temp = {
        "stonetype": stonetype,
        "stoneweight": stoneweight,
        "stonerate": stonerate,
    }
    let data = localStorage.getItem('savedData');
    data = data ? JSON.parse(data) : JSON.parse("[]");
    data[data.length - 1]["stone"].push(temp);
    localStorage.setItem('savedData', JSON.stringify(data));
    buildTable();
    buildEditor();
    document.getElementById("stoneweight").value = "";
    document.getElementById("stonerate").value = "";
}
buildTable();
buildEditor();

function submitEditor() {
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
                `{"prefix":"${ele[tempind++].childNodes[0].value}","ornament":"${ele[tempind++].childNodes[0].value}","purity":"${ele[tempind++].childNodes[0].value}","tagnumber":"${ele[tempind++].childNodes[0].value}","grossweight":"${ele[tempind++].childNodes[0].value}","netweight":"${ele[tempind++].childNodes[0].value}","labour":"${ele[tempind++].childNodes[0].value}","wastage":"${ele[tempind++].childNodes[0].value}","stone":[`;
        } else {
            json +=
                `{"stonetype":"${ele[tempind++].childNodes[0].value}","stoneweight":"${ele[tempind++].childNodes[0].value}","stonerate":"${ele[tempind++].childNodes[0].value}"},`;
        }
    }
    json += `]}]`;
    json = json.replaceAll("},]", "}]");
    localStorage.setItem('savedData', JSON.stringify(JSON.parse(json)));
    location.reload();
}


function buildEditor() {
    let data = localStorage.getItem('savedData');
    data = data ? JSON.parse(data) : JSON.parse("[]");
    document.getElementById("editor").innerHTML =
        `<tr><th>Prefix</th><th>Ornament</th><th>Purity</th><th>Tag Number</th><th>Gross Weight</th><th>Net Weight</th><th>Labour</th><th>Wastage</th></tr>`;
    data.forEach(in1 => {

        document.getElementById("editor").innerHTML +=
            `<tr id="type1"><td><select id="prefix"><option value="">Select Start Name</option><option ${in1.prefix==="MP." ?"selected":"${rows[i].childNodes[0].value}"==="MP." ?"selected":""} value="MP.">MP</option><option ${in1.prefix==="MD." ?"selected":""} value="MD.">MD</option></select></td><td><select id="ornament"><option cde343>Select Ornament</option><option ${in1.ornament==="B.Bali" ?"selected":""} value="B.Bali">B.Bali</option><option ${in1.ornament==="Bali" ?"selected":""} value="Bali">Bali</option><option ${in1.ornament==="Bangles" ?"selected":""} value="Bangles">Bangles</option><option ${in1.ornament==="Bracelet" ?"selected":""} value="Bracelet">Bracelet</option><option ${in1.ornament==="Chain" ?"selected":""} value="Chain">Chain</option><option ${in1.ornament==="CPS" ?"selected":""} value="CPS">CPS</option><option ${in1.ornament==="G.R." ?"selected":""} value="G.R.">G.R.</option><option ${in1.ornament==="K.Chain" ?"selected":""} value="K.Chain">K.Chain</option><option ${in1.ornament==="K.Set" ?"selected":""} value="K.Set">K.Set</option><option ${in1.ornament==="Kade" ?"selected":""} value="Kade">Kade</option><option ${in1.ornament==="L.R." ?"selected":""} value="L.R.">L.R.</option><option ${in1.ornament==="L.R.C." ?"selected":""} value="L.R.C.">L.R.C.</option><option ${in1.ornament==="L.R.N." ?"selected":""} value="L.R.N.">L.R.N.</option><option ${in1.ornament==="M.P." ?"selected":""} value="M.P.">M.P.</option><option ${in1.ornament==="M.S.L." ?"selected":""} value="M.S.L.">M.S.L.</option><option ${in1.ornament==="MSPS" ?"selected":""} value="MSPS">MSPS</option><option ${in1.ornament==="Nath" ?"selected":""} value="Nath">Nath</option><option ${in1.ornament==="PDL" ?"selected":""} value="PDL">PDL</option><option ${in1.ornament==="Set" ?"selected":""} value="Set">Set</option><option ${in1.ornament==="T.C." ?"selected":""} value="T.C.">T.C.</option><option ${in1.ornament==="T.J." ?"selected":""} value="T.J.">T.J.</option><option ${in1.ornament==="T.N." ?"selected":""} value="T.N.">T.N.</option><option ${in1.ornament==="Tika" ?"selected":""} value="Tika">Tika</option><option ${in1.ornament==="Tops" ?"selected":""} value="Tops">Tops</option></select></td><td><select id="purity"><option cde>Select Purity</option><option ${in1.purity==="18$75" ?"selected":""} value="18$75">18 | 75</option><option ${in1.purity==="14$60" ?"selected":""} value="14$60">14 | 60</option></select></td><td><input value="${in1.tagnumber}" type="number" id="tagnumber" placeholder="Tag Number"></td><td><input value="${in1.grossweight}" type="number" id="grossweight" placeholder="Gross Weight" step="0.001"></td><td><input value="${in1.netweight}" type="number" id="netweight" placeholder="Net Weight" step="0.001"></td><td><input value="${in1.labour}" type="number" id="labour" placeholder="Labour" step="0.001"></td><td><input value="${in1.wastage}" type="number" id="wastage" placeholder="Wastage" step="0.001"></td></tr>`;

        in1.stone.forEach(in2 => {
            document.getElementById("editor").innerHTML +=
                `<tr id="type2"><td><select id="stonetype" required><option value="">Select Stone Type</option><option ${in2.stonetype==="Stone" ?"selected":""} value="Stone">Stone</option><option ${in2.stonetype==="Diamond" ?"selected":""} value="Diamond">Diamond</option></select></td><td><input value="${in2.stoneweight}" type="number" id="stoneweight" placeholder="Stone Weight" step="0.001" required></td><td><input value="${in2.stonerate}" type="number" id="stonerate" placeholder="Stone Rate" step="0.01" required></td></tr>`;
        });

    });
}

function buildTable() {
    let data = localStorage.getItem('savedData');
    data = data ? JSON.parse(data) : JSON.parse("[]");
    data.sort((a, b) => {
        let ornamentA = a.ornament.toUpperCase();
        let ornamentB = b.ornament.toUpperCase();
        return ornamentA < ornamentB ? -1 : ornamentB < ornamentA ? 1 : 0;
    }); {
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
                data[i].diamondamount += data[i]["stone"]["Diamond"][j]["stoneweight"] * data[i]["stone"]["Diamond"]
                    [j]["stonerate"];
            }
            data[i].stoneweight = 0;
            data[i].stoneamount = 0;
            for (let j = 0; j < data[i]["stone"]["Stone"].length; j++) {
                data[i].stoneweight += 1 * data[i]["stone"]["Stone"][j]["stoneweight"];
                data[i].stoneamount += data[i]["stone"]["Stone"][j]["stoneweight"] * data[i]["stone"]["Stone"][j][
                    "stonerate"
                ];
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
    let tempHeader = localStorage.getItem('savedHeader');
    tempHeader = tempHeader ? JSON.parse(tempHeader) : JSON.parse("{}");
    result.goldrate = document.getElementById("goldrate").value ?
        document.getElementById("goldrate").value :
        tempHeader["goldrate"];
    document.getElementById("table").innerHTML =
        `<tr class="highlight"><td class="double-right"></td><td colspan="2" class="double-bottom double-right"><b>Item</b></td><td colspan="3" class="double-bottom double-right"><b>Moissanite</b></td><td colspan="3" class="double-bottom double-right"><b>Stone</b></td><td colspan="8" class="double-bottom double-right"><b>Metal</b></td><td colspan="2" class="double-bottom double-right"><b>Labour</b></td><td class="double-right"></td></tr><tr class="highlight"><th class="double-right">S.No</th><th>Name</th><th class="double-right">Tag No.</th><th>MD. Wt.</th><th>MD. Rate</th><th class="double-right">MD. Amt.</th><th>St. Wt.</th><th>St. Rate</th><th class="double-right">St. Amt.</th><th>Purity</th><th>Tounch</th><th>Wastage</th><th>Gross Wt.</th><th>Net Wt.</th><th>Pure Wt.</th><th>M. Rate</th><th class="double-right">M. Amount</th><th>L. Rate</th><th class="double-right">L. Amount</th><th class="double-bottom double-right">Amount</th></tr>`;
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].length; j++) {
            let row = $('<tr/>');
            if (j === 0)
                row.attr("class", "double-top");
            else
                row.attr("class", "single-top");
            row.attr("id", "datarow");
            //  S.No
            row.append($('<td/>').html(j + 1).attr("class", "single-right"));
            //  Name
            row.append($('<td/>').html(result[i][j].prefix + " " + result[i][j].ornament));
            //  Tag No.
            row.append($('<td/>').html(result[i][j].tagnumber).attr("class", "single-right"));
            if (result[i][j]["stone"]["Diamond"][0]) {
                //  MD. Wt.
                row.append($('<td/>').html((result[i][j]["stone"]["Diamond"][0]["stoneweight"] * 1).toFixed(2)));
                //  MD. Rate
                row.append($('<td/>').html(result[i][j]["stone"]["Diamond"][0]["stonerate"]));
                //  MD. Amt.
                row.append($('<td/>').html((result[i][j]["stone"]["Diamond"][0]["stoneweight"] *
                    result[i][j]["stone"]["Diamond"][0]["stonerate"]).toFixed(0)).attr("class",
                    "single-right"));
            } else {
                //  MD. Wt.
                row.append($('<td/>').html(""));
                //  MD. Rate
                row.append($('<td/>').html(""));
                //  MD. Amt.
                row.append($('<td/>').html("").attr("class", "single-right"));
            }
            if (result[i][j]["stone"]["Stone"][0]) {
                //  St. Wt.
                row.append($('<td/>').html((result[i][j]["stone"]["Stone"][0]["stoneweight"] * 1).toFixed(2)));
                //  St. Rate
                row.append($('<td/>').html(result[i][j]["stone"]["Stone"][0]["stonerate"]));
                //  St. Amt.
                row.append($('<td/>').html((result[i][j]["stone"]["Stone"][0]["stoneweight"] *
                    result[i][j]["stone"]["Stone"][0]["stonerate"]).toFixed(0)).attr("class",
                    "single-right"));
            } else {
                //  St. Wt.
                row.append($('<td/>').html(""));
                //  St. Rate
                row.append($('<td/>').html(""));
                //  St. Amt.
                row.append($('<td/>').html("").attr("class", "single-right"));
            }
            //  Purity
            row.append($('<td/>').html(result[i][j].purity.split("$")[0] + "K"));
            //  Tounch
            row.append($('<td/>').html(result[i][j].purity.split("$")[1]));
            //  Wastage
            row.append($('<td/>').html(result[i][j].wastage));
            //  Gross Wt.
            row.append($('<td/>').html(result[i][j].grossweight));
            //  Net Wt.
            row.append($('<td/>').html(result[i][j].netweight));
            //  Pure Wt.
            row.append($('<td/>').html((result[i][j].netweight *
                ((result[i][j].purity.split("$")[1] * 1) +
                    (result[i][j].wastage * 1)) / 100).toFixed(3)));
            //  Rate
            row.append($('<td/>').html(result.goldrate));
            //  M. Amt
            row.append($('<td/>').html(
                (
                    result.goldrate * (result[i][j].netweight * (
                        (result[i][j].purity.split("$")[1] * 1) + (result[i][j].wastage * 1)
                    ) / 100)
                ).toFixed(2)
            ).attr("class", "single-right"));
            //  LabourRate
            row.append($('<td/>').html((result[i][j].labour * 1).toFixed(0)));
            //  LabourAmt
            row.append($('<td/>').html((result[i][j].labour * result[i][j].netweight).toFixed(2)).attr("class",
                "single-right"));
            //  Amount
            result[i][j].amount = ((
                    result.goldrate * (result[i][j].netweight * (
                        (result[i][j].purity.split("$")[1] * 1) + (result[i][j].wastage * 1)
                    ) / 100)
                ) +
                (result[i][j].stoneprice * 1) +
                (result[i][j].labour * result[i][j].netweight)).toFixed(0);
            row.append($('<td/>').html(result[i][j].amount));
            table = $("#table");
            table.append(row);
            // Tempmax
            let tempmax = Math.max(
                result[i][j]["stone"]["Diamond"].length - 1,
                result[i][j]["stone"]["Stone"].length - 1
            );
            // Stones
            for (let k = 0; k < tempmax; k++) {
                let row = $('<tr/>');
                row.attr("id", "datarow");
                row.append($('<td/>').html("").attr("class", "single-right"));
                row.append($('<td/>').html(""));
                row.append($('<td/>').html("").attr("class", "single-right"));
                if (result[i][j]["stone"]["Diamond"][k + 1]) {
                    row.append($('<td/>').html((result[i][j]["stone"]["Diamond"][k + 1]["stoneweight"] *
                        1).toFixed(
                        2)));
                    row.append($('<td/>').html(result[i][j]["stone"]["Diamond"][k + 1]["stonerate"]));
                    row.append($('<td/>').html((result[i][j]["stone"]["Diamond"][k + 1]["stoneweight"] *
                        result[i][j]["stone"]["Diamond"][k + 1]["stonerate"]).toFixed(0)).attr("class",
                        "single-right"));
                } else {
                    row.append($('<td/>').html(""));
                    row.append($('<td/>').html(""));
                    row.append($('<td/>').html("").attr("class", "single-right"));
                }
                if (result[i][j]["stone"]["Stone"][k + 1]) {
                    row.append($('<td/>').html((result[i][j]["stone"]["Stone"][k + 1]["stoneweight"] *
                        1).toFixed(
                        2)));
                    row.append($('<td/>').html(result[i][j]["stone"]["Stone"][k + 1]["stonerate"]));
                    row.append($('<td/>').html((result[i][j]["stone"]["Stone"][k + 1]["stoneweight"] *
                        result[i][j]["stone"]["Stone"][k + 1]["stonerate"]).toFixed(0)).attr("class",
                        "single-right"));
                } else {
                    row.append($('<td/>').html(""));
                    row.append($('<td/>').html(""));
                    row.append($('<td/>').html("").attr("class", "single-right"));
                }
                row.append($('<td/>').html(""));
                row.append($('<td/>').html(""));
                row.append($('<td/>').html(""));
                row.append($('<td/>').html(""));
                row.append($('<td/>').html(""));
                row.append($('<td/>').html(""));
                row.append($('<td/>').html(""));
                row.append($('<td/>').html("").attr("class", "single-right"));
                row.append($('<td/>').html(""));
                row.append($('<td/>').html("").attr("class", "single-right"));
                row.append($('<td/>').html(""));
                table = $("#table");
                table.append(row);
            }
            // total
            {
                let row = $('<tr/>');
                row.attr("class", "bold");
                row.append($('<td/>').html("").attr("class", "single-right"));
                row.append($('<td/>').html(""));
                row.append($('<td/>').html("").attr("class", "single-right"));
                row.append($('<td/>').html(result[i][j].diamondweight.toFixed(2)));
                row.append($('<td/>').html(""));
                row.append($('<td/>').html(result[i][j].diamondamount.toFixed(0)).attr("class", "single-right"));
                row.append($('<td/>').html(result[i][j].stoneweight.toFixed(2)));
                row.append($('<td/>').html(""));
                row.append($('<td/>').html(result[i][j].stoneamount.toFixed(0)).attr("class", "single-right"));
                row.append($('<td/>').html(""));
                row.append($('<td/>').html(""));
                row.append($('<td/>').html(""));
                row.append($('<td/>').html(""));
                row.append($('<td/>').html(""));
                row.append($('<td/>').html(""));
                row.append($('<td/>').html(""));
                row.append($('<td/>').html("").attr("class", "single-right"));
                row.append($('<td/>').html(""));
                row.append($('<td/>').html("").attr("class", "single-right"));
                row.append($('<td/>').html(""));
                table = $("#table");
                table.append(row);
            }
        }
        //Section Total
        {
            let row = $('<tr/>');
            row.attr("class", "single-top highlight bold");
            // S.No
            row.append($('<td/>').html("Total").attr("class", "single-right"));
            // Name
            row.append($('<td/>').html(""));
            // Tag No.
            row.append($('<td/>').html("").attr("class", "single-right"));
            // MD. Wt.
            let temp = 0;
            result[i].forEach((item) => {
                temp += item.diamondweight;
            });
            row.append($('<td/>').html(temp.toFixed(2)));
            // MD. Rate
            row.append($('<td/>').html(""));
            // MD. Amt.
            temp = 0;
            result[i].forEach((item) => {
                temp += item.diamondamount;
            });
            row.append($('<td/>').html(temp.toFixed(0)).attr("class", "single-right"));
            // St. Wt.
            temp = 0;
            result[i].forEach((item) => {
                temp += item.stoneweight;
            });
            row.append($('<td/>').html(temp.toFixed(2)));
            // St. Rate
            row.append($('<td/>').html(""));
            // St. Amt.
            temp = 0;
            result[i].forEach((item) => {
                temp += item.stoneamount;
            });
            row.append($('<td/>').html(temp.toFixed(0)).attr("class", "single-right"));
            // Purity
            row.append($('<td/>').html(""));
            // Tounch
            row.append($('<td/>').html(""));
            // Wastage
            row.append($('<td/>').html(""));
            // Gross Wt.
            temp = 0;
            result[i].forEach((item) => {
                temp += item.grossweight * 1;
            });
            row.append($('<td/>').html(temp.toFixed(3)));
            // Net Wt.
            temp = 0;
            result[i].forEach((item) => {
                temp += item.netweight * 1;
            });
            row.append($('<td/>').html(temp.toFixed(3)));
            // Pure Wt.
            temp = 0;
            result[i].forEach((item) => {
                temp += item.netweight *
                    ((item.purity.split("$")[1] * 1) + (item.wastage * 1)) / 100;
            });
            row.append($('<td/>').html(temp.toFixed(3)));
            // M.Rate
            row.append($('<td/>').html(""));
            // M. Amt
            temp = 0;
            result[i].forEach((item) => {
                temp += result.goldrate * item.netweight *
                    ((item.purity.split("$")[1] * 1) + (item.wastage * 1)) / 100;
            });
            row.append($('<td/>').html(temp.toFixed(2)).attr("class", "single-right"));
            // Labour rate
            row.append($('<td/>').html(""));
            // Labour amt
            temp = 0;
            result[i].forEach((item) => {
                temp += item.netweight * item.labour;
            });
            row.append($('<td/>').html(temp.toFixed(2)).attr("class", "single-right"));
            //  Amount
            temp = 0;
            result[i].forEach((item) => {
                temp += (item.netweight * item.labour) +
                    (
                        result.goldrate * item.netweight *
                        ((item.purity.split("$")[1] * 1) + (item.wastage * 1)) /
                        100
                    ) +
                    item.stoneprice * 1;
            });
            row.append($('<td/>').html(temp.toFixed(0)));
            table = $("#table");
            table.append(row);
        }
    }
    // Full Total
    {
        let TotalRowEle = document.querySelectorAll("#datarow");
        let TotalRowEleArr = [];
        for (let i = 0; i < TotalRowEle.length; i++) {
            TotalRowEleArr.push(tableRowToDataObject(TotalRowEle[i]));
        }
        let summedObject = {};
        TotalRowEleArr.forEach(function (obj) {
            Object.keys(obj).forEach(function (key) {
                if (!summedObject.hasOwnProperty(key)) {
                    summedObject[key] = parseFloat(obj[key]) || 0;
                } else {
                    summedObject[key] += parseFloat(obj[key]) ||
                        0;
                }
            });
        });
        let row = $('<tr/>');
        row.attr('id', 'totalrow');
        row.attr('class', 'highlight');
        // S.No
        row.append($('<td/>').html("Grand Total"));
        // Name
        row.append($('<td/>').html(""));
        // Tag No.
        row.append($('<td/>').html(""));
        // MD. Wt.
        row.append($('<td/>').html((summedObject["MD. Wt."]).toFixed(2)));
        // MD. Rate
        row.append($('<td/>').html(""));
        // MD. Amt.
        row.append($('<td/>').html((summedObject["MD. Amt."]).toFixed(0)));
        // St. Wt.
        row.append($('<td/>').html((summedObject["St. Wt."]).toFixed(2)));
        // St. Rate
        row.append($('<td/>').html(""));
        // St. Amt.
        row.append($('<td/>').html((summedObject["St. Amt."]).toFixed(0)));
        // Purity
        row.append($('<td/>').html(""));
        // Tounch
        row.append($('<td/>').html(""));
        // Wastage
        row.append($('<td/>').html(""));
        // Gross Wt.
        row.append($('<td/>').html((summedObject["Gross Wt."]).toFixed(3)));
        // Net Wt.
        row.append($('<td/>').html((summedObject["Net Wt."]).toFixed(3)));
        // Pure Wt.
        var temppureweigth = (summedObject["Pure Wt."]).toFixed(3);
        row.append($('<td/>').html((summedObject["Pure Wt."]).toFixed(3)));
        // M. Rate
        row.append($('<td/>').html(""));
        // M. Amt
        row.append($('<td/>').html((summedObject["M. Amount"]).toFixed(2)));
        // Labour
        row.append($('<td/>').html(""));
        // Labour
        row.append($('<td/>').html((summedObject["L. Amount"]).toFixed(2)));
        //  Amount
        var tempamount = (summedObject["Amount"]).toFixed(0);
        row.append($('<td/>').html((summedObject["Amount"]).toFixed(0)));
        table = $("#table");
        table.append(row);
    }

    // Update variables
    {
        let temp = localStorage.getItem('savedHeader');
        temp = temp ? JSON.parse(temp) : JSON.parse("{}");
        temp["goldrate"] = document.getElementById("goldrate").value ?
            document.getElementById("goldrate").value :
            temp["goldrate"];
        localStorage.setItem('savedHeader', JSON.stringify(temp));
    }
    document.getElementById("table").innerHTML +=
        `<tr style=""><td rowspan="2" colspan="9" class="double-right" style="text-align: left;vertical-align:top;"><b>Remarks :- ${document.getElementById("remark").value}</b></td><td colspan="9"><b>Pure Gold Weight :- ${temppureweigth}</b></td></tr><tr style=""><td colspan="9"><b>Total Amount :- ${tempamount}</b></td></tr>`;
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