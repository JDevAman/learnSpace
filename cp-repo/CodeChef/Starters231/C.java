import java.io.*;
import java.util.*;

public class Maths {
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

    static boolean armstrong(int n){
        int digitCnt = 0;
        int num = n;
        int res = 0;
        while(num > 0){
            num /= 10;
            digitCnt++;
        }

        num = n;
        while(num > 0){
            int digit = num % 10;
            res += Math.pow(digit, digitCnt);
            num /= 10;
        }
        boolean match = (res == n) ? true : false;
        return match;  
    }

    static int gcd(int a, int b){
        // Brute Force - 1 to min(a,b)
        // Better - min(a,b) to 1
        // Optimised - If (a>b): gcd(a%b, b);
        
        // int minEle = Math.min(a, b);
        // int gcdVal = 1;
        // for(int i=1; i<=minEle; i++){
        //     if(a % i == 0 && b % i == 0){
        //         gcdVal = i;
        //     }
        // }

        // for(int i=minEle; i>=1; i--){
        //     if(a % i == 0 && b % i == 0){
        //         gcdVal = i;
        //         break;
        //     }
        // }

        // return gcdVal;

        // Optimised
        if(a == 0)  return b;
        if(b > a){
            a = a+b;
            b = a-b;
            a = a-b; 
        }

        return gcd(a%b, b);
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