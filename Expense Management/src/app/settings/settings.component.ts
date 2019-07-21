import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor() { }

  category = [];

  ngOnInit() {
    this.category = JSON.parse(localStorage.getItem("category") || "[]")
  }

  setValue(action) {
    if(action == "upDateBudget") {
      localStorage.setItem("totalBudget", $("#"+action).val());
      alert("Budget value has been updated");
    }
    else {
      if(this.category.indexOf($("#"+action).val()) == -1) this.category.push($("#"+action).val());
      localStorage.setItem("category", JSON.stringify(this.category));
    }
    $("#"+action).val("");
  }

}
