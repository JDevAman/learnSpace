// P.S.: You are given a string s consisting of lowercase English characters.
// Rearrange only the vowels in the string so that they appear in non-increasing order of their frequency.
// If multiple vowels have the same frequency, order them by the position of their first occurrence in s.
// Return the modified string.
class Solution {
    public String sortVowels(String s) {
        int[] freq = new int[26];
        int[] firstPos = new int[26];
        Arrays.fill(firstPos, -1);

        String vowels = "aeiou";
        
        for (int i = 0; i < s.length(); i++) {
            char curr = s.charAt(i);
            int vIdx = vowels.indexOf(curr);
            if (vIdx != -1) {
                int idx = curr - 'a';
                freq[idx]++;
                if (firstPos[idx] == -1) firstPos[idx] = i;
            }
        }

        List<int[]> lst = new ArrayList<>();
        for (int i = 0; i < 26; i++) {
            if (freq[i] > 0) {
                lst.add(new int[]{i, freq[i]});
            }
        }

        Collections.sort(lst, (o1, o2) -> {
            if (o1[1] != o2[1]) return Integer.compare(o2[1], o1[1]);
            return Integer.compare(firstPos[o1[0]], firstPos[o2[0]]);
        });

        Deque<int[]> dq = new ArrayDeque<>(lst);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (vowels.indexOf(ch) != -1) {
                int[] curr = dq.pollFirst();
                sb.append((char) (curr[0] + 'a'));
                
                if (curr[1] > 1) {
                    curr[1]--;
                    dq.offerFirst(curr);
                }
            } else {
                sb.append(ch);
            }
        }

        return sb.toString();
    }
}