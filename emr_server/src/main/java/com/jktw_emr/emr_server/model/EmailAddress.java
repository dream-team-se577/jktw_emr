package com.jktw_emr.emr_server.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;

@Embeddable
public class EmailAddress {
    public String getLocalPart() {
        return localPart;
    }

    public void setLocalPart(String localPart) {
        this.localPart = localPart;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    @JsonProperty("local-part")
    @NotNull
    private String localPart;
    @NotNull
    private String domain;
}
