package com.jktw_emr.emr_server.model;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
        property  = "id",
        scope     = Integer.class)
public class LabRecord {
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

    public String getResults() {
        return results;
    }

    public void setResults(String results) {
        this.results = results;
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

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm")
    private Date date;
    private String results;
    @ManyToOne
    @JoinColumn(name="patient_id")
    private Patient patient;
    private String type;
}
