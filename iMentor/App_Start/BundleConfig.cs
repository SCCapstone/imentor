using System.Web;
using System.Web.Optimization;

namespace iMentor
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {

            bundles.Add(new StyleBundle("~/bundles/content").Include(
                "~/Content/bootstrap-theme.css",
                "~/Content/bootstrap-theme.css.map",
                "~/Content/bootstrap-theme.min.css",
                "~/Content/bootstrap-theme.min.css.map",
                "~/Content/bootstrap.css",
                "~/Content/bootstrap.min.css",
                "~/Content/bootstrap.css.map",
                "~/Content/ui-grid.css",
                "~/Content/fullcalendar.css",
                "~/Content/fullcalendar.min.css",
                "~/Content/bootstrap-social.css",
                "~/Content/font-awesome.css",
                "~/Content/ui-bootstrap-csp.css",
                "~/Content/textAngular.css",
                "~/Content/iMentor/iMentor-site.css"
                ));
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
              "~/Scripts/jquery-2.2.0.min.js")
              );
            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
               "~/Scripts/angular.js",
               "~/Scripts/angular-animate.js",
               "~/Scripts/angular-aria.js",
               "~/Scripts/angular-route.js",
               "~/Scripts/angular-messages.js",
               //"~/Scripts/angular-sanitize.js",
               "~/Scripts/angular-touch.js",
               "~/Scripts/angular-strap.js",
               "~/Scripts/angular-strap.tpl.js",
               "~/Scripts/ui-grid.js",
               "~/Scripts/xeditable.js",
               "~/Scripts/node-modules/angular-material/angular-material.js",
               "~/Scripts/node-modules/textangular/dist/textAngular-rangy.min.js",
               "~/Scripts/node-modules/textangular/dist/textAngular-sanitize.min.js",
               "~/Scripts/node-modules/textangular/dist/textAngular.min.js",
               "~/Scripts/angular-ui/bootstrap.min.js",
               "~/Scripts/angular-ui/ui-bootstrap-tpls.min.js",
               "~/Scripts/angular-ui-calendar/calendar.js"
               ));


   
            //bundles.Add(new StyleBundle("~/bundles/content/iMentor").IncludeDirectory("~/Content/iMentor", "*.css", false));
            bundles.Add(new StyleBundle("~/bundles/content/ngMaterial").IncludeDirectory("~/Scripts/node-modules/angular-material", "*.css", false));
            //bundles.Add(new StyleBundle("~/bundles/content/themes").IncludeDirectory("~/Content/themes", "*.css", false));
            // bundles.Add(new StyleBundle("~/bundles/content").Include("~/Content/fullcalendar.print.css"));

            //bundles.IgnoreList.Ignore("~/Content/fullcalendar.css");

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            //bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
            //    "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/ui-bootstrap-tpls-{version}.min.js",
                "~/Scripts/bootstrap.min.js",
                "~/Scripts/respond.js")
            );
    


            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                "~/App/globals.js",
                "~/App/app.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/appControllers")
                .IncludeDirectory("~/App/Controllers", "*.js", true)
            );

            bundles.Add(new ScriptBundle("~/bundles/appDirectives")
                .IncludeDirectory("~/App/Directives", "*.js", true)
            );

            bundles.Add(new ScriptBundle("~/bundles/appServices")
                .IncludeDirectory("~/App/Services", "*.js", true)
            );

            bundles.Add(new ScriptBundle("~/bundles/moment").Include(
                "~/Scripts/moment.min.js",
                "~/Scripts/moment.js")
            );


            bundles.Add(new ScriptBundle("~/bundles/fullcalendar").Include(
    "~/Scripts/fullcalendar.min.js",

    "~/Scripts/gcal.js",
    "~/Scripts/gapi-helper.js")
);


        }
    }
}
