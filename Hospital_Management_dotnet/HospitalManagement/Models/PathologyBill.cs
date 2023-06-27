using System.ComponentModel.DataAnnotations;

namespace HospitalManagement.Models
{
    public class PathologyBill
    {
        [Key]
        public int id { get; set; }

        [Required]
        public int patient_id { get; set; }

        [Required]
        public int test_id { get; set; }

        [Required]
        public int doctor_id { get; set; }

        [Required]
        public string date { get; set; }

        [Required]
        public int payment_id { get; set; }

        [Required]
        public string amount { get; set; }
    }
}
