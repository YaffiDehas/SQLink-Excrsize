using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Cors;
using System.Web.Http;
using BLL;
using DTO;

namespace API.Controllers
{
    [RoutePrefix("api/user")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UserController : ApiController
    {
        [HttpPost]
        [Route("login")]
        public IHttpActionResult Login([FromBody] DTOUserLogin userLogin)
        {
            try
            {
                return Ok(UserBLL.AuthenticateUserLogin(userLogin.mail, userLogin.password));

            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        [HttpGet]
        [Route("projects")]
        public IHttpActionResult GetProjects(string token)
        {
            try
            {
                return Ok(UserBLL.GetProjectsUser(token));

            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }
    }
}