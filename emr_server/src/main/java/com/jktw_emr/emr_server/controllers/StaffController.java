package com.jktw_emr.emr_server.controllers;

import com.jktw_emr.emr_server.model.StaffMember;
import com.jktw_emr.emr_server.services.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/staffMembers")
public class StaffController {
    @Autowired
    StaffService staffService;

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    StaffMember create(@RequestBody StaffMember staffMember)
    {
        return staffService.save(staffMember);
    }

    @GetMapping
    Iterable<StaffMember> read()
    {
        return staffService.findAll();
    }

    @PutMapping("/{id}")
    StaffMember update(@RequestBody StaffMember staffMember)
    {
        return staffService.save(staffMember);
    }

    @DeleteMapping("/{id}")
    void delete(@PathVariable Integer id)
    {
        staffService.deleteById(id);
    }

    @GetMapping("/{id}")
    Optional<StaffMember> findById(@PathVariable Integer id)
    {
        return staffService.findById(id);
    }

    @GetMapping("/search/findByRole")
    Iterable<StaffMember> findByRole(@RequestParam("role") String role)
    {
        return staffService.findByRole(role);
    }

    @GetMapping("/search/findByFirstName")
    Iterable<StaffMember> findByFirstName(@RequestParam("firstName") String firstName)
    {
        return staffService.findByFirstName(firstName);
    }

    @GetMapping("/search/findByLastName")
    Iterable<StaffMember> findByLastName(@RequestParam("lastName") String lastName)
    {
        return staffService.findByFirstName(lastName);
    }

    @GetMapping("/search/findByFirstNameAndLastName")
    Iterable<StaffMember> findByFirstNameAndLastName(@RequestParam("firstName") String firstName,
                                                 @RequestParam("lastName") String lastName)
    {
        return staffService.findByFirstNameAndLastName(firstName, lastName);
    }

    @GetMapping("/search/findByFirstNameAndMiddleNameAndLastName")
    Iterable<StaffMember> findByFirstNameAndMiddleNameAndLastName(@RequestParam("firstName") String firstName,
                                                              @RequestParam("middleName") String middleName,
                                                              @RequestParam("lastName") String lastName)
    {
        return staffService.findByFirstNameAndMiddleNameAndLastName(firstName, middleName, lastName);
    }
}
