package emr_server.CommonData;

import java.util.*;

public class Appointment {
    public Appointment(UUID id) {
        this.id = id;
        this.staff = new HashSet<>();
    }

    @Override
    public int hashCode() {
        return getId().hashCode();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        if (this.getClass() != o.getClass()) return false;

        Appointment patient = (Appointment) o;

        return patient.getId() == this.getId();
    }

    public UUID getId() {
        return id;
    }

    public Date getDate() {
        return date;
    }

    public String getDescription() {
        return description;
    }

    public PatientInfo getPatient() {
        return patient;
    }

    public String getType() {
        return type;
    }

    public Set<MedicalStaff> getStaff() {
        return Collections.unmodifiableSet(staff);
    }

    public void addStaff(MedicalStaff staff) {
        this.staff.add(staff);
    }

    public void removeStaff(MedicalStaff staff) {
        this.staff.remove(staff);
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPatient(PatientInfo patient) {
        this.patient = patient;
    }

    public void setType(String type) {
        this.type = type;
    }

    private UUID id;
    private Date date;
    private String description;
    private PatientInfo patient;
    private String type;
    private Set<MedicalStaff> staff;
}
