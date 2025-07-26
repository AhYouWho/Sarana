using Ecommerce_Back_End.Model.Data;
using Ecommerce_Back_End.Model.Helper;
using Ecommerce_Back_End.Model.Request;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce_Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly EcommerceDbContext _context;
        private readonly UploadFileService _file;
        private readonly IWebHostEnvironment _env;
        public ProductController(EcommerceDbContext context,UploadFileService file, IWebHostEnvironment env)
        {
            _context = context;
            _file = file;
            _env = env;
        }
         
        [HttpPost("/api/add-image")]
        public async Task<IActionResult> AddImage
            ([FromForm] FileUpload req)

        {

            try
            {
                var productExist = await _context.Product.FirstOrDefaultAsync(x => x.PROID == req.ID_To_Upload);
                if (productExist == null)
                {
                    return Ok(new { status = "Error", message = "Product not found" });
                }

                string newimage = productExist.IMAGE;

                if (req.File != null && req.File.Length > 0)
                {
                    // Remove old image
                    var oldImagePath = Path.Combine(_env.WebRootPath, "Images", productExist.IMAGE);
                    if (System.IO.File.Exists(oldImagePath))
                        System.IO.File.Delete(oldImagePath);

                    // Save new image
                    var uploadsFolder = Path.Combine(_env.WebRootPath, "Images");
                    Directory.CreateDirectory(uploadsFolder);

                    var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(req.File.FileName);
                    var newFilePath = Path.Combine(uploadsFolder, uniqueFileName);

                    using (var stream = new FileStream(newFilePath, FileMode.Create))
                    {
                        await req.File.CopyToAsync(stream);
                    }

                    newimage = uniqueFileName;
                }
                else
                {
                    return Ok(new { status = "Error", message = "No file provided" });
                }

                // Update product
                productExist.IMAGE = newimage;
                productExist.MODIFIEDDATE = DateTime.Now;

                _context.Product.Update(productExist);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Upload successful",
                    status = "Succeed",
                    filename = newimage,
                    filepath = $"Images/{newimage}"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { status = "Error", message = ex.Message });
            }

        }
            [HttpPost("/api/add-product")]
        public async Task<IActionResult> AddProduct
            ([FromForm] ProductRequest request)

        {
            try
            {
                var product = new Product()
                {
                    PROID = request.PROID,
                    PRONAME = request.PRONAME,
                    PRODESC = request.PRODESC,
                    PRICE = request.PRICE,
                    QTY = request.QTY,
                    IMAGE = "No Image",
                    STATUS = 1,
                    CATEID = request.CATEID,
                    SUBCATEID = request.SUBCATEID,
                    PROSPECID = request.PROSPECID,
                    CREATEDATE = DateTime.Now,
                    MODIFIEDDATE = DateTime.Now,
                    DELETEDDATE = null
                };
                await _context.Product.AddAsync(product);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    status = "Succeed",
                    message = "Completed!",
                    product = product
                });
            }
            catch (Exception ex)
            {
                return Ok(new
                {
                    status = "Error",
                    message = ex.Message


                });
            }
        }
        [HttpPost("/api/get-product")]
        public async Task<ActionResult> GetProduct()
        {
            try
            {
                var product = await _context.Product.ToListAsync();
                return Ok(new
                {
                    status = "Succeed",
                    message = "done",
                    product = product
                });
            } 
            catch (Exception)
            {
                return Ok(new
                {
                    status = "Error",
                    message = "Something went wrong"
                });
            }
        }

        [HttpGet("/api/get-product-by-id/{productId}")]
        public async Task<ActionResult> GetProductById(int productId)
        {
            try
            {
                var product = await _context.Product.Where(x => x.PROID == productId).ToListAsync();
                return Ok(new
                {
                    status = "Succeed",
                    message = "done",
                    product = product
                });
            }
            catch (Exception)
            {
                return Ok(new
                {
                    status = "Error",
                    message = "Something went wrong"
                });
            }
        }

        [HttpPost("/api/edit-product")]
        public async Task<ActionResult> EditProduct(
            [FromForm] ProductRequest request)

        {
            try
            {
                

                var productExist = await _context.Product.Where(x => x.PROID == request.PROID).FirstOrDefaultAsync();
                if (productExist == null)
                {
                    return Ok(new
                    {
                        status = "Error",
                        message = "Data not found"

                    });
                }
                _context.ChangeTracker.Clear();               
                var product = new Product()
                {
                    PROID = request.PROID,
                    PRONAME = request.PRONAME,
                    PRODESC = request.PRODESC,
                    PRICE = request.PRICE,
                    QTY = request.QTY,
                    IMAGE = request.IMAGE,
                    STATUS = productExist.STATUS,
                    CATEID = request.CATEID,
                    PROSPECID = request.PROSPECID,
                    SUBCATEID = request.SUBCATEID,
                    CREATEDATE = productExist.CREATEDATE,
                    MODIFIEDDATE = DateTime.Now,
                    DELETEDDATE = null
                };
                _context.Product.Update(product);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    status = "Succeed",
                    message = "Completed!",
                    product = product
                });
            }
            catch (Exception)
            {
                return Ok(new
                {
                    status = "Error",
                    message = "Not Done!"

                });
            }
        }

        [HttpPost("/api/remove-product")]
        public async Task<ActionResult> RemoveProduct(
           [FromBody] ProductRequest request)

        {
            try
            {
                var productExist = await _context.Product.Where(x => x.PROID == request.PROID).FirstOrDefaultAsync();
                if (productExist == null)
                {
                    return Ok(new
                    {
                        status = "Error",
                        message = "Data not found"

                    });
                }
                _context.ChangeTracker.Clear();
                var product = new Product()
                {
                    PROID = request.PROID,
                    PRONAME = request.PRONAME,
                    PRODESC = request.PRODESC,
                    PRICE = request.PRICE,
                    QTY = request.QTY,
                    IMAGE = productExist.IMAGE,
                    STATUS = 0,
                    CATEID = request.CATEID,
                    SUBCATEID = request.SUBCATEID,
                    PROSPECID = request.PROSPECID,
                    CREATEDATE = productExist.CREATEDATE,
                    MODIFIEDDATE = productExist.MODIFIEDDATE,
                    DELETEDDATE = DateTime.Now
                };
                var filePathtoDeleted = Path.Combine(_env.WebRootPath, "Images", productExist.IMAGE);
                if (System.IO.File.Exists(filePathtoDeleted))
                    System.IO.File.Delete(filePathtoDeleted);
                _context.Product.Remove(product);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    status = "Succeed",
                    message = "Completed!",
                    product = product
                });
            }
            catch (Exception)
            {
                return Ok(new
                {
                    status = "Error",
                    message = "Not Done!"

                });
            }

        }
    }
}
