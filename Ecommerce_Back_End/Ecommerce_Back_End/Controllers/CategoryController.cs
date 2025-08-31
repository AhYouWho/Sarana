using Ecommerce_Back_End.Model.Data;
using Ecommerce_Back_End.Model.Request;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce_Back_End.Controllers
{
    [Route("api/[controller]")]

    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly EcommerceDbContext _context;
        public CategoryController(EcommerceDbContext context)
        {
            _context = context;
        }

        [HttpPost("/api/add-category")]
        public async Task<ActionResult> AddCategory(
            [FromBody] CategoryRequest request)

        {
            try
            {
                var category = new Category()
                {
                    CATEID = request.CATEID,
                    CATENAME = request.CATENAME,
                    CATEDESC = request.CATEDESC,
                    STATUS = 1,
                    CREATEDATE = DateTime.UtcNow,
                    MODIFIEDDATE = DateTime.UtcNow,
                    DELETEDDATE = null
                };
                await _context.categories.AddAsync(category);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    status = "Succeed",
                    message = "Completed!",
                    category = category
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
        [HttpPost("/api/get-category")]
        public async Task<ActionResult> GetCategory()
        {
            try
            {
                var category = await _context.categories.ToListAsync();
                return Ok(new
                {
                    status = "Succeed",
                    message = "done",
                    category = category
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

        [HttpGet("/api/get-category-by-id/{categoryId}")]
        public async Task<ActionResult> GetCategoryById(int categoryId)
        {
            try
            {
                var category = await _context.categories.Where(x => x.CATEID == categoryId).ToListAsync();
                return Ok(new
                {
                    status = "Succeed",
                    message = "done",
                    category = category
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

        [HttpPost("/api/edit-category")]
        public async Task<ActionResult> EditCategory(
            [FromBody] CategoryRequest request)

        {
            try
            {
                var categoryExist = await _context.categories.Where(x => x.CATEID == request.CATEID).FirstOrDefaultAsync();
                if (categoryExist == null)
                {
                    return Ok(new
                    {
                        status = "Error",
                        message = "Data not found"

                    });
                }
                _context.ChangeTracker.Clear();
                var category = new Category()
                {
                    CATEID = request.CATEID,
                    CATENAME = request.CATENAME,
                    CATEDESC = request.CATEDESC,
                    STATUS = categoryExist.STATUS,
                    CREATEDATE = categoryExist.CREATEDATE,
                    MODIFIEDDATE = DateTime.UtcNow,
                    DELETEDDATE = null
                };
                _context.categories.Update(category);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    status = "Succeed",
                    message = "Completed!",
                    category = category
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

        [HttpPost("/api/remove-category")]
        public async Task<ActionResult> RemoveCategory(
           [FromBody] CategoryRequest request)

        {
            try
            {
                var categoryExist = await _context.categories.Where(x => x.CATEID == request.CATEID).FirstOrDefaultAsync();
                if (categoryExist == null)
                {
                    return Ok(new
                    {
                        status = "Error",
                        message = "Data not found"

                    });
                }
                _context.ChangeTracker.Clear();
                var category = new Category()
                {
                    CATEID = request.CATEID,
                    CATENAME = request.CATENAME,
                    CATEDESC = request.CATEDESC,
                    STATUS = 0,
                    CREATEDATE = categoryExist.CREATEDATE,
                    MODIFIEDDATE = categoryExist.MODIFIEDDATE,
                    DELETEDDATE = DateTime.UtcNow
                };
                
                _context.categories.Remove(category);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    status = "Succeed",
                    message = "Completed!",
                    category = category
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
