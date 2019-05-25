package emr_server.CommonData;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class PatientSearch {
    public static class Builder {
        private ArrayList<PatientSearchCriterion> mustHaves = new ArrayList<>();
        private ArrayList<PatientSearchCriterion> couldHaves = new ArrayList<>();

        public Builder mustHave(PatientSearchCriterion criterion)
        {
            this.mustHaves.add(criterion);
            return this;
        }

        public Builder couldHave(PatientSearchCriterion criterion)
        {
            this.couldHaves.add(criterion);
            return this;
        }

        public PatientSearch build(){
            return new PatientSearch(mustHaves, couldHaves);
        }
    }

    public PatientSearch(ArrayList<PatientSearchCriterion> mustHaves,
                         ArrayList<PatientSearchCriterion> couldHaves)
    {
        this.mustHaves = mustHaves;
        this.couldHaves = couldHaves;
    }

    public List<PatientSearchCriterion> getMustHaves() {
        return Collections.unmodifiableList(mustHaves);
    }

    public List<PatientSearchCriterion> getCouldHaves() {
        return Collections.unmodifiableList(couldHaves);
    }

    private ArrayList<PatientSearchCriterion> mustHaves;
    private ArrayList<PatientSearchCriterion> couldHaves;
}
