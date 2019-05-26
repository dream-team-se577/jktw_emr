package emr_server.BusinessLogic.Contracts;

import emr_server.CommonData.*;

import java.util.Set;
import java.util.UUID;

public interface IBusinessLogicLayer {
    // Patient Commands
    boolean RegisterPatient(PatientInfo patient);

    boolean UpdatePatient(PatientInfo patient);

    boolean AttachDocument(Document doc);

    boolean AddLabRecord(LabRecord record);

    boolean ScheduleAppointment(Appointment appointment);

    boolean CancelAppointment (UUID id);

    // Patient Queries
    Patient GetPatient(String ssn);

    Patient GetPatient(UUID id);

    Document GetDocument(UUID id);

    Set<DocumentInfo> GetDocuments(PatientInfo patient);

    Set<Patient> SearchPatients(PatientSearch search);

    // Staff Commands
    boolean CreateStaff(MedicalStaff staff);

    boolean RemoveStaff(UUID staff);

    boolean UpdateStaff(MedicalStaff staff);

    // Staff Queries
    MedicalStaff GetStaff(Name name);

    MedicalStaff GetStaff(UUID id);

    Set<MedicalStaff> GetAllStaff();
}
