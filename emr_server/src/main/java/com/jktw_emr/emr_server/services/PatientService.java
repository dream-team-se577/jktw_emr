package com.jktw_emr.emr_server.services;

import com.jktw_emr.emr_server.model.Name;
import com.jktw_emr.emr_server.model.Patient;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;

@RepositoryRestResource(path = "patients")
public interface PatientService extends CrudRepository<Patient, Integer> {
    @Override
    @RestResource(exported = false)
    void delete(Patient entity);

    List<Patient> findBySsn(@Param("ssn") String ssn);
    List<Patient> findByFirstName(@Param("firstName") String firstName);
    List<Patient> findByLastName(@Param("lastName") String lastName);
}
