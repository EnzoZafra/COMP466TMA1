public class CookieController : Controller
{
  public IActionResult Index(UserInfo model)
  {
    int visits = 0;
    string temp = Request.Cookies["visits"];
    if (temp != null) {
      visits = Int32.Parse(temp);
    }
    visits++;

    Response.Cookies.Delete("visits");
    Response.Cookies.Append("visits", (visits).ToString());
    string ipaddress = Request.HttpContext.Connection.LocalIpAddress.ToString();
    model.visits = visits;
    model.ipaddress = ipaddress;

    return View(model);

  }
}
