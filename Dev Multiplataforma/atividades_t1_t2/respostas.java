public class respostas {
    public static int recur(int x, int y) { 
    if (x == 0) { 
        return y; 
    } 
        return recur(x - 1, x + y); 
    } 
    public static void main (String[]args)    { 
        System.out.println(recur(4, 3));
    }
}