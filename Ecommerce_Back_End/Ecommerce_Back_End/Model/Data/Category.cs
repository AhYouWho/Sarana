using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ecommerce_Back_End.Model.Data
{
    [Table("CATEGORY_TBL")]
    public class Category
    {
        [Key]
        
        public int CATEID { get; set;}
        public string CATENAME { get; set;}
        public string CATEDESC { get; set;}
        public int STATUS { get; set; }
        public DateTime? CREATEDATE { get; set; }
        public DateTime? MODIFIEDDATE { get; set; }
        public DateTime? DELETEDDATE { get; set; }
    }
}
