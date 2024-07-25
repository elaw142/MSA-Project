using backend.Models;
using System.Threading.Tasks;

namespace backend.Repositories.Abstract
{
    public interface IUserProfileRepository
    {
        Task<UserProfile> GetUserProfileAsync(int userId);
        Task AddUserProfileAsync(UserProfile userProfile);
        Task UpdateUserProfileAsync(UserProfile userProfile);
    }
}
