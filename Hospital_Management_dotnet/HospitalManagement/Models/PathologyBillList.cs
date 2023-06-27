using System.ComponentModel.DataAnnotations;

namespace HospitalManagement.Models
{
    public class PathologyBillList
    {
        [Key]
        public int id { get; set; }

        public string patient_name { get; set; }


        public string email { get; set; }

        public string contact_no { get; set; }

        public string address { get; set; }

        public string test_name { get; set; }

        public string payment_method { get; set; }

        public string date { get; set; }

        public string amount { get; set; }



    }
}
