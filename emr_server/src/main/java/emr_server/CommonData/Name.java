package emr_server.CommonData;

import java.util.Objects;

public class Name {
    private String firstName;
    private String middleName;
    private String lastName;

    public Name(String first, String last)
    {
        this (first, "", last);
    }

    public Name(String first, String middle, String last)
    {
        this.firstName = first;
        this.middleName = middle;
        this.lastName = last;
    }

    @Override
    public int hashCode() {
        return Objects.hash(firstName, middleName, lastName);
    }

    @Override
    public boolean equals(Object o)
    {
        if (this == o) return true;
        if (o == null) return false;
        if (this.getClass() != o.getClass()) return false;

        Name name = (Name) o;

        return name.firstName.toLowerCase().equals(this.firstName.toLowerCase()) &&
                name.middleName.toLowerCase().equals(this.middleName.toLowerCase()) &&
                name.lastName.toLowerCase().equals(this.lastName.toLowerCase());
    }

    public boolean hasMiddleName()
    {
        return middleName.isEmpty();
    }

    public String getFirstName()
    {
        return firstName;
    }

    public String getMiddleName()
    {
        return middleName;
    }

    public String getLastName()
    {
        return lastName;
    }
}
