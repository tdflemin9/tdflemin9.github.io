import { setUpDeleteAllModal } from "./shots/delete-all-modal.js";

function setUpTable() {
    d3.select("#shot-table")
        .append("thead")
        .append("tr");
    var columns = ["shot", "period", "team", "player", "type", "x", "y"];

    createHeaderRow(columns);

    d3.select("#shot-table")
        .append("tbody")
        .attr("id", "shot-table-body");

    setUpDeleteAllModal("#delete-all-modal");
}

function createHeaderRow(columns) {
    columns = [""].concat(columns); // for check box

    var headerRow = d3
        .select("#shot-table")
        .select("thead")
        .select("tr");
    // clear row
    headerRow.selectAll("*").remove();

    function createHeaderCol(headerRow, text) {
        headerRow
            .append("th")
            .attr("scope", "col")
            .text(text);
    }
    for (let col of columns) {
        createHeaderCol(headerRow, col);
    }

    // for trash can
    let r = headerRow.append("th").attr("scope", "col");
    r.append("i")
        .attr("class", "bi-trash-fill")
        .on("click", () => {
            new bootstrap.Modal(
                document.getElementById("delete-all-modal")
            ).show();
        });
}

function clearTable() {
    d3.select("#shot-table-body")
        .selectAll("tr")
        .remove();
    d3.select("#hockey-rink-svg")
        .select("#dots")
        .selectAll("circle")
        .remove();
}

function getHeaderRow() {
    var l = [];
    d3.select("#shot-table")
        .select("thead")
        .selectAll("th")
        .each(function() {
            l.push(d3.select(this).text());
        });
    return _.filter(l, x => x !== "");
}

function printHeaderRow() {
    var s = "";
    d3.select("#shot-table")
        .select("thead")
        .selectAll("th")
        .each(function() {
            let text = d3.select(this).text();
            if (text !== "" && text !== "shot") {
                s += text + ",";
            }
        });
    return s.slice(0, -1);
}

export {
    setUpTable,
    clearTable,
    createHeaderRow,
    getHeaderRow,
    printHeaderRow,
};
