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

    static boolean isPalindrome(String str){
        int s = 0;
        int e = str.length() - 1;

        while(s <= e){
            char sCh = str.charAt(s);
            char eCh = str.charAt(e);
            if(sCh != eCh) return false;
            s++; e--;
        }
        return true;
    }

    static void reverse(List<Integer> nums, PrintWriter out){
        int n = nums.size();

        // Brute: TC: O(n); SC: O(n)
        // Better: TC: O(n/2); SC: O(1)
        // Inbuilt: Collections.reverse()  
        for(int i=0; i<n/2; i++){
            int sI = nums.get(i);
            int eI = nums.get(n-i-1);

            nums.set(i, eI);
            nums.set(n-i-1, sI);
        }


        for(int num: nums){
            out.print(num+" ");
        }
        out.println();
    }

    static boolean isPrime(int n){
        // Brute: O(n)
        // Optimal: sqrt(n)
        // for(int i=2; i<n; i++){
        //     if(n%i == 0) return false;
        // }
        for(int i=2; i*i<n; i++){
            if(n%i == 0) return false;
        }
        return true;
    }

    static List<Integer> divisors(int n){
        // Brute: O(n)
        // Best: O(sqrt(n))
        List<Integer> div = new ArrayList<Integer>();
        // for(int i=1; i<=n; i++){
        //     if(n%i == 0){
        //         div.add(i);
        //     }
        // }
        for(int i=1; i*i <= n; i++){
            if(n%i == 0){
                div.add(i);
                div.add(n/i);
            }
        }
        return div;
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

    static void recur(int n, PrintWriter out){
        if(n == 0) return;
        out.println("Function Call "+n);
        recur(n-1, out);
    }

    static int recursion(int n){
        // Sum - O(n)
        // if(n == 0) return 0;
        // return n + recursion(n-1);

        // Factorial - O(n)
        // if(n == 0) return 1;
        // return n*recursion(n-1);

        // Fibonacci - T(n) = T(n-1) + T(n-2): Branching Factor ^ Depth - 2^n
        if(n < 2) return n;
        return recursion(n-1) + recursion(n-2);
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

        List<Integer> div = divisors(n);
        out.println("Divisors: ");
        for(Integer d: div){
            out.println(d);
        }

        boolean prime = isPrime(n);
        out.println("Prime: "+prime);

        recur(n, out);
        int recursionRes = recursion(n);
        out.println("Fibonacci: "+ recursionRes);

        int len = fr.nextInt();
        List<Integer> arr = new ArrayList<Integer>();
        for(int i=0; i<len; i++){
            arr.add(fr.nextInt());
        }
        out.println("Reverse Array: ");
        reverse(arr, out);

        String str = fr.next();
        out.println("Palindrome Check: "+isPalindrome(str));

        // Hashing
        Map<Integer, Integer> freq = new HashMap<>();
        for(int i=0; i<len; i++){
            int x = arr.get(i);
            freq.put(x, freq.getOrDefault(x, 0)+1);
        }
        for(Map.Entry<Integer, Integer> entry : freq.entrySet()){
            out.println(entry.getKey()+ " "+entry.getValue());
        }

        out.println("=====");
    }
}