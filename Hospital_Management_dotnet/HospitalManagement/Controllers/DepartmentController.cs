using HospitalManagement.Models;
using HospitalManagement.MyDbContext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HospitalManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {

        public readonly MyAppDbContext _context;
        public readonly IConfiguration _config;

        public DepartmentController(MyAppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [Authorize]
        [HttpPost("addDepartment")]
        public IActionResult post(Department data)
        {
            try
            {
                if (data == null)
                {
                    return BadRequest(new { error = "Empty Record!!" });
                }

                _context.department.Add(data);
                _context.SaveChanges();

                return Ok(new { message = "Added Successfully", status = 1 });
            }
            catch (Exception e)
            {

                return BadRequest(new { error = e.Message });
            }
        }


        [Authorize]
        [HttpGet("departmentList")]
        public IActionResult get()
        {
            try
            {
                var list = _context.department.ToList();
                if (list == null)
                {
                    return BadRequest(new { error = "Empty Record !!" });
                }

                return Ok(list);
            }
            catch (Exception e)
            {

                return BadRequest(new { error = e.Message });
            }
        }
    }
}
