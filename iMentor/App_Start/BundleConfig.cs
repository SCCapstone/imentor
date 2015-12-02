using System.Web;
using System.Web.Optimization;

namespace iMentor
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/bundles/content").IncludeDirectory("~/Content", "*.css", false));

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            //bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
            //    "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/bootstrap.js", 
                "~/Scripts/respond.js")
            );

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/angular.js",
                "~/Scripts/angular-animate.js",
                "~/Scripts/angular-bootstrap.js",
                "~/Scripts/angular-route.js",
                "~/Scripts/ng-grid.js",
                "~/Scripts/ui-bootstrap-tpls-{version}.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                "~/App/constants.js",
                "~/App/app.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/appControllers")
                .IncludeDirectory("~/App/controllers", "*.js", true)
            );

            bundles.Add(new ScriptBundle("~/bundles/appServices")
                .IncludeDirectory("~/App/services", "*.js", true)
            );
        }
    }
}
