package emr_server.CommonData;

import emr_server.CommonData.Contact;
import emr_server.CommonData.Name;

import java.util.UUID;

public class MedicalStaff {
    public MedicalStaff (UUID id)
    {
        this.id = id;
    }

    public UUID getId() {
        return id;
    }

    public Name getName() {
        return name;
    }

    public Contact getContact() {
        return contact;
    }

    public String getRole() {
        return role;
    }

    public void setName(Name name) {
        this.name = name;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
    }

    public void setRole(String role) {
        this.role = role;
    }

    private UUID id;
    private Name name;
    private Contact contact;
    private String role;
}
