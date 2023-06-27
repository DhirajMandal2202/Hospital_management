using System.ComponentModel.DataAnnotations;

namespace HospitalManagement.Models
{
    public class doctor
    {

        [Key]
        public int id { get; set; }

        [Required]
        public string first_name { get; set; }

        [Required]
        public string last_name { get; set; }

        [Required]
        public int age { get; set; }

        [Required]
        public string email { get; set; }

        [Required]
        public string sex { get; set; }

        [Required]
        public string password { get; set; }

        [Required]
        public string designation { get; set; }

        [Required]
        public string department { get; set; }

        [Required]
        public string address { get; set; }

        [Required]
        public string phone { get; set; }

        [Required]
        public string birth_date { get; set; }

        [Required]
        public string blood_group { get; set; }

        [Required]
        public string status { get; set; }



    }
}
