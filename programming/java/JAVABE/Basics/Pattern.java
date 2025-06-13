import java.util.*;

public class Pattern {
    public static void main(String[] args){
        // Pattern Assignment
        // L to R: * ** *** ****
        System.out.print("Enter no of rows: ");
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        // Pattern 1
        System.out.println("Pattern 1");
        for(int i=0; i<n; i++){
            for(int j=0; j<=i; j++){
                System.out.print("*");
            }
            System.out.println();
        }

        // Pattern 2
        System.out.println("\nPattern 2");
        for(int i=0; i<n; i++){
            for(int j=0; j<n-i-1; j++){
                System.out.print(' ');
            }
            for(int j=0; j<=i; j++){
                System.out.print('*');
            }
            for(int j=0; j<i; j++){
                System.out.print('*');
            }
            System.out.println();
        }

    }
}
