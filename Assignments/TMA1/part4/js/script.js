$(document).ready(function() {
  $('select').material_select();
});

var requiredinfo = {};
var tabclicked = "";
var args = {};

function loadrequired(tab) {
  requiredinfo = {};
  args = {};
  $($('form').prop('elements')).each(function(){
    var name = this["name"];
    if (name != '') {
      requiredinfo[this["name"]] = false;
    }
  });
  if (tab == "tdee") {
    listenTDEE();
  }
  else if (tab == "mortgage") {
    listenMort();
  }
  else if (tab == "unitconverter") {
    listenUnit();
  }
}

function verifyInput() {
  if (tabclicked == "unitconverter") {
    args['original'] = parseFloat(args['original']);
    if (isNaN(args['original']) || !args['measuretype'] || !args['origunit'] || !args['convunit']) {
      return false;
    }
    return true;
  }
  else if (tabclicked == "mortgage") {
    args['purchase'] = parseInt(args['purchase']);
    args['down'] = parseInt(args['down']);
    args['rate'] = parseFloat(args['rate']);
    args['amortization'] = parseInt(args['amortization']);
    if (isNaN(args['purchase']) || isNaN(args['down']) || isNaN(args['rate']) || isNaN(args['amortization']) || !args['freq']) {
      return false;
    }
    return true;
  }
  else if (tabclicked == "tdee") {
    args['age'] = parseInt(args['age']);
    args['weight'] = parseInt(args['weight']);

    if (isNaN(args['age']) || isNaN(args['weight']) || !args['gender'] || !args['height'] || !args['activity']) {
      return false;
    }
    return true;
  }
}

function convertHeight(height) {
  var pattern = new RegExp('(.*)ft(.*)in');
  var match = pattern.exec(height);
  var ft = parseInt(match[0]);
  var inch = parseInt(match[1]);

  return (ft * 30.48) + (inch * 2.54);
}

function convertWeight(weight) {
  return (weight * 0.453592);
}

function calculate() {
  console.log("calculating " + tabclicked);
  if (tabclicked == "unitconverter") {
    calculateUnit();
  }
  else if (tabclicked == "mortgage") {
    calculateMortgage();
  }
  else if (tabclicked == "tdee") {
    calculateTDEE();
  }
}

function calculateTDEE() {
  var gender = args['gender'];
  var age = args['age'];
  var weight = args['weight'];
  var height = args['height'];
  var activity = args['activity'];

  var weight = convertWeight(weight);
  var height = convertHeight(height);

  if (gender == "f") {
    var bmr = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
  }
  else if (gender == "m") {
    var bmr = 66 + (13.7 * weight) + (5 * height) - (6.8 * age);
  }

  var tdee;
  if (activity == "s") {
    tdee = bmr * 1.2;
  }
  else if (activity == "le") {
    tdee = bmr * 1.375;
  }
  else if (activity == "me") {
    tdee = bmr * 1.55;
  }
  else if (activity == "he") {
    tdee = bmr * 1.725;
  }
  else if (activity == "a") {
    tdee = bmr * 1.9;
  }
  var resultday = document.getElementById("resultday");
  var resultweek = document.getElementById("resultweek");

  resultday.innerHTML = Math.round(tdee).toString() + " per day";
  resultweek.innerHTML = Math.round(tdee * 7).toString() + " per week";
}

function calculateMortgage() {
  var purchaseprice = args['purchase'];
  var down =  args['down'];
  var rate = args['rate'];
  var amortization = args['amortization'];
  var freq = args['freq'];

  var total = purchaseprice - down;

  amortization = amortization * 12;
  var c = (rate / 100) / 12;
  var payment = total * (c * Math.pow((1 + c), amortization));
  payment = payment / (Math.pow((1 + c), amortization) - 1);

  var converted;
  var output;
  if (freq == 'm') {
    converted = payment;
    output = "per month";
  }
  else if (freq == 'bw') {
    converted = payment * 12 / 26;
    output = "bi-weekly";

  }
  else if (freq == 'w') {
    converted = payment * 12 / 52;
    output = "per week";
  }

  converted = converted.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  output = converted.toString() + " " + output;
  var result = document.getElementById("result");
  result.innerHTML = output;
}

function calculateUnit() {
  var original =  args['original'];
  var convunit = args['convunit'];
  var origunit = args['origunit'];
  var measuretype = args['measuretype'];

  var base = original;
  var multiplier = 1;

  if (measuretype == "a") {
    multiplier = 2;
  }
  else if (measuretype == "v") {
    multiplier = 3;
  }

  if (origunit.toLowerCase() == "kilo") {
    base = base * Math.pow(1000, multiplier);
  }
  else if (origunit.toLowerCase() == "hecto") {
    base = base * Math.pow(100, multiplier);
  }
  else if (origunit.toLowerCase() == "deka") {
    base = base * Math.pow(10, multiplier);
  }
  else if (origunit.toLowerCase() == "meter") {
    base = base;
  }
  else if (origunit.toLowerCase() == "deci") {
    base = base * Math.pow(0.1, multiplier);
  }
  else if (origunit.toLowerCase() == "centi") {
    base = base * Math.pow(0.01, multiplier);
  }
  else if (origunit.toLowerCase() == "milli") {
    base = base * Math.pow(0.001, multiplier);
  }
  else if (origunit.toLowerCase() == "micro") {
    base = base * Math.pow(0.000001, multiplier);
  }
  else if (origunit.toLowerCase() == "nano") {
    base = base * Math.pow(0.000000001, multiplier);
  }
  else if (origunit.toLowerCase() == "pound") {
    // gram
    base = base * 453.592;
  }
  else if (origunit.toLowerCase() == "ounce") {
    base = base * 28.3495231;
  }
  else if (origunit.toLowerCase() == "litre") {
    base = base;
  }
  else if (origunit.toLowerCase() == "gram") {
    base = base;
  }
  else if (origunit.toLowerCase() == "inches") {
    base = base * Math.pow(0.0254, multiplier);
  }
  else if (origunit.toLowerCase() == "feet") {
    base = base * Mat.pow(0.3048, multiplier);
  }

  console.log(base);
  var converted;

  if (convunit.toLowerCase() == "kilo") {
    converted = base / Math.pow(1000, multiplier);
  }
  else if (convunit.toLowerCase() == "hecto") {
    converted = base / Math.pow(100, multiplier);
  }
  else if (convunit.toLowerCase() == "deka") {
    converted = base / Math.pow(10, multiplier);
  }
  else if (convunit.toLowerCase() == "meter") {
    converted = base;
  }
  else if (convunit.toLowerCase() == "deci") {
    converted = base / Math.pow(0.1, multiplier);
  }
  else if (convunit.toLowerCase() == "centi") {
    converted = base / Math.pow(0.01, multiplier);
  }
  else if (convunit.toLowerCase() == "milli") {
    converted = base / Math.pow(0.001, multiplier);
  }
  else if (convunit.toLowerCase() == "micro") {
    converted = base / Math.pow(0.000001, multiplier);
  }
  else if (convunit.toLowerCase() == "nano") {
    converted = base / Math.pow(0.000000001, multiplier);
  }
  else if (convunit.toLowerCase() == "pound") {
    // gram
    converted = base / 453.592;
  }
  else if (convunit.toLowerCase() == "ounce") {
    converted = base / 28.3495231;
  }
  else if (convunit.toLowerCase() == "litre") {
    converted = base;
  }
  else if (convunit.toLowerCase() == "gram") {
    converted = base;
  }
  else if (convunit.toLowerCase() == "inches") {
    converted = base / Math.pow(0.0254, multiplier);
  }
  else if (convunit.toLowerCase() == "feet") {
    converted = base / Math.pow(0.3048, multiplier);
  }
  console.log(converted);

  var convresult = document.getElementById("converted");
  convresult.value = converted.toString().replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

function checkCalc(name) {
  var element = document.getElementsByName(name);
  if (element && element[0].value ){
    requiredinfo[name] = true;
    args[name] = element[0].value;
  } else {
    requiredinfo[name] = false;
    args[name] = "";
  }
  checkAllFilled();
}

function checkAllFilled() {
  var keys = Object.keys(requiredinfo);
  for (var i = 0; i < keys.length; i++) {
    if (!requiredinfo[keys[i]]) {
      return;
    }
  }
  if(!verifyInput()) {
    return;
  }
  calculate();
}

$('ul.tabs').on('click', 'a', function(e) {
  var xmlhttp
  try {
    xmlhttp = new window.XMLHttpRequest();
  } catch (e) {
    xmlhttp = false;
  }
  xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState == 4) {
      if (xmlhttp.status == 200) {
        $('#toolbody').html(xmlhttp.responseText);
        $('select').material_select();
        loadrequired(tabclicked);
      } else {
        document.ajax.dyn="Error code " + xmlhttp.status;
      }
    }
  };
  tabclicked = $(this).attr('href');
  xmlhttp.open("GET", "html/" + tabclicked + ".html", true);
  xmlhttp.send(null);
});

// Set event listeners
function listenTDEE() {
  args['height'] = $("#height").val();
  $("#height").on('change', function() {
    args['height'] = $(this).val();
    checkAllFilled();
  });

  args['activity'] = $("#activity").val();
  $("#activity").on('change', function() {
    args['activity'] = $(this).val();
    checkAllFilled();
  });

  $('.gender label').click(function() {
    var name = $(this).prev().attr('name');
    requiredinfo[name] = true;
    args[name] = $(this).attr('for');
    checkAllFilled();
  });
}

function listenMort() {
  args['freq'] = $("#freq").val();
  $("#freq").on('change', function() {
    args['freq'] = $(this).val();
    checkAllFilled();
  });
}

function listenUnit() {
  args['measuretype'] = $("#measuretype").val();
  $("#measuretype").on('change', function() {
    args['measuretype'] = $(this).val();
    checkAllFilled();
    changeEnabled(args['measuretype']);
  });

  args['convunit'] = $("#convunit").val();
  $("#convunit").on('change', function() {
    args['convunit'] = $(this).val();
    checkAllFilled();
  });

  args['origunit'] = $("#origunit").val();
  $("#origunit").on('change', function() {
    args['origunit'] = $(this).val();
    checkAllFilled();
  });
}

function clearTDEE() {
  var inputForms = ["age", "weight"];
  for (var i = 0; i < inputForms.length; i++) {
    var elem = document.getElementsByName(inputForms[i]);
    elem[0].value = "";
    requiredinfo[inputForms[i]] = false;
  }
  var resultday = document.getElementById("resultday");
  var resultweek = document.getElementById("resultweek");

  resultday.innerHTML = "";
  resultweek.innerHTML = "";
}

function clearMortgage() {
  var inputForms = ["purchase", "down", "rate", "amortization"];
  for (var i = 0; i < inputForms.length; i++) {
    var elem = document.getElementsByName(inputForms[i]);
    elem[0].value = "";
    requiredinfo[inputForms[i]] = false;
  }

  var result = document.getElementById("result");

  result.innerHTML = "";
}

function clearUnit() {
  var inputForms = ["original"]
  for (var i = 0; i < inputForms.length; i++) {
    var elem = document.getElementsByName(inputForms[i]);
    elem[0].value = "";
    requiredinfo[inputForms[i]] = false;
  }

  var result = document.getElementById("converted");
  result.value = "";

  var conv
}

function enableAll() {
  $('option.w').each(function( index, element ) {
    $(element).prop('disabled', false);
  });
  $('option.l').each(function( index, element ) {
    $(element).prop('disabled', false);
  });
  $('option.a').each(function( index, element ) {
    $(element).prop('disabled', false);
  });
  $('option.v').each(function( index, element ) {
    $(element).prop('disabled', false);
  });

  $('origunit').material_select();
  $('convunit').material_select();
}

function changeEnabled(measuretype) {
  enableAll();
  console.log(measuretype);
  $('option.' + measuretype).each(function( index, element ) {
    $(element).prop('disabled', true);
  });

  $('#origunit').material_select();
  $('#convunit').material_select();
}
