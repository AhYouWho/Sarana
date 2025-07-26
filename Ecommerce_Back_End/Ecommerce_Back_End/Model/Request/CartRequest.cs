using Ecommerce_Back_End.Model.Data;
using System.ComponentModel.DataAnnotations;

namespace Ecommerce_Back_End.Model.Request
{
    public class CartRequest
    {
        [Key]
        public int CARTID { get; set; }
        public int PROID { get; set; }
        public int USERID { get; set; }
        public int QTY { get; set; }
   
    }
}
