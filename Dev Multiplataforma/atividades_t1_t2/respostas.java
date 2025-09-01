import java.util.Scanner;

public class respostas {
    public static void main(String[] args) {
        String str1= "java"; 
        String str2=new String("java");
        System.out.println( str1==str2 );
        System.out.println( str1==str2.intern() );
    }
}