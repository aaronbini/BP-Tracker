//TODO: use handlebars template to output readings for viewer
//TODO: Improve current chart options, maybe switch to D3.js

//track and archive bp readings
//use localStorage initially
//use jQuery
//updated date shown on screen at all times
//two inputs like this Over ==> input1, Under ==> input2
//button ==>show all readings
  //readings will show up in color coded sections based on number
    //red - hypertensive crisis, this should be accompanied by message
      //please wait several minutes and re-test, if reading remains this high,
      //call a doctor immediately
    //dark orange - hypertension stage II
    //light orange - hypertension stage I
    //yellow - prehypertension
    //green - good
    //blue -low, probably don't need this
  //include search function for searching specific date range
  //or for searching all readings in a certain range
  //add chart/graph functionality
  //allow user to see time elapsed since last high reading

var sys = document.getElementById("systolic");
var dia = document.getElementById("diastolic");
var bpSubmit = document.getElementById("bpSubmit");
var deleteButton = document.getElementById("delete");
var catSelectButton = document.getElementById('catSelectButton');
var readingsDiv = document.getElementById('readingsDiv');
var bpCanvas = document.getElementById('bpCanvas');
var showChart = document.getElementById('showChart');

var bpCatSelect = document.getElementById("bpCatSelect");

var bpReadingsArray = ["systolicInput", "diastolicInput", "date"];
var bpReadingsCount = [0,0,0,0,0];
var catList = ["Good", "Prehypertension", "Hypertension Stage I", "Hypertension Stage II", "Hypertensive Crisis"];

function updateReadingsCount () {
  var bpReadings = localStorage.getArray('bpReadings');
  bpReadingsCount = [0,0,0,0,0];
  bpReadings.forEach(function(obj){
    if (obj['bpCategoryNum'] === 1) {
      bpReadingsCount[0] += 1;
    }
    if (obj['bpCategoryNum'] === 2) {
      bpReadingsCount[1] += 1;
    }
    if (obj['bpCategoryNum'] === 3) {
      bpReadingsCount[2] += 1;
    }
    if (obj['bpCategoryNum'] === 4) {
      bpReadingsCount[3] += 1;
    }
    if (obj['bpCategoryNum'] === 5) {
      bpReadingsCount[4] += 1;
    }
  })
}
//for data array within datasets array, could increment an identical data array in localStorage based on byCategoryNum
//upon newBP creation each time: data[0]: "Good", data[1]: "Prehypertension", etc.

//Chart.js instantiation
function showChartNow () {
  updateReadingsCount();
  var bpChart = new Chart(bpCanvas, {
    type: 'bar',
      data: {
          labels: ["Good", "Prehypertension", "Hypertension Stage I", "Hypertension Stage II", "Hypertensive Crisis"],
          datasets: [{
              label: 'Number of Readings',
              data: bpReadingsCount,
              backgroundColor: [
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 99, 132, 0.2)'
              ],
              borderColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 99, 132, 0.2)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });
}
showChart.addEventListener('click', showChartNow);

//Show Date on Screen
var date = document.getElementById('date');
var showCurrentDate = function (element) {
  var currentDate = new Date();
  element.innerHTML = currentDate.toDateString();
  //element.innerHTML += Date.now();
}
showCurrentDate(date);

//set up for blood pressure
//normal bp is systolic under 120, and diastolic under 80 (green category)
//prehypertension is systolic 120-139, or diastolic 80-89 (yellow category)
//hypertension stage I is systolic 140-159, or diastolic 90-99 (light orange category)
//hypertension stage II is systolic 160-179, or diastolic 100-109 (dark orange category)
//hypertensive crisis is systolic 180 or higher, or diastolic 110 or higher (red category)

var formIsValid = function () {}

//user inputs systolic and diastolic readings for the day in two inputs
//inputs are analyzed
//attributes are added based on inputs and date when bp is entered
  //category is determined and added as an object property
//bloodPressures array
//{"Date.now();(number to be used as id)":
  //{
    //"systolic": "integer",
    //"diastolic": "integer",
    //"bpCategory": "string",
    //"bpCategoryNum": "integer"
  //}
//}

function deleteBpReading () {
  localStorage.deleteItem('bpReadings', 0);
}

deleteButton.addEventListener("click", deleteBpReading);

function BloodPressure (systolic, diastolic) {
  this.systolic = systolic;
  this.diastolic = diastolic;
  this.date = new Date().toDateString();
}

BloodPressure.prototype = {
  constructor: BloodPressure,
  bpCategorize: function () {
    //could make function that extends Math.prototype in order to more efficiently code this section
    if (this.systolic <= 119 && this.diastolic <= 79) {
      this.bpCategory = "Good";
      this.bpCategoryNum = 1;
    } else if (this.systolic <= 139 && this.diastolic <= 89) {
      this.bpCategory = "Prehypertension";
      this.bpCategoryNum = 2;
    } else if (this.systolic <= 159 && this.diastolic <= 99) {
      this.bpCategory = "Hypertension Stage I";
      this.bpCategoryNum = 3;
    } else if (this. systolic <= 179 && this.diastolic <= 109) {
      this.bpCategory = "Hypertension Stage II";
      this.bpCategoryNum = 4;
    } else {
      this.bpCategory = "Hypertensive Crisis";
      this.bpCategoryNum = 5;
    }
  },
  bpCssClass: function () {
    //add color class based on bpCategoryNum, for displaying in browser
    //use switch statement
    switch (this.bpCategoryNum) {
      case 1:
        this.cssClass = "good"
        break;
      case 2:
        this.cssClass = "preHyp"
        break;
      case 3:
        this.cssClass = "hypI"
        break;
      case 4:
        this.cssClass = "hypII"
        break;
      case 5:
        this.cssClass = "hypCrisis"
        break;
    }
  }
}

//wrap the creation of newBP in a function that also pushes newBP
//to localStorage.bpReadings
//var newBP = new BloodPressure(129, 68);
function submitBP () {
var newBP = new BloodPressure(parseInt(sys.value), parseInt(dia.value));
newBP.bpCategorize();
newBP.bpCssClass();
localStorage.pushArrayItem("bpReadings", newBP);
console.log(newBP);
}
bpSubmit.addEventListener("click", submitBP);

//function to return bpObjects in certain date range
//user selects range of dates to search (month dropdown, day dropdown, year dropdown)
function dateBP (dateLow, dateHigh) {
/*there is a better way to do this, need to figure it out
var bpArray = localStorage.getArray;
bpArray.forEach(function(obj){
  for (var field in obj) {
    if (passed in date(low) <= field && field <= passed in date(high)) {
      return obj;
      or run obj.method that returns sys/dia; or somehting like that
    }
  }
})

*/
}
//the next two functions are helper functions for the catBP function that
//outputs onto the page the readings that fall into user selected category
function makeReadingDiv (obj) {
  //pass in an object, create nicely styled html element
  var div = document.createElement('div')
  var date = document.createElement('li');
  date.innerHTML = obj['date'];
  var sysOverDia = document.createElement('li');
  sysOverDia.innerHTML = obj['systolic'] + ' / ' + obj['diastolic'];
  var category = document.createElement('li');
  category.innerHTML = obj['bpCategory'];
  div.classList.add(obj['cssClass']);
  div.appendChild(date);
  div.appendChild(sysOverDia);
  div.appendChild(category);
  return div;
}

function filterBP (obj) {
  return obj['bpCategory'] === document.getElementById('catSelect').value;
}

function catBP () {
  var bpArray = localStorage.getArray('bpReadings');
  var filteredArray = bpArray.filter(filterBP);
  console.log(filteredArray);
  //now append each item in filtered array to an element on the page
  //make each a div and style them nicely this time
  filteredArray.forEach(function(obj){
    readingsDiv.appendChild(makeReadingDiv(obj));
  })
}

catSelectButton.addEventListener('click', catBP);

var selectOptionCreate = function (array, html) {
	var select = document.createElement('select');
  select.id = "catSelect";
	var option = document.createElement('option');
	option.innerHTML = html;
	select.appendChild(option);
	array.forEach(function(arrayElement){
		var element = document.createElement('option');
		element.innerHTML = arrayElement;
		element.value = arrayElement;
		select.appendChild(element);
	})
	return select;
}

//appends created job list
var createCatSelect = function() {
	var catSelect = selectOptionCreate(catList, "Select Category");
	bpCatSelect.appendChild(catSelect);
	//return jobSelect;
}

function extractValue (id) {
  return document.getElementById(id).value;
}

function setAttribute (obj, id) {
  obj[id] = extractValue(id);
}

//when submit button is clicked, form must be validated, and bpReading must be pushed
//to the bpReadingsArray in localStorage
//also if reading is categorized as hypertensive crisis,

//check if Storage exist in browser and if so do these things on window load
window.onload = function() {
  // Check for LocalStorage support.
	if (localStorage) {
		//constructs jobs list when window is loaded, but is not visible because has class "hidden"
		//constructUL("jobsArray", jobList, jobDropList, appendJobListItem);
		//constructEmpUL("employeesArray", empList, empDropList);
		//constructUL("archivedJobs", archJobList, jobArchives, appendArchJobListItem);
	}
  //Create empty bpReadings array
	if (localStorage && !localStorage.bpReadings) {
	  localStorage.setItem('bpReadings', JSON.stringify([]));
	}
  if (localStorage && !localStorage.bpReadingsCount) {
    localStorage.setItem('bpReadingsCount', JSON.stringify([0,0,0,0,0]));
  }
  createCatSelect();
  //updateReadingsCount();
}

/*
//
Methods that extend Storage prototype
//
*/

//returns array from localStorage when array name is known
Storage.prototype.getArray = function(arrayName) {
  var thisArray = [];
  var fetchArrayObject = this.getItem(arrayName);
  if (typeof fetchArrayObject !== 'undefined') {
    if (fetchArrayObject !== null) { thisArray = JSON.parse(fetchArrayObject); }
  }
  return thisArray;
}

//push items to array in localStorage
Storage.prototype.pushArrayItem = function(arrayName,arrayItem) {
  var existingArray = this.getArray(arrayName);
  existingArray.push(arrayItem);
  this.setItem(arrayName,JSON.stringify(existingArray));
}

Storage.prototype.deleteItem = function(arrayName, index) {
	var arrayItem = {};
	var existingArray = this.getArray(arrayName);
	existingArray.splice(index, 1);
	this.setItem(arrayName, JSON.stringify(existingArray));
}
