using System.ComponentModel.DataAnnotations;

namespace Ecommerce_Back_End.Model.Request
{
    public class ProductRequest
    {
        [Key]
        public int PROID { get; set; }
        public string PRONAME { get; set; }
        public string PRODESC { get; set; }
        public decimal PRICE { get; set; }
        public int QTY { get; set; }
        public string IMAGE { get; set; }
        public int PROSPECID { get; set; }
        public int STATUS { get; set; }
        public int CATEID { get; set; }
        public int SUBCATEID { get; set; }
       
    }
}
