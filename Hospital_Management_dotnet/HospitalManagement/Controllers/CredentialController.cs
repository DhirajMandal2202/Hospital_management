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
    public class CredentialController : ControllerBase
    {
        public readonly MyAppDbContext _context;
        public readonly IConfiguration _config;

        public CredentialController(MyAppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] LoginDetails adminObj)
        {
            if (adminObj == null)
            {
                //400 status
                return BadRequest(new { message = "Empty Field !!" });
            }

            var cred = await _context.credential.FirstOrDefaultAsync(x => x.mail_id == adminObj.email && x.password == adminObj.password);
            if (cred == null)
            {
                return NotFound(new { message = "Invalid Credential!!" });
            }

            string GeneratedToken = CreateJwt(cred);

            return Ok(new
            {
                message = "Login Success !!",
                status = 1,
                token = GeneratedToken,
                verify = cred.verify,
                email = cred.mail_id

            });
        }

        //Jwt token
        private string CreateJwt(Signup cred)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            //Created the Key
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Key"]));

            //Created the Signature with key and algorithm
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);


            //PayLoad Data
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name,cred.full_name),
                new Claim(ClaimTypes.Surname,cred.mail_id)
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
