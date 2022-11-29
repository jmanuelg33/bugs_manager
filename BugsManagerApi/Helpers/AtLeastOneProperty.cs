using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace BugsManager.Helpers;

[AttributeUsage(AttributeTargets.Class, AllowMultiple = true)]
public class AtLeastOneProperty : ValidationAttribute
{
    private string[] PropertyList { get; set; }

    public AtLeastOneProperty(params string[] propertyList)
    {
        this.PropertyList = propertyList;
    }


    public override bool IsValid(object? value)
    {
        if (value != null)
        {
            PropertyInfo? propertyInfo;
            foreach (string propertyName in PropertyList)
            {
                propertyInfo = value.GetType().GetProperty(propertyName);

                if (propertyInfo != null && propertyInfo.GetValue(value, null) != null)
                {
                    return true;
                }
            }
        }

        return false;
    }
}