using System.ComponentModel.DataAnnotations;

namespace Ecommerce_Back_End.Model.Request
{
    public class UserRequest
    {
        [Key]
        public int USERID { get; set; }
        public string USERNAME { get; set; }
        public string EMAIL { get; set; }
        public string PASSWORD { get; set; }
        public string GENDER { get; set; }
        public string DOB { get; set; }
        public string PHONE { get; set; }
        public string USERTYPE { get; set; }
    }
}
