using System.ComponentModel.DataAnnotations;

namespace HospitalManagement.Models
{
    public class Amount
    {
        [Required]
        public int id { get; set; }
        [Required]
        public int amount { get; set; }
    }
}
