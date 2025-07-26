using System.ComponentModel.DataAnnotations;

namespace Ecommerce_Back_End.Model.Request
{
    public class SubCategoryRequest
    {
        [Key]
        public int SUBCATEID { get; set; }
        public int CATEID { get; set; }
        public string SUBCATEGORY { get; set; }
        public string STATUS { get; set; }
    }
}
