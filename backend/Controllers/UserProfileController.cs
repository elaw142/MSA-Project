using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Repositories.Abstract;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly ILogger<UserProfileController> _logger;

        public UserProfileController(
            IUserProfileRepository userProfileRepository,
            ILogger<UserProfileController> logger
        )
        {
            _userProfileRepository = userProfileRepository;
            _logger = logger;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<UserProfile>> GetUserProfile(int userId)
        {
            var userProfile = await _userProfileRepository.GetUserProfileAsync(userId);
            if (userProfile == null)
            {
                return NotFound();
            }

            return Ok(userProfile);
        }

        [HttpPost]
        public async Task<ActionResult<UserProfile>> CreateUserProfile(UserProfile userProfile)
        {
            await _userProfileRepository.AddUserProfileAsync(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { userId = userProfile.UserId },
                userProfile
            );
        }

        [HttpPut("{userId}")]
        public async Task<IActionResult> UpdateUserProfile(int userId, UserProfile userProfile)
        {
            _logger.LogInformation(
                "Received update request for UserProfile: {@UserProfile}",
                userProfile
            );

            if (userId != userProfile.UserId)
            {
                return BadRequest();
            }

            // Ensure User is not required for update
            userProfile.User = null;

            await _userProfileRepository.UpdateUserProfileAsync(userProfile);
            return NoContent();
        }
    }
}
