using Ecommerce_Back_End.Model.Data;
using Ecommerce_Back_End.Model.Request;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Newtonsoft.Json;

namespace Ecommerce_Back_End.Controllers
{
    [Route("api/[controller]")]

    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly EcommerceDbContext _context;
       
        public CartController(EcommerceDbContext context)
        {
            _context = context;
        }


        [HttpPost("/api/add-cart")]
        public async Task<ActionResult> AddCart(
            [FromBody] CartRequest request)

        {
            try
            {
                var productExist = await _context.Cart.Where(x => x.PROID == request.PROID).FirstOrDefaultAsync();

                if (productExist == null)
                {
                    var cart = new Cart()
                    {
                        CARTID = request.CARTID,
                        PROID = request.PROID,
                        USERID = request.USERID,
                        QTY = request.QTY,
                        CREATEDATE = DateTime.UtcNow,
                        MODIFIEDDATE = DateTime.UtcNow,

                    };
                    await _context.Cart.AddAsync(cart);
                    await _context.SaveChangesAsync();
                    return Ok(new
                    {
                        status = "Succeed",
                        message = "Product added to cart successfully!",
                        productExist = productExist
                    });
                    
                }
                else
                {
                    return Ok(new
                    {
                        status = "Error",
                        message = "Product Already Exist!"

                    });
                }
                
                
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

        [HttpGet("/api/get-cart-by-userid/{userId}")]
        public async Task<ActionResult> GetCartByUserId(int userId)
        {
            try
            {
                var cartitem = (from c in _context.Cart
                                where c.USERID == userId
                                select new
                                {
                                    CartID = c.CARTID,
                                    Product = _context.Product.Where(x => x.PROID == c.PROID).ToList(),
                                    //User = _context.Users.Where(x => x.USERID == c.USERID).ToList(),
                                    Qty = c.QTY,
                                }).ToList();
                return Ok(new
                {
                    status = "Succeed",
                    message = "Completed!",
                    cart = cartitem
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
        [HttpPost("/api/edit-cart")]
        public async Task<ActionResult> EditCart(
        [FromBody] CartRequest request)

        {
            try
            {
                var cartExist = await _context.Cart.Where(x => x.CARTID == request.CARTID).FirstOrDefaultAsync();
                if (cartExist == null)
                {
                    return Ok(new
                    {
                        status = "Error",
                        message = "Data not found"

                    });
                }
                _context.ChangeTracker.Clear();
                var cart = new Cart()
                {
                    CARTID = request.CARTID,
                    USERID = request.USERID,
                    PROID= request.PROID,
                    QTY = request.QTY,
                    MODIFIEDDATE = DateTime.UtcNow,
                };
                _context.Cart.Update(cart);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    status = "Succeed",
                    message = "Completed!",
                    cart = cart
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

        [HttpPost("/api/remove-cart")]
        public async Task<ActionResult> RemoveCart(
                   int cartId)

        {
            try
            {
                var cartExist = await _context.Cart.Where(x => x.CARTID == cartId).FirstOrDefaultAsync();
                if (cartExist == null)
                {
                    return Ok(new
                    {
                        status = "Error",
                        message = "Data not found"

                    });
                }
                _context.ChangeTracker.Clear();
               

                _context.Cart.Remove(cartExist);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    status = "Succeed",
                    message = "Product was remove from cart successfully!",
                    cart = cartExist
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
