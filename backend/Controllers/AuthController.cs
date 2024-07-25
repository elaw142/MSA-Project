using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Models;
using backend.Repositories.Abstract;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;
        private readonly IConfiguration _configuration;
        private readonly IUserProfileRepository _userProfileRepository;

        public AuthController(
            IAuthRepository authRepository,
            IConfiguration configuration,
            IUserProfileRepository userProfileRepository
        )
        {
            _authRepository = authRepository;
            _configuration = configuration;
            _userProfileRepository = userProfileRepository;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterDto userRegisterDto)
        {
            userRegisterDto.Username = userRegisterDto.Username.ToLower();

            if (await _authRepository.UserExists(userRegisterDto.Username))
                return BadRequest("Username is already taken");

            var userToCreate = new User { Username = userRegisterDto.Username };

            var createdUser = await _authRepository.Register(
                userToCreate,
                userRegisterDto.Password
            );

            // Create user profile
            var userProfile = new UserProfile
            {
                UserId = createdUser.Id,
                FullName = "", // Default values, can be updated later
                Bio = "",
                ProfilePictureUrl = ""
            };

            await _userProfileRepository.AddUserProfileAsync(userProfile);

            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto userLoginDto)
        {
            var user = await _authRepository.Login(userLoginDto.Username, userLoginDto.Password);

            if (user == null)
                return Unauthorized();

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username)
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value)
            );
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(
                new
                {
                    token = tokenHandler.WriteToken(token),
                    userId = user.Id // Ensure userId is returned
                }
            );
        }
    }
}
