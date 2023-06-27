
using HospitalManagement.Models;
using HospitalManagement.MyDbContext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospitalManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PathologyController : ControllerBase
    {
        public readonly MyAppDbContext _context;

        public PathologyController(MyAppDbContext context)
        {
            _context = context;
        }


        [Authorize]
        [HttpGet("pathologyTest")]
        public IActionResult get()
        {
            try
            {
                var result = _context.pathology_test.ToList();
                if (result.Count > 0)
                {
                    return Ok(result);
                }
                return NotFound(
                    new { message = "Empty Record" }
                    );
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [Authorize]
        [HttpGet("getAmount/{id}")]
        public ActionResult Get(int id)
        {
            try
            {
                var amount = _context.pathology_test.Find(id);
                if (amount == null)
                {
                    return NotFound($"Amount Details not found for id = {id}");
                }
                return Ok(amount);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [Authorize]
        [HttpPost("pathologyBill")]
        public IActionResult post(PathologyBill bill)
        {
            try
            {
                if (bill == null)
                {
                    return NotFound(new { error = "Empty Record !!" });
                }

                _context.Add(bill);
                _context.SaveChanges();

                return Ok(new { message = "Successfully Added!!", status = 1 });
            }
            catch (Exception e)
            {

                return BadRequest(new { error = e.Message });
            }
        }

        [Authorize]
        [HttpGet("billList")]
        public IActionResult GetBillList()
        {
            try
            {
                var pathologyBillListData = (from b in _context.pathology_bill
                                             join t in _context.pathology_test on b.test_id equals t.id
                                             join d in _context.doctors on b.doctor_id equals d.id
                                             join p in _context.credential on b.patient_id equals p.id
                                             join pm in _context.payment_method on b.payment_id equals pm.id
                                             where p.verify == "2"
                                             select new
                                             {
                                                 test_name = t.test_name,
                                                 patient_id = b.patient_id,
                                                 patient_name = p.full_name,
                                                 doctor_name = d.first_name + " " + d.last_name,
                                                 patient_email = p.mail_id,
                                                 patient_contact_no = p.phone_no,
                                                 patient_address = p.address,
                                                 payment_method = pm.payment_method,
                                                 date = b.date,
                                                 amount = b.amount
                                                 //contact_no = p.contact_no,


                                             }).ToList();
                return Ok(pathologyBillListData);
            }
            catch (Exception e)
            {

                return BadRequest(new { error = e.Message });
            }


        }

        [Authorize]
        [HttpPost("addTest")]
        public IActionResult postTest([FromBody] PathologyTest test)
        {
            try
            {
                if (test == null)
                {
                    return BadRequest(new { message = "Empty Record !!" });
                }

                _context.Add(test);
                _context.SaveChanges();

                return Ok(new { message = "Added Successfully !!", status = 1 });
            }
            catch (Exception e)
            {

                return BadRequest(new { error = e.Message });
            }

        }

    }
}
