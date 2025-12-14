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
    int n, k; cin>>n>>k;
    int two = 0, three = 0, five = 0;
    int res = INT_MAX, res2 = INT_MAX, res3 = INT_MAX;
    for(int i=0; i<n; i++){ 
        int x; cin>>x;
        if(x%2 == 0) two++;
        if(x%3 == 0) three++;
        if(x%5 == 0) five++;
        if(k == 4){
            if(x%2 <= res2){
                res3 = res2;
                res2 = x%2;
            } 
            else{
                res3 = min(x%2,res3);
            }
        }
        res = min(res, k-x%k);

    }
    if((k == 2 && two > 0) || (k == 3 && three > 0) || (k == 4 && two > 1) || (k == 5 && five > 0)){
        cout<<0<<endl; return;
    }
    if(res2 != INT_MAX && res3 != INT_MAX) res = min(res, 4-res2-res3);
    cout<<res<<endl;    
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