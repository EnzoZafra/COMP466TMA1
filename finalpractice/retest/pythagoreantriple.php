<?php
function checkvalid($a, $b, $c) {
  // check if valid pythagorean triple
}
function calctriples($a, $b, $c) {
  // calcualte all triples
}

$aerr = $berr = $cerr = $validerr = "";
$value = array();
if($_SERVER["REQUEST_METHOD"] == "POST") {
  if(empty($_POST["a"])) {
    $aerr = "A is a required field";
  }else {
    if(!is_int($_POST["a"])) {
      $aerr = "A must be a valid integer";
    }
  }
  if (empty($_POST["b"])) {
    $berr = "B is a rqeuired field";
  } else {
    if (!is_int($_POST["b"])) {
      $berr = "B must be a valid integer";
    }
  }
  if (empty($_POST["c"])) {
    $cerr = "C is a required field";
  } else {
    if (!is_int($_POST["c"])) {
      $cerr = "C must be a valid integer";
    }
  }
  // Passed tests
  // Need to cast to integer
  // check valid ten calc triples
  $validerr = checkvalid($a, $b, $c);
  $value = calctriples($_POST["a"], $_POST["b"], $_POST["c"]);
}
?>

<html>
  <head><title>Pythagorean Triples</title></head>
  <body>
    <form name="inputform" method="post" action="pythagoreantriple.php">
    <input name="a" type="number"><span><?php echo $aerr; ?></span>
    <input name="b" type="number"><span><?php echo $berr; ?></span>
    <input name="c" type="number"><span><?php echo $cerr; ?></span>

    <input type="submit" value="Submit" name="submit">
    </form>

    <table>
      <tr>
        <th>a</th>
        <th>b</th>
        <th>c</th>
      </tr>
<?php
foreach($value as $val) {
  echo '<tr>';
  echo '<td>'. $value["a"] . '</td>';
  echo '<td>'. $value["b"] . '</td>';
  echo '<td>'. $value["c"] . '</td>';
  echo '</tr>';
}
?>
    </table>
  </body>
</html>
