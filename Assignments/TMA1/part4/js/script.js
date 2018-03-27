$(document).ready(function() {
  $('select').material_select();
});

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
      } else {
        document.ajax.dyn="Error code " + xmlhttp.status;
      }
    }
  };
  var tabclicked = $(this).attr('href');
  xmlhttp.open("GET", "html/" + tabclicked + ".html", true);
  xmlhttp.send(null);
});
