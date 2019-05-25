package emr_server.CommonData;

import java.util.Date;
import java.util.UUID;

public class LabRecord {
    public LabRecord(UUID id, Date date, String results, Patient patient, String type) {
        this.id = id;
        this.date = date;
        this.results = results;
        this.patient = patient;
        this.type = type;
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

    public Patient getPatient() {
        return patient;
    }

    public String getType() {
        return type;
    }

    private UUID id;
    private Date date;
    private String results;
    private Patient patient;
    private String type;
}
