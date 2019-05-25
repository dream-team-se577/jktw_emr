package emr_server.CommonData;

import java.util.UUID;

public class Document {
    public Document(UUID id, PatientInfo patient, String description, byte[] document) {
        this.id = id;
        this.patient = patient;
        this.description = description;
        this.document = document;
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

        Document patient = (Document) o;

        return patient.getId() == this.getId();
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

    public byte[] getDocument() {
        return document;
    }

    private UUID id;
    private PatientInfo patient;
    private String description;
    private byte[] document;
}
