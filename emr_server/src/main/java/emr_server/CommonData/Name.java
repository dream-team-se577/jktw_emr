package emr_server.CommonData;

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
