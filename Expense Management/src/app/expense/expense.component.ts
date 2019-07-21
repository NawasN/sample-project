import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  constructor(private route : Router) { }

  category = [];
  allExpense = [];
  editRecord = false;

  ngOnInit() {
    this.category = JSON.parse(localStorage.getItem("category") || "[]");
    this.allExpense = JSON.parse(localStorage.getItem("allExpense") || "[]");
    const editVal = JSON.parse(localStorage.getItem("editRecord") || "{}");
    if(Object.keys(editVal).length > 0) {
      this.editRecord = true;
      setTimeout(() => {
        $("#category").val(editVal["Category"]);
        $("#itemName").val(editVal["Item name"]);
        $("#amount").val(editVal["Amount"]);  
      }, 500);
      
    }
  }

  ngOnDestroy() {
    localStorage.removeItem("editRecord");
  }

  addExpense() {
    let date = new Date();
    let expense = {
      "id" : (this.allExpense.length + 1),
      "Category" : $("#category").val(),
      "Item name" : $("#itemName").val(),
      "Amount" : parseInt($("#amount").val()),
      "Expense date" : date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear(),
      "Status" : true
    };
    this.allExpense.push(expense);
    localStorage.setItem("allExpense", JSON.stringify(this.allExpense));
  }

  saveExpense() {
    const editRec = JSON.parse(localStorage.getItem("editRecord"));
    const tempRecord = this.allExpense[editRec["Record"]];
    const obj = {
      "id" : tempRecord["id"],
      "Category" : $("#category").val(),
      "Item name" : $("#itemName").val(),
      "Amount" : parseInt($("#amount").val()),
      "Expense date" : tempRecord["Expense date"],
      "Status" : tempRecord["Status"]
    }
    this.allExpense[editRec["Record"]] = obj;
    localStorage.setItem("allExpense", JSON.stringify(this.allExpense));
    this.route.navigate(["/"]);
  }

}
