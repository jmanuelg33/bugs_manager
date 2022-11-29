using System.Net;
namespace BugsManager.Exceptions;

public class CoreExceptionBase: Exception
{
    public CoreExceptionBase(string? message) : base(message) { }

    public virtual object? data { get; set;}
    public virtual string code() => "UNHANDLED_EXCEPTION";
    public virtual HttpStatusCode status_code() => HttpStatusCode.InternalServerError;
}