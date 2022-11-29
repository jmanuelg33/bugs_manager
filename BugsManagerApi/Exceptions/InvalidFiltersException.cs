using System.Net;

namespace BugsManager.Exceptions;

public class InvalidFiltersException : CoreExceptionBase
{
    public InvalidFiltersException(string? message) : base(message)
    {
    }

    public override string code()
    {
        return "INVALID_FILTERS";
    }

    public override HttpStatusCode status_code()
    {
        return HttpStatusCode.NotFound;
    }
}
