using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using backend.Data;
using backend.Repositories.Abstract;
using backend.Repositories.Concrete;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add DbContext with SQL Server
builder.Services.AddDbContext<AppDbContext>(
    options => options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// Register the repositories
builder.Services.AddScoped<IRecipeRepository, RecipeRepository>();
builder.Services.AddScoped<IReviewRepository, ReviewRepository>(); // Register the ReviewRepository
builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<IUserProfileRepository, UserProfileRepository>();

// Add JWT Authentication
var key = Encoding.UTF8.GetBytes(builder.Configuration["AppSettings:Token"]);
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
            .WithOrigins(
                "https://msabackendwebapp-b7b6bqfda6fbhafk.australiasoutheast-01.azurewebsites.net/"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors();

app.MapControllers();

app.Run();
