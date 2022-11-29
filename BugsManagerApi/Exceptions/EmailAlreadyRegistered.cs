using System.Net;

namespace BugsManager.Exceptions;

public class EmailAlreadyRegisteredException : CoreExceptionBase
{
    public EmailAlreadyRegisteredException(string? message) : base(message)
    {
    }

    public override string code()
    {
        return "_ALREADY_REGISTERED";
    }

    public override HttpStatusCode status_code()
    {
        return HttpStatusCode.UnprocessableEntity;
    }
}