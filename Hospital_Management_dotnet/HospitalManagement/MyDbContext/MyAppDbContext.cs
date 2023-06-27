using HospitalManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace HospitalManagement.MyDbContext
{
    public class MyAppDbContext : DbContext
    {
        public MyAppDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<doctor> doctors { get; set; }
        public DbSet<credential> credentials_admin { get; set; }
        public DbSet<PatientDetails> patient_details { get; set; }
        public DbSet<PathologyTest> pathology_test { get; set; }
        public DbSet<PaymentMethod> payment_method { get; set; }
        public DbSet<PathologyBill> pathology_bill { get; set; }

        public DbSet<Appointment> appointment_list { get; set; }
        public DbSet<Signup> credential { get; set; }
        public DbSet<Department> department { get; set; }
        public DbSet<Medicines_List> medicines_list { get; set; }
        public DbSet<PharmacyBill> medicines_bill { get; set; }



    }
}
