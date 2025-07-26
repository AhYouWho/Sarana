public class UploadFileService
{
    public string UploadSingleFile(IFormFile file)
    {
        // 1. Define folder
        string uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "Images");

        // 2. Create the folder if it doesn't exist
        if (!Directory.Exists(uploadFolder))
        {
            Directory.CreateDirectory(uploadFolder);
        }

        // 3. Create a clean, unique filename
        string uniqueFileName = Path.GetFileNameWithoutExtension(file.FileName)
                              + DateTime.Now.ToString("_yyyy_MM_dd_HH_mm_ss")
                              + Path.GetExtension(file.FileName);

        // 4. Combine final path
        string filePath = Path.Combine(uploadFolder, uniqueFileName);

        // 5. Save the file
        using (var fileStream = new FileStream(filePath, FileMode.Create))
        {
            file.CopyTo(fileStream);
        }

        // 6. Return relative path or name
        return uniqueFileName; // Or return Path.Combine("Images", uniqueFileName) if needed
    }
}
