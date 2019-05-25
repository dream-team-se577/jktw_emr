package emr_server.CommonData;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

public class Patient {
    @Override
    public int hashCode() {
        return info.hashCode();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        if (this.getClass() != o.getClass()) return false;

        Patient patient = (Patient) o;

        return patient.getInfo() == this.info;
    }

    public Patient(PatientInfo info)
    {
        this.info = info;
        labRecords = new ArrayList<>();
        appointments = new ArrayList<>();
    }

    public PatientInfo getInfo() {
        return info;
    }

    public void setInfo(PatientInfo info) {
        // ID should not change, if so it's a different patient
        assert info.getId() == this.info.getId();
        this.info = info;
    }

    public void addRecord(LabRecord record)
    {
        assert record.getPatient().getId().equals(this.getInfo().getId());
        labRecords.add(record);
    }

    public void addAppointment(Appointment appointment)
    {
        assert appointment.getPatient().getId().equals(this.getInfo().getId());
        appointments.add(appointment);
    }

    public List<LabRecord> getLabRecords() {
        return Collections.unmodifiableList(labRecords);
    }

    public List<Appointment> getAppointments() {
        return Collections.unmodifiableList(appointments);
    }

    private ArrayList<LabRecord> labRecords;
    private ArrayList<Appointment> appointments;
    private PatientInfo info;
}
