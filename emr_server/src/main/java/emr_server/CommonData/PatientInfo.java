package emr_server.CommonData;

import java.util.UUID;

public class PatientInfo {
    public PatientInfo(UUID id, String ssn)
    {
        this.id = id;
        this.ssn = ssn;
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        if (this.getClass() != o.getClass()) return false;

        PatientInfo patient = (PatientInfo) o;

        return patient.id == this.id;
    }

    public UUID getId()
    {
        return id;
    }

    public String getSsn() {
        return ssn;
    }

    public Name getName() {
        return name;
    }

    public Contact getContact() {
        return contact;
    }

    public void setName(Name name) {
        this.name = name;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
    }

    private UUID id;
    private String ssn;
    private Name name;
    private Contact contact;
}
