package emr_server;

import com.mysql.cj.util.StringUtils;
import emr_server.BusinessLogic.Contracts.IBusinessLogicLayer;
import emr_server.BusinessLogic.Implementation.BusinessLogicLayer;
import emr_server.CommonData.*;
import emr_server.DataAccessLayer.Implementation.InMemoryDataAccessLayer;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Controller    // This means that this class is a Controller
@RequestMapping(path="/emr") // This means URL's start with /emr (after Application path)
public class MainController {

    // TODO:  Try to put this in a container so we can configure testing environments
    private IBusinessLogicLayer businessLayer;

    public MainController()
    {
        this(new BusinessLogicLayer(new InMemoryDataAccessLayer()));
    }

    public MainController(IBusinessLogicLayer business)
    {
        businessLayer = business;
    }

    @RequestMapping(path = "/register")
    public @ResponseBody PatientInfo registerPatient(
            @RequestParam String firstName,
            @RequestParam(required = false) String middleName,
            @RequestParam String lastName,
            @RequestParam String ssn,
            @RequestParam(required = false) String phoneNumber,
            @RequestParam(required = false) String emailAddress,
            @RequestParam(required = false) String streetNumber,
            @RequestParam(required = false) String houseNumber,
            @RequestParam(required = false) String streetName,
            @RequestParam(required = false) String cityName,
            @RequestParam(required = false) String stateName,
            @RequestParam(required = false) String countryName)
    {
        Address address = createAddress(streetNumber, houseNumber, streetName,
                                        cityName, stateName, countryName);

        Contact contact = createContact(phoneNumber, emailAddress, address);

        UUID id = UUID.randomUUID();
        PatientInfo patient = new PatientInfo(id, ssn);
        if (StringUtils.isNullOrEmpty(middleName))
            patient.setName(new Name(firstName, lastName));
        else
            patient.setName(new Name(firstName, middleName, lastName));

        patient.setContact(contact);

        if (!businessLayer.RegisterPatient(patient))
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Could not create patient; one may already exist with the same SSN.");

        return patient;
    }

    private Address createAddress(String streetNum,
                                  String houseNum, String street, String city,
                                  String state, String country)
    {
        Address address = new Address();
        if (!StringUtils.isNullOrEmpty(streetNum))
            address.setStreetNumber(streetNum);

        if (!StringUtils.isNullOrEmpty(houseNum))
            address.setHouseNumber(houseNum);

        if (!StringUtils.isNullOrEmpty(street))
            address.setStreetName(street);

        if (!StringUtils.isNullOrEmpty(city))
            address.setCityName(city);

        if (!StringUtils.isNullOrEmpty(state))
            address.setStateName(state);

        if (!StringUtils.isNullOrEmpty(country))
            address.setCountryName(country);

        return address;
    }

    private Contact createContact(String phone, String email, Address address)
    {
        Contact contact = new Contact();

        if (!StringUtils.isNullOrEmpty(phone))
            contact.setPhoneNumber(phone);

        if (!StringUtils.isNullOrEmpty(email))
            contact.setEmailAddress(email);

        contact.setAddress(address);

        return contact;
    }

    @RequestMapping(path = "/updatepatient")
    public @ResponseBody PatientInfo updatePatient(
            @RequestParam String id,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String middleName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String ssn,
            @RequestParam(required = false) String phoneNumber,
            @RequestParam(required = false) String emailAddress,
            @RequestParam(required = false) String streetNumber,
            @RequestParam(required = false) String houseNumber,
            @RequestParam(required = false) String streetName,
            @RequestParam(required = false) String cityName,
            @RequestParam(required = false) String stateName,
            @RequestParam(required = false) String countryName)
    {
        UUID uuid = UUID.fromString(id);
        Patient patient = businessLayer.GetPatient(uuid);

        // Name Modification
        String first = patient.getInfo().getName().getFirstName();
        String middle = patient.getInfo().getName().getMiddleName();
        String last = patient.getInfo().getName().getLastName();
        if (!StringUtils.isNullOrEmpty(firstName))
            first = firstName;
        if (!StringUtils.isNullOrEmpty(middleName))
            middle = middleName;
        if (!StringUtils.isNullOrEmpty(lastName))
            last = lastName;

        patient.getInfo().setName(new Name(first, middle, last));

        // SSN Modification
        if (!StringUtils.isNullOrEmpty(ssn))
            patient.getInfo().setSsn(ssn);

        // Contact Modification
        if (!StringUtils.isNullOrEmpty(phoneNumber))
            patient.getInfo().getContact().setPhoneNumber(phoneNumber);
        if (!StringUtils.isNullOrEmpty(emailAddress))
            patient.getInfo().getContact().setEmailAddress(emailAddress);

        // Address Modification
        if (!StringUtils.isNullOrEmpty(streetNumber))
            patient.getInfo().getContact().getAddress().setStreetNumber(streetNumber);
        if (!StringUtils.isNullOrEmpty(houseNumber))
            patient.getInfo().getContact().getAddress().setHouseNumber(houseNumber);
        if (!StringUtils.isNullOrEmpty(streetName))
            patient.getInfo().getContact().getAddress().setStreetName(streetName);
        if (!StringUtils.isNullOrEmpty(cityName))
            patient.getInfo().getContact().getAddress().setCityName(cityName);
        if (!StringUtils.isNullOrEmpty(stateName))
            patient.getInfo().getContact().getAddress().setStateName(stateName);
        if (!StringUtils.isNullOrEmpty(countryName))
            patient.getInfo().getContact().getAddress().setCountryName(countryName);

        if (!businessLayer.UpdatePatient(patient.getInfo()))
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Could not modify patient.  It may not have been found or the" +
                    "modification created a duplicate SSN.");

        return patient.getInfo();
    }

    @PostMapping("/uploaddocument")
    public @ResponseBody DocumentInfo handleFileUpload(
            @RequestParam("file") MultipartFile file,
            @RequestParam String patientId,
            @RequestParam String description) {

        UUID pId = UUID.fromString(patientId);
        Patient patient = businessLayer.GetPatient(pId);

        try
        {
            Document newDocument = new Document(new DocumentInfo(UUID.randomUUID(),
                    patient.getInfo(), description), file.getBytes());

            if (!businessLayer.AttachDocument(newDocument))
                throw new ResponseStatusException(
                        HttpStatus.INTERNAL_SERVER_ERROR, "Document not uploaded; possible id collision");

            return newDocument.getInfo();
        }
        catch (IOException exc)
        {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Could not read file.");
        }
    }

    @RequestMapping(path="/addlabrecord")
    public @ResponseBody LabRecord addLabRecord (
            @RequestParam String date,
            @RequestParam String results,
            @RequestParam String patientId,
            @RequestParam String type) {
        UUID id = UUID.randomUUID();
        Date formattedDate = formatDate(date);
        if (formattedDate == null)
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Could not parse date.");

        UUID pid = UUID.fromString(patientId);
        Patient patient = businessLayer.GetPatient(pid);
        LabRecord record = new LabRecord(id, formattedDate, results, patient.getInfo(), type);

        if (!businessLayer.AddLabRecord(record))
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Could not add lab record; patient may not exist.");

        return record;
    }

    @RequestMapping(path="/schedule")
    public @ResponseBody Appointment scheduleAppointment (
            @RequestParam String date,
            @RequestParam String description,
            @RequestParam String patientId,
            @RequestParam String type,
            @RequestParam List<String> medicalStaffIds) {
        UUID id = UUID.randomUUID();
        Date formattedDate = formatDate(date);
        if (formattedDate == null)
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Could not parse date.");

        UUID pid = UUID.fromString(patientId);
        Patient patient = businessLayer.GetPatient(pid);

        List<UUID> medicalStaff = medicalStaffIds.stream()
                .map(x -> UUID.fromString(x)).collect(Collectors.toList());
        Appointment appointment = new Appointment(id);
        for (UUID staffId : medicalStaff)
        {
            MedicalStaff staffMember = businessLayer.GetStaff(staffId);
            if (staffMember == null)
                throw new ResponseStatusException(
                        HttpStatus.INTERNAL_SERVER_ERROR, "Could not find staff member with id "+
                        staffId.toString() + ".");

            appointment.addStaff(staffMember);
        }

        appointment.setDate(formattedDate);
        appointment.setDescription(description);
        appointment.setPatient(patient.getInfo());
        appointment.setType(type);

        if (!businessLayer.ScheduleAppointment(appointment))
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Could not add lab record; patient may not exist.");

        return appointment;
    }

    private Date formatDate(String dateString)
    {
        DateFormat[] formats = {
                new SimpleDateFormat("MMMM d, yyyy", Locale.ENGLISH),
                new SimpleDateFormat("EEE, MMM d, ''yy", Locale.ENGLISH),
                new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH),
                new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.ENGLISH),
                new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS", Locale.ENGLISH),
                new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS Z", Locale.ENGLISH),
        };

        for (DateFormat format : formats)
        {
            try
            {
                Date date = format.parse(dateString);
                return date;
            }
            catch (ParseException esx)
            {
                continue;
            }
        }

        return null;
    }

    @RequestMapping(path="/cancelappointment")
    public @ResponseBody String cancelAppointment (@RequestParam String id) {
        UUID apptID = UUID.fromString(id);

        if (!businessLayer.CancelAppointment(apptID))
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Could not locate appointment with ID " +
                    apptID.toString() + ".");

        return "Success";
    }

    @RequestMapping(path="/getpatient")
    public @ResponseBody Patient getPatient (@RequestParam String id) {
        UUID pid = UUID.fromString(id);
        Patient patient = businessLayer.GetPatient(pid);
        if (patient == null)
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Could not locate patient with ID " +
                    pid.toString() + ".");

        return patient;
    }

    @RequestMapping(path="/getdocuments")
    public @ResponseBody List<DocumentInfo> getDocuments (@RequestParam String patientId) {
        UUID pid = UUID.fromString(patientId);
        Patient patient = businessLayer.GetPatient(pid);
        if (patient == null)
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Could not locate patient with ID " +
                    pid.toString() + ".");

        Set<DocumentInfo> documents = businessLayer.GetDocuments(patient.getInfo());

        return new ArrayList<>(documents);
    }

    @RequestMapping(path="/getdocument")
    public @ResponseBody Document getDocument (@RequestParam String id) {
        UUID docId = UUID.fromString(id);
        Document doc = businessLayer.GetDocument(docId);
        if (doc == null)
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Could not locate document with ID " +
                    docId.toString() + ".");

        return doc;
    }

    /*
    NEED TO AGREE ON A FORMAT FOR THIS
    @RequestMapping(path="/searchpatient")
    public @ResponseBody List<PatientInfo> searchPatients (
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String firstName,
    ) {
        UUID docId = UUID.fromString(id);
        Document doc = businessLayer.GetDocument(docId);
        if (doc == null)
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Could not locate document with ID " +
                    docId.toString() + ".");

        return doc;
    }
    */

    @RequestMapping(path="/createstaff")
    public @ResponseBody MedicalStaff createStaff (
            @RequestParam String firstName,
            @RequestParam String middleName,
            @RequestParam String lastName,
            @RequestParam String email,
            @RequestParam String role,
            @RequestParam(required = false) String phoneNumber,
            @RequestParam(required = false) String emailAddress,
            @RequestParam(required = false) String streetNumber,
            @RequestParam(required = false) String houseNumber,
            @RequestParam(required = false) String streetName,
            @RequestParam(required = false) String cityName,
            @RequestParam(required = false) String stateName,
            @RequestParam(required = false) String countryName) {

        Address address = createAddress(streetNumber, houseNumber, streetName,
                cityName, stateName, countryName);

        Contact contact = createContact(phoneNumber, emailAddress, address);

        UUID id = UUID.randomUUID();
        MedicalStaff staffMember = new MedicalStaff(id);

        if (StringUtils.isNullOrEmpty(middleName))
            staffMember.setName(new Name(firstName, lastName));
        else
            staffMember.setName(new Name(firstName, middleName, lastName));

        staffMember.setContact(contact);

        if (!businessLayer.CreateStaff(staffMember))
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Could not create staff member; one may already exist for this member.");

        return staffMember;
    }

    @RequestMapping(path="/removestaff")
    public @ResponseBody String removeStaff (@RequestParam String id) {
        UUID staffId = UUID.fromString(id);

        if (!businessLayer.RemoveStaff(staffId))
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Could not locate staff member with ID " +
                    staffId.toString() + ".");

        return "Success";
    }

    @RequestMapping(path = "/updatestaff")
    public @ResponseBody MedicalStaff updateStaffMember(
            @RequestParam String id,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String middleName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String phoneNumber,
            @RequestParam(required = false) String emailAddress,
            @RequestParam(required = false) String streetNumber,
            @RequestParam(required = false) String houseNumber,
            @RequestParam(required = false) String streetName,
            @RequestParam(required = false) String cityName,
            @RequestParam(required = false) String stateName,
            @RequestParam(required = false) String countryName)
    {
        UUID uuid = UUID.fromString(id);
        MedicalStaff staffMember = businessLayer.GetStaff(uuid);

        // Name Modification
        String first = staffMember.getName().getFirstName();
        String middle = staffMember.getName().getMiddleName();
        String last = staffMember.getName().getLastName();
        if (!StringUtils.isNullOrEmpty(firstName))
            first = firstName;
        if (!StringUtils.isNullOrEmpty(middleName))
            middle = middleName;
        if (!StringUtils.isNullOrEmpty(lastName))
            last = lastName;

        staffMember.setName(new Name(first, middle, last));

        // Contact Modification
        if (!StringUtils.isNullOrEmpty(phoneNumber))
            staffMember.getContact().setPhoneNumber(phoneNumber);
        if (!StringUtils.isNullOrEmpty(emailAddress))
            staffMember.getContact().setEmailAddress(emailAddress);

        // Address Modification
        if (!StringUtils.isNullOrEmpty(streetNumber))
            staffMember.getContact().getAddress().setStreetNumber(streetNumber);
        if (!StringUtils.isNullOrEmpty(houseNumber))
            staffMember.getContact().getAddress().setHouseNumber(houseNumber);
        if (!StringUtils.isNullOrEmpty(streetName))
            staffMember.getContact().getAddress().setStreetName(streetName);
        if (!StringUtils.isNullOrEmpty(cityName))
            staffMember.getContact().getAddress().setCityName(cityName);
        if (!StringUtils.isNullOrEmpty(stateName))
            staffMember.getContact().getAddress().setStateName(stateName);
        if (!StringUtils.isNullOrEmpty(countryName))
            staffMember.getContact().getAddress().setCountryName(countryName);

        if (!businessLayer.UpdateStaff(staffMember))
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Could not modify staff member.  It may not have been found or the " +
                    "modification created a duplicate SSN.");

        return staffMember;
    }

    @RequestMapping(path="/allstaff")
    public @ResponseBody List<MedicalStaff> getAllStaff () {
        return new ArrayList<>(businessLayer.GetAllStaff());
    }


    /*
    @GetMapping(path="/add") // Map ONLY GET Requests
    public @ResponseBody String addNewUser (@RequestParam String name
            , @RequestParam String email) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        User n = new User();
        n.setName(name);
        n.setEmail(email);
        userRepository.save(n);
        return "Saved";
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        // This returns a JSON or XML with the users
        return userRepository.findAll();
    }*/
}