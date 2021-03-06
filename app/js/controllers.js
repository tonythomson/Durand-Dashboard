'use strict';

/* Controllers */

function indexCtrl ($scope, $location, LogInSvc ) {
  $scope.goHome = function() {
    $location.path("/home");
  };

}

function loginCtrl($scope, $location, LogInSvc) {

  $scope.login = function() {
    LogInSvc.setLogin(true);
   $location.path("/twoBytwo");
 
  };

  $scope.isLoggedIn = function() {
    return LogInSvc.getLoginStatus();
  };

}

function homeCtrl ($scope, $http, $location, CategoryAvgSvc, timeChartSvc, FirstDropdown) {
  // $scope.categories = glb.categoryDataIncremental;
  $scope.firstSelected = FirstDropdown.getSelected();

  $scope.getSelected = function(val){
    $scope.firstSelected = FirstDropdown.setSelected(val)
  }

  //Set bool to determine whether incremental or total button is selected.
  //False = Incremental View, True = Total View
  $scope.curDurationBtn = false;

  //Category names
  $http.get('/app/data/mod_category_data_inc.js').success(function(data){
    $scope.categories = data;
  });

  // $http.get('/app/data/mod_brand_data.js').success(function(data){
  //   $scope.brands = data;
  // });

  $http.get('/app/data/mod_item_data.js').success(function(data){
    $scope.items = data;
  });

  // Retrieves totals for category total averages
  $http.get('/app/data/mod_category_data_total.js').success(function(data) {
    $scope.avg_total = CategoryAvgSvc.calc(data);
  });

  // Retrieves totals for category week averages
  $http.get('/app/data/mod_category_data_inc.js').success(function(data) {
    $scope.avg_inc = CategoryAvgSvc.calc(data);
  });

  $http.get('/app/data/category_data_inc.json').success(function(data) {
    var stringified = JSON.stringify(data);
    var colData = JSON.parse(stringified);

    $scope.cat_inc_sales = colData[0];
    $scope.cat_inc_vol = colData[1];
    $scope.cat_inc_margin = colData[2];
    $scope.cat_inc_profit = colData[3];
    $scope.cat_inc_trans = colData[4];
    $scope.cat_inc_impact = colData[5];
  });

  $scope.loadTotal = function() {
    $http.get('/app/data/category_data_total.json').success(function(data) {
      var stringified = JSON.stringify(data);
      var colData = JSON.parse(stringified);
      $scope.cat_inc_sales = colData[0];
      $scope.cat_inc_vol = colData[1];
      $scope.cat_inc_margin = colData[2];
      $scope.cat_inc_profit = colData[3];
      $scope.cat_inc_trans = colData[4];
      $scope.cat_inc_impact = colData[5];
    });
  };

  $scope.loadWeek = function() {
    $http.get('/app/data/category_data_inc.json').success(function(data) {
      var stringified = JSON.stringify(data);
      var colData = JSON.parse(stringified);
      $scope.cat_inc_sales = colData[0];
      $scope.cat_inc_vol = colData[1];
      $scope.cat_inc_margin = colData[2];
      $scope.cat_inc_profit = colData[3];
      $scope.cat_inc_trans = colData[4];
      $scope.cat_inc_impact = colData[5];
    });
  };

  //Load up intiial time series data
  $scope.timeseries = timeChartSvc.showSales();

  //Functions to display the correct line graph
  $scope.showSales = function() {
    $scope.timeseries = timeChartSvc.showSales();
  };

  $scope.showVolume = function() {
    $scope.timeseries = timeChartSvc.showVolume();
  };

  $scope.showMargin = function() {
    $scope.timeseries = timeChartSvc.showMargin();
  };

  $scope.showProfit = function() {
    $scope.timeseries = timeChartSvc.showProfit();
  };

  $scope.showTrans = function() {
    $scope.timeseries = timeChartSvc.showTrans();
  };

  $scope.showImpact = function() {
    $scope.timeseries = timeChartSvc.showImpact();
  };

  $scope.viewTactic = function() {
    $location.path("/twoBytwo");
  };

  $scope.concat = function(itemName) {
    if(itemName.length > 18) {
      return(itemName.slice(0,18) + "...");
    } else {
      return(itemName);
    }
  };

  $scope.isOdd = function(idx) {
    if(idx%2 === 1) return false;
    else return true;
  }

}

//FIX - commenting this out for now since it breaks the CategoryAvgSvc
//homeCtrl.$inject = ['$scope', '$http', 'CategoryAvgSvc', '$location'];

function datePickerCtrl($scope) {
  var fromDate = new Date();
  fromDate.setMonth(fromDate.getMonth() - 1);
  var fromDateStr = ""+(fromDate.getMonth()+1)+"\/"+fromDate.getDate()+"\/"+fromDate.getFullYear();
  var toDate = new Date();
  var toDateStr = ""+(toDate.getMonth()+1)+"\/"+toDate.getDate()+"\/"+toDate.getFullYear();

  $scope.datepicker = {
    'fromDate': fromDateStr,
    'toDate': toDateStr,
    'language': 'en',
    'format': 'mm/dd/yyyy'
  };
}

function twoBytwoCtrl($scope, $http, FirstDropdown) {
  $http.get('data/twoByTwoData.js').success(function(data){
    $scope.twoBytwo = data;
  });

  $scope.firstSelected = FirstDropdown.getSelected();

  $scope.getSelected = function(val){
    $scope.firstSelected = FirstDropdown.setSelected(val)
  }
}
twoBytwoCtrl.$inject = ['$scope', '$http', 'FirstDropdown'];

function brandCtrl($scope, $http, AverageSvc, timeChartSvc, FirstDropdown) {
  $http.get('/app/data/brand_bar.json').success(function(data){
    var stringified = JSON.stringify(data);
    var colData = JSON.parse(stringified);
    $scope.brand_sales = colData[0];
    $scope.brand_vol = colData[1];
    $scope.brand_margin = colData[2];
  });

  $scope.firstSelected = FirstDropdown.getSelected();

  $scope.getSelected = function(val){
    $scope.firstSelected = FirstDropdown.setSelected(val)
  }

  // Retrieves total averages for Brands page table
  $http.get('/app/data/mod_brand_data.js').success(function(data) {
    $scope.brands = data;
    $scope.averages = AverageSvc.calc(data);
  });

  //$scope.salesTimeChart = salesTimeChartSvc.query();
  $scope.timeseries = timeChartSvc.showSales();

  $scope.showSales = function() {
    $scope.timeseries = timeChartSvc.showSales();
  };

  $scope.showVolume = function() {
    $scope.timeseries = timeChartSvc.showVolume();
  };

  $scope.showMargin = function() {
    $scope.timeseries = timeChartSvc.showMargin();
  };

  $http.get('/app/data/mod_category_data_inc.js').success(function(data){
    $scope.categories = data;
  });

  $scope.actionIsNotNull = function(brand) {
    return brand.action !== null;
  };

  $scope.followUpIsNotNull = function(brand) {
    return brand.followUp !== null;
  };

  $scope.isOdd = function(idx) {
    if(idx%2 === 1) return false;
    else return true;
  };
}

function actionItemCtrl($scope) {
  $scope.open = false;

  $scope.toggleOpen = function () {
    $scope.open = ($scope.open) ? false : true;
  };
}

function timeSeriesCtrl($scope) {
  var timeSeriesTitles = [
    "Incremental Sales Avg.", "Incremental Volume Avg.",
    "Incremental Margin Avg.", "Incremental Profit Avg.",
    "Incremental Transactions Avg.", "Incremental Impact Avg."
  ];

  $scope.toggleSelected = function (colNum) {
    for (var i = 0; i < 6; i++) {
      $scope.selected[i] = false;
    }
    $scope.selected[colNum] = true;
    $scope.timeSeriesTitle = timeSeriesTitles[colNum];
  };

  $scope.selected = [];
  $scope.selected[0] = true;
  $scope.timeSeriesTitle = timeSeriesTitles[0];
}
