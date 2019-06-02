package com.jktw_emr.emr_server.controllers;

import com.jktw_emr.emr_server.model.Patient;
import com.jktw_emr.emr_server.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/patients")
public class PatientController {
    @Autowired
    PatientService patientService;

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    Patient create(@RequestBody Patient patient)
    {
        return patientService.save(patient);
    }

    @GetMapping
    Iterable<Patient> read()
    {
        return patientService.findAll();
    }

    @PutMapping("/{id}")
    Patient update(@RequestBody Patient patient)
    {
        return patientService.save(patient);
    }

    @DeleteMapping("/{id}")
    void delete(@PathVariable Integer id)
    {
        patientService.deleteById(id);
    }

    @GetMapping("/{id}")
    Optional<Patient> findById(@PathVariable Integer id)
    {
        return patientService.findById(id);
    }

    @GetMapping("/search/findByFirstName")
    Iterable<Patient> findByFirstName(@RequestParam("firstName") String firstName)
    {
        return patientService.findByFirstName(firstName);
    }

    @GetMapping("/search/findByLastName")
    Iterable<Patient> findByLastName(@RequestParam("lastName") String lastName)
    {
        return patientService.findByFirstName(lastName);
    }

    @GetMapping("/search/findByFirstNameAndLastName")
    Iterable<Patient> findByFirstNameAndLastName(@RequestParam("firstName") String firstName,
                                                 @RequestParam("lastName") String lastName)
    {
        return patientService.findByFirstNameAndLastName(firstName, lastName);
    }

    @GetMapping("/search/findByFirstNameAndMiddleNameAndLastName")
    Iterable<Patient> findByFirstNameAndMiddleNameAndLastName(@RequestParam("firstName") String firstName,
                                                              @RequestParam("middleName") String middleName,
                                                              @RequestParam("lastName") String lastName)
    {
        return patientService.findByFirstNameAndMiddleNameAndLastName(firstName, middleName, lastName);
    }

    @GetMapping("/search/findBySsn")
    Iterable<Patient> findBySsn(@RequestParam("ssn") String ssn)
    {
        return patientService.findBySsn(ssn);
    }
}
