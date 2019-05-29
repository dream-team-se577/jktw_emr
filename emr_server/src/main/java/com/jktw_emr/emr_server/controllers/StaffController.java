package com.jktw_emr.emr_server.controllers;

import com.jktw_emr.emr_server.model.StaffMember;
import com.jktw_emr.emr_server.services.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class StaffController {
    @Autowired
    StaffService staffService;

    @PostMapping("/staff")
    StaffMember create(@RequestBody StaffMember staff) {
        return staffService.save(staff);
    }

    @GetMapping("/staff")
    Iterable<StaffMember> read() {
        return staffService.findAll();
    }

    @PutMapping("/staff")
    StaffMember update(@RequestBody StaffMember staff) {
        return staffService.save(staff);
    }

    @DeleteMapping("/staff/{id}")
    void delete(@PathVariable Integer id) {
        staffService.deleteById(id);
    }
}
