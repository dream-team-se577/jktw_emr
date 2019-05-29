package com.jktw_emr.emr_server.model;

import javax.persistence.*;

@Entity(name="Staff")
public class StaffMember extends Person {

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    private String role;
}
