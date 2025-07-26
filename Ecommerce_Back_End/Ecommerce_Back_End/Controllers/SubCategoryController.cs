using Ecommerce_Back_End.Model.Data;
using Ecommerce_Back_End.Model.Request;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce_Back_End.Controllers
{
    [Route("api/[controller]")]

    [ApiController]
    public class SubCategoryController : ControllerBase
    {
        private readonly EcommerceDbContext _context;
        public SubCategoryController(EcommerceDbContext context)
        {
            _context = context;
        }

        [HttpPost("/api/add-subcategory")]
        public async Task<ActionResult> AddSubCategory(
            [FromBody] SubCategoryRequest request)

        {
            try
            {
                var subcategory = new SubCategory()
                {
                    CATEID = request.CATEID,
                    SUBCATEGORY = request.SUBCATEGORY,
                    SUBCATEID = request.SUBCATEID,
                    STATUS = request.STATUS,
                };
                await _context.SubCategories.AddAsync(subcategory);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    status = "Succeed",
                    message = "Completed!",
                    subcategory = subcategory
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
        [HttpPost("/api/get-subcategory")]
        public async Task<ActionResult> GetSubCategory()
        {
            try
            {
                var subcategory = await _context.SubCategories.ToListAsync();
                return Ok(new
                {
                    status = "Succeed",
                    message = "done",
                    subcategory = subcategory
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

        [HttpGet("/api/get-subcategory-by-id/{subcategoryId}")]
        public async Task<ActionResult> GetSubCategoryById(int subcategoryId)
        {
            try
            {
                var subcategory = await _context.SubCategories.Where(x => x.SUBCATEID == subcategoryId).ToListAsync();
                return Ok(new
                {
                    status = "Succeed",
                    message = "done",
                    subcategory = subcategory
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

        [HttpPost("/api/edit-subcategory")]
        public async Task<ActionResult> EditSubCategory(
            [FromBody] SubCategoryRequest request)

        {
            try
            {
                var subcategoryExist = await _context.SubCategories.Where(x => x.SUBCATEID == request.SUBCATEID).FirstOrDefaultAsync();
                if (subcategoryExist == null)
                {
                    return Ok(new
                    {
                        status = "Error",
                        message = "Data not found"

                    });
                }
                _context.ChangeTracker.Clear();
                var subcategory = new SubCategory()
                {
                    CATEID = request.CATEID,
                    SUBCATEGORY = request.SUBCATEGORY,
                    SUBCATEID = request.SUBCATEID,
                    STATUS = request.STATUS,
                };
                _context.SubCategories.Update(subcategory);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    status = "Succeed",
                    message = "Completed!",
                    subcategory = subcategory
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

        [HttpPost("/api/remove-subcategory")]
        public async Task<ActionResult> RemoveSubCategory(
           [FromBody] SubCategoryRequest request)

        {
            try
            {
                var subcategoryExist = await _context.SubCategories.Where(x => x.SUBCATEID == request.SUBCATEID).FirstOrDefaultAsync();
                if (subcategoryExist == null)
                {
                    return Ok(new
                    {
                        status = "Error",
                        message = "Data not found"

                    });
                }
                _context.ChangeTracker.Clear();
                var subcategory = new SubCategory()
                {
                    CATEID = request.CATEID,
                    SUBCATEGORY = request.SUBCATEGORY,
                    SUBCATEID = request.SUBCATEID,
                    STATUS = request.STATUS,
                };

                _context.SubCategories.Remove(subcategory);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    status = "Succeed",
                    message = "Completed!",
                    subcategory = subcategory
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
