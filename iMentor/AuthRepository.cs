using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity;
using iMentor.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iMentor
{
    class AuthRepository : IDisposable
    {
        private UserManager<IdentityUser> _userManager;
        private AuthContext _ctx;

        public async Task<IdentityUser> FindAsync(UserLoginInfo loginInfo)
        {
            IdentityUser user = await _userManager.FindAsync(loginInfo);

            return user;
        }

        public async Task<IdentityResult> CreateAsync(IdentityUser user)
        {
            var result = await _userManager.CreateAsync(user);

            return result;
        }

        public async Task<IdentityResult> AddLoginAsync(string userId, UserLoginInfo login)
        {
            var result = await _userManager.AddLoginAsync(userId, login);

            return result;
        }

        public Client FindClient(string clientId)
        {
            var client = _ctx.Clients.Find(clientId);

            return client;
        }


        public void Dispose()
        {
            _userManager.Dispose();
        }
    }
}
