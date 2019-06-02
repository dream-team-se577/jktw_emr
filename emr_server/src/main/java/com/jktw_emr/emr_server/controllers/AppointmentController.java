package com.jktw_emr.emr_server.controllers;

import com.jktw_emr.emr_server.model.Appointment;
import com.jktw_emr.emr_server.model.Patient;
import com.jktw_emr.emr_server.services.AppointmentService;
import com.jktw_emr.emr_server.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {
    @Autowired
    AppointmentService appointmentService;

    @Autowired
    PatientService patientService;

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    Appointment create(@RequestBody Appointment appointment)
    {
        return appointmentService.save(appointment);
    }

    @GetMapping
    Iterable<Appointment> read()
    {
        return appointmentService.findAll();
    }

    @PutMapping
    Appointment update(@RequestBody Appointment appointment)
    {
        return appointmentService.save(appointment);
    }

    @DeleteMapping("/{id}")
    void delete(@PathVariable Integer id)
    {
        appointmentService.deleteById(id);
    }

    @GetMapping("/{id}")
    Optional<Appointment> findById(@PathVariable Integer id)
    {
        return appointmentService.findById(id);
    }

    @GetMapping("/search/findByPatientId")
    Iterable<Appointment> findByPatientId(@RequestParam("patient") Integer id)
    {
        Optional<Patient> patient = patientService.findById(id);

        if (!patient.isPresent())
            return new ArrayList<>();

        return appointmentService.findByPatient(patient.get());
    }

    @GetMapping("/search/findByDateBetween")
    Iterable<Appointment> findByDateBetween(
            @RequestParam("dateStart") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")Date startDate,
            @RequestParam("dateEnd") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") Date endDate)
    {
        return appointmentService.findByDateBetween(startDate, endDate);
    }
}
