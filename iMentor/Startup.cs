using iMentor.Providers;
using Microsoft.Owin;
using Microsoft.Owin.Security.Google;
using Microsoft.Owin.Security.OAuth;
using Owin;

[assembly: OwinStartupAttribute(typeof(iMentor.Startup))]
namespace iMentor
{
    public partial class Startup
    {
        public static OAuthBearerAuthenticationOptions OAuthBearerOptions { get; private set; }
        public static GoogleOAuth2AuthenticationOptions googleAuthOptions { get; private set; }

        public void Configuration(IAppBuilder app)
        {
            //use a cookie to temporarily store information about a user logging in with a third party login provider
            app.UseExternalSignInCookie(Microsoft.AspNet.Identity.DefaultAuthenticationTypes.ExternalCookie);
            OAuthBearerOptions = new OAuthBearerAuthenticationOptions();

            googleAuthOptions = new GoogleOAuth2AuthenticationOptions()
            {
                ClientId = "1086641013362-rj0u1ckimo3hs369gc8q40bvqs2d1rau.apps.googleusercontent.com",
                ClientSecret = "sN9oU8mW3jP6qGDYGNMX2LS7",
                Provider = new GoogleAuthProvider()
            };
            app.UseGoogleAuthentication(googleAuthOptions);


            //ConfigureAuth(app);
        }
    }
}
