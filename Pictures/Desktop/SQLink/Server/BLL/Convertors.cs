using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public static class Convertors
    {
        public static DTO_Project convertProjectToDTO(Project project)
        {
            return new DTO_Project()
            {
                Id = project.Id,
                UserId = project.UserId,
                Name = project.name,
                Score = (int)project.score,
                durationInDays = (int)project.durationInDays,
                madeDadeline = (bool)project.madeDadeline,
                bugsCount = (int)project.BugsCount
            };
        }
    }
}
