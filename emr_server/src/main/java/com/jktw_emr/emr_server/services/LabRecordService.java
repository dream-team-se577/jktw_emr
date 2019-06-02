package com.jktw_emr.emr_server.services;

import com.jktw_emr.emr_server.model.LabRecord;
import com.jktw_emr.emr_server.model.Patient;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

public interface LabRecordService extends CrudRepository<LabRecord, Integer> {
    @Override
    @RestResource(exported = false)
    void delete(LabRecord entity);

    List<LabRecord> findByDateBetween(@Param("dateStart") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") Date startDate,
                                        @Param("dateEnd") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") Date endDate);

    List<LabRecord> findByPatient(@Param("patient") Patient patient);
}
