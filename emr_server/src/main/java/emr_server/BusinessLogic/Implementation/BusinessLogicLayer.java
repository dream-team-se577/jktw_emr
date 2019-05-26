package emr_server.BusinessLogic.Implementation;

import emr_server.CommonData.*;
import emr_server.BusinessLogic.Contracts.IBusinessLogicLayer;
import emr_server.DataAccessLayer.Contracts.IDataAccessLayer;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

public class BusinessLogicLayer implements IBusinessLogicLayer {
    public BusinessLogicLayer(IDataAccessLayer dataLayer)
    {
        this.dataLayer = dataLayer;
    }

    @Override
    public boolean RegisterPatient(PatientInfo newPatient) {
        // Verify that the patient does not share an SSN with an existing patient
        Set<PatientInfo> patients = dataLayer.GetAllPatientInfo();
        for (PatientInfo patient : patients)
        {
            if (patient.getSsn().equals(newPatient.getSsn()))
                return false;
        }

        dataLayer.AddPatient(newPatient);

        return true;
    }

    @Override
    public Patient GetPatient(String ssn) {
        Patient patient = dataLayer.GetPatientBySSN(ssn);
        return patient;
    }

    @Override
    public Patient GetPatient(UUID id) {
        Patient patient = dataLayer.GetPatientByID(id);
        return patient;
    }

    @Override
    public boolean UpdatePatient(PatientInfo patient) {
        // Verify that the patient does not share an SSN with an existing patient
        Set<PatientInfo> patients = dataLayer.GetAllPatientInfo();
        for (PatientInfo p : patients)
        {
            if (p.equals(patient))
                continue;

            if (patient.getSsn().equals(p.getSsn()))
                return false;
        }

        return dataLayer.UpdatePatient(patient);
    }

    @Override
    public boolean AttachDocument(Document doc) {
        // Verify that the patient exists for the doc
        if (dataLayer.GetPatientByID(doc.getInfo().getPatient().getId()) == null)
            return false;

        return dataLayer.UploadDocument(doc);
    }

    @Override
    public boolean AddLabRecord(LabRecord record) {
        // Verify that the patient exists for the doc
        if (dataLayer.GetPatientByID(record.getPatient().getId()) == null)
            return false;

        return dataLayer.AddLabRecord(record);
    }

    @Override
    public boolean ScheduleAppointment(Appointment appointment) {
        return dataLayer.AddAppointment(appointment);
    }

    @Override
    public boolean CancelAppointment(UUID id) {
        Appointment appointment = dataLayer.GetAppointmentByID(id);
        if (appointment == null)
            return false;

        return dataLayer.RemoveAppointment(appointment);
    }

    @Override
    public Document GetDocument(UUID id)
    {
        return dataLayer.GetDocumentByID(id);
    }

    @Override
    public Set<DocumentInfo> GetDocuments(PatientInfo patient) {
        return dataLayer.GetAllDocumentsByPatient(patient).stream().map(x -> x.getInfo()).collect(Collectors.toSet());
    }

    @Override
    public Set<Patient> SearchPatients(PatientSearch search) {
        return dataLayer.SearchPatients(search);
    }

    @Override
    public boolean CreateStaff(MedicalStaff staff) {
        // For right now, we don't support staff with the same name
        if (dataLayer.GetStaffByName(staff.getName()) != null)
            return false;

        return dataLayer.AddStaff(staff);
    }

    @Override
    public boolean RemoveStaff(UUID id) {
        MedicalStaff staffMember = dataLayer.GetStaffByID(id);
        if (staffMember == null)
            return false;

        return dataLayer.RemoveStaff(staffMember);
    }

    @Override
    public boolean UpdateStaff(MedicalStaff staff) {
        return dataLayer.UpdateStaff(staff);
    }

    @Override
    public MedicalStaff GetStaff(Name name) {
        return dataLayer.GetStaffByName(name);
    }

    @Override
    public MedicalStaff GetStaff(UUID id) {
        return dataLayer.GetStaffByID(id);
    }

    @Override
    public Set<MedicalStaff> GetAllStaff() {
        return dataLayer.GetAllStaff();
    }

    private IDataAccessLayer dataLayer;
}
