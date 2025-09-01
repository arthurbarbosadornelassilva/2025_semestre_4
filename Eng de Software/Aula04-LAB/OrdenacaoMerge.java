import java.util.Random;

public class OrdenacaoMerge {

    // Função principal
    public static void main(String[] args) {
        int[] vetor = new int[100];

        // Preencher vetor com números aleatórios
        Random rnd = new Random();
        for (int i = 0; i < vetor.length; i++) { // ERRO: deveria ser < vetor.length
            vetor[i] = rnd.nextInt(1000); // números entre 0 e 999
        }

        // Chamada da ordenação
        mergeSort(vetor, 0, vetor.length - 1);

        // Exibir vetor ordenado
        System.out.println("Vetor ordenado:"); // ERRO: "ou" em vez de "out"
        for (int i = 0; i < vetor.length; i++) { // ERRO: "legth" em vez de "length"
            System.out.print(vetor[i] + " ");
        }
    }

    // Implementação do Merge Sort
    public static void mergeSort(int[] array, int inicio, int fim) {
        if (inicio < fim) {
            int meio = (inicio + fim) / 2;
            mergeSort(array, inicio, meio);
            mergeSort(array, meio + 1, fim);
            merge(array, inicio, meio, fim);
        }
    }

    public static void merge(int[] array, int inicio, int meio, int fim) {
        int n1 = meio - inicio + 1;
        int n2 = fim - meio;

        int[] L = new int[n1];
        int[] R = new int[n2];

        // Copiando os dados para os vetores auxiliares
        for (int i = 0; i < n1; i++) {
            L[i] = array[inicio + i];
        }
        for (int j = 0; j < n2; j++) {
            R[j] = array[meio + 1 + j];
        }

        // Intercalando os dois vetores
        int i = 0, j = 0;
        int k = inicio;

        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                array[k] = L[i];
                i++;
            } else {
                array[k] = R[j];
                j++;
            }
            k++;
        }

        // Copia os elementos restantes de L[]
        while (i < n1) {
            array[k] = L[i];
            i++;
            k++;
        }

        // Copia os elementos restantes de R[]
        while (j < n2) {
            array[k] = R[j];
            j++;
            k++;
        }
    }
}