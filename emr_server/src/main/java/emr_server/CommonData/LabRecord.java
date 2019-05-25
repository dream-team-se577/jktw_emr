package emr_server.CommonData;

import java.util.Date;
import java.util.UUID;

public class LabRecord {
    public LabRecord(UUID id, Date date, String results, PatientInfo patient, String type) {
        this.id = id;
        this.date = date;
        this.results = results;
        this.patient = patient;
        this.type = type;
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

        LabRecord patient = (LabRecord) o;

        return patient.getId() == this.getId();
    }

    public UUID getId() {
        return id;
    }

    public Date getDate() {
        return date;
    }

    public String getResults() {
        return results;
    }

    public PatientInfo getPatient() {
        return patient;
    }

    public String getType() {
        return type;
    }

    private UUID id;
    private Date date;
    private String results;
    private PatientInfo patient;
    private String type;
}
