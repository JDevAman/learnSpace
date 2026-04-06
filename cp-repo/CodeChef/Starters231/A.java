import java.io.*;
import java.util.*;

public class A {
    static class FastReader {
        BufferedReader br;
        StringTokenizer st;

        public FastReader() {
            br = new BufferedReader(new InputStreamReader(System.in));
        }

        String next() {
            while (st == null || !st.hasMoreElements()) {
                try { st = new StringTokenizer(br.readLine()); }
                catch (IOException e) { e.printStackTrace(); }
            }
            return st.nextToken();
        }

        int nextInt() { return Integer.parseInt(next()); }
        long nextLong() { return Long.parseLong(next()); }
        double nextDouble() { return Double.parseDouble(next()); }
    }

    public static void main(String[] args) {
        // Checking if online_judge
        if (System.getProperty("ONLINE_JUDGE") == null) {
            try {
                System.setIn(new FileInputStream("inputf.in"));
                System.setOut(new PrintStream(new FileOutputStream("outputf.out")));
            } catch (Exception e) {
                // Files not found? No problem, it will use standard I/O
            }
        }

        FastReader fr = new FastReader();
        PrintWriter out = new PrintWriter(System.out);

        // Handle t test cases.
        int t = fr.nextInt();
        while (t-- > 0) {
            solve(fr, out);
        }

        out.flush();
        out.close();
    }

    static void solve(FastReader fr, PrintWriter out) {
        int n = fr.nextInt();
        int p = fr.nextInt();
        out.println("First Num: "+n);
        out.println("Second Num: "+p);


        // Count all digits of number 
        out.print("Count Digit: ");
        int digitCnt = 0;
        int num = n;
        while(num > 0){
            digitCnt++;
            num /= 10;
        }
        out.println(digitCnt);

        // Reverse a number
        out.print("Reverse Number: ");
        int reverseNum = 0;
        num = n;
        while(num > 0){
            int currDigit = num % 10;
            reverseNum = reverseNum*10 + currDigit;
            num /= 10; 
        }
        out.println(reverseNum);

        // Palindrome Number
        num = n;
        boolean isPalindrome = (reverseNum == num) ? true: false;
        out.println("Is Palindrome: "+isPalindrome);

        // GCD of two numbers
        int res = gcd(n, p);
        out.println("GCD: "+ res);


        boolean match = armstrong(n);
        out.println("Armstrong: "+ match);
        out.println("=====");
    }
}