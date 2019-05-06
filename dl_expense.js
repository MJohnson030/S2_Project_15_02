"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Case Problem 2

   Author: Millione Johnson   
   Date: 4/22/19  
   
   Filename: dl_expenses.js
   
   Function List
   =============
   
   validateSummary()
      Validates the data entry in the summary field.
   
   calcClass(sumClass)
      Sums up all of the data values for elements of the sumClass class.
      
   calcExp()
      Calculates the travel expenses from all categories and dates.
      
   formatNumber(val, decimals)
      Formats the value, "val" to the number of decimals indicated 
      by "decimals", adding thousands separators.
      
   formatUSCurrency(val)
      Formats the value, "val", as U.S. currency.
      
*/

//Loads the load event using an event listener which also has an anonymous function attached
window.addEventListener("load", function () {
      var changingCells = document.getElementById("travelExp").oninput;

      for (var i = 0; i < changingCells; i++) {
            changingCells[i].onchange = calcExp;
      }

      document.getElementById("submitButton").onclick = validateSummary;

});

//checks for valiidity of the summary and displays a custom message if the value of the summary is missing
function validateSummary() {
      var summary = document.getElementById("summary");
      if (summary.validity.valueMissing) {
            summary.setCustomValidity("You must include a summary of the trip in your report.")
      } else {
            summary.setCustomValidity("");
      }
}



function calcClass(sumClass) {
      //sets the value of the sumFields variable to the object collection of all elements with the class name of "sumClass".
      var sumFields = document.getElementsByClassName("sumClass");
      var sumTotal = 0;

      for (var i = 0; i < sumFields.length; i++) {
            var itemValue = parseFloat(sumFields[i].value);
            if (!isNaN(itemValue)) {
                  sumTotal += itemValue;
            }
      }
}


function calcExp() {
      var expTable = document.querySelectorAll("table#travelExp tbody tr");
      
      for (var i = 0; i < expTable.length; i++) {
            document.getElementById("subtotal" + i).value = formatNumber(calcClass("date" + i), 2);
      }
      
      document.getElementById("transTotal").value = formatNumber(calcClass("trans"), 2);
      document.getElementById("lodgeTotal").value = formatNumber(calcClass("lodge"), 2);
      document.getElementById("mealTotal").value = formatNumber(calcClass("meal"), 2);
      document.getElementById("otherTotal").value = formatNumber(calcClass("other"), 2);
      // Sets the value of the expTotal input element to the value returned by the calcClass() function. it is being formatted using the formatUSCurrency() function.
      document.getElementById("expTotal").value = formatUSCurrency(calcClass("sum"));
}

function formatNumber(val, decimals) {
      return val.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
      });
}

function formatUSCurrency(val) {
      return val.toLocaleString('en-US', {
            style: "currency",
            currency: "USD"
      });
}