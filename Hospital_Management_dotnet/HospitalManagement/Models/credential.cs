using System.ComponentModel.DataAnnotations;

namespace HospitalManagement.Models
{
    public class credential
    {
        [Key]
        public int id { get; set; }

        [Required]
        public string name { get; set; }

        [Required]
        public string surname { get; set; }

        [Required]
        public string password { get; set; }


        [Required]
        public string email { get; set; }


        [Required]
        public string contact_no { get; set; }

        [Required]
        public string status { get; set; }





    }
}
