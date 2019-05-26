package emr_server.CommonData;

import java.util.UUID;

public class DocumentInfo {
    public DocumentInfo(UUID id, PatientInfo patient, String description)
    {
        this.id = id;
        this.patient = patient;
        this.description = description;
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

        DocumentInfo document = (DocumentInfo) o;

        return document.getId() == this.getId();
    }

    public UUID getId() {
        return id;
    }

    public PatientInfo getPatient() {
        return patient;
    }

    public String getDescription() {
        return description;
    }

    private UUID id;
    private PatientInfo patient;
    private String description;
}
