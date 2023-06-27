using HospitalManagement.Models;
using HospitalManagement.MyDbContext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace HospitalManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        public readonly MyAppDbContext _context;

        public PatientController(MyAppDbContext context)
        {
            _context = context;

        }

        [Authorize]
        [HttpGet("patientList")]
        public IActionResult Get()
        {


            try
            {
                var details = _context.credential.Where(e => e.verify == "2").ToList();
                if (details.Count == 0)
                {

                    return NotFound("Patient Record Not Available");
                }
                return Ok(details);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);

            }
        }

        [Authorize]
        [HttpPost("addAppointment")]
        public IActionResult appointment(Appointment data)
        {
            try
            {
                if (data == null)
                {
                    return BadRequest(new { message = "Empty Field !!" });
                }

                _context.Add(data);
                _context.SaveChanges();

                return Ok(new { message = "Successfully Added !!", status = 1 });
            }
            catch (Exception e)
            {

                return BadRequest(new { error = e.Message });
            }
        }

        [Authorize]
        [HttpGet("appointmentList")]
        public IActionResult appointmentList()
        {
            //var list = _context.appointment_list.ToList();

            var list = (
                from appointment in _context.appointment_list
                join doctor in _context.doctors on appointment.doctor_id equals doctor.id
                join department in _context.department on appointment.department_id equals department.id
                select new
                {
                    appointmentList = appointment,
                    doctor_name = doctor.first_name + doctor.last_name,
                    departmentList = department.department

                }
                ).ToList();



            if (list == null)
            {
                return BadRequest(new { message = "Empty Record" });
            }

            return Ok(list);
        }


        [Authorize]
        [HttpPost("patientAppointmentList")]
        public IActionResult appointmentListById([FromBody] Id id)

        {
            //var list = _context.appointment_list.ToList();

            var patient_id = id.id;



            var list = (
                from appointment in _context.appointment_list
                join doctor in _context.doctors on appointment.doctor_id equals doctor.id
                join department in _context.department on appointment.department_id equals department.id
                where appointment.patient_id == patient_id
                select new
                {
                    appointmentList = appointment,
                    doctor_name = doctor.first_name + doctor.last_name,
                    departmentList = department.department

                }
                ).ToList();



            if (list == null)
            {
                return BadRequest(new { message = "Empty Record" });
            }

            return Ok(list);
        }


        [Authorize]
        [HttpGet("patientId")]
        public IActionResult getId(string mail)
        {

            try
            {
                if (mail == null)
                {
                    return BadRequest(new { error = "Empty Record" });
                }


                var Patient_email = mail;

                var details = _context.credential.Where(e => e.mail_id == Patient_email).ToList();

                return Ok(details);
            }
            catch (Exception e)
            {

                return BadRequest(new { error = e.Message });
            }
        }

        [Authorize]
        [HttpGet("fetchPatientList")]
        public IActionResult patientList()
        {
            var list = _context.credential.Where(e => e.verify == "2").ToList();

            if (list == null)
            {
                return BadRequest(new { error = "Empty Record !!" });

            }

            return Ok(list);
        }

        [AllowAnonymous]
        [HttpPost("signup")]
        public IActionResult signup(Signup data)
        {
            if (data == null)
            {
                return BadRequest(new { error = "Empty Record !!" });
            }

            _context.credential.Add(data);
            _context.SaveChanges();
            return Ok(new { message = "Signed Up Successfully", status = 1 });

        }


    }
}
