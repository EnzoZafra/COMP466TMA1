$(document).ready(function() {
  $('select').material_select();
});

var requiredinfo = {};
var tabclicked = "";

function loadrequired(tab) {
  requiredinfo = {};
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

function calculate() {
  console.log("calculating " + tabclicked);
}

function checkCalc(name) {
  var element = document.getElementsByName(name);
  if (element && element[0].value ){
    requiredinfo[name] = true;
  } else {
    requiredinfo[name] = false;
  }
  console.log(requiredinfo);
  checkAllFilled();
}

function checkAllFilled() {
  var keys = Object.keys(requiredinfo);
  for (var i = 0; i < keys.length; i++) {
    if (!requiredinfo[keys[i]]) {
      console.log(keys[i]);
      return;
    }
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
  $("#height").on('change', function() {
    console.log($(this).val());
    checkAllFilled();
  });

  $("#activity").on('change', function() {
    console.log($(this).val());
    checkAllFilled();
  });

  $('.gender label').click(function() {
    var name = $(this).prev().attr('name');
    requiredinfo[name] = true;
    console.log($(this).attr('for'));
    checkAllFilled();
  });
}

function listenMort() {
  $("#freq").on('change', function() {
    console.log($(this).val());
    checkAllFilled();
  });
}

function listenUnit() {
  $("#measuretype").on('change', function() {
    console.log($(this).val());
    checkAllFilled();
  });

  $("#convunit").on('change', function() {
    console.log($(this).val());
    checkAllFilled();
  });

  $("#origunit").on('change', function() {
    console.log($(this).val());
    checkAllFilled();
  });
}
