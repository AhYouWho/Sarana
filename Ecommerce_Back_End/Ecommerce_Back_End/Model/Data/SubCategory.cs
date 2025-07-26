using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ecommerce_Back_End.Model.Data
{
    [Table("SUBCATEGORY_TBL")]
    public class SubCategory
    {
        [Key]
        public int SUBCATEID { get; set; }
        public int CATEID { get; set; }
        public string SUBCATEGORY { get;set; }
        public string STATUS { get; set; }
    }
}
