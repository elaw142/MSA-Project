using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class UserProfile
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        public string FullName { get; set; }
        public string Bio { get; set; }
        public string ProfilePictureUrl { get; set; }

        // Make User nullable
        public User? User { get; set; }
    }
}
