using BookStoreCore.IRepository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Drawing.Printing;
using System.IdentityModel.Tokens.Jwt;

namespace BookStoreAPI.Filter
{
    public class AdminAuthorizationFilterAttribute : Attribute, IAuthorizationFilter
    {

        private IUserRepository _IUserRepository;

        public AdminAuthorizationFilterAttribute(IUserRepository IUserRepository)
        {
            _IUserRepository = IUserRepository;
        }
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (!string.IsNullOrEmpty(context.HttpContext.Request.Headers["Authorization"]))
            {
                // đọc jwttoken
                var jwtToken = context.HttpContext.Request.Headers["Authorization"].FirstOrDefault().Split(" ")[1];
                var handler = new JwtSecurityTokenHandler();
                var token = handler.ReadJwtToken(jwtToken);

                var SSID = token.Claims.First(c => c.Type == "SSID").Value;

                if (token == null && SSID == null)
                {
                    context.Result = new JsonResult("Permission denined!");
                }
                else
                {
                    var currentUser = _IUserRepository.getInfoFromSSID(SSID);
                    if (currentUser == null || currentUser.IsAdmin != 1)
                    {
                        context.Result = new JsonResult("Permission denined!");
                    }
                    context.HttpContext.Session.SetString("SSID", SSID);
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
                    context.HttpContext.Session.SetString("UserName", currentUser.Fullname);
=======
>>>>>>> 3de0db7d8f96c0b7e40be265b27f507a8c8d46c9
>>>>>>> Stashed changes
                }
            }
            else
            {
                context.Result = new JsonResult("Missing token!");
            }

        }
    }
}
