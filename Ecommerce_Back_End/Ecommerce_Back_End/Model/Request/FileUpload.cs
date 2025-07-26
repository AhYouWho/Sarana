namespace Ecommerce_Back_End.Model.Request
{
    public class FileUpload
    {
        public IFormFile File { get; set; }
        public int ID_To_Upload { get; set; }
    }
}
