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
            bundles.Add(new StyleBundle("~/bundles/content/iMentor").IncludeDirectory("~/Content/iMentor", "*.css", false));
            bundles.Add(new StyleBundle("~/bundles/content/ngMaterial").IncludeDirectory("~/Scripts/node-modules/angular-material", "*.css", false));

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/jquery-2.2.0.min.js")
                );

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            //bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
            //    "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/ui-bootstrap-tpls-{version}.min.js",
                "~/Scripts/bootstrap.min.js", 
                "~/Scripts/respond.js")
            );

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/angular.js",
                "~/Scripts/angular-animate.js",
                "~/Scripts/angular-aria.js",
                "~/Scripts/angular-route.js",
                "~/Scripts/angular-messages.js",
                "~/Scripts/angular-sanitize.js",
                "~/Scripts/node-modules/angular-material/angular-material.js",
                "~/Scripts/angular-ui/bootstrap.min.js",
                "~/Scripts/angular-ui/ui-bootstrap-tpls.min.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                "~/App/constants.js",
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
        }
    }
}
