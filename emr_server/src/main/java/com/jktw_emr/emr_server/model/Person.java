package com.jktw_emr.emr_server.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Inheritance(strategy=InheritanceType.JOINED)
public abstract class Person {

    public ContactInformation getContact() {
        return contact;
    }

    public void setContact(ContactInformation contact) {
        this.contact = contact;
    }

    public Name getName() {
        return name;
    }

    public void setName(Name name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "PERSON_ID")
    @JsonProperty(value="person_id")
    private int id;

    @NotNull
    @Embedded
    private Name name;

    @OneToOne(cascade = CascadeType.ALL)
    @JsonManagedReference(value="contact-person")
    private ContactInformation contact;
}
