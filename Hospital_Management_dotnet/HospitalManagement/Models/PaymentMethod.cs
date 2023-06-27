using System.ComponentModel.DataAnnotations;

namespace HospitalManagement.Models
{
    public class PaymentMethod
    {

        [Key]
        public int id { get; set; }

        [Required]
        public string payment_method { get; set; }

        [Required]
        public string status { get; set; }
    }
}
