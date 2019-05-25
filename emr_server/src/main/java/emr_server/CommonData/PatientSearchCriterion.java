package emr_server.CommonData;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

public class PatientSearchCriterion {
    public PatientSearchCriterion(CriteriaKey key, Object value) {
        validateValue(key, value);
        this.key = key;
        this.value = value;
    }

    public boolean match(Patient p)
    {
        switch(key)
        {
            case FirstName:
                return firstNameSearch(p);
            case MiddleName:
                return middleNameSearch(p);
            case LastName:
                return lastNameSearch(p);
            case ContactPhone:
                return phoneSearch(p);
            case ContactEmail:
                return emailSearch(p);
            case AppointmentDate:
                return appointmentSearch(p);
            case LabDate:
                return labSearch(p);
            case ContactAddress:
                return addressSearch(p);
        }

        return false;
    }

    private boolean addressSearch(Patient p) {
        Address val = (Address) value;
        return val.equals(p.getInfo().getContact().getAddress());
    }

    private boolean firstNameSearch(Patient p)
    {
        String val = (String) value;
        return p.getInfo().getName().getFirstName().toLowerCase().equals(val.toLowerCase());
    }

    private boolean middleNameSearch(Patient p)
    {
        String val = (String) value;
        return p.getInfo().getName().getMiddleName().toLowerCase().equals(val.toLowerCase());
    }

    private boolean lastNameSearch(Patient p)
    {
        String val = (String) value;
        return p.getInfo().getName().getLastName().toLowerCase().equals(val.toLowerCase());
    }

    private boolean emailSearch(Patient p)
    {
        String val = (String) value;
        return p.getInfo().getContact().getEmailAddress().toLowerCase().equals(val.toLowerCase());
    }

    private boolean phoneSearch(Patient p)
    {
        String val = (String) value;
        return p.getInfo().getContact().getPhoneNumber().toLowerCase().equals(val);
    }

    private boolean appointmentSearch(Patient p)
    {
        Date val = (Date) value;
        Date startDate = getStartDateForSearch(val);
        Date endDate = getEndDateForSearch(val);

        for (Appointment a : p.getAppointments())
        {
            if (!(a.getDate().after(endDate) || a.getDate().before(startDate)))
                return true;
        }

        return false;
    }

    private boolean labSearch(Patient p)
    {
        Date val = (Date) value;
        Date startDate = getStartDateForSearch(val);
        Date endDate = getEndDateForSearch(val);

        for (LabRecord a : p.getLabRecords())
        {
            if (!(a.getDate().after(endDate) || a.getDate().before(startDate)))
                return true;
        }

        return false;
    }

    private Date getStartDateForSearch(Date date)
    {
        LocalDateTime localDateTime = date.toInstant().
                atZone(ZoneId.systemDefault()).toLocalDateTime();
        return Date.from(localDateTime.plusDays(1).atZone(ZoneId.systemDefault()).toInstant());
    }

    private Date getEndDateForSearch(Date date)
    {
        LocalDateTime localDateTime = date.toInstant().
                atZone(ZoneId.systemDefault()).toLocalDateTime();
        return Date.from(localDateTime.minusDays(1).atZone(ZoneId.systemDefault()).toInstant());
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
