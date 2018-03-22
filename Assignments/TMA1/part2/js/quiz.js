$(document).ready(function() {
  $('select').material_select();
});

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
    var form = document.getElementById("quizform")
    for (i=0; i < children.length; i++)
    {
      // var quiz = document.getElementById("quiz");
      var container = document.createElement("div");
      container.className = "container";
      // quiz.appendChild(container);
      form.appendChild(container);

      var row = document.createElement("div");
      row.className = "row"
      container.appendChild(row);

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

      // var form = document.createElement("form");
      // var form = document.getElementById("quizform")
      // row2.appendChild(form);

      var qtype = children[i].getElementsByTagName("type")[0].innerHTML;

      // Short answer
      if (qtype == "fill") {

        var input = document.createElement("input");
        input.id = "answer-question" + i;
        input.type = "text";

        var label = document.createElement("label");
        label.htmlFor = input.id;

        row2.appendChild(input);
        row2.appendChild(label);
      }
      else if (qtype == "mc" || qtype == "tf") {
        // Multiple choice questions
        var choices = children[i].getElementsByTagName("choice");
        for (k = 0; k < choices.length; k++) {
          var p = document.createElement("p");

          var input = document.createElement("input");
          input.name = "question" + i;
          input.type = "radio";
          input.id = input.name + "answer" + k;

          var label = document.createElement("label");
          label.innerHTML = choices[k].textContent;
          label.htmlFor = input.name + "answer" + k;

          row2.appendChild(p);
          p.appendChild(input);
          p.appendChild(label);
        }
      }
      else if (qtype == "select") {
        var div = document.createElement("div");
        var select = document.createElement("select");
        select.setAttribute("multiple", "");
        div.appendChild(select);

        var label = document.createElement("option");
        label.value = "";
        label.setAttribute("disabled", "");
        label.setAttribute("selected", "");
        label.innerHTML = "Select all that apply";
        select.appendChild(label);


        var choices = children[i].getElementsByTagName("choice");
        for (k = 0; k < choices.length; k++) {
          var choice = choices[k].textContent;
          var option = document.createElement("option");
          option.value = choice;
          option.innerHTML = choice;
          select.appendChild(option);
        }
        row2.appendChild(div);
      }

    }
    var buttondiv = document.createElement("div");
    buttondiv.className = "center row";
    var submitbutton = document.createElement("button");
    submitbutton.className = "waves-effect waves-light btn";
    submitbutton.type = "submit";
    submitbutton.innerHTML = "Submit Quiz";
    buttondiv.appendChild(submitbutton);
    form.appendChild(buttondiv);
  }

  xmlhttp.open("GET", "questions.xml", false);
  xmlhttp.send();
}

function checkAnswer() {
  console.log("TEST");
  // console.log($('input[name=question2]:checked').next().text());
}
