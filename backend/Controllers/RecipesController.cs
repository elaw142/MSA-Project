using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Repositories.Abstract;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly IRecipeRepository _recipeRepository;
        private readonly IReviewRepository _reviewRepository;

        public RecipesController(
            IRecipeRepository recipeRepository,
            IReviewRepository reviewRepository
        )
        {
            _recipeRepository = recipeRepository;
            _reviewRepository = reviewRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Recipe>>> GetRecipes([FromQuery] string? query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return Ok(await _recipeRepository.GetAllRecipesAsync());
            }

            var recipes = await _recipeRepository.SearchRecipesAsync(query);
            return Ok(recipes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Recipe>> GetRecipe(int id)
        {
            var recipe = await _recipeRepository.GetRecipeByIdAsync(id);
            if (recipe == null)
            {
                return NotFound();
            }
            return Ok(recipe);
        }

        [HttpPost]
        public async Task<ActionResult<Recipe>> PostRecipe(Recipe recipe)
        {
            await _recipeRepository.AddRecipeAsync(recipe);
            return CreatedAtAction(nameof(GetRecipe), new { id = recipe.Id }, recipe);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecipe(int id, Recipe recipe)
        {
            if (id != recipe.Id)
            {
                return BadRequest();
            }

            await _recipeRepository.UpdateRecipeAsync(recipe);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecipe(int id)
        {
            await _recipeRepository.DeleteRecipeAsync(id);
            return NoContent();
        }

        [HttpGet("{recipeId}/reviews")]
        public async Task<ActionResult<IEnumerable<Review>>> GetReviews(int recipeId)
        {
            var reviews = await _reviewRepository.GetReviewsByRecipeIdAsync(recipeId);
            return Ok(reviews);
        }

        [HttpPost("{recipeId}/reviews")]
        public async Task<ActionResult<Review>> PostReview(int recipeId, Review review)
        {
            review.RecipeId = recipeId;
            await _reviewRepository.AddReviewAsync(review);
            return CreatedAtAction(nameof(GetReviews), new { recipeId = recipeId }, review);
        }
    }
}
