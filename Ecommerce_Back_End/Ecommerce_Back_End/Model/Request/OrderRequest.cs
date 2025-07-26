using System.ComponentModel.DataAnnotations;

namespace Ecommerce_Back_End.Model.Request
{
    public class OrderRequest
    {
        [Key]
        public int ORDERID { get; set; }
        public int USERID { get; set; }
        public string STATUS { get; set; }
        public string ADDRESSLINE { get; set; }
        public string CITY { get; set; }
        public string COUNTRY { get; set; }
        public string ZIPCODE { get; set; }
    }
}
