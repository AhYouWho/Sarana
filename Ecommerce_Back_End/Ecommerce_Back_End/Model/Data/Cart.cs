using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ecommerce_Back_End.Model.Data
{
    [Table("CART_TBL")]
    public class Cart
    {
        [Key]
        public int CARTID { get; set; }
        public int PROID { get; set; }
        public int USERID { get; set; }
        public int QTY { get; set; }
        public DateTime CREATEDATE { get; set; }
        public DateTime MODIFIEDDATE { get; set; }

    }
}
