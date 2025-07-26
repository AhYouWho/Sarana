using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Ecommerce_Back_End.Model.Data
{
    [Table("USER_TBL")]
    [Index(nameof(USERNAME), IsUnique = true)]
    public class User
    {
        [Key]
        public int USERID { get; set; }
        public string USERNAME { get; set; }
        public string EMAIL { get; set; }
        [JsonIgnore] public string PASSWORD { get; set; }
        public string GENDER { get; set; }
        public string DOB { get; set; }
        public string PHONE { get; set; }
        public string USERTYPE { get; set; }
        public DateTime? CREATEDATE { get; set; }
        public DateTime? MODIFIEDDATE { get; set; }
    }
}
