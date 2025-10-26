using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
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
           try
            {
                var client = new HttpClient();
                var request = new HttpRequestMessage
                {
                    Method = HttpMethod.Post,
                    RequestUri = new Uri("https://api-bakong.nbc.gov.kh/v1/check_transaction_by_md5"),
                    Content = new StringContent(requestBody.ToString(), Encoding.UTF8, "application/json")
                };

                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiMDAzYWYxYzUwMzljNDk5YSJ9LCJpYXQiOjE3NjA4Njk0NDUsImV4cCI6MTc2ODY0NTQ0NX0.seBQ8umFiJJ7iFXa5fSzhOeMtlhEYLjZfbsqnDzL9bc");

                var response = await client.SendAsync(request);
                var content = await response.Content.ReadAsStringAsync();
                return Ok(new
                {
                    success = response.IsSuccessStatusCode,
                    status = (int)response.StatusCode,
                    data = TryParseJson(content)
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = ex.Message
                });
            }
        }
        private object TryParseJson(string content)
        {
            try
            {
                return JToken.Parse(content);
            }
            catch
            {
                return new { raw = content };
            }
        }

    }
}
