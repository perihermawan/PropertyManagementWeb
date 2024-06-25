using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace propertymanagement.web.ServiceAPI
{
    public class ExceptionResponse
    {
        private readonly IHostingEnvironment hostingEnvironment;
        private readonly IHttpContextAccessor httpContextAccessor;
        
        public ExceptionResponse(IHostingEnvironment hostingEnvironment, IHttpContextAccessor httpContextAccessor)
        {
            this.hostingEnvironment = hostingEnvironment;
            this.httpContextAccessor = httpContextAccessor;

        }

        public async Task ThrowException(Exception exception)
        {
            var context = httpContextAccessor.HttpContext;

            string source = "Web Exception";
            int statusCode = StatusCodes.Status400BadRequest;
            string description = exception.Messages();
            string status = "Internal Server Error";

            if (exception is ApiException)
            {
                source = "API Exception";
                status = (exception as ApiException).Status;
                statusCode = (int)(exception as ApiException).StatusCode;

            }
            else if (exception is HttpRequestException)
            {
                status = "Bad Request";
                statusCode = StatusCodes.Status400BadRequest;
            }
            else if (exception is UnauthorizedAccessException)
            {
                status = "Unauthorized";
                statusCode = StatusCodes.Status401Unauthorized;
            }
            else if (exception is ForbiddenAccessException)
            {
                status = "Forbidden";
                statusCode = StatusCodes.Status403Forbidden;
            }
            else
            {
                statusCode = StatusCodes.Status500InternalServerError;
            }

            var errorMessage = exception.Messages();

            var m = new
            {
                errorMessage = errorMessage,
                status = status,
                statusCode = statusCode,
                stackTrace = exception.StackTrace
            };

            context.Response.StatusCode = statusCode;

            if (!IsAjaxRequest(context.Request))
            {
                var path = $"{hostingEnvironment.WebRootPath}\\error.html";
                var text = System.IO.File.ReadAllText(path);

                text = text
                    .Replace("#status_code#", statusCode.ToString())
                    .Replace("#title#", status)
                    .Replace("#exception_source#", source)
                    .Replace("#description#", errorMessage);

                context.Response.StatusCode = statusCode;
                context.Response.ContentType = "text/html";
                await context.Response.WriteAsync(text);
            }
            else
            {
                context.Response.StatusCode = statusCode;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(JsonConvert.SerializeObject(m));
            }
        }

        private bool IsAjaxRequest(HttpRequest request)
        {
            if (request == null)
                return false;

            if (request.Headers != null)
                return request.Headers["X-Requested-With"] == "XMLHttpRequest";

            return false;
        }

    }
}
