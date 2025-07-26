using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ecommerce_Back_End.Model.Data
{
    [Table("ORDER_TBL")]
    public class Order
    {
        [Key]
        public int ORDERID { get; set; }
        public int USERID { get; set; }
        public int PROID { get; set; }
        public int QTY { get; set; }
        public float PRICE { get; set; }
        public float TOTAL { get; set; }
        public string ORDERNUMBER { get; set; }
        public string STATUS { get; set; }
        public string ADDRESSLINE { get; set; }
        public string CITY { get; set; }
        public string COUNTRY { get; set; }
        public string ZIPCODE { get; set; }
        public DateTime CREATEDATE { get; set; }
        public DateTime MODIFIEDDATE { get; set; }
    }
}
