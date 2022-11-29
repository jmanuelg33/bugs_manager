using System.Net;

namespace BugsManager.Exceptions;

public class InvalidProjectException : CoreExceptionBase
{
    public InvalidProjectException(string? message) : base(message)
    {
    }

    public override string code()
    {
        return "INVALID_PROJECT";
    }

    public override HttpStatusCode status_code()
    {
        return HttpStatusCode.UnprocessableEntity;
    }
}
