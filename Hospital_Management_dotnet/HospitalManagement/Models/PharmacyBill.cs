using System.ComponentModel.DataAnnotations;

namespace HospitalManagement.Models
{
    public class PharmacyBill
    {
        [Key]
        public int id { get; set; }

        [Required]
        public int patient_id { get; set; }

        [Required]
        public int doctor_id { get; set; }
        [Required]
        public int medicine_id { get; set; }

        [Required]
        public string date { get; set; }

        [Required]
        public int quantity { get; set; }

        [Required]
        public int payment_id { get; set; }

        [Required]
        public int total_amount { get; set; }

        [Required]
        public string status { get; set; }
    }
}
