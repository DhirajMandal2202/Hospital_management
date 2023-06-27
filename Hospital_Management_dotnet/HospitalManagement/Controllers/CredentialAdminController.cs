using HospitalManagement.Models;
using HospitalManagement.MyDbContext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace HospitalManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CredentialAdminController : ControllerBase
    {
        public readonly MyAppDbContext _context;
        public readonly IConfiguration _config;

        public CredentialAdminController(MyAppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [Authorize]
        [HttpPost]
        public Dictionary<string, string> Post(credential model)
        {
            Dictionary<string, string> result = new Dictionary<string, string>();

            try
            {
                _context.Add(model);
                _context.SaveChanges();
                result.Add("message", "Admin Added Successfully");
                result.Add("status", "1");

                return result;
            }
            catch (Exception e)
            {
                result.Add("error", e.Message);
                return result;

            }
        }

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            var credential = _context.credentials_admin.ToList();

            try
            {
                if (credential.Count == 0)
                {

                    return NotFound("Admin Record Not Available");
                }
                return Ok(credential);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);

            }
        }


        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] adminLogin adminObj)
        {
            if (adminObj == null)
            {
                //400 status
                return BadRequest(new { message = "Empty Field !!" });

            }

            var admin = await _context.credentials_admin.FirstOrDefaultAsync(x => x.email == adminObj.email && x.password == adminObj.password);
            if (admin == null)
            {
                return NotFound(new { message = "Invalid Credential!!" });
            }

            string GeneratedToken = CreateJwt(admin);

            return Ok(new
            {
                message = "Login Success !!",
                status = 1,
                token = GeneratedToken

            });
        }





        //Jwt token
        private string CreateJwt(credential admin)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            //Created the Key
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Key"]));

            //Created the Signature with key and algorithm
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);


            //PayLoad Data
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name,admin.name),
                new Claim(ClaimTypes.Surname,admin.surname)
            });

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }


    }
}
