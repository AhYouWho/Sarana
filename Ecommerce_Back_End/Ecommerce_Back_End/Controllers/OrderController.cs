using Ecommerce_Back_End.Model.Data;
using Ecommerce_Back_End.Model.Helper;
using Ecommerce_Back_End.Model.Request;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System.Linq;
using System.Reflection.Emit;

namespace Ecommerce_Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly EcommerceDbContext _context;
   
        public OrderController(EcommerceDbContext context)
        {
            _context = context;
        
        }
        
        [HttpPost("/api/add-order")]
        public async Task<ActionResult> AddOrder(
            [FromBody] OrderRequest request)

        {
            try {
              
                var existingOrder = await _context.Orders
                        .Where(o => o.USERID == request.USERID && o.STATUS == "Pending")
                        .ToListAsync();

                if (existingOrder.Any())
                {
                    foreach (var item in existingOrder)
                    {
                        item.ADDRESSLINE = request.ADDRESSLINE;
                        item.CITY = request.CITY;
                        item.COUNTRY = request.COUNTRY;
                        item.ZIPCODE = request.ZIPCODE;
                    }
                    await _context.SaveChangesAsync();
                    return Ok(new
                    {
                        status = "Warning",
                        message = "You already have a pending order. Complete payment before creating another.",
                        orders = existingOrder
                    });
                }

                var createdOrders = new List<Order>();
                var cartItems = (from c in _context.Cart
                     join p in _context.Product on c.PROID equals p.PROID
                     where c.USERID == request.USERID
                     select new
                     {
                         CartID = c.CARTID,
                         Product = p,
                         Qty = c.QTY
                     }).ToList();
                var year = DateTime.UtcNow.Year;
                var count = await _context.Orders.CountAsync(o => o.CREATEDATE.Year == year);
                // Generate padded order number
                var orderNumber = $"ORD{year}{(count + 1).ToString("D4")}";
                foreach (var item in cartItems)
                {
                    if (item.Product == null) continue; // skip if product not found

                    var order = new Order()
                    {
                        ORDERID = request.ORDERID,
                        USERID = request.USERID,
                        PROID = item.Product.PROID,
                        QTY = item.Qty,
                        PRICE = (float)item.Product.PRICE, // Assuming product has a PRICE field
                        TOTAL = item.Qty * (float) item.Product.PRICE,
                        ORDERNUMBER = orderNumber,
                        STATUS = request.STATUS,
                        ZIPCODE = request.ZIPCODE,
                        ADDRESSLINE = request.ADDRESSLINE,
                        CITY = request.CITY,
                        COUNTRY = request.COUNTRY,  
                        CREATEDATE = DateTime.Now,
                        MODIFIEDDATE = DateTime.Now,
                    };
                    
                    await _context.Orders.AddAsync(order);
                    createdOrders.Add(order);
                }
               
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    status = "Succeed",
                    message = "Completed!",
                    orders = createdOrders
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

        [HttpGet("/api/get-order-by-user/{userid}")]
        public async Task<ActionResult> GetOrderById(int userid)
        {
            try
            {
                var order = await _context.Orders.Where(x => x.USERID == userid).ToListAsync();
                return Ok(new
                {
                    status = "Succeed",
                    message = "done",
                    order = order
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
        [HttpPost("/api/confirmpayment/{ordernumber}")]
        public async Task<ActionResult> ConfirmPayment(string ordernumber)

        {
            try
            {
                var orderExist = await _context.Orders.Where(x => x.ORDERNUMBER == ordernumber).ToListAsync();
                if (orderExist == null)
                {
                    return Ok(new
                    {
                        status = "Error",
                        message = "Data not found"

                    });
                }

                foreach (var item in orderExist)
                {
                    var productExist = await _context.Product
                        .Where(x => x.PROID == item.PROID)
                        .FirstOrDefaultAsync();

                    if (productExist == null)
                    {
                        return Ok(new
                        {
                            status = "Error",
                            message = "Product not found"
                        });
                    }

                    if (productExist.QTY < item.QTY)
                    {
                        return Ok(new
                        {
                            status = "Error",
                            message = $"Not enough stock for product {productExist.PRONAME}"
                        });
                    }

                    // Directly update loaded entities
                    item.STATUS = "Paid";
                    item.MODIFIEDDATE = DateTime.Now;
                    productExist.QTY -= item.QTY;

                    var cart = await _context.Cart.FirstOrDefaultAsync(c =>
                     c.USERID == item.USERID && c.PROID == item.PROID);

                    if (cart != null)
                    {
                        _context.Cart.Remove(cart);
                    }
                }
                await _context.SaveChangesAsync();
                var orderUpdated = await _context.Orders.Where(x => x.ORDERNUMBER == ordernumber).ToListAsync();
                return Ok(new
                    {
                        status = "Succeed",
                        message = "Completed!",
                        order = orderUpdated
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
        [HttpPost("/api/get-order")]
        public async Task<ActionResult> GetOrder()
        {
            try
            {
                var order = await _context.Orders.ToListAsync();
                return Ok(new
                {
                    status = "Succeed",
                    message = "done",
                    order = order
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
    }
}
