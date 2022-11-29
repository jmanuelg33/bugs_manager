using System.Net;

namespace BugsManager.Exceptions;

public class InvalidUserException : CoreExceptionBase
{
    public InvalidUserException(string? message) : base(message)
    {
    }

    public override string code()
    {
        return "INVALID_USER";
    }

    public override HttpStatusCode status_code()
    {
        return HttpStatusCode.NotFound;
    }
}
