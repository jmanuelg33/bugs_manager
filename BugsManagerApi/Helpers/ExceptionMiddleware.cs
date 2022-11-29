using System.Net;
using System.Text.Json;
using BugsManager.Exceptions;

namespace BugsManager.Helpers;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger _logger;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext httpContext)
    {
        try
        {
            await _next(httpContext);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(httpContext, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        string code = "StandarError";
        string message = exception.Message;

        if (exception is CoreExceptionBase)
        {
            context.Response.StatusCode = (int)((CoreExceptionBase)exception).status_code();
            code = ((CoreExceptionBase)exception).code();
            message = ((CoreExceptionBase)exception).Message;
        }

        string error = JsonSerializer.Serialize(new
        {
            status = "fail",
            code = code,
            data = new
            {
                message = message
            }
        });

        _logger.LogError($"{error}");
        await context.Response.WriteAsync(error);
    }
}