using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class DTO_Project
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public int Score { get; set; }
        public int durationInDays { get; set; }
        public bool madeDadeline { get; set; }
        public int bugsCount { get; set; }
        public DTO_Project() { }

    }
}
