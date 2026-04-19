package CoreJAVA;

import java.time.Year;

public class ITR {
    static String country = "India";
    Year financialYear;

    static class NewRegime {
        public void print() {
            System.out.println("Current Country " + country);
        }
    }

    public void display() {
        String tokens = "Local Inner Class";
        class PrettyPrint {
            void print() {
                String[] classType = tokens.split(" ");
                StringBuilder sb = new StringBuilder();
                for (String s : classType) {
                    sb.append(s.charAt(0));
                }
                System.out.println("Class Type: "+sb.toString());
            }
        }
        PrettyPrint pr = new PrettyPrint();
        pr.print();
    }
}
