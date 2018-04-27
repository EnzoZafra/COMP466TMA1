public class CookieController : Controller
{
  public IActionResult Index(UserInfo model)
  {
    int visits = 0;
    String visitcount = Request.Cookies["VisitCount"];
    if (visitcount != null) {
      visits = Int32.Parse(visitcout);
      visits++;
    }
    else {
      visits = 1;
    }
    Response.Cookies.Delete("VisitCount");
    Response.Cookies.Append("VisitCount", (visits).ToString());

    model.IPAddress = Request.HttpContext.Connection.LocalIpAddress.ToString();
    model.Visits = visits;

    return View(model);
  }
}
