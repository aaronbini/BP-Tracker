bpCategorize: function () {
  //could make function that extends Math.prototype in order to more efficiently code this section
  //also OR operator is not returning proper category because it returns true if either statement is true
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
}

bpCategorize: function () {
  //could make function that extends Math.prototype in order to more efficiently code this section
  //also OR operator is not returning proper category because it returns true if either statement is true
  if (this.systolic <= 119 && this.diastolic <= 79) {
    this.bpCategory = "Good";
    this.bpCategoryNum = 1;
  } else if ((120 <= this.systolic && this.systolic <= 139) || (80 <= this.diastolic && this.diastolic <= 89)) {
    this.bpCategory = "Prehypertension";
    this.bpCategoryNum = 2;
  } else if ((140 <= this.systolic && this.systolic <= 159) || (90 <= this.diastolic && this.diastolic <= 99)) {
    this.bpCategory = "Hypertension Stage I";
    this.bpCategoryNum = 3;
  } else if ((160 <= this.systolic && this. systolic <= 179) || (100 <= this.diastolic && this.diastolic <= 109)) {
    this.bpCategory = "Hypertension Stage II";
    this.bpCategoryNum = 4;
  } else {
    this.bpCategory = "Hypertensive Crisis";
    this.bpCategoryNum = 5;
  }
}
