using Ecommerce_Back_End;
using Ecommerce_Back_End.Model.Helper;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "MyPolicy",
        policy =>
        {
            policy.WithOrigins(
                "http://localhost:4200")

                    .AllowAnyHeader()
                    .AllowAnyMethod()

                    .AllowCredentials();

        });
});
// Add services to the container.
builder.Services.AddDbContext<EcommerceDbContext>();
builder.Services.AddControllers();
builder.Services.AddTransient<UploadFileService>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<UploadFileService>();
builder.Services.AddScoped<JwtService>();
builder.Services.Configure<FormOptions>(o =>
{
    o.MultipartBodyLengthLimit = 104857600; // 100 MB
});

var app = builder.Build();
//============2 access file in browser


app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "Images")),
    RequestPath = "/Images"
});


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{   
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("MyPolicy");

app.UseAuthorization();

app.MapControllers();
app.UseStaticFiles();
app.Run();
