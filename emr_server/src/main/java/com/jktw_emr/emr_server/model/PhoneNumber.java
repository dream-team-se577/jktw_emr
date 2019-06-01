package com.jktw_emr.emr_server.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Embeddable
public class PhoneNumber {
    public String getAreaCode() {
        return areaCode;
    }

    public void setAreaCode(String areaCode) {
        this.areaCode = areaCode;
    }

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public String getLineNumber() {
        return lineNumber;
    }

    public void setLineNumber(String lineNumber) {
        this.lineNumber = lineNumber;
    }

    @Override
    public String toString()
    {
        return areaCode + "-" + prefix + "-" + lineNumber;
    }

    @JsonProperty("area-code")
    @Size(min=3, max=3)
    @NotNull
    private String areaCode;

    @Size(min=3, max=3)
    @NotNull
    private String prefix;

    @JsonProperty("line-number")
    @Size(min=4, max=4)
    @NotNull
    private String lineNumber;
}
