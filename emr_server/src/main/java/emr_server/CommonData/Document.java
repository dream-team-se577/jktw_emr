package emr_server.CommonData;

public class Document {
    public Document(DocumentInfo info, byte[] document) {
        this.document = document;
        this.documentInfo = info;
    }

    @Override
    public int hashCode() {
        return documentInfo.hashCode();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        if (this.getClass() != o.getClass()) return false;

        Document patient = (Document) o;

        return patient.getInfo() == this.getInfo();
    }

    public DocumentInfo getInfo() {
        return documentInfo;
    }

    public byte[] getDocument() {
        return document;
    }

    private DocumentInfo documentInfo;
    private byte[] document;
}
