import java.util.*;
import java.io.*;

public class Main{
    public static void main(String[] args){
        // String Format Array without any size;

        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();
        
        // Space Separated Inputs -> 1 2 3 4
        // String[] tokens = input.split(" ");

        // Comma Separated Inputs -> 1,2,3,4
        // String[] tokens = input.split(",");

        // Bracket Inputs -> [1, 2, 3, 4]
        // String[] tokens = input.replaceAll("\\[|\\]|\\s","")split(",");

        long[] arr = new int[tokens.length];
        for(int i=0; i<tokens.length; i++){
            arr[i] = Long.parseInt(tokens[i]);
        }

        // Read and Output String
        String[] tokens = input.split(" ");
        System.out.println(Arrays.toString(tokens));

        // 2D Array Input Matrix -> 1,2,3,4,5,6
        String[] tokens = input.split(",");
        int rows = sc.nextInt();
        int cols = sc.nextInt();
        int[][] mat = new int[rows][cols];

        for(int i=0; i<tokens.length; i++){
            int r = i/rows, c = i%cols;
            mat[r][c] = Integer.parseInt(tokens[i]); 
        }

        for(int i=0; i<rows; i++){
            for(int j=0; j<cols; j++){
                System.out.print(mat[i][j]+" ");
            }
            System.out.println("");
        }
        
        // Decimal Inputs -> 12.34567
        double val = sc.nextDouble();
        System.out.printf("%.3f", val);

    }
}