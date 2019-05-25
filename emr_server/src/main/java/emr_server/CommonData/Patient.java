package emr_server.CommonData;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

public class Patient {
    public Patient(UUID id)
    {
        this.id = id;
    }

    public UUID getId() {
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

    public void AddRecord(LabRecord record)
    {
        labRecords.add(record);
    }

    public void AddAppointment(Appointment appointment)
    {
        appointments.add(appointment);
    }

    public void CancelAppointment(Appointment appointment)
    {
        appointments.remove(appointment);
    }

    public List<LabRecord> getLabRecords() {
        return Collections.unmodifiableList(labRecords);
    }

    public List<Appointment> getAppointments() {
        return Collections.unmodifiableList(appointments);
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
    private ArrayList<LabRecord> labRecords;
    private ArrayList<Appointment> appointments;
}
