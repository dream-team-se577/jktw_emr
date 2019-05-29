package com.jktw_emr.emr_server.services;

import com.jktw_emr.emr_server.model.LabRecord;
import org.springframework.data.repository.CrudRepository;

public interface LabRecordService extends CrudRepository<LabRecord, Integer> {
}
