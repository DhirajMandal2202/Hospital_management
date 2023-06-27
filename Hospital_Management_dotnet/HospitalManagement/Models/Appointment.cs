using System.ComponentModel.DataAnnotations;

namespace HospitalManagement.Models
{
    public class Appointment
    {
        [Key]
        public int id { get; set; }
        [Required]

        public int patient_id { get; set; }
        [Required]

        public string date { get; set; }
        [Required]

        public int department_id { get; set; }
        [Required]

        public int doctor_id { get; set; }
        [Required]

        public string shift { get; set; }
        [Required]

        public string priority { get; set; }

        public string status { get; set; }

    }

}
