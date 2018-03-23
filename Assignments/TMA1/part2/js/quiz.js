var inputmap = {};
var validans = {};

$(document).ready(function() {
  $('select').material_select();
});

$('#quizform').submit(function () {
  checkAnswer();
  return false;
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
      var container = document.createElement("div");
      container.className = "container";
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

      var qtype = children[i].getElementsByTagName("type")[0].innerHTML;

      // Short answer
      if (qtype == "fill") {

        var input = document.createElement("input");
        input.id = "answer-question" + i;
        inputmap[input.id] = qtype;
        validans[input.id] = children[i].getElementsByTagName("answer")[0].innerHTML;
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
          input.name = "answer-question" + i;
          inputmap[input.name] = qtype
          input.type = "radio";
          input.id = input.name + "answer" + k;

          var label = document.createElement("label");
          label.innerHTML = choices[k].textContent;
          label.htmlFor = input.name + "answer" + k;

          row2.appendChild(p);
          p.appendChild(input);
          p.appendChild(label);
        }
        validans[input.name] = children[i].getElementsByTagName("answer")[0].innerHTML;
      }
      else if (qtype == "select") {
        var div = document.createElement("div");
        var select = document.createElement("select");
        select.setAttribute("multiple", "");
        select.id = "answer-question" + i;
        inputmap[select.id] = qtype;
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
        validans[select.id] = children[i].getElementsByTagName("answer")[0].innerHTML;
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
  var score = 0;
  var ans = '';
  for(key in inputmap){
    var value = inputmap[key];
    if (value == "mc") {
      ans = $("input[name=" + key + "]:checked").next().text().charAt(0);
    }
    else if (value == "tf") {
      ans = $("input[name=" + key + "]:checked").next().text();
    }
    else if (value == "select") {
      ans = $("#" + key).val().join(',');
    }
    else if (value == "fill") {
      ans = $("#" + key).val();
    }
    console.log("answer: " + ans);
    console.log("valid answer: " + validans[key]);
    if (ans == validans[key]) {
      score++;
    }
  }
  printResult(score);
}

function printResult(score) {
  document.getElementById("results").outerHTML='';
  var form = document.getElementById("quizform")
  var numquestions = Object.keys(validans).length;

  var container = document.createElement("div");
  container.className = "container";
  container.id = "results"
  form.appendChild(container);

  var result = document.createElement("h6");
  result.innerHTML = "Your score is: " + score + " ( " + score/numquestions*100 + "% )";
  container.appendChild(result);


  var label = document.createElement("B");
  var t = document.createTextNode("Solutions:");
  label.appendChild(t);
  container.appendChild(label);

  var counter = 1;
  for(key in validans) {
    var ans = document.createElement("p");
    ans.innerHTML = counter + ". " + validans[key];
    container.appendChild(ans);
    counter++;
  }
}
