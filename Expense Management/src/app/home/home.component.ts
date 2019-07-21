import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
var d3 = require('d3');
declare var $;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route : Router) { }

  Header = ["Category", "Item name", "Amount", "Expense date"];
  Content = [];
  Start = 0;
  End = 10;
  noOfPage = [];

  ngOnInit() {
    this.Content = JSON.parse(localStorage.getItem("allExpense") || "[]")
    const page = this.Content.length/10;
    const temp = Math.floor(page) + ((page > Math.floor(page))? 1 : 0);
    for(let x=1; x<=temp; x++) {
      this.noOfPage.push(x);
    }
    if(JSON.parse(localStorage.getItem("category") || "[]").length < 6) this.showPie();
  }

  paginate(action) {
    const currentPage = parseInt($(".highline").text());
    if(action == "prev") {
      if(currentPage > 1) {
        $(".space").removeClass("highline");
        $(".space:eq("+(currentPage-1)+")").addClass("highline");
        this.Start = (currentPage-1) * 10 - 10;
        this.End = (currentPage-1) * 10;
      }
    }
    else if(action == "next") {
      if(currentPage < this.noOfPage.length) {
        $(".space").removeClass("highline");
        $(".space:eq("+(currentPage+1)+")").addClass("highline");
        this.Start = (currentPage+1) * 10 - 10;
        this.End = (currentPage+1) * 10;
      }
    }
    else {
      $(".space").removeClass("highline");
      $(action.target).addClass("highline");
      const selectedPage = parseInt($(action.target).text());
      this.Start = selectedPage * 10 - 10;
      this.End = selectedPage * 10;
    }
  }

  addExpense() {
    this.route.navigate(['/expense']);
  }

  edit(index, event) {
    const editRecord = (parseInt($(".highline").text())-1) * 10 + index;
    const parent = $(event.target).parent().parent();
    const obj = {
      "Record" : editRecord,
      "Category" : parent.find("td:eq(1)").text(),
      "Item name" : parent.find("td:eq(2)").text(),
      "Amount" : parseInt(parent.find("td:eq(3)").text())
    };
    localStorage.setItem("editRecord", JSON.stringify(obj));
    this.addExpense();
  }

  delete(index, event) {
    var conf = confirm("Are you sure to delete the record");
    if (!conf) return;
    const deleteRecord = (parseInt($(".highline").text())-1) * 10 + index;
    this.Content[deleteRecord]["Status"] = false;
    localStorage.setItem("allExpense", JSON.stringify(this.Content));
  }

  showPie() {
  const width = 450;
  const height = 450;
  const margin = 40;

  const radius = Math.min(width, height) / 2 - margin
  let svg = d3.select("#pieChart")
    .append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  let data = {};
  const category = JSON.parse(localStorage.getItem("category") || "[]");
  for(let i=0; i<category.length; i++) {
    data[category[i]] = 0;
  }

  for(let i=0; i<this.Content.length; i++) {
    if(this.Content[i]["Status"]) {
      data[this.Content[i]["Category"]] = (data[this.Content[i]["Category"]] + 1);
    }
  }

  const keys = Object.keys(data);
  for(let i=keys.length-1; i>=0; i--) {
    if(data[keys[i]] == 0) delete data[keys[i]];
  }
  const color = d3.scaleOrdinal()
    .domain(data)
    .range(d3.schemeSet2);
  
    const pie = d3.pie()
    .value(function(d) {return d.value; })
    const data_ready = pie(d3.entries(data))
  
    const arcGenerator = d3.arc()
    .innerRadius(0)
    .outerRadius(radius)

  svg
    .selectAll('mySlices')
    .data(data_ready)
    .enter()
    .append('path')
      .attr('d', arcGenerator)
      .attr('fill', function(d){ return(color(d.data.key)) })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)

  svg
    .selectAll('mySlices')
    .data(data_ready)
    .enter()
    .append('text')
    .text(function(d){ return d.data.key.replace("", "\n") +"("+ d.data.value +")"})
    .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
    .style("text-anchor", "middle")
    .style("font-size", 17)

    svg.append("g")
    .attr("class","legend")
    .attr("transform","translate(50,30)")
    .style("font-size","12px")
    .call(d3.legend)
  }

}
