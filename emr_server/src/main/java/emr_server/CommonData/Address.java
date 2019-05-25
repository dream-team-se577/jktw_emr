package emr_server.CommonData;

import java.util.Objects;

public class Address {
    @Override
    public int hashCode() {
        return Objects.hash(streetNumber, houseNumber, streetName, cityName, stateName, countryName);
    }

    @Override
    public boolean equals(Object o)
    {
        if (this == o) return true;
        if (o == null) return false;
        if (this.getClass() != o.getClass()) return false;

        Address address = (Address) o;

        return address.streetNumber.toLowerCase().equals(this.streetNumber.toLowerCase()) &&
                address.houseNumber.toLowerCase().equals(this.houseNumber.toLowerCase()) &&
                address.streetName.toLowerCase().equals(this.streetName.toLowerCase()) &&
                address.cityName.toLowerCase().equals(this.cityName.toLowerCase()) &&
                address.stateName.toLowerCase().equals(this.stateName.toLowerCase()) &&
                address.countryName.toLowerCase().equals(this.countryName.toLowerCase());
    }

    public String getStreetNumber() {
        return streetNumber;
    }

    // Apartment number, condo number, etc.
    public String getHouseNumber() {
        return houseNumber;
    }

    public String getStreetName() {
        return streetName;
    }

    public String getCityName() {
        return cityName;
    }

    public String getStateName() {
        return stateName;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setStreetNumber(String streetNumber) {
        this.streetNumber = streetNumber;
    }

    // Apartment number, condo number, etc.
    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public void setStateName(String stateName) {
        this.stateName = stateName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    private String streetNumber;
    private String houseNumber;
    private String streetName;
    private String cityName;
    private String stateName;
    private String countryName;
}
