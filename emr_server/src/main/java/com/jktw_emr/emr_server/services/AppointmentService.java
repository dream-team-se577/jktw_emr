package com.jktw_emr.emr_server.services;

import com.jktw_emr.emr_server.model.Appointment;
import com.jktw_emr.emr_server.model.Patient;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

public interface AppointmentService extends CrudRepository<Appointment, Integer> {

    List<Appointment> findByDateBetween(@Param("dateStart") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") Date startDate,
                                        @Param("dateEnd") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") Date endDate);

    List<Appointment> findByPatient(@Param("patient") Patient patientId);
}
