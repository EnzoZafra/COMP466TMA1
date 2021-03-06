if (window.XMLHttpRequest)
{// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
}
else
{// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.onload = function() {
  var xmlDoc = new DOMParser().parseFromString(xmlhttp.responseText,'text/xml');

  var notes = xmlDoc.getElementsByTagName("notes")[0];
  var children = notes.getElementsByTagName("note");
  for (i=0; i < children.length; i++)
  {
    var maindiv = document.getElementById("notesection")
    var div = document.createElement("div");
    div.className = "collection";
    maindiv.appendChild(div)
    // document.body.appendChild(div);
    var h4 = document.createElement("h4");
    h4.innerHTML = children[i].getElementsByTagName("topic")[0].innerHTML;
    div.appendChild(h4);
    var subtopics = children[i].getElementsByTagName("subtopic");
    for (k = 0; k < subtopics.length; k++) {
      var header = document.createElement("h5");
      header.innerHTML = subtopics[k].getElementsByTagName("header")[0].innerHTML;
      div.appendChild(header)
      var ul = document.createElement("ul");
      div.appendChild(ul);
      var child = subtopics[k].getElementsByTagName("data");
      for (j = 0; j < child.length; j++) {
        var li = document.createElement("li");
        li.className = "black-text collection-item";
        li.innerHTML = child[j].innerHTML;
        ul.appendChild(li);
      }

    }
    document.write("<hr>");
  }
}

var path = document.currentScript.getAttribute('file');
xmlhttp.open("GET", path, false);
xmlhttp.send();
