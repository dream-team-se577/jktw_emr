package emr_server.CommonData;

import java.util.Date;

public class PatientSearchCriterion {
    public PatientSearchCriterion(CriteriaKey key, Object value) {
        validateValue(key, value);
        this.key = key;
        this.value = value;
    }

    private void validateValue(CriteriaKey key, Object value)
    {
        // Strings
        if (key == CriteriaKey.FirstName ||
                key == CriteriaKey.MiddleName ||
                key == CriteriaKey.LastName ||
                key == CriteriaKey.ContactPhone ||
                key == CriteriaKey.ContactEmail)
        {
            assert value instanceof String;
            return;
        }
        // Contact Address
        else if (key == CriteriaKey.ContactAddress)
        {
            assert value instanceof Address;
            return;
        }
        // Dates
        else if (key == CriteriaKey.LabDate ||
                key == CriteriaKey.AppointmentDate)
        {
            assert value instanceof Date;
            return;
        }

        throw new AssertionError("Could not map search criteria");
    }

    private CriteriaKey key;
    private Object value;
}
