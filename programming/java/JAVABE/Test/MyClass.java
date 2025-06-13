import java.util.Scanner;
import java.io.*;

public class MyClass {
    public static void main(String args[]) throws IOException {
        // Scanner for user input
        Scanner sc = new Scanner(System.in);
        // Define the file object
        File file = new File("new.txt");

        // Check if the file exists before writing
        if (!file.exists()) {
            System.out.println("Creating new file...");
        } else {
            System.out.println("File already exists, appending data...");
        }

        // Print Writer for standard output
        PrintWriter out = new PrintWriter(System.out);
        // FileWriter in append mode (true) to prevent overwriting the file
        PrintWriter fOut = new PrintWriter(new FileWriter(file, true));
        fOut.println(sc.nextLine());
        fOut.close();

        System.out.println("Data written to new.txt");

        // Initialize file Scanner AFTER the file exists
        Scanner fSc = new Scanner(file);

        // Reading from the file
        System.out.println("Reading from new.txt...");
        while (fSc.hasNextLine()) {
            System.out.println(fSc.nextLine());
        }

        // Close all open resources
        fSc.close();
        sc.close();
        out.close();
    }
}
