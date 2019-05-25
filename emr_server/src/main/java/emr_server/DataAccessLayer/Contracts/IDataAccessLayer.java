package emr_server.DataAccessLayer.Contracts;

import emr_server.CommonData.*;

import java.util.Date;
import java.util.Set;
import java.util.UUID;

public interface IDataAccessLayer {
    // Creation
    boolean AddPatient(Patient patient);
    boolean AddLabRecord(LabRecord record);
    boolean AddAppointment(Appointment appointment);
    boolean UploadDocument(Document document);
    boolean AddStaff(MedicalStaff staff);

    // Retrieval
    Patient GetPatientByID(UUID id);
    Patient GetPatientBySSN(String ssn);
    Set<Patient> GetAllPatients();

    LabRecord GetLabRecordByID(UUID id);
    Set<LabRecord> GetAllLabRecords();
    Set<LabRecord> GetAllLabRecordsByPatient(Patient patient);
    Set<LabRecord> GetAllLabRecordsByDate(Date date);

    Appointment GetAppointmentByID(UUID id);
    Set<Appointment> GetAllAppointments();
    Set<Appointment> GetAllAppointmentsByPatient(Patient patient);
    Set<Appointment> GetAllAppointmentsByDate(Date date);

    Document GetDocumentByID(UUID id);
    Set<Document> GetAllDocuments();
    Set<Document> GetAllDocumentsByPatient(Patient patient);

    MedicalStaff GetStaffByID(UUID id);
    MedicalStaff GetStaffByName(Name name);
    Set<MedicalStaff> GetAllStaff();

    // Update
    boolean UpdatePatient(Patient patient);
    boolean UpdateAppointment(Appointment appointment);
    boolean UpdateStaff(MedicalStaff staff);

    // Removal
    boolean RemovePatient(Patient patient);
    boolean RemoveAppointment(Appointment appointment);
    boolean RemoveLabRecord(LabRecord labRecord);
    boolean RemoveDocument(Document document);
    boolean RemoveStaff(MedicalStaff staff);

    // Search
    Set<Patient> SearchPatients(PatientSearch searchCriteria);
}
