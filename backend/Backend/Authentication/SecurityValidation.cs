using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Authentication
{
    public class SecurityValidation : ISecurityValidation
    {
        private readonly IConfigurationRoot config;
        private readonly IConfigurationManager<OpenIdConnectConfiguration> configurationManager;

        private readonly string issuer;
        private readonly string audience;

        public SecurityValidation(IConfigurationRoot config)
        {
            this.config = config;
            this.issuer = config["issuer"];
            this.audience = config["audience"];
            var documentRetriever = new HttpDocumentRetriever { RequireHttps = issuer.StartsWith("https://") };

            configurationManager = new ConfigurationManager<OpenIdConnectConfiguration>(
                $"{issuer}/.well-known/openid-configuration",
                new OpenIdConnectConfigurationRetriever(),
                documentRetriever);
        }

        public async Task<bool> IsUserAuthorizedAsync(AuthenticationHeaderValue value, string[] roleNames)
        {
            bool authorized = false;
            var claim = await ValidateTokenAsync(value);
            if (claim != null)
            {
                authorized = ValidateRoles(claim, roleNames);
            }

            return authorized;
        }

        public async Task<ClaimsPrincipal> ValidateTokenAsync(AuthenticationHeaderValue value)
        {
            if (value?.Scheme != "Bearer")
            {
                return null;
            }

            var openIdConfig = await configurationManager.GetConfigurationAsync(CancellationToken.None);

            var validationParameter = new TokenValidationParameters
            {
                RequireSignedTokens = true,
                ValidAudience = audience,
                ValidateAudience = true,
                ValidIssuer = issuer,
                ValidateIssuer = true,
                ValidateIssuerSigningKey = true,
                ValidateLifetime = true,
                IssuerSigningKeys = openIdConfig.SigningKeys,
            };

            ClaimsPrincipal result = null;
            var tries = 0;

            while (result == null && tries <= 1)
            {
                try
                {
                    var handler = new JwtSecurityTokenHandler();
                    result = handler.ValidateToken(value.Parameter, validationParameter, out var token);
                }
                catch (SecurityTokenSignatureKeyNotFoundException)
                {
                    // This exception is thrown if the signature key of the JWT could not be found.
                    // This could be the case when the issuer changed its signing keys, so we trigger a
                    // refresh and retry validation.
                    configurationManager.RequestRefresh();
                    tries++;
                }
                catch (SecurityTokenException)
                {
                    return null;
                }
            }

            return result;
        }

        public bool ValidateRoles(ClaimsPrincipal claims, string[] roleNames)
        {
            return claims.FindAll(ClaimTypes.Role)
                .All(claim => roleNames.Contains(claim.Value));
        }
    }
}
