package emr_server.DataAccessLayer.Implementation;

import emr_server.CommonData.*;
import emr_server.DataAccessLayer.Contracts.IDataAccessLayer;

import java.util.*;
import java.util.stream.Collectors;

// Simple data layer for small amounts of data
public class InMemoryDataAccessLayer implements IDataAccessLayer {
    public InMemoryDataAccessLayer()
    {
        patients = new Hashtable<>();
        documents = new Hashtable<>();
        labRecords = new Hashtable<>();
        appointments = new Hashtable<>();
        staff = new Hashtable<>();
    }

    @Override
    public boolean AddPatient(PatientInfo patient) {
        if (patients.containsKey(patient.getId()))
            return false;

        patients.put(patient.getId(), new Patient(patient));
        return true;
    }

    @Override
    public boolean AddLabRecord(LabRecord record) {
        if (labRecords.containsKey(record.getId()) ||
                !patients.containsKey(record.getPatient().getId()))
            return false;

        patients.get(record.getPatient().getId()).addRecord(record);
        labRecords.put(record.getId(), record);
        return true;
    }

    @Override
    public boolean AddAppointment(Appointment appointment) {
        if (appointments.containsKey(appointment.getId()) ||
                !patients.containsKey(appointment.getPatient().getId()))
            return false;

        patients.get(appointment.getPatient().getId()).addAppointment(appointment);
        appointments.put(appointment.getId(), appointment);
        return true;
    }

    @Override
    public boolean UploadDocument(Document document) {
        if (documents.containsKey(document.getInfo().getId()))
            return false;

        documents.put(document.getInfo().getId(), document);
        return true;
    }

    @Override
    public boolean AddStaff(MedicalStaff newStaff) {
        if (staff.containsKey(newStaff.getId()))
            return false;

        staff.put(newStaff.getId(), newStaff);
        return true;
    }

    @Override
    public Patient GetPatientByID(UUID id) {
        return patients.get(id);
    }

    @Override
    public Patient GetPatientBySSN(String ssn) {
        for (Patient patient : patients.values())
        {
            if (patient.getInfo().getSsn().equals(ssn))
                return patient;
        }

        return null;
    }

    @Override
    public Set<PatientInfo> GetAllPatientInfo() {
        return new HashSet<>(patients.values().stream().map(x -> x.getInfo())
                .collect(Collectors.toList()));
    }

    @Override
    public LabRecord GetLabRecordByID(UUID id) {
        return labRecords.get(id);
    }

    @Override
    public Set<LabRecord> GetAllLabRecords() {
        return new HashSet<>(labRecords.values());
    }

    @Override
    public Set<LabRecord> GetAllLabRecordsByPatient(PatientInfo patient) {
        HashSet<LabRecord> result = new HashSet<>();
        for (LabRecord record : labRecords.values())
        {
            if (record.getPatient().equals(patient))
                result.add(record);
        }

        return result;
    }

    @Override
    public Set<LabRecord> GetAllLabRecordsByDateRange(Date startDate, Date endDate) {
        HashSet<LabRecord> result = new HashSet<>();
        for (LabRecord record : labRecords.values())
        {
            if (!(record.getDate().after(endDate) || record.getDate().before(startDate)))
                result.add(record);
        }

        return result;
    }

    @Override
    public Appointment GetAppointmentByID(UUID id) {
        return appointments.get(id);
    }

    @Override
    public Set<Appointment> GetAllAppointments() {
        return new HashSet<>(appointments.values());
    }

    @Override
    public Set<Appointment> GetAllAppointmentsByPatient(PatientInfo patient) {
        HashSet<Appointment> result = new HashSet<>();
        for (Appointment appointment : appointments.values())
        {
            if (appointment.getPatient().equals(patient))
                result.add(appointment);
        }

        return result;
    }

    @Override
    public Set<Appointment> GetAllAppointmentsByDateRange(Date startDate, Date endDate) {
        HashSet<Appointment> result = new HashSet<>();
        for (Appointment appointment : appointments.values())
        {
            if (!(appointment.getDate().after(endDate) || appointment.getDate().before(startDate)))
                result.add(appointment);
        }

        return result;
    }

    @Override
    public Document GetDocumentByID(UUID id) {
        return documents.get(id);
    }

    @Override
    public Set<Document> GetAllDocuments() {
        return new HashSet<>(documents.values());
    }

    @Override
    public Set<Document> GetAllDocumentsByPatient(PatientInfo patient) {
        HashSet<Document> result = new HashSet<>();
        for (Document document : documents.values())
        {
            if (document.getInfo().getPatient().equals(patient))
                result.add(document);
        }

        return result;
    }

    @Override
    public MedicalStaff GetStaffByID(UUID id) {
        return staff.get(id);
    }

    @Override
    public MedicalStaff GetStaffByName(Name name) {
        for (MedicalStaff member : staff.values())
        {
            if (member.getName().equals(name))
                return member;
        }

        return null;
    }

    @Override
    public Set<MedicalStaff> GetAllStaff() {
        return new HashSet<>(staff.values());
    }

    @Override
    public boolean UpdatePatient(PatientInfo patient) {
        if (!patients.containsKey(patient.getId()))
            return false;

        patients.get(patient.getId()).setInfo(patient);
        return true;
    }

    @Override
    public boolean UpdateAppointment(Appointment appointment) {
        if (!appointments.containsKey(appointment.getId()))
            return false;

        appointments.put(appointment.getId(), appointment);

        return true;
    }

    @Override
    public boolean UpdateStaff(MedicalStaff member) {
        if (!staff.containsKey(member.getId()))
            return false;

        staff.put(member.getId(), member);

        return true;
    }

    @Override
    public boolean RemovePatient(PatientInfo patient) {
        if (!patients.containsKey(patient.getId()))
            return false;

        // TODO:  Should we remove the documents, appointments and lab records?
        patients.remove(patient.getId());
        return true;
    }

    @Override
    public boolean RemoveAppointment(Appointment appointment) {
        if (!appointments.containsKey(appointment.getId()))
            return false;

        appointments.remove(appointment.getId());
        return true;
    }

    @Override
    public boolean RemoveLabRecord(LabRecord labRecord) {
        if (!labRecords.containsKey(labRecord.getId()))
            return false;

        labRecords.remove(labRecord.getId());
        return true;
    }

    @Override
    public boolean RemoveDocument(Document document) {
        if (!documents.containsKey(document.getInfo().getId()))
            return false;

        documents.remove(document.getInfo().getId());
        return true;
    }

    @Override
    public boolean RemoveStaff(MedicalStaff member) {
        if (!staff.containsKey(member.getId()))
            return false;

        staff.remove(member.getId());
        return true;
    }

    @Override
    public Set<Patient> SearchPatients(PatientSearch searchCriteria) {
        HashSet<Patient> result = new HashSet<>();

        for (Patient patient : patients.values())
        {
            // Verify it has all that is must have
            boolean fulfillsRequiredCriteria = true;
            for (PatientSearchCriterion must : searchCriteria.getMustHaves())
            {
                if (!must.match(patient))
                {
                    fulfillsRequiredCriteria = false;
                    break;
                }
            }

            if (!fulfillsRequiredCriteria)
                continue;

            // Verify it has at least one "could have" (if any)
            List<PatientSearchCriterion> couldHaves = searchCriteria.getCouldHaves();

            if (!couldHaves.isEmpty())
            {
                boolean fulfillsAtLeastOneCriteria = false;
                for (PatientSearchCriterion could : searchCriteria.getCouldHaves())
                {
                    if (could.match(patient))
                    {
                        fulfillsAtLeastOneCriteria = true;
                        break;
                    }
                }

                if (!fulfillsAtLeastOneCriteria)
                    continue;
            }

            result.add(patient);
        }

        return result;
    }

    private Map<UUID, Patient> patients;
    private Map<UUID, Document> documents;
    private Map<UUID, LabRecord> labRecords;
    private Map<UUID, Appointment> appointments;
    private Map<UUID, MedicalStaff> staff;
}
