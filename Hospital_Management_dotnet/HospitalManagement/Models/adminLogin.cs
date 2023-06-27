
using System.ComponentModel.DataAnnotations;

namespace HospitalManagement.Models
{
    public class adminLogin
    {
        [Required]
        public string email { get; set; }

        [Required]
        public string password { get; set; }
    }
}
