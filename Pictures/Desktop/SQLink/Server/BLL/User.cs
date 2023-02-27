using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public static class UserBLL
    {
        public static DTO_User AuthenticateUserLogin(string mail, string password)
        {
            using (SQLinkEntities1 db = new SQLinkEntities1())
            {
                var isValidLogin = db.UserLogins.First(login => login.mail == mail && login.password == password);
                var userLgin = db.Users.First(user => user.Id == isValidLogin.Id);
                return GetUserInfo(userLgin);
            }
        }
        public static DTO_User GetUserInfo(DAL.User user)         
        {
            using (SQLinkEntities1 db = new SQLinkEntities1())
            {
                var token = Convert.ToBase64String(Guid.NewGuid().ToByteArray());
                db.Users.First(r => r.Id == user.Id).token = token;
                db.SaveChanges();

                return new DTO_User()
                {
                    Id = user.Id,
                    Email = user.mail,
                    Phone = user.phone,
                    Address = user.address,
                    Name = user.name,
                    Token = token
                };
            }
        }

        public static List<DTO_Project> GetProjectsUser(string token)
        {
            using (SQLinkEntities1 db = new SQLinkEntities1())
            {
                var loggedinUser = db.Users.First(user => user.token == token);
                var userProjects = db.Projects.Where(project => project.UserId == loggedinUser.Id.ToString());
                List<DTO_Project> projectList = new List<DTO_Project>();
                foreach (var item in userProjects)
                {
                    var DTOProject = Convertors.convertProjectToDTO(item);
                    projectList.Add(DTOProject);
                }
                return projectList;
            }
        }
    }
}
