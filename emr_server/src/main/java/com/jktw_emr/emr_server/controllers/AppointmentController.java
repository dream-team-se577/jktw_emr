package com.jktw_emr.emr_server.controllers;

import com.jktw_emr.emr_server.model.Appointment;
import com.jktw_emr.emr_server.model.Patient;
import com.jktw_emr.emr_server.services.AppointmentService;
import com.jktw_emr.emr_server.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class AppointmentController {

    @Autowired
    AppointmentService appointmentService;

    @PostMapping("/appointment")
    Appointment create(@RequestBody Appointment appointment) {
        return appointmentService.save(appointment);
    }

    @GetMapping("/appointment")
    Iterable<Appointment> read() {
        return appointmentService.findAll();
    }

    @PutMapping("/appointment")
    Appointment update(@RequestBody Appointment appointment) {
        return appointmentService.save(appointment);
    }

    @DeleteMapping("/appointment/{id}")
    void delete(@PathVariable Integer id) {
        appointmentService.deleteById(id);
    }
}
