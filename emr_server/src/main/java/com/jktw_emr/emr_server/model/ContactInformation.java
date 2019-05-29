package com.jktw_emr.emr_server.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.List;

@Entity
public class ContactInformation {
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

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @OneToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="PERSON_ID")
    @JsonBackReference(value="contact-person")
    private Person person;

    @ElementCollection
    private List<Address> addresses;

    @JsonProperty("phone-numbers")
    @ElementCollection
    private List<PhoneNumber> phoneNumbers;

    @JsonProperty("email-addresses")
    @ElementCollection
    private List<EmailAddress> emailAddresses;
}
