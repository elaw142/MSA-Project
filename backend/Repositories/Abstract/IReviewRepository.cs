using backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Repositories.Abstract
{
    public interface IReviewRepository
    {
        Task<IEnumerable<Review>> GetReviewsByRecipeIdAsync(int recipeId);
        Task AddReviewAsync(Review review);
    }
}
