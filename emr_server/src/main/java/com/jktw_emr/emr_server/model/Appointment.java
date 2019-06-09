package com.jktw_emr.emr_server.model;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Entity
public class Appointment {

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<StaffMember> getStaff() {
        return staff;
    }

    public void setStaff(List<StaffMember> staff) {
        this.staff = staff;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm", timezone = "GMT-05:00")
    @NotNull
    private Date date;
    private String description;
    @ManyToOne
    @NotNull
    @JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id", scope = Patient.class, resolver = EntityIdResolver.class)
    @JsonIdentityReference(alwaysAsId=true) // otherwise first ref as POJO, others as id
    private Patient patient;
    @NotNull
    private String type;
    @ManyToMany(cascade={CascadeType.ALL})
    @NotNull
    @JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id", scope = StaffMember.class, resolver = EntityIdResolver.class)
    @JsonIdentityReference(alwaysAsId=true) // otherwise first ref as POJO, others as id
    private List<StaffMember> staff;
}
