﻿using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(iMentor.Startup))]
namespace iMentor
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
