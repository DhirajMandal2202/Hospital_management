using System.ComponentModel.DataAnnotations;

namespace HospitalManagement.Models
{
    public class PatientDetails
    {
        [Key]
        public int id { get; set; }

        [Required]
        public string firstname { get; set; }

        [Required]
        public string lastname { get; set; }

        [Required]
        public string email { get; set; }


        [Required]
        public string contact_no { get; set; }


        [Required]
        public string blood_group { get; set; }




        [Required]
        public string date_of_birth { get; set; }

        [Required]
        public string sex { get; set; }

        [Required]
        public string address { get; set; }

        [Required]
        public string password { get; set; }


    }
}

