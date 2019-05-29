package com.jktw_emr.emr_server.services;

import com.jktw_emr.emr_server.model.Appointment;
import org.springframework.data.repository.CrudRepository;

public interface AppointmentService extends CrudRepository<Appointment, Integer> {
}
