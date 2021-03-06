package com.jktw_emr.emr_server.model;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Entity(name = "Patient")
public class Patient extends Person {

    public String getSsn() {
        return ssn;
    }

    public void setSsn(String ssn) {
        this.ssn = ssn;
    }

    public List<LabRecord> getLabRecords() {
        return labRecords;
    }

    public void setLabRecords(List<LabRecord> labRecords) {
        this.labRecords = labRecords;
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }

    @NotNull
    @Size(min = 9, max = 9)
    private String ssn;

    @OneToMany(mappedBy = "patient")
    @NotNull
    @JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id", scope = LabRecord.class, resolver = EntityIdResolver.class)
    @JsonIdentityReference(alwaysAsId=true) // otherwise first ref as POJO, others as id
    private List<LabRecord> labRecords;
    @OneToMany(mappedBy = "patient")
    @NotNull
    @JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id", scope = Appointment.class, resolver = EntityIdResolver.class)
    @JsonIdentityReference(alwaysAsId=true) // otherwise first ref as POJO, others as id
    private List<Appointment> appointments;
}
