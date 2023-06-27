using System.ComponentModel.DataAnnotations;

namespace HospitalManagement.Models
{
    public class Signup
    {
        [Key]

        public int id { get; set; }

        [Required]

        public string full_name { get; set; }
        [Required]

        public string mail_id { get; set; }
        [Required]

        public string birth_date { get; set; }
        [Required]

        public string gender { get; set; }
        [Required]
        public string phone_no { get; set; }
        [Required]

        public string blood_group { get; set; }

        [Required]

        public string password { get; set; }
        [Required]

        public string address { get; set; }
        [Required]

        public string verify { get; set; }
        [Required]

        public string status { get; set; }



    }
}
