using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading.Tasks;


namespace Backend.Authentication
{
    public interface ISecurityValidation
    {
        Task<bool> IsUserAuthorizedAsync(AuthenticationHeaderValue value, string[] roleNames);

        bool ValidateRoles(ClaimsPrincipal claims, string[] roleNames);

        Task<ClaimsPrincipal> ValidateTokenAsync(AuthenticationHeaderValue value);
    }
}
