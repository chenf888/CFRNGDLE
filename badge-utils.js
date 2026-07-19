// badge-utils.js – 徽章检查工具函数库
(function() {
    'use strict';

    var Utils = {};

    // ---------- 基础数学函数 ----------

    /** 有效长度（去掉前导零，全零视为1） */
    Utils.getEffectiveLength = function(s) {
        var t = s.replace(/^0+/, '');
        return t.length === 0 ? 1 : t.length;
    };

    /** 质数判断（6k±1 优化） */
    Utils.isPrime = function(n) {
        if (n < 2) return false;
        if (n % 2 === 0) return n === 2;
        if (n % 3 === 0) return n === 3;
        for (var i = 5; i * i <= n; i += 6) {
            if (n % i === 0 || n % (i + 2) === 0) return false;
        }
        return true;
    };

    /** 半质数 */
    Utils.isSemiprime = function(n) {
        if (n < 4) return false;
        if (Utils.isPrime(n)) return false;
        for (var i = 2; i * i <= n; i++) {
            if (n % i === 0) {
                var j = n / i;
                return Utils.isPrime(i) && Utils.isPrime(j);
            }
        }
        return false;
    };

    /** 盈数 */
    Utils.isAbundant = function(n) {
        if (n < 1) return false;
        var sum = 0;
        var limit = Math.sqrt(n);
        for (var i = 1; i <= limit; i++) {
            if (n % i === 0) {
                sum += i;
                var j = n / i;
                if (j !== i) sum += j;
            }
        }
        return sum > 2 * n;
    };

    /** 完全数（6, 28, 496, 8128…） */
    Utils.isPerfectNumber = function(n) {
        if (n < 2) return false;
        var sum = 1;
        var limit = Math.sqrt(n);
        for (var i = 2; i <= limit; i++) {
            if (n % i === 0) {
                sum += i;
                var j = n / i;
                if (j !== i) sum += j;
            }
        }
        return sum === n;
    };

    /** 完全平方 */
    Utils.isPerfectSquare = function(n) {
        var s = Math.sqrt(n);
        return s === Math.floor(s);
    };

    /** 完全立方 */
    Utils.isPerfectCube = function(n) {
        var c = Math.cbrt(n);
        return Math.abs(c - Math.round(c)) < 1e-10;
    };

    /** 2 的幂 */
    Utils.isPowerOf2 = function(n) {
        return n > 0 && (n & (n - 1)) === 0;
    };

    /** 斐波那契数（5n²±4 是完全平方） */
    Utils.isFibonacci = function(n) {
        var x1 = 5 * n * n + 4;
        var x2 = 5 * n * n - 4;
        return Utils.isPerfectSquare(x1) || Utils.isPerfectSquare(x2);
    };

    /** 孪生质数 */
    Utils.isTwinPrime = function(n) {
        if (!Utils.isPrime(n)) return false;
        return Utils.isPrime(n - 2) || Utils.isPrime(n + 2);
    };

    // ---------- 字符串/模式函数 ----------

    /** 子串包含 */
    Utils.hasSubstring = function(s, sub) {
        return s.indexOf(sub) !== -1;
    };

    /** 子串出现次数 */
    Utils.countSubstring = function(s, sub) {
        if (sub.length === 0) return 0;
        var count = 0;
        var pos = 0;
        while ((pos = s.indexOf(sub, pos)) !== -1) {
            count++;
            pos += 1; // 允许重叠
        }
        return count;
    };

    /** 回文数 */
    Utils.isPalindrome = function(s) {
        var i = 0, j = s.length - 1;
        while (i < j) { if (s[i] !== s[j]) return false; i++; j--; }
        return s.length > 1;
    };

    /** 非递减（每位 >= 前一位，至少两位不同） */
    Utils.isNonDecreasing = function(s) {
        var hasIncrease = false;
        for (var i = 1; i < s.length; i++) {
            if (s[i] < s[i - 1]) return false;
            if (s[i] > s[i - 1]) hasIncrease = true;
        }
        return hasIncrease;
    };

    /** 非递增（每位 <= 前一位，至少两位不同） */
    Utils.isNonIncreasing = function(s) {
        var hasDecrease = false;
        for (var i = 1; i < s.length; i++) {
            if (s[i] > s[i - 1]) return false;
            if (s[i] < s[i - 1]) hasDecrease = true;
        }
        return hasDecrease;
    };

    /** 最长连续相同数字长度 */
    Utils.maxConsecutiveSame = function(s) {
        if (s.length === 0) return 0;
        var maxRun = 1, cur = 1;
        for (var i = 1; i < s.length; i++) {
            if (s[i] === s[i - 1]) { cur++; maxRun = Math.max(maxRun, cur); }
            else { cur = 1; }
        }
        return maxRun;
    };

    /** 各数字出现频次（返回数组 [0..9]） */
    Utils.countDigitFreq = function(s) {
        var f = [0,0,0,0,0,0,0,0,0,0];
        for (var i = 0; i < s.length; i++) { f[+s[i]]++; }
        return f;
    };

    /** 不同数字个数 */
    Utils.uniqueDigitCount = function(s) {
        var seen = {};
        for (var i = 0; i < s.length; i++) { seen[s[i]] = 1; }
        var count = 0;
        for (var k in seen) { if (seen.hasOwnProperty(k)) count++; }
        return count;
    };

    /** 前缀匹配长度（用于 π/e/φ 连续匹配） */
    Utils.prefixMatchLength = function(s, target) {
        var i = 0;
        while (i < s.length && i < target.length && s[i] === target[i]) { i++; }
        return i;
    };

    /** 山峰数：先严格升后严格降，有唯一峰顶 */
    Utils.isMountain = function(s) {
        if (s.length < 3) return false;
        var i = 0, n = s.length;
        while (i + 1 < n && s[i] < s[i + 1]) i++;
        if (i === 0 || i === n - 1) return false; // 没有上升或没有下降
        while (i + 1 < n && s[i] > s[i + 1]) i++;
        return i === n - 1;
    };

    /** 山谷数：先严格降后严格升 */
    Utils.isValley = function(s) {
        if (s.length < 3) return false;
        var i = 0, n = s.length;
        while (i + 1 < n && s[i] > s[i + 1]) i++;
        if (i === 0 || i === n - 1) return false;
        while (i + 1 < n && s[i] < s[i + 1]) i++;
        return i === n - 1;
    };

    /** 奇偶严格交替 */
    Utils.isAlternating = function(s) {
        if (s.length < 2) return false;
        for (var i = 1; i < s.length; i++) {
            if ((+s[i] % 2) === (+s[i - 1] % 2)) return false;
        }
        return true;
    };

    /** 数字各位和 */
    Utils.sumOfDigits = function(s) {
        var sum = 0;
        for (var i = 0; i < s.length; i++) sum += +s[i];
        return sum;
    };

    /** 数字各位积 */
    Utils.productOfDigits = function(s) {
        var p = 1;
        for (var i = 0; i < s.length; i++) p *= +s[i];
        return p;
    };

    /** 各位平方和 */
    Utils.sumOfSquares = function(s) {
        var sum = 0;
        for (var i = 0; i < s.length; i++) { var d = +s[i]; sum += d * d; }
        return sum;
    };

    /** 手机键盘同行（至少连续3个同行） */
    Utils.hasPhoneRow = function(s) {
        var rows = { '1':0,'2':0,'3':0, '4':1,'5':1,'6':1, '7':2,'8':2,'9':2, '0':3 };
        for (var i = 0; i <= s.length - 3; i++) {
            var r = rows[s[i]];
            if (r === undefined) continue;
            var j = i + 1;
            while (j < s.length && rows[s[j]] === r) j++;
            if (j - i >= 3) return true;
            // i will be incremented, so set to j-2
        }
        return false;
    };

    /** 之字形：相邻差值符号严格交替（上-下-上-下… 或 下-上-下-上…） */
    Utils.isZigzag = function(s) {
        if (s.length < 3) return false;
        // 找到第一个非零差值确定方向
        var up;
        for (var i = 1; i < s.length; i++) {
            if (s[i] !== s[i - 1]) {
                up = +s[i] > +s[i - 1];
                break;
            }
        }
        if (up === undefined) return false; // 全部相同
        for (var i = 2; i < s.length; i++) {
            if (s[i] === s[i - 1]) continue; // 相等跳过
            var isUp = +s[i] > +s[i - 1];
            // 期望翻转：当前方向应与 up 不同
            var expectedUp = (i % 2 === up ? false : true);
            // 简化：每次有差值时方向应翻转
        }
        // 重写：
        var lastDir = null;
        for (var i = 1; i < s.length; i++) {
            if (s[i] === s[i - 1]) continue;
            var dir = +s[i] > +s[i - 1];
            if (lastDir !== null && dir === lastDir) return false;
            lastDir = dir;
        }
        return lastDir !== null; // 至少有一次翻转
    };

    /** 等步长等差数列 */
    Utils.isArithmeticProgression = function(s, step) {
        if (s.length < 2) return false;
        var first = +s[0];
        for (var i = 1; i < s.length; i++) {
            if (+s[i] !== first + i * step) return false;
        }
        return true;
    };

    /** 每位数字 ≤ n */
    Utils.allDigitsLTE = function(s, n) {
        for (var i = 0; i < s.length; i++) { if (+s[i] > n) return false; }
        return true;
    };

    /** 每位数字 ≥ n */
    Utils.allDigitsGTE = function(s, n) {
        for (var i = 0; i < s.length; i++) { if (+s[i] < n) return false; }
        return true;
    };

    /** 前半（前 floor(n/2) 位）每位 ≤ n */
    Utils.firstHalfLTE = function(s, n) {
        var half = Math.floor(s.length / 2);
        for (var i = 0; i < half; i++) { if (+s[i] > n) return false; }
        return true;
    };

    /** 后半每位 ≤ n */
    Utils.secondHalfLTE = function(s, n) {
        var half = Math.floor(s.length / 2);
        for (var i = s.length - half; i < s.length; i++) { if (+s[i] > n) return false; }
        return true;
    };

    /** 前半 == 后半（忽略中间位，奇数长度时） */
    Utils.firstHalfEqualsSecondHalf = function(s) {
        var n = s.length;
        var half = Math.floor(n / 2);
        var first = s.substring(0, half);
        var second = s.substring(n - half);
        return first === second;
    };

    /** 连续成对（三对不同重复数字，如 112233 出现在连续位置） */
    Utils.hasTriplePair = function(s) {
        if (s.length < 6) return false;
        for (var i = 0; i <= s.length - 6; i++) {
            if (s[i] === s[i+1] && s[i+2] === s[i+3] && s[i+4] === s[i+5] &&
                s[i] !== s[i+2] && s[i] !== s[i+4] && s[i+2] !== s[i+4]) return true;
        }
        return false;
    };

    /** 三对子（至少三对不同数字各出现 ≥2 次，非连续也可） */
    Utils.hasThreePairs = function(s) {
        var f = Utils.countDigitFreq(s);
        var pairs = 0;
        for (var i = 0; i < 10; i++) { if (f[i] >= 2) pairs++; }
        return pairs >= 3;
    };

    /** 相邻两位和为10 */
    Utils.allAdjacentSum10 = function(s) {
        if (s.length < 2) return false;
        for (var i = 0; i < s.length - 1; i++) {
            if (+s[i] + +s[i + 1] !== 10) return false;
        }
        return true;
    };

    /** 各位积 == 各位和 */
    Utils.sumEqualsProduct = function(s) {
        var sum = 0, prod = 1;
        for (var i = 0; i < s.length; i++) {
            var d = +s[i];
            sum += d;
            prod *= d;
        }
        return sum === prod;
    };

    /** 全偶数（0也算偶数） */
    Utils.allEven = function(s) {
        for (var i = 0; i < s.length; i++) { if (+s[i] % 2 !== 0) return false; }
        return true;
    };

    /** 全奇数 */
    Utils.allOdd = function(s) {
        for (var i = 0; i < s.length; i++) { if (+s[i] % 2 === 0) return false; }
        return true;
    };

    /** 全连续数字（排序后为连续区间，允许至多1个重复） */
    Utils.isAllConsecutive = function(s) {
        var digits = [];
        for (var i = 0; i < s.length; i++) digits.push(+s[i]);
        digits.sort(function(a,b){return a-b;});
        var uniqueCount = 0;
        var prev = -2;
        for (var i = 0; i < digits.length; i++) {
            if (digits[i] !== prev) {
                uniqueCount++;
                prev = digits[i];
            }
        }
        // 排序后首尾差应为 uniqueCount-1
        var range = digits[digits.length - 1] - digits[0];
        return range === uniqueCount - 1 && uniqueCount >= 9;
    };

    // ---------- 新增工具函数 ----------

    /** 恰好 n 个 digit */
    Utils.exactCount = function(s, digit, n) {
        var c = 0;
        for (var i = 0; i < s.length; i++) { if (+s[i] === digit) c++; }
        return c === n;
    };

    /** 哈沙德数：能被各位和整除 */
    Utils.isHarshad = function(s) {
        var sum = Utils.sumOfDigits(s);
        return sum > 0 && int(s) % sum === 0;
    };

    /** 莫兰数：哈沙德且商为质数 */
    Utils.isMoran = function(s) {
        var sum = Utils.sumOfDigits(s);
        if (sum === 0) return false;
        var n = int(s);
        if (n % sum !== 0) return false;
        return Utils.isPrime(n / sum);
    };

    /** 快乐数：各位平方和迭代最终=1 */
    Utils.isHappy = function(n) {
        var seen = {};
        while (n !== 1) {
            if (seen[n]) return false;
            seen[n] = true;
            var sum = 0;
            while (n > 0) { var d = n % 10; sum += d * d; n = Math.floor(n / 10); }
            n = sum;
        }
        return true;
    };

    /** 三角数：n(n+1)/2 ⇔ 8n+1 是完全平方 */
    Utils.isTriangular = function(n) {
        var x = 8 * n + 1;
        return Utils.isPerfectSquare(x);
    };

    /** n 是 base 的幂 */
    Utils.isPowerOf = function(n, base) {
        if (n < 1 || base < 2) return false;
        while (n % base === 0) n /= base;
        return n === 1;
    };

    /** 卡塔兰数：C_n = (2n)!/(n!(n+1)!) — 前几个：1,2,5,14,42,132,429,1430,4862,16796,58786… */
    Utils.isCatalan = function(n) {
        var catalans = [1,2,5,14,42,132,429,1430,4862,16796,58786,208012,742900,2674440,9694845,35357670,129644790,477638700,1767263190,6564120420];
        for (var i = 0; i < catalans.length; i++) { if (catalans[i] === n) return true; }
        return false;
    };

    /** 相邻位差 ≤1（Turtle） */
    Utils.isTurtle = function(s) {
        for (var i = 1; i < s.length; i++) {
            if (Math.abs(+s[i] - +s[i-1]) > 1) return false;
        }
        return true;
    };

    /** 存在相邻位差 ≤1 */
    Utils.hasNeighbor = function(s) {
        for (var i = 1; i < s.length; i++) {
            if (Math.abs(+s[i] - +s[i-1]) <= 1) return true;
        }
        return false;
    };

    /** 所有相邻位差 ≥5 */
    Utils.isFarNeighbor = function(s) {
        for (var i = 1; i < s.length; i++) {
            if (Math.abs(+s[i] - +s[i-1]) < 5) return false;
        }
        return true;
    };

    /** 存在相邻位差 ≥7（悬崖） */
    Utils.hasCliff = function(s) {
        for (var i = 1; i < s.length; i++) {
            if (Math.abs(+s[i] - +s[i-1]) >= 7) return true;
        }
        return false;
    };

    /** 高原：连续≥n位相同且不在开头/结尾 */
    Utils.hasPlateau = function(s, n) {
        for (var i = 1; i <= s.length - n; i++) {
            var ok = true;
            for (var j = 1; j < n; j++) { if (s[i] !== s[i+j]) { ok = false; break; } }
            if (ok && i > 0 && i + n < s.length && s[i-1] !== s[i] && s[i+n] !== s[i]) return true;
        }
        return false;
    };

    /** 波浪：严格交替升降 ≥n 次 */
    Utils.isWave = function(s, n) {
        if (s.length < n + 1) return false;
        var flips = 0;
        var lastDir = null;
        for (var i = 1; i < s.length; i++) {
            if (s[i] === s[i-1]) continue;
            var dir = +s[i] > +s[i-1];
            if (lastDir !== null && dir !== lastDir) flips++;
            lastDir = dir;
        }
        return flips >= n;
    };

    /** 过山车：至少 peaks 个山峰（升→降拐点） */
    Utils.isRollercoaster = function(s, peaks) {
        var count = 0;
        for (var i = 1; i < s.length - 1; i++) {
            if (+s[i] > +s[i-1] && +s[i] > +s[i+1]) count++;
        }
        return count >= peaks;
    };

    /** 恰好一对重复，其余9位互不相同 */
    Utils.hasExactPair = function(s) {
        var f = Utils.countDigitFreq(s);
        var pairs = 0, singles = 0;
        for (var i = 0; i < 10; i++) {
            if (f[i] === 2) pairs++;
            else if (f[i] === 1) singles++;
        }
        return pairs === 1 && singles === 9;
    };

    /** 三明治：首位==末位，中间不含该数字 */
    Utils.isSandwich = function(s) {
        if (s[0] !== s[s.length-1]) return false;
        var d = s[0];
        for (var i = 1; i < s.length - 1; i++) { if (s[i] === d) return false; }
        return true;
    };

    /** 正则形：第1==第11, 第2==第10, ... 第5==第7 */
    Utils.isSymmetricPairs = function(s) {
        for (var i = 0; i < Math.floor(s.length/2); i++) {
            if (s[i] !== s[s.length-1-i]) return false;
        }
        return true;
    };

    /** 只含指定数字集合 */
    Utils.onlyFrom = function(s, digits) {
        for (var i = 0; i < s.length; i++) { if (digits.indexOf(+s[i]) === -1) return false; }
        return true;
    };

    /** 不含指定数字集合 */
    Utils.noneFrom = function(s, digits) {
        for (var i = 0; i < s.length; i++) { if (digits.indexOf(+s[i]) !== -1) return false; }
        return true;
    };

    /** 奇偶数量差 ≤diff */
    Utils.halfEvenHalfOdd = function(s, diff) {
        var even = 0, odd = 0;
        for (var i = 0; i < s.length; i++) {
            if (+s[i] % 2 === 0) even++; else odd++;
        }
        return Math.abs(even - odd) <= diff;
    };

    /** 包含 ABAB 模式（如1212） */
    Utils.hasABAB = function(s) {
        for (var i = 0; i <= s.length - 4; i++) {
            if (s[i] === s[i+2] && s[i+1] === s[i+3] && s[i] !== s[i+1]) return true;
        }
        return false;
    };

    /** 包含 ABCABC 模式（如123123） */
    Utils.hasABCABC = function(s) {
        for (var i = 0; i <= s.length - 6; i++) {
            if (s[i] === s[i+3] && s[i+1] === s[i+4] && s[i+2] === s[i+5] &&
                s[i] !== s[i+1] && s[i+1] !== s[i+2] && s[i] !== s[i+2]) return true;
        }
        return false;
    };

    /** 包含循环旋转子串 — s 的某一旋转是 s 的子串（非自身，长度≥3） */
    Utils.hasRotation = function(s) {
        // 检查是否存在长度≥3的子串A和偏移k使得A旋转后出现在别处
        for (var len = 3; len <= 5; len++) {
            for (var i = 0; i <= s.length - len; i++) {
                var sub = s.substring(i, i + len);
                // 旋转1位：sub[1..] + sub[0]
                var rot = sub.substring(1) + sub[0];
                if (s.indexOf(rot) !== -1 && s.indexOf(rot) !== i) return true;
            }
        }
        return false;
    };

    /** ABA 开头（第1==第3, 第2不同） */
    Utils.startsWithABA = function(s) {
        return s[0] === s[2] && s[0] !== s[1];
    };

    /** 包含连续 ≥len 位递增差1 */
    Utils.hasIncreasingRun = function(s, len) {
        var run = 1;
        for (var i = 1; i < s.length; i++) {
            if (+s[i] === +s[i-1] + 1) { run++; if (run >= len) return true; }
            else run = 1;
        }
        return false;
    };

    /** 包含连续 ≥len 位递减差1 */
    Utils.hasDecreasingRun = function(s, len) {
        var run = 1;
        for (var i = 1; i < s.length; i++) {
            if (+s[i] === +s[i-1] - 1) { run++; if (run >= len) return true; }
            else run = 1;
        }
        return false;
    };

    /** 梅森素数：2^p-1 且是质数 */
    Utils.isMersennePrime = function(n) {
        if (!Utils.isPrime(n)) return false;
        var x = n + 1;
        return Utils.isPowerOf(x, 2);
    };

    function int(s) { return parseInt(s, 10); }

    window.BadgeUtils = Utils;
})();
