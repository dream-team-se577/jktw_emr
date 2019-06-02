package com.jktw_emr.emr_server.controllers;

import com.jktw_emr.emr_server.model.LabRecord;
import com.jktw_emr.emr_server.model.Patient;
import com.jktw_emr.emr_server.services.LabRecordService;
import com.jktw_emr.emr_server.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/labRecords")
public class LabRecordController {
    @Autowired
    LabRecordService labRecordService;

    @Autowired
    PatientService patientService;

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    LabRecord create(@RequestBody LabRecord labRecord)
    {
        return labRecordService.save(labRecord);
    }

    @GetMapping
    Iterable<LabRecord> read()
    {
        return labRecordService.findAll();
    }

    @PutMapping
    LabRecord update(@RequestBody LabRecord labRecord)
    {
        return labRecordService.save(labRecord);
    }

    @DeleteMapping("/{id}")
    void delete(@PathVariable Integer id)
    {
        labRecordService.deleteById(id);
    }

    @GetMapping("/{id}")
    Optional<LabRecord> findById(@PathVariable Integer id)
    {
        return labRecordService.findById(id);
    }

    @GetMapping("/search/findByDateBetween")
    Iterable<LabRecord> findByDateBetween(
            @RequestParam("dateStart") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")Date startDate,
            @RequestParam("dateEnd") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") Date endDate)
    {
        return labRecordService.findByDateBetween(startDate, endDate);
    }

    @GetMapping("/search/findByPatientId")
    Iterable<LabRecord> findByPatientId(@RequestParam("patient") Integer id)
    {
        Optional<Patient> patient = patientService.findById(id);

        if (!patient.isPresent())
            return new ArrayList<>();

        return labRecordService.findByPatient(patient.get());
    }
}
