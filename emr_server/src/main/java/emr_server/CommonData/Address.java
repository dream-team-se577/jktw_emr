package emr_server.CommonData;

public class Address {
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
