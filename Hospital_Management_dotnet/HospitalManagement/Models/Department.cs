using System.ComponentModel.DataAnnotations;

namespace HospitalManagement.Models
{
    public class Department
    {
        [Key]
        public int id { get; set; }

        [Required]
        public string department { get; set; }

        [Required]
        public string status { get; set; }
    }
}
