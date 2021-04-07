using Backend.Model;
using FluentValidation;

namespace Backend.Validation
{
    public class WorkStepValidation : AbstractValidator<WorkStep>
    {
        public WorkStepValidation()
        {
            RuleFor(x => x.Reporter).NotEmpty();
            RuleFor(x => x.Description).MaximumLength(200);
            RuleFor(x => x.State).NotNull();
        }
    }
}
