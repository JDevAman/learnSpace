class Solution {
    public boolean validDigit(int n, int x) {
        int rem = -1;
        int cnt = 0;
        while(n > 0){
            rem = n%10;
            if(rem == x) cnt++;
            n /= 10;
        }

        if(cnt > 0 && rem != x) return true;
        return false;
    }
}