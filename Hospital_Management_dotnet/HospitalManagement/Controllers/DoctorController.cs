using HospitalManagement.Models;
using HospitalManagement.MyDbContext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HospitalManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        public readonly MyAppDbContext _context;

        public DoctorController(MyAppDbContext context)
        {
            _context = context;
        }


        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var doctors = _context.doctors.ToList();

                if (doctors.Count == 0)
                {
                    return NotFound("Doctors Record Not available.");
                }
                return Ok(doctors);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var doctors = _context.doctors.Find(id);
                if (doctors == null)
                {
                    return NotFound($"Doctor Details not found with Id {id}");
                }

                return Ok(doctors);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [Authorize]
        [HttpPost("addDoctor")]
        public IActionResult Post(doctor model)
        {


            Signup credential = new Signup();

            credential.id = model.id;
            credential.full_name = model.first_name + " " + model.last_name;
            credential.mail_id = model.email;
            credential.birth_date = model.birth_date;
            credential.gender = model.sex;
            credential.phone_no = model.phone;
            credential.blood_group = model.blood_group;
            credential.password = model.password;
            credential.address = model.address;
            credential.verify = "3";
            credential.status = model.status;

            try
            {

                if (credential == null)
                {
                    return BadRequest(new { error = "Empty Field !!" });
                }

                _context.Add(model);
                _context.SaveChanges();
                _context.Add(credential);
                _context.SaveChanges();
                //result.Add("success", "Doctor Added Successfully");
                //result.Add("status", "1");
                return Ok(new { message = " Added Successfully !!", status = 1 });
            }
            catch (Exception e)
            {


                return BadRequest(new { error = e.Message });
            }
        }




        [Authorize]
        [HttpPut]
        public IActionResult Put(doctor model)
        {
            if (model == null || model.id == 0)
            {
                if (model == null)
                {
                    return BadRequest("Model data is Invalid");
                }
            }
            else if (model.id == 0)
            {
                return BadRequest($"Doctor Id {model.id} is invalid");
            }

            try
            {
                var doctors = _context.doctors.Find(model.id);
                if (doctors == null)
                {
                    return NotFound($"Doctor not found with {model.id}");
                }

                doctors.first_name = model.first_name;
                doctors.last_name = model.last_name;
                doctors.age = model.age;
                doctors.email = model.email;
                doctors.password = model.password;
                doctors.designation = model.designation;
                doctors.department = model.department;
                doctors.address = model.address;
                doctors.phone = model.phone;
                doctors.birth_date = model.birth_date;
                doctors.blood_group = model.blood_group;
                doctors.sex = model.sex;
                _context.SaveChanges();

                return Ok("Doctor Details Updated Successfully.");
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }

        }

        [Authorize]
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            try
            {
                var doctor = _context.doctors.Find(id);
                if (doctor == null)
                {
                    return NotFound($"Doctor not found with id {id}");

                }
                _context.doctors.Remove(doctor);
                _context.SaveChanges();
                return Ok("Doctor Details Deleted Successfully");
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }

        }

        [Authorize]
        [HttpPost("appointmentList")]
        public IActionResult appointmentList([FromBody] Email docEmail)
        {
            //return Ok(docEmail);

            var docEmail1 = docEmail.email;






            try
            {


                var details = _context.doctors.FirstOrDefault(d => d.email == docEmail1);

                var id = details.id;

                var appointmentDetails = _context.appointment_list.Where(d => d.doctor_id == id).ToList();

                if (appointmentDetails == null)
                {
                    return NotFound(new { message = "Empty Record" });
                }

                var list = (
                     from ap in _context.appointment_list
                     join c in _context.credential on ap.patient_id equals c.id
                     where ap.doctor_id == id
                     select new
                     {
                         patientName = c.full_name,
                         doctorAppointmentDetails = ap
                     }



                     );





                return Ok(list);
            }
            catch (Exception e)
            {

                return BadRequest(new { error = e.Message });
            }
        }

        [Authorize]
        [HttpPut("approveAppointment")]
        public IActionResult put([FromBody] Id id1)
        {

            try
            {
                if (id1 == null)
                {
                    return BadRequest(new { error = "Emplty Id" });
                }

                var id2 = id1.id;
                var status = "1";

                var details = _context.appointment_list.Find(id2);

                details.status = status;

                _context.SaveChanges();

                return Ok(new { message = "Approved Successfully !!", status = 1 });
            }
            catch (Exception e)
            {

                return BadRequest(new { error = e.Message });
            }
        }

        [Authorize]
        [HttpPut("rejectAppointment")]
        public IActionResult put1([FromBody] Id id1)
        {

            try
            {
                if (id1 == null)
                {
                    return BadRequest(new { error = "Emplty Id" });
                }

                var id2 = id1.id;
                var status = "-1";

                var details = _context.appointment_list.Find(id2);

                details.status = status;

                _context.SaveChanges();

                return Ok(new { message = "Approved Successfully !!", status = 1 });
            }
            catch (Exception e)
            {

                return BadRequest(new { error = e.Message });
            }
        }


    }
}
