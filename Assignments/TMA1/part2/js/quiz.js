function buildQuiz() {
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

    var notes = xmlDoc.getElementsByTagName("questions")[0];
    var children = notes.getElementsByTagName("question");
    for (i=0; i < children.length; i++)
    {
      var quiz = document.getElementById("quiz");
      var container = document.createElement("div");
      container.className = "container";
      quiz.appendChild(container);

      var row = document.createElement("div");
      row.className = "row"
      container.appendChild(row);

      var ans = document.createElement("div");
      ans.className = "col s1";
      row.appendChild(ans);

      var prompt = document.createElement("div");
      prompt.className = "col s12";
      row.appendChild(prompt);

      question = document.createElement("B");
      var t = document.createTextNode(i + 1 + ". " + children[i].getElementsByTagName("prompt")[0].innerHTML);
      question.appendChild(t);
      prompt.appendChild(question);

      var row2 = document.createElement("div");
      row2.className = "row"
      container.appendChild(row2);

      var form = document.createElement("form");
      // form.onSubmit = checkAnswer();

      var qtype = children[i].getElementsByTagName("type")[0].innerHTML;
      var choices = children[i].getElementsByTagName("choice");
      if (qtype == "mc") {
        for (k = 0; k < choices.length; k++) {
          var p = document.createElement("p");

          var input = document.createElement("input");
          input.name = "question" + i;
          input.type = "radio";
          input.id = input.name + "answer" + k;

          var label = document.createElement("label");
          console.log(choices[k])
          label.innerHTML = choices[k].textContent;
          label.htmlFor = input.name + "answer" + k;
          console.log(label.for)

          form.appendChild(p);
          p.appendChild(input);
          p.appendChild(label);

        }
        row2.appendChild(form);
      }

      document.write("<hr>");
    }
  }

  xmlhttp.open("GET", "questions.xml", false);
  xmlhttp.send();
}
