package emr_server.BusinessLogic.Contracts;

import emr_server.CommonData.*;

import java.util.Set;

public interface IBusinessLogicLayer {
    // Patient Commands
    boolean RegisterPatient(PatientInfo patient);

    boolean UpdatePatient(PatientInfo patient);

    boolean AttachDocument(Document doc);

    boolean AddLabRecord(LabRecord record);

    boolean ScheduleAppointment(Appointment appointment);

    boolean CancelAppointment (Appointment appointment);

    // Patient Queries
    Patient GetPatient(String ssn);

    Set<Document> GetDocuments(PatientInfo patient);

    Set<Patient> SearchPatients(PatientSearch search);

    // Staff Commands
    boolean CreateStaff(MedicalStaff staff);

    boolean RemoveStaff(MedicalStaff staff);

    boolean UpdateStaff(MedicalStaff staff);

    // Staff Queries
    MedicalStaff GetStaff(Name name);

    Set<MedicalStaff> GetAllStaff();
}
