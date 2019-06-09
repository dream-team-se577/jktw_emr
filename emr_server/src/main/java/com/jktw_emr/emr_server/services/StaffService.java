package com.jktw_emr.emr_server.services;

import com.jktw_emr.emr_server.model.StaffMember;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(path = "staffMembers")
public interface StaffService extends CrudRepository<StaffMember, Integer> {

    List<StaffMember> findByRole(@Param("role") String role);
    List<StaffMember> findByFirstName(@Param("firstName") String firstName);
    List<StaffMember> findByLastName(@Param("lastName") String lastName);
    List<StaffMember> findByFirstNameAndLastName(@Param("firstName") String firstName, @Param("lastName") String lastName);
    List<StaffMember> findByFirstNameAndMiddleNameAndLastName(
            @Param("firstName") String firstName,
            @Param("middleName") String middleName,
            @Param("lastName") String lastName);
}
