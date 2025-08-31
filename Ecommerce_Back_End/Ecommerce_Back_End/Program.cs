using Ecommerce_Back_End;
using Ecommerce_Back_End.Model.Helper;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Configure CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "MyPolicy",
        policy =>
        {
            // Allow requests from your Angular frontend's development server
            // Ensure this matches the origin of your Angular app exactly (protocol + hostname + port)
            policy.WithOrigins("http://152.42.222.151:4200")
 // Allows all headers from the client
                  .AllowAnyMethod()  // Allows all HTTP methods (GET, POST, PUT, DELETE, etc.)
                  .AllowCredentials() // Allows sending credentials like cookies or authorization headers
                        .WithHeaders("Content-Type", "Authorization");
        });
});

// Add services to the container.
builder.Services.AddDbContext<EcommerceDbContext>(); // Assuming this is your EF Core DbContext
builder.Services.AddControllers(); // Adds MVC controllers support
builder.Services.AddScoped<UploadFileService>(); // Adds as scoped (single instance per request)
builder.Services.AddScoped<JwtService>(); // Adds JWT service as scoped

// Configure form options for file uploads (e.g., max body length)
builder.Services.Configure<FormOptions>(o =>
{
    o.MultipartBodyLengthLimit = 104857600; // 100 MB limit for multipart body
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer(); // Required for Swagger/OpenAPI
builder.Services.AddSwaggerGen(); // Adds Swagger generation services


var app = builder.Build();

// ============ Configure Static Files for Images ============
// IMPORTANT: This path must match where your Dockerfile copies the images.
// Your Dockerfile copies them to /app/wwwroot/Images.
// app.Environment.WebRootPath typically points to the 'wwwroot' folder.
var imagesPath = Path.Combine(app.Environment.WebRootPath, "Images");

// Ensure the Images directory exists (useful for local dev outside Docker)
if (!Directory.Exists(imagesPath))
{
    Directory.CreateDirectory(imagesPath);
}

// Serve static files from the "Images" directory under the "/Images" request path
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(imagesPath),
    RequestPath = "/Images" // Clients can access images via http://localhost:5000/Images/yourimage.jpg
});

// If you have other static files in a 'wwwroot' folder (e.g., index.html, CSS, JS),
// you would typically have a simple app.UseStaticFiles(); here as well.
// app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // Enable Swagger UI only in development environment
    app.UseSwagger();
    app.UseSwaggerUI();
    // For local HTTP development, it's CRITICAL to disable HTTPS redirection.
    // If this is uncommented, your backend will try to redirect HTTP to HTTPS,
    // causing connection issues if you don't have proper SSL setup in Docker for dev.
    // app.UseHttpsRedirection(); // <--- KEEP THIS COMMENTED OUT FOR LOCAL HTTP DEV
}

// Global HTTPS redirection.
// If you are using HTTP for local dev, this MUST BE COMMENTED OUT.
// If enabled, it will redirect all HTTP requests to HTTPS, leading to errors
// if your Docker setup isn't configured for HTTPS with valid certificates.
// app.UseHttpsRedirection(); // <--- KEEP THIS COMMENTED OUT FOR LOCAL HTTP DEV

// --- CRITICAL MIDDLEWARE ORDERING ---
// 1. UseRouting() must come first to enable endpoint routing.
app.UseRouting();

// 2. UseCors() must come after UseRouting() and before UseAuthorization().
//    This is where the Access-Control-Allow-Origin header is added.
app.UseCors("MyPolicy");

// 3. UseAuthorization() comes after CORS (if you have authentication/authorization).
app.UseAuthorization();

// 4. MapControllers() maps the controller endpoints.
app.MapControllers();
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<EcommerceDbContext>();
    db.Database.Migrate();
}

app.Run();
