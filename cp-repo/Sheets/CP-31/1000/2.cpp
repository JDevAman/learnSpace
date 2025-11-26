#include <bits/stdc++.h>
using namespace std;

// Type Aliases
#define int long long
#define vi vector<int>
#define si set<int>
#define mi map<int, int>
#define pi pair<int, int>

// Utility Aliases
#define pq_min priority_queue<int, vector<int>, greater<int>> 
#define pq_max priority_queue<int>

// Output Shorthand
#define yes cout << "Yes" << endl
#define no cout << "No" << endl

void haribhakt_fastio() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);
}

void helper(){   
}

void solve() {
int n, k; 
    cin >> n >> k;

    int count2 = 0, count3 = 0, count5 = 0;
    int res = LLONG_MAX;

    for (int i = 0; i < n; i++) {
        int x; cin >> x;

        if (x % 2 == 0) count2++;
        if (x % 3 == 0) count3++;
        if (x % 5 == 0) count5++;

        res = min(res, (k - x % k) % k);  // safe min-increment
    }

    // Directly divisible cases → answer is 0
    if ((k == 2 && count2 > 0) ||
        (k == 3 && count3 > 0) ||
        (k == 4 && count2 > 1) ||  // two even numbers cover k=4
        (k == 5 && count5 > 0)) {
        cout << 0 << "\n";
        return;
    }

    cout << res << "\n";

}

signed main() {   
    haribhakt_fastio(); 
    int t;
    cin >> t;
    while (t--) {
        solve();
    }
    return 0;
}