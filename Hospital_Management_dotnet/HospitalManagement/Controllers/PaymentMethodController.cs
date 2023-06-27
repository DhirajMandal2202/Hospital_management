using HospitalManagement.MyDbContext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HospitalManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentMethodController : ControllerBase
    {
        public readonly MyAppDbContext _context;

        public PaymentMethodController(MyAppDbContext context)
        {
            _context = context;
        }


        [Authorize]
        [HttpGet("paymentList")]
        public ActionResult Get()
        {
            try
            {
                var list = _context.payment_method.ToList();
                if (list.Count != 0)
                {
                    return Ok(list);
                }

                return NotFound(new { message = "Emply Record" });
            }
            catch (Exception e)
            {

                return BadRequest(new { error = e.Message });
            }
        }


    }
}
