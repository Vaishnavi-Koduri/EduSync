using Azure.Messaging.EventHubs;
using Azure.Messaging.EventHubs.Producer;
using EduSync.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AssessmentsController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AssessmentsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("submit")]
        [Authorize]
        public async Task<IActionResult> SubmitQuiz([FromBody] QuizResultDto dto)
        {
            try
            {
                string connectionString = _configuration["EventHub:ConnectionString"];
                string eventHubName = "event1";

                await using var producerClient = new EventHubProducerClient(connectionString, eventHubName);

                using EventDataBatch eventBatch = await producerClient.CreateBatchAsync();
                string jsonPayload = JsonSerializer.Serialize(dto);
                if (!eventBatch.TryAdd(new EventData(jsonPayload)))
                {
                    return BadRequest("Payload too large for Event Hub batch.");
                }

                await producerClient.SendAsync(eventBatch);
                return Ok(new { message = "Quiz result sent to Event Hub." });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Event Hub error: {ex.Message}");
                return StatusCode(500, $"Failed to send data to Event Hub: {ex.Message}");
            }
        }
    }
}