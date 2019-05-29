package com.jktw_emr.emr_server.services;

import com.jktw_emr.emr_server.model.Patient;
import org.springframework.data.repository.CrudRepository;

public interface PatientService extends CrudRepository<Patient, Integer> {
}
