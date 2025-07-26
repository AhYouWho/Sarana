using System.ComponentModel.DataAnnotations;

namespace Ecommerce_Back_End.Model.Request
{
    public class WishlistRequest
    {
        [Key]
        public string WISHLISTID { get; set; }
        public string PROID { get; set; }
        public string USERID { get; set; }
        public DateTime CREATEDATE { get; set; }
        public DateTime MODIFIEDDATE { get; set; }
        public int STATUS { get; set; }
    }
}
