package com.jktw_emr.emr_server.model;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity(name="Staff")
@OnDelete(action = OnDeleteAction.CASCADE)
public class StaffMember extends Person {

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @NotNull
    private String role;
}
