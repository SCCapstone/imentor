using System.Web.Mvc;

namespace iMentor.Models.Security
{
    public class AccessDeniedAuthorizeAttribute : AuthorizeAttribute
    {
        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            base.OnAuthorization(filterContext);
            if (!filterContext.HttpContext.User.Identity.IsAuthenticated)
            {
                filterContext.Result = new RedirectResult("/Account/Login");
                return;
            }

            if (filterContext.Result is HttpUnauthorizedResult)
            {
                if (filterContext.HttpContext.User.IsInRole("Student"))
                {
                    filterContext.Result = new RedirectResult("/Home/StudentView");
                }

                else
                {
                    filterContext.Result = new RedirectResult("/Account/Denied");
                }
            }
        }
    }
}
