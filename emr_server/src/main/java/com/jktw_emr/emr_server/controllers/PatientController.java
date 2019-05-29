package com.jktw_emr.emr_server.controllers;

import com.jktw_emr.emr_server.model.Patient;
import com.jktw_emr.emr_server.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class PatientController {

    @Autowired
    PatientService patientService;

    @PostMapping("/patient")
    Patient create(@RequestBody Patient patient) {
        return patientService.save(patient);
    }

    @GetMapping("/patient")
    Iterable<Patient> read() {
        return patientService.findAll();
    }

    @PutMapping("/patient")
    Patient update(@RequestBody Patient patient) {
        return patientService.save(patient);
    }

    @DeleteMapping("/patient/{id}")
    void delete(@PathVariable Integer id) {
        patientService.deleteById(id);
    }
}
