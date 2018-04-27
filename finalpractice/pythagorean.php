<?php
$aerr = $berr = $cerr = "";
if($_SERVER["REQUEST_METHOD"] == "POST") {
  if (empty($_POST["a"])) {
    $aerr = "A Required";
  } else {
    if (!is_int($_POST["a"])) {
      $aerr = "A is not a valid integer";
    }
  }
  if (empty($_POST["b"])) {
    $berr = "B required";
  } else {
    if (!is_int($_POST["b"])) {
      $berr = "B is not a valid integer";
    }
  }
  if (empty($_POST["c"])) {
    $cerr = "C required";
  } else {
    if (!is_int($_POST["c"])) {
      $cerr = "C is not a valid integer";
    }
  }
}
$value = calctriple($_POST["a"], $_POST["b"], $_POST["c"]);

function calctriple($a, $b, $c) {
  // calc data herem return array
  return $array;
}
?>

<html>
<head>
  <title>Pythagorean Triple Form</title>
</head>

<body>
  <form name="pythagoreanform" action="pythagorean.php" method="post">
    Enter A: <input type="number" name="a">
    <span class="error"><?php echo $aerr;?></span>
    <br><br>
    Enter B: <input type="number" name="b">
    <span class="error"><?php echo $berr;?></span>
    <br><br>
    Enter C: <input type="number" name="c">
    <span class="error"><?php echo $cerr;?></span>
    <br><br>

    <input type="submit" name="submit" value="Submit">
  </form>

  <table>
    <tr>
      <th>a</th>
      <th>b</th>
      <th>c</th>
    </tr>
<?php
foreach ($arr as $value) {
  echo "<tr>
          <td>".$value["a"]."</td>
          <td>".$value["b"]."</td>
          <td>".$value["c"]."</td>
        </tr>";
}
?>
  </table>
</body>
</html>
