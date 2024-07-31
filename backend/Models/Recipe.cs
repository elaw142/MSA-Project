using System.Collections.Generic;

namespace backend.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Ingredients { get; set; }
        public string Instructions { get; set; }
        public string UserID { get; set; }
        public List<Review> Reviews { get; set; } = new List<Review>(); // List of reviews
    }
}
