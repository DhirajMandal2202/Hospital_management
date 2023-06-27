using System.ComponentModel.DataAnnotations;

namespace HospitalManagement.Models
{
    public class PathologyTest
    {
        [Key]
        public int id { get; set; }

        [Required]
        public string test_name { get; set; }

        [Required]
        public string amount { get; set; }

        [Required]
        public string status { get; set; }

    }
}
