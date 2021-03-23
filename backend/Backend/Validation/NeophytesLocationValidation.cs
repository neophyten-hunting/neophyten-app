using Backend.Model;
using FluentValidation;

namespace Backend.Validation
{
    public class NeophytesLocationValidation : AbstractValidator<NeophyteLocation>
    {
        public NeophytesLocationValidation()
        {
            RuleFor(x => x.Latitude).NotEmpty();
            RuleFor(x => x.Longitude).NotEmpty();
            RuleFor(x => x.Reporter).NotEmpty();
            RuleFor(x => x.Location).NotEmpty().MaximumLength(200);
            RuleFor(x => x.Description).MaximumLength(200);
        }
    }
}
