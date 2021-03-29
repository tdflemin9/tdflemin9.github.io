import { cfg } from "./config.js";
import { polygon } from "./dot.js";

function createRow(period, homeBool, player, type, coords, id) {
    var adjustedX = (coords[0] - 100).toFixed(2);
    var adjustedY = (coords[1] - 42.5).toFixed(2);

    // create row
    var row = d3.select("#shot-table-body").append("tr");

    row.append("th")
        .attr("scope", "col")
        .append("input")
        .attr("type", "checkbox")
        .attr("value", id)
        .attr("id", id)
        .on("change", function() {
            var checked = d3.select(this).property("checked");
            var row = d3.select("#shot-table-body").select("[id='" + id + "']");
            if (checked) {
                dotSizeHandler(id, true);
                row.attr("class", homeBool ? "home-row" : "away-row");
            } else {
                dotSizeHandler(id, false);
                row.attr("class", "");
            }
        });
    // get shot number
    row.append("th")
        .attr("scope", "col")
        .attr("class", "shot-number")
        .text(
            d3
                .select("#shot-table-body")
                .selectAll("tr")
                .size()
        );
    row.append("td").text(period);
    row.append("td").text(homeBool ? "Home" : "Away");
    row.append("td").text(player);
    row.append("td").text(type);
    row.append("td").text(adjustedX);
    row.append("td").text(adjustedY);
    row.append("th")
        .attr("scope", "col")
        .append("i")
        .attr("class", "bi bi-trash-fill")
        .on("click", () => deleteHandler(id));
    row.attr("id", id);
    row.attr("selected", false);
}

function dotSizeHandler(id, largerBool) {
    var d = d3.select("#teams").select("[id='" + id + "']");
    var r;
    let circleBool = d.node().tagName === "circle";
    if (circleBool) {
        r = largerBool ? cfg.largerCR : cfg.circleR;
        d.transition()
            .duration(75)
            .attr("r", r);
    } else {
        r = largerBool ? cfg.largerPR : cfg.polyR;
        d.transition()
            .duration(75)
            .attr(
                "points",
                polygon(
                    Number(d.attr("cx")),
                    Number(d.attr("cy")),
                    r,
                    Number(d.attr("sides"))
                )
            );
    }
}
function deleteHandler(id) {
    event.stopPropagation();
    d3.select("#shot-table-body")
        .select("[id='" + id + "']")
        .remove();
    d3.select("#teams")
        .select("[id='" + id + "']")
        .remove();

    d3.select("#shot-table-body")
        .selectAll(".shot-number")
        .each(function(d, i) {
            d3.select(this).text(i + 1);
        });
}

export { createRow };
