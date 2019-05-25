package emr_server.DataAccessLayer.Contracts;

import emr_server.CommonData.*;

import java.util.Date;
import java.util.Set;
import java.util.UUID;

public interface IDataAccessLayer {
    // Creation
    boolean AddPatient(PatientInfo patient);
    boolean AddLabRecord(LabRecord record);
    boolean AddAppointment(Appointment appointment);
    boolean UploadDocument(Document document);
    boolean AddStaff(MedicalStaff staff);

    // Retrieval
    Patient GetPatientByID(UUID id);
    Patient GetPatientBySSN(String ssn);
    Set<PatientInfo> GetAllPatientInfo();

    LabRecord GetLabRecordByID(UUID id);
    Set<LabRecord> GetAllLabRecords();
    Set<LabRecord> GetAllLabRecordsByPatient(PatientInfo patient);
    Set<LabRecord> GetAllLabRecordsByDateRange(Date startDate, Date endDate);

    Appointment GetAppointmentByID(UUID id);
    Set<Appointment> GetAllAppointments();
    Set<Appointment> GetAllAppointmentsByPatient(PatientInfo patient);
    Set<Appointment> GetAllAppointmentsByDateRange(Date startDate, Date endDate);

    Document GetDocumentByID(UUID id);
    Set<Document> GetAllDocuments();
    Set<Document> GetAllDocumentsByPatient(PatientInfo patient);

    MedicalStaff GetStaffByID(UUID id);
    MedicalStaff GetStaffByName(Name name);
    Set<MedicalStaff> GetAllStaff();

    // Update
    boolean UpdatePatient(PatientInfo patient);
    boolean UpdateAppointment(Appointment appointment);
    boolean UpdateStaff(MedicalStaff staff);

    // Removal
    boolean RemovePatient(PatientInfo patient);
    boolean RemoveAppointment(Appointment appointment);
    boolean RemoveLabRecord(LabRecord labRecord);
    boolean RemoveDocument(Document document);
    boolean RemoveStaff(MedicalStaff staff);

    // Search
    Set<Patient> SearchPatients(PatientSearch searchCriteria);
}
