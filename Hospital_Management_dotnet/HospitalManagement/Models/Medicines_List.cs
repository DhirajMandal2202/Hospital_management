using System.ComponentModel.DataAnnotations;

namespace HospitalManagement.Models
{
    public class Medicines_List
    {
        [Key]
        public int id { get; set; }


        [Required]
        public string med_name { get; set; }

        [Required]
        public int instock { get; set; }

        [Required]
        public int per_price { get; set; }

        [Required]

        public string status { get; set; }
    }
}
