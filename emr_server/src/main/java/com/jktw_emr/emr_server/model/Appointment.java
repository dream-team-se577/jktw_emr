package com.jktw_emr.emr_server.model;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
        property  = "id",
        scope     = Integer.class)
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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm")
    private Date date;
    private String description;
    @ManyToOne
    @JoinColumn(name="patient_id")
    private Patient patient;
    private String type;
    @OneToMany(cascade={CascadeType.REFRESH, CascadeType.MERGE, CascadeType.PERSIST}, fetch = FetchType.LAZY)
    private List<StaffMember> staff;
}
