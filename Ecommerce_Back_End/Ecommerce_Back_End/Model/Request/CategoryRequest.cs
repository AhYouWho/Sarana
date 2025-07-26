using System.ComponentModel.DataAnnotations;

namespace Ecommerce_Back_End.Model.Request
{
    public class CategoryRequest
    {
        [Key]
        public int CATEID { get; set; }
        public string CATENAME { get; set; }
        public string CATEDESC { get; set; }
        public int STATUS { get; set; }
    }
}
