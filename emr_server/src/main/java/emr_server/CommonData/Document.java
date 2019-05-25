package emr_server.CommonData;

import java.util.UUID;

public class Document {
    public Document(UUID id, Patient patient, String description, byte[] document) {
        this.id = id;
        this.patient = patient;
        this.description = description;
        this.document = document;
    }

    public UUID getId() {
        return id;
    }

    public Patient getPatient() {
        return patient;
    }

    public String getDescription() {
        return description;
    }

    public byte[] getDocument() {
        return document;
    }

    private UUID id;
    private Patient patient;
    private String description;
    private byte[] document;
}
