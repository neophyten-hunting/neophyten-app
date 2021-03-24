using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Backend.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Backend
{
    /// <summary>
    /// This class exposes the http-endpoints to CRUD neophyten
    /// </summary>
    public class NephytenControllerFunctions
    {
        private readonly IConfigurationRoot config;

        public NephytenControllerFunctions(IConfigurationRoot config)
        {
            this.config = config;
        }

        [FunctionName("Neophyte_Get_V1")]
        public async Task<IActionResult> GetById(
           [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "v1/neophytes/{id}")] HttpRequestMessage req,
           [CosmosDB(
                databaseName: "%cosmosDBName%",
                collectionName: "%cosmosDBCollection%",
                ConnectionStringSetting = "cosmosDBConnection",
                Id = "{id}",
                PartitionKey ="{id}")] NeophyteLocation neophyteLocation,
           int id,
           ILogger log)
        {
            log.LogInformation($"Validate token");
            //if (await security.IsUserAuthorizedAsync(req.Headers.Authorization, new string[] { "Reader", "Admin" }) == false)
            //{
            //    return new UnauthorizedResult();
            //}

            log.LogInformation($"Get customer {id}");

            if (neophyteLocation == null)
            {
                return new NotFoundObjectResult($"{{ \"id\": {id} }}");
            }

            log.LogInformation($"Got customer {neophyteLocation.Id}");
            return new OkObjectResult(neophyteLocation);
        }

        [FunctionName("Neophyte_GetAll_V1")]
        public async Task<IActionResult> GetAll(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "v1/neophytes")] HttpRequestMessage req,
            [CosmosDB(
                databaseName: "%cosmosDBName%",
                collectionName: "%cosmosDBCollection%",
                ConnectionStringSetting = "cosmosDBConnection")]
            IEnumerable<NeophyteLocation> neophyteLocations,
            ILogger log)
        {
            log.LogInformation($"Validate token");
            //if (await security.IsUserAuthorizedAsync(req.Headers.Authorization, new string[] { "Reader", "Admin" }) == false)
            //{
            //    return new UnauthorizedResult();
            //}

            if (neophyteLocations == null)
            {
                return new NotFoundResult();
            }

            log.LogInformation($"Got customers {neophyteLocations.Count()}");
            return new OkObjectResult(neophyteLocations);
        }


        [FunctionName("Neophyte_Delete_V1")]
        public async Task<IActionResult> Delete(
            [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "v1/neophytes/{id}")] HttpRequestMessage req,
            [CosmosDB(
                databaseName: "%cosmosDBName%",
                collectionName: "%cosmosDBCollection%",
                ConnectionStringSetting = "cosmosDBConnection")] IDocumentClient client,
            string id,
            ILogger log)
        {
            log.LogInformation($"Validate token");
            //if (await security.IsUserAuthorizedAsync(req.Headers.Authorization, new string[] { "Admin" }) == false)
            //{
            //    return new UnauthorizedResult();
            //}

            log.LogInformation($"Delete customer {id}");

            string cosmosDbName = config["cosmosDBName"];
            string cosmosDbCollection = config["cosmosDBCollection"];
            Uri documentCollectionUri = UriFactory.CreateDocumentCollectionUri(cosmosDbName, cosmosDbCollection);

            Document neophyte = client.CreateDocumentQuery(documentCollectionUri)
                .Where(c => c.Id == id)
                .AsEnumerable()
                .SingleOrDefault();

            if (neophyte == null)
            {
                return new NotFoundResult();
            }

            try
            {
                var requestOptions = new RequestOptions { PartitionKey = new PartitionKey($"{id}") };
                await client.DeleteDocumentAsync(neophyte.SelfLink, requestOptions);

                log.LogInformation($"Deleted neophyte {neophyte.Id}");
                return new OkObjectResult(neophyte);
            }
            catch (Exception ex)
            {
                log.LogError(ex.ToString());
                return new ExceptionResult(ex, false);
            }
        }

        [FunctionName("Neophyte_Post_V1")]
        public async Task<IActionResult> Create(
           [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "v1/neophytes")] HttpRequestMessage req,
           [CosmosDB(
                databaseName: "%cosmosDBName%",
                collectionName: "%cosmosDBCollection%",
                ConnectionStringSetting = "cosmosDBConnection")] IAsyncCollector<NeophyteLocation> neophytes,
           ILogger log)
        {
            log.LogInformation($"Validate token");
            //if (await security.IsUserAuthorizedAsync(req.Headers.Authorization, new string[] { "Admin" }) == false)
            //{
            //    return new UnauthorizedResult();
            //}

            log.LogInformation("Add new neophytes");

            var requestBody = await req.Content.ReadAsStringAsync();
            if (string.IsNullOrEmpty(requestBody))
            {
                return new BadRequestObjectResult("body is null or empty. please provide a valid neophytes object to add.");
            }

            try
            {

                var newNeophyte = JsonConvert.DeserializeObject<NeophyteLocation>(requestBody);
                newNeophyte.Id = string.Empty; // The id should be generated from cosmosdb itself
                newNeophyte.CreatedDateTime = DateTime.Now;
                newNeophyte.WorkSteps.Add(new WorkStep
                {
                    CreatedDateTime = DateTime.Now,
                    Description = "Created on given location",
                    State = WorkState.Created,
                });
                await neophytes.AddAsync(newNeophyte);

                log.LogInformation($"Added new customer {newNeophyte.Id}");
                return new OkObjectResult(newNeophyte) { StatusCode = 201 };
            }
            catch (JsonSerializationException ex)
            {
                log.LogError(ex.ToString());
                return new BadRequestObjectResult(ex.Message);
            }
            catch (ArgumentOutOfRangeException ex)
            {
                log.LogError(ex.ToString());
                return new BadRequestObjectResult(ex.Message);
            }
            catch (Exception ex)
            {
                log.LogError(ex.ToString());
                return new ExceptionResult(ex, false);
            }
        }

        [FunctionName("NeophyteWorkSteps_Post_V1")]
        public async Task<IActionResult> AddStatus(
           [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "v1/neophytes/{id}/steps")] HttpRequestMessage req,
           [CosmosDB(
                databaseName: "%cosmosDBName%",
                collectionName: "%cosmosDBCollection%",
                ConnectionStringSetting = "cosmosDBConnection")] IDocumentClient client,
           [CosmosDB(
                databaseName: "%cosmosDBName%",
                collectionName: "%cosmosDBCollection%",
                ConnectionStringSetting = "cosmosDBConnection",
                Id = "{id}",
                PartitionKey ="{id}")] Document neophyteDoc,
           ILogger log)
        {
            log.LogInformation($"Validate token");
            //if (await security.IsUserAuthorizedAsync(req.Headers.Authorization, new string[] { "Admin" }) == false)
            //{
            //    return new UnauthorizedResult();
            //}

            log.LogInformation("Add new neophytes");

            var requestBody = await req.Content.ReadAsStringAsync();
            if (string.IsNullOrEmpty(requestBody))
            {
                return new BadRequestObjectResult("body is null or empty. please provide a valid neophytes object to add.");
            }

            try
            {

                var newWorkStep = JsonConvert.DeserializeObject<WorkStep>(requestBody);
                var neophyteLocation = JsonConvert.DeserializeObject<NeophyteLocation>(neophyteDoc.ToString());
                neophyteLocation.ModifiedDateTime = DateTime.Now;
                newWorkStep.CreatedDateTime = DateTime.Now;
                neophyteLocation.WorkSteps.Add(newWorkStep);

                var requestOptions = new RequestOptions { PartitionKey = new PartitionKey($"{neophyteDoc.Id}") };
                await client.ReplaceDocumentAsync(neophyteDoc.SelfLink, neophyteLocation, requestOptions);

                log.LogInformation($"Added new status {neophyteLocation.Id}");
                return new OkObjectResult(neophyteLocation) { StatusCode = 201 };
            }
            catch (JsonSerializationException ex)
            {
                log.LogError(ex.ToString());
                return new BadRequestObjectResult(ex.Message);
            }
            catch (ArgumentOutOfRangeException ex)
            {
                log.LogError(ex.ToString());
                return new BadRequestObjectResult(ex.Message);
            }
            catch (Exception ex)
            {
                log.LogError(ex.ToString());
                return new ExceptionResult(ex, false);
            }
        }
    }
}
