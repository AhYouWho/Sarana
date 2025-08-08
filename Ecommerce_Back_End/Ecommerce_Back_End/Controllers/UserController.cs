using Ecommerce_Back_End.Model.Data;
using Ecommerce_Back_End.Model.Dtos;
using Ecommerce_Back_End.Model.Helper;
using Ecommerce_Back_End.Model.Request;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce_Back_End.Controllers
{
    [Route("api/[controller]")]

    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly EcommerceDbContext _context;
        private readonly JwtService _jwtService;
        public UserController(EcommerceDbContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }
        [HttpPost("register")]
        public async Task<ActionResult> Register(UserRequest request)
        {
            try
            {
                var existingUser = await _context.Users
           .FirstOrDefaultAsync(u => u.USERNAME == request.USERNAME);

                if (existingUser != null)
                {
                    return BadRequest(new
                    {
                        status = "Error",
                        message = "Username already exists."
                    });
                }
                var user = new User
                {
                    USERID = request.USERID,
                    USERNAME = request.USERNAME,
                    PASSWORD = BCrypt.Net.BCrypt.HashPassword(request.PASSWORD),
                    EMAIL = request.EMAIL,
                    GENDER = request.GENDER,
                    DOB = request.DOB,
                    PHONE = request.PHONE,
                    USERTYPE = request.USERTYPE,
                    CREATEDATE = DateTime.Now,
                    MODIFIEDDATE = DateTime.Now,

                };

                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    status = "Succeed",
                    message = "Register Successful!",
                    user = user
                });
            }

            catch (Exception ex)
            {
                return Ok(new
                {
                    status = "Error",
                    message = ex.Message


                });
            }
            
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(UserDto request)
        {
            try
            {
                if (request == null || string.IsNullOrWhiteSpace(request.USERNAME) || string.IsNullOrWhiteSpace(request.PASSWORD))
                {
                    return BadRequest(new { message = "Invalid input data", status = "Error" });
                }

                var user = await _context.Users.FirstOrDefaultAsync(x => x.USERNAME == request.USERNAME);

                if (user == null)
                {
                    return BadRequest(new { message = "Invalid Credentials", status = "Error" });
                }

                if (!BCrypt.Net.BCrypt.Verify(request.PASSWORD, user.PASSWORD))
                {
                    return BadRequest(new { message = "Invalid Credentials", status = "Error" });
                }

                var jwt = _jwtService.Generate(user.USERID);

                Response.Cookies.Append("jwt", jwt, new CookieOptions
                {
                    HttpOnly = true
                });

                var token = _jwtService.Verify(jwt);
                int userId = int.Parse(token.Issuer);
                var userinfo = await _context.Users.FirstOrDefaultAsync(x => x.USERID == userId);

                return Ok(new
                {
                    status = "Succeed",
                    jwt = jwt,
                    message = "Login Successful!",
                    user = userinfo,
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    status = "Error",
                    message = "Internal Server Error",
                    detail = ex.Message // for debugging
                });
            }
        }


        [HttpGet("user")]
        public async Task<ActionResult> User()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwt);

                int userId = int.Parse(token.Issuer);

                var user = await _context.Users.FirstOrDefaultAsync(x => x.USERID == userId);

                return Ok(user);
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");

            return Ok(new
            {
                status = "Succeed"
            });
        }
        [HttpPost("/api/get-user")]
        public async Task<ActionResult> GetUser()
        {
            try
            {
                var user = await _context.Users.ToListAsync();
                return Ok(new
                {
                    status = "Succeed",
                    message = "done",
                    user = user
                });
            }
            catch (Exception)
            {
                return Ok(new
                {
                    status = "Error",
                    message = "Something went wrong"
                });
            }
        }

        [HttpGet("/api/get-user-by-id/{userId}")]
        public async Task<ActionResult> GetUserById(int userId)
        {
            try
            {
                var user = await _context.Users.Where(x => x.USERID == userId).ToListAsync();
                return Ok(new
                {
                    status = "Succeed",
                    message = "done",
                    user = user
                });
            }
            catch (Exception)
            {
                return Ok(new
                {
                    status = "Error",
                    message = "Something went wrong"
                });
            }
        }

        [HttpPost("/api/edit-user")]
        public async Task<ActionResult> EditUser(
            [FromBody] UserRequest request)

        {
            try
            {
                var userExist = await _context.Users.Where(x => x.USERID == request.USERID).FirstOrDefaultAsync();
                if (userExist == null)
                {
                    return Ok(new
                    {
                        status = "Error",
                        message = "Data not found"

                    });
                }
                _context.ChangeTracker.Clear();
                var user = new User()
                {
                    USERID = request.USERID,
                    USERNAME = request.USERNAME,
                    EMAIL = request.EMAIL,
                    PASSWORD = request.PASSWORD,
                    GENDER = request.GENDER,
                    DOB = request.DOB,
                    PHONE = request.PHONE,
                    USERTYPE = request.USERTYPE,
                    CREATEDATE = userExist.CREATEDATE,
                    MODIFIEDDATE = DateTime.Now,

                };
                _context.Users.Update(user);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    status = "Succeed",
                    message = "Completed!",
                    user = user
                });
            }
            catch (Exception)
            {
                return Ok(new
                {
                    status = "Error",
                    message = "Not Done!"

                });
            }
        }

        [HttpPost("/api/remove-user")]
        public async Task<ActionResult> RemoveUser(
           [FromBody] int user_id_req)

        {
            try
            {
                var userExist = await _context.Users.Where(x => x.USERID == user_id_req).FirstOrDefaultAsync();
                if (userExist == null)
                {
                    return Ok(new
                    {
                        status = "Error",
                        message = "Data not found"

                    });
                }
                _context.ChangeTracker.Clear();
                var user = new User()
                {
                    USERID = user_id_req,
                    USERNAME = userExist.USERNAME,
                    EMAIL = userExist.EMAIL,
                    PASSWORD = userExist.PASSWORD,
                    GENDER = userExist.GENDER,
                    DOB = userExist.DOB,
                    PHONE = userExist.PHONE,
                    USERTYPE = userExist.USERTYPE,
                    CREATEDATE = userExist.CREATEDATE,
                    MODIFIEDDATE = DateTime.Now,
                };

                _context.Users.Remove(user);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    status = "Succeed",
                    message = "Completed!",
                    user = user
                });
            }
            catch (Exception)
            {
                return Ok(new
                {
                    status = "Error",
                    message = "Not Done!"

                });
            }

        }
    }
}


