using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text;

namespace Ecommerce_Back_End.Controllers
{
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        [HttpPost("bakong/transaction-status")]

        public async Task<IActionResult> CheckBakongTransaction([FromBody] object requestBody)
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri("https://api-bakong.nbc.gov.kh/v1/check_transaction_by_md5"),
                Content = new StringContent(requestBody.ToString(), Encoding.UTF8, "application/json")
            };

            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiMDAzYWYxYzUwMzljNDk5YSJ9LCJpYXQiOjE3NTM1OTgxNTUsImV4cCI6MTc2MTM3NDE1NX0.4x7U5TS9KHXbLSylTR4t9BzEpmppZkwCcFT1DJz3wnM");

            var response = await client.SendAsync(request);
            var content = await response.Content.ReadAsStringAsync();
            return Content(content, "application/json");
        }

    }
}
