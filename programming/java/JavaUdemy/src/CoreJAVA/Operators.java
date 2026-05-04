package CoreJAVA;

import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Operators {
    public static void main(String[] args) {
        //instanceof
        Scanner sc = new Scanner(System.in);
        Map<Integer, Integer> test = new HashMap();
        System.out.println(test instanceof HashMap<Integer, Integer>);
    }
}
