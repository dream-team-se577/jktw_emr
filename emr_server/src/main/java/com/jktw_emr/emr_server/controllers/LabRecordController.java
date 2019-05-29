package com.jktw_emr.emr_server.controllers;

import com.jktw_emr.emr_server.model.LabRecord;
import com.jktw_emr.emr_server.services.LabRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class LabRecordController {
    @Autowired
    LabRecordService labRecordService;

    @PostMapping("/labrecord")
    LabRecord create(@RequestBody LabRecord labRecord) {
        return labRecordService.save(labRecord);
    }

    @GetMapping("/labrecord")
    Iterable<LabRecord> read() {
        return labRecordService.findAll();
    }

    @PutMapping("/labrecord")
    LabRecord update(@RequestBody LabRecord labRecord) {
        return labRecordService.save(labRecord);
    }

    @DeleteMapping("/labrecord/{id}")
    void delete(@PathVariable Integer id) {
        labRecordService.deleteById(id);
    }
}
