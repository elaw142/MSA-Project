using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using backend.Repositories.Abstract;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace backend.Repositories.Concrete
{
    public class UserProfileRepository : IUserProfileRepository
    {
        private readonly AppDbContext _context;

        public UserProfileRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<UserProfile> GetUserProfileAsync(int userId)
        {
            return await _context.UserProfiles.FirstOrDefaultAsync(up => up.UserId == userId);
        }

        public async Task AddUserProfileAsync(UserProfile userProfile)
        {
            await _context.UserProfiles.AddAsync(userProfile);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateUserProfileAsync(UserProfile userProfile)
        {
            _context.UserProfiles.Update(userProfile);
            await _context.SaveChangesAsync();
        }
    }
}
