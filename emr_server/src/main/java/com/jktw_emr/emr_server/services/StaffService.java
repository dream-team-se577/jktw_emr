package com.jktw_emr.emr_server.services;

import com.jktw_emr.emr_server.model.StaffMember;
import org.springframework.data.repository.CrudRepository;

public interface StaffService extends CrudRepository<StaffMember, Integer> {
}
