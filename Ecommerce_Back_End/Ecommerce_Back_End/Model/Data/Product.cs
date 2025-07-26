using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ecommerce_Back_End.Model.Data
{
    [Table("PRODUCT_TBL")]
    public class Product
    {
        [Key]
        public int PROID { get; set; }
        public string PRONAME { get; set; }
        public string PRODESC { get; set; }
        public decimal PRICE { get; set; }
        public int QTY { get; set; }
        public string IMAGE { get; set; }
        public int STATUS { get; set; }
        public int CATEID { get; set; }
        public int SUBCATEID { get; set; }
        public int PROSPECID { get; set; }
        public DateTime? CREATEDATE { get; set; }
        public DateTime? MODIFIEDDATE { get; set; }
        public DateTime? DELETEDDATE { get; set; }

    }
}
