using Ecommerce_Back_End.Model.Data;
using Ecommerce_Back_End.Model.Request;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Runtime.InteropServices;

namespace Ecommerce_Back_End.Controllers
{
    [Route("api/[controller]")]

    [ApiController]
    public class ProductSpecController : ControllerBase
    {
        private readonly EcommerceDbContext _context;
        public ProductSpecController(EcommerceDbContext context)
        {
            _context = context;
        }

        [HttpPost("/api/add-productspec")]
        public async Task<ActionResult> AddProductspec(
            [FromBody] ProductSpecificationRequest request)

        {
            try
            {

                var productExist = await _context.Product.Where(x => x.PROID == request.PROID).FirstOrDefaultAsync();
                if (productExist == null)
                {
                    return Ok(new
                    {
                        status = "Error",
                        message = "Product Not Found"

                    });
                }
                if (productExist.PROSPECID != 0)
                {
                    var productspecExist = await _context.ProductSpecifications.Where(x => x.PROSPECID == productExist.PROSPECID).FirstOrDefaultAsync();
                    if (productspecExist == null)
                    {
                        return Ok(new
                        {
                            status = "Error",
                            message = "Product Spec not found"

                        });
                    }
                   
                    _context.ProductSpecifications.Remove(productspecExist);
                    await _context.SaveChangesAsync();
                }

                var productspec = new ProductSpecification()
                {
                    PROSPECID = request.PROSPECID,
                    PROCESSOR = request.PROCESSOR,
                    MEMORY = request.MEMORY,
                    DISPLAY = request.DISPLAY,
                    STORAGE = request.STORAGE,
                    WIFI = request.WIFI,
                    VIDEOCARD = request.VIDEOCARD,
                    BATTERY = request.BATTERY,
                    WEIGHT = request.WEIGHT,
                    HEIGHT = request.HEIGHT,
                    WIDTH = request.WIDTH,
                    DEPTH = request.DEPTH,
                    CABLELENGTH = request.CABLELENGTH,
                    CONNECTIVITY = request.CONNECTIVITY,
                    SYSREQUIREMENT = request.SYSREQUIREMENT,
                    CHIPSET = request.CHIPSET,
                    ONBOARDGRAPHICS = request.ONBOARDGRAPHICS,
                    AUDIO = request.AUDIO,
                    LAN = request.LAN,
                    WIRELESSCONECT = request.WIRELESSCONECT,
                    EXPANSIONSLOT = request.EXPANSIONSLOT,
                    STORAGEINTERFACE = request.STORAGEINTERFACE,
                    USB = request.USB,
                    INTERNALIO = request.INTERNALIO,
                    BACKPANELCONNECTOR = request.BACKPANELCONNECTOR,
                    IOCONTROLLER = request.IOCONTROLLER,
                    BIOS = request.BIOS,
                    UNIQUEFEATURE = request.UNIQUEFEATURE,
                    OS = request.OS,
                    DPI = request.DPI,
                    REFRESH_RATE = request.REFRESH_RATE,
                    PANEL_TYPE = request.PANEL_TYPE,
                    RESOLUTION = request.RESOLUTION,
                    BRIGHTNESS = request.BRIGHTNESS,
                    WARRANTY = request.WARRANTY,
                    BARCODE = request.BARCODE,
              

                };
                await _context.ProductSpecifications.AddAsync(productspec);
                await _context.SaveChangesAsync();
                productExist.PROSPECID = productspec.PROSPECID;
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    status = "Succeed",
                    message = "Completed!",
                    productspec = productspec
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
        [HttpPost("/api/get-productspec")]
        public async Task<ActionResult> GetProductspec()
        {
            try
            {
                var productspec = await _context.ProductSpecifications.ToListAsync();
                return Ok(new
                {
                    status = "Succeed",
                    message = "done",
                    productspec = productspec
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

        [HttpGet("/api/get-productspec-by-id/{productspecId}")]
        public async Task<ActionResult> GetProductspecById(int productspecId)
        {
            try
            {
                var productspec = await _context.ProductSpecifications.Where(x => x.PROSPECID == productspecId).ToListAsync();
                return Ok(new
                {
                    status = "Succeed",
                    message = "done",
                    productspec = productspec
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

        [HttpPost("/api/edit-productspec")]
        public async Task<ActionResult> EditProductspec(
            [FromBody] ProductSpecification request)

        {
            try
            { 
                var productspecExist = await _context.ProductSpecifications.Where(x => x.PROSPECID == request.PROSPECID).FirstOrDefaultAsync();
                if (productspecExist == null)
                {
                    return Ok(new
                    {
                        status = "Error",
                        message = "Data not found"

                    });
                }
                _context.ChangeTracker.Clear();
                var productspec = new ProductSpecification()
                {
                    PROSPECID = request.PROSPECID,
                    PROCESSOR = request.PROCESSOR,
                    MEMORY = request.MEMORY,
                    DISPLAY = request.DISPLAY,
                    STORAGE = request.STORAGE,
                    WIFI = request.WIFI,
                    VIDEOCARD = request.VIDEOCARD,
                    BATTERY = request.BATTERY,
                    WEIGHT = request.WEIGHT,
                    HEIGHT = request.HEIGHT,
                    WIDTH = request.WIDTH,
                    DEPTH = request.DEPTH,
                    CABLELENGTH = request.CABLELENGTH,
                    CONNECTIVITY = request.CONNECTIVITY,
                    SYSREQUIREMENT = request.SYSREQUIREMENT,
                    CHIPSET = request.CHIPSET,
                    ONBOARDGRAPHICS = request.ONBOARDGRAPHICS,
                    AUDIO = request.AUDIO,
                    LAN = request.LAN,
                    WIRELESSCONECT = request.WIRELESSCONECT,
                    EXPANSIONSLOT = request.EXPANSIONSLOT,
                    STORAGEINTERFACE = request.STORAGEINTERFACE,
                    USB = request.USB,
                    INTERNALIO = request.INTERNALIO,
                    BACKPANELCONNECTOR = request.BACKPANELCONNECTOR,
                    IOCONTROLLER = request.IOCONTROLLER,
                    BIOS = request.BIOS,
                    UNIQUEFEATURE = request.UNIQUEFEATURE,
                    OS = request.OS,
                    DPI = request.DPI,
                    REFRESH_RATE = request.REFRESH_RATE,
                    PANEL_TYPE = request.PANEL_TYPE,
                    RESOLUTION = request.RESOLUTION,
                    BRIGHTNESS = request.BRIGHTNESS,
                    WARRANTY = request.WARRANTY,
                    BARCODE = request.BARCODE,
                };
                _context.ProductSpecifications.Update(productspec);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    status = "Succeed",
                    message = "Completed!",
                    productspec = productspec
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

        [HttpPost("/api/remove-productspec")]
        public async Task<ActionResult> RemoveProductspec(
           [FromBody] ProductSpecification request)

        {
            try
            {
                var productspecExist = await _context.ProductSpecifications.Where(x => x.PROSPECID == request.PROSPECID).FirstOrDefaultAsync();
                if (productspecExist == null)
                {
                    return Ok(new
                    {
                        status = "Error",
                        message = "Data not found"

                    });
                }
                _context.ChangeTracker.Clear();
                var productspec = new ProductSpecification()
                {
                    PROSPECID = request.PROSPECID,
                    PROCESSOR = request.PROCESSOR,
                    MEMORY = request.MEMORY,
                    DISPLAY = request.DISPLAY,
                    STORAGE = request.STORAGE,
                    WIFI = request.WIFI,
                    VIDEOCARD = request.VIDEOCARD,
                    BATTERY = request.BATTERY,
                    WEIGHT = request.WEIGHT,
                    HEIGHT = request.HEIGHT,
                    WIDTH = request.WIDTH,
                    DEPTH = request.DEPTH,
                    CABLELENGTH = request.CABLELENGTH,
                    CONNECTIVITY = request.CONNECTIVITY,
                    SYSREQUIREMENT = request.SYSREQUIREMENT,
                    CHIPSET = request.CHIPSET,
                    ONBOARDGRAPHICS = request.ONBOARDGRAPHICS,
                    AUDIO = request.AUDIO,
                    LAN = request.LAN,
                    WIRELESSCONECT = request.WIRELESSCONECT,
                    EXPANSIONSLOT = request.EXPANSIONSLOT,
                    STORAGEINTERFACE = request.STORAGEINTERFACE,
                    USB = request.USB,
                    INTERNALIO = request.INTERNALIO,
                    BACKPANELCONNECTOR = request.BACKPANELCONNECTOR,
                    IOCONTROLLER = request.IOCONTROLLER,
                    BIOS = request.BIOS,
                    UNIQUEFEATURE = request.UNIQUEFEATURE,
                    OS = request.OS,
                    DPI = request.DPI,
                    REFRESH_RATE = request.REFRESH_RATE,
                    PANEL_TYPE = request.PANEL_TYPE,
                    RESOLUTION = request.RESOLUTION,
                    BRIGHTNESS = request.BRIGHTNESS,
                    WARRANTY = request.WARRANTY,
                    BARCODE = request.BARCODE,
                };

                _context.ProductSpecifications.Remove(productspec);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    status = "Succeed",
                    message = "Completed!",
                    productspec = productspec
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

