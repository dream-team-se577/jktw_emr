package com.jktw_emr.emr_server.model;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Inheritance(strategy=InheritanceType.JOINED)
public abstract class Person {

    public List<Address> getAddresses() {
        return addresses;
    }

    public void setAddresses(List<Address> addresses) {
        this.addresses = addresses;
    }

    public List<PhoneNumber> getPhoneNumbers() {
        return phoneNumbers;
    }

    public void setPhoneNumbers(List<PhoneNumber> phoneNumbers) {
        this.phoneNumbers = phoneNumbers;
    }

    public List<EmailAddress> getEmailAddresses() {
        return emailAddresses;
    }

    public void setEmailAddresses(List<EmailAddress> emailAddresses) {
        this.emailAddresses = emailAddresses;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PERSON_ID")
    private int id;

    @JsonProperty("first-name")
    @NotNull
    private String firstName;
    @JsonProperty("middle-name")
    private String middleName;
    @JsonProperty("last-name")
    @NotNull
    private String lastName;

    @NotNull
    @ElementCollection
    private List<Address> addresses;

    @NotNull
    @JsonProperty("phone-numbers")
    @ElementCollection
    private List<PhoneNumber> phoneNumbers;

    @NotNull
    @JsonProperty("email-addresses")
    @ElementCollection
    private List<EmailAddress> emailAddresses;
}
