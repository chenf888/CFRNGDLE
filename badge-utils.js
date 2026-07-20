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

    // ---------- RNGdle 新函数 ----------

    /** 回文旋转180度（Strobogrammatic）：0↔0, 1↔1, 6↔9, 8↔8, 9↔6 */
    Utils.isStrobogrammatic = function(s) {
        var map = {0:0,1:1,6:9,8:8,9:6};
        for (var i = 0, j = s.length-1; i <= j; i++, j--) {
            var a = +s[i], b = +s[j];
            if (map[a] === undefined || map[a] !== b) return false;
        }
        return true;
    };

    /** Pronic数：n(n+1) ↦ 4n+1 是完全平方 */
    Utils.isPronic = function(n) {
        var x = 4 * n + 1;
        return Utils.isPerfectSquare(x);
    };

    /** 韵脚：存在相邻相同 */
    Utils.hasRhyme = function(s) {
        for (var i = 1; i < s.length; i++) { if (s[i] === s[i-1]) return true; }
        return false;
    };

    /** 蛇眼：恰好两个1 */
    Utils.hasSnakeEyes = function(s) {
        return Utils.exactCount(s, 1, 2);
    };

    /** 满堂彩：三带二（任意位置） */
    Utils.hasFullHouse = function(s) {
        var f = Utils.countDigitFreq(s);
        var has3 = false, has2 = false;
        for (var i = 0; i < 10; i++) {
            if (f[i] === 3) has3 = true;
            else if (f[i] === 2) has2 = true;
        }
        return has3 && has2;
    };

    /** 连续满堂彩：XXXYY 或 YYXXX 连续 */
    Utils.hasContiguousFullHouse = function(s) {
        for (var i = 0; i <= s.length - 5; i++) {
            if (s[i]===s[i+1] && s[i+1]===s[i+2] && s[i+3]===s[i+4] && s[i]!==s[i+3]) return true; // XXXYY
            if (s[i]===s[i+1] && s[i+2]===s[i+3] && s[i+3]===s[i+4] && s[i]!==s[i+2]) return true; // XXYYY
        }
        return false;
    };

    /** 21点：各位和=21 */
    Utils.isBlackjack = function(s) {
        return Utils.sumOfDigits(s) === 21;
    };

    /** 深虚空：恰好两个0 */
    Utils.hasDeepVoid = function(s) {
        return Utils.exactCount(s, 0, 2);
    };

    /** 半洁：去掉任意一位后无重复 */
    Utils.isSemiClean = function(s) {
        for (var skip = 0; skip < s.length; skip++) {
            var seen = {};
            var ok = true;
            for (var i = 0; i < s.length; i++) {
                if (i === skip) continue;
                if (seen[s[i]]) { ok = false; break; }
                seen[s[i]] = true;
            }
            if (ok) return true;
        }
        return false;
    };

    /** 低球：所有位≤4 */
    Utils.isLowBall = function(s) {
        return Utils.allDigitsLTE(s, 4);
    };

    /** 书挡：前n位==后n位 */
    Utils.hasBookends = function(s, n) {
        return s.substring(0, n) === s.substring(s.length - n);
    };

    /** 镜像书挡：前n位==后n位反转 */
    Utils.hasMirrorBookends = function(s, n) {
        var pre = s.substring(0, n), post = s.substring(s.length - n);
        return pre === post.split('').reverse().join('');
    };

    /** 口袋镜：至少有一处 s[i]==s[s.length-1-i] 且 i 在前半 */
    Utils.hasPocketMirror = function(s) {
        for (var i = 0; i < Math.floor(s.length/2); i++) {
            if (s[i] === s[s.length-1-i]) return true;
        }
        return false;
    };

    /** τ = 2π = 6.283185307... → "6283185307" */
    Utils.tauMatchLength = function(s, target) {
        return Utils.prefixMatchLength(s, target);
    };

    /** 打乱连续：含 n 个连续数字但顺序打乱（如 312 含 1,2,3） */
    Utils.hasScrambledConsecutive = function(s, n) {
        for (var i = 0; i <= s.length - n; i++) {
            var sub = s.substring(i, i + n);
            var set = {};
            for (var j = 0; j < sub.length; j++) set[+sub[j]] = true;
            var keys = Object.keys(set).map(Number);
            if (keys.length !== n) continue;
            keys.sort(function(a,b){return a-b;});
            if (keys[n-1] - keys[0] === n - 1) return true;
        }
        return false;
    };

    /** 迷你回声：ABA 模式（A≠B 出现在任意位置） */
    Utils.hasMiniEcho = function(s) {
        for (var i = 0; i <= s.length - 3; i++) {
            if (s[i] === s[i+2] && s[i] !== s[i+1]) return true;
        }
        return false;
    };

    /** 丘陵：至少3次升降翻转 */
    Utils.hasHills = function(s) {
        var flips = 0, lastDir = null;
        for (var i = 1; i < s.length; i++) {
            if (+s[i] === +s[i-1]) continue;
            var dir = +s[i] > +s[i-1];
            if (lastDir !== null && dir !== lastDir) flips++;
            lastDir = dir;
        }
        return flips >= 3;
    };

    /** 单跳：存在相邻差==n */
    Utils.hasHop = function(s, n) {
        for (var i = 1; i < s.length; i++) {
            if (Math.abs(+s[i] - +s[i-1]) === n) return true;
        }
        return false;
    };

    /** 双跳：连续两次跳n（a→a+n→a+2n 或反向） */
    Utils.hasDoubleHop = function(s, n) {
        for (var i = 2; i < s.length; i++) {
            if (+s[i-2] + n === +s[i-1] && +s[i-1] + n === +s[i]) return true;
            if (+s[i-2] - n === +s[i-1] && +s[i-1] - n === +s[i]) return true;
        }
        return false;
    };

    /** 沙丘：升→平→降（如 1221 或 2332） */
    Utils.hasDunes = function(s) {
        for (var i = 0; i <= s.length - 4; i++) {
            if (+s[i] < +s[i+1] && s[i+1] === s[i+2] && +s[i+2] > +s[i+3]) return true;
        }
        return false;
    };

    /** 节拍器：每两位一组递增（如 132435） */
    Utils.isMetronome = function(s) {
        for (var i = 0; i + 2 < s.length; i += 2) {
            if (+s[i] >= +s[i+1]) return false;
        }
        return s.length >= 4;
    };

    /** 羽毛：恰好一位≥8，其余≤4 */
    Utils.hasFeather = function(s) {
        var high = 0, low = 0;
        for (var i = 0; i < s.length; i++) {
            if (+s[i] >= 8) high++; else if (+s[i] <= 4) low++;
        }
        return high === 1 && low === s.length - 1;
    };

    /** 萤火虫：偶-奇-偶-奇…且含有数字0 */
    Utils.hasFirefly = function(s) {
        return Utils.isAlternating(s) && s.indexOf('0') !== -1;
    };

    /** 日历：含有效日期模式 MMDDYYYY */
    Utils.hasCalendar = function(s) {
        // 尝试匹配 MMDDYYY 或 MMDDYYYY 在任意8位子串
        for (var i = 0; i <= s.length - 8; i++) {
            var mm = +s.substring(i, i+2);
            var dd = +s.substring(i+2, i+4);
            if (mm >= 1 && mm <= 12 && dd >= 1 && dd <= 31) return true;
        }
        return false;
    };

    /** 方程：a+b=c 或 a-b=c 出现在数字中 */
    Utils.isEquation = function(s) {
        for (var i = 1; i <= 4; i++) {
            for (var j = 0; j + i + i <= s.length; j++) {
                var a = +s.substring(j, j+i);
                var b = +s.substring(j+i, j+i+i);
                var rem = s.length - (j+i+i);
                for (var k = 1; k <= rem; k++) {
                    var c = +s.substring(j+i+i, j+i+i+k);
                    if (a + b === c || (a > b && a - b === c)) return true;
                }
            }
        }
        return false;
    };

    /** 世纪：各位和=99（11位最大可能） */
    Utils.isCentury = function(s) {
        return Utils.sumOfDigits(s) === 99;
    };

    // ---------- Phase 1 新增工具函数 ----------

    /** 数字圈圈计数：0→1, 6→1, 8→2, 9→1, 其余→0 */
    Utils.countCircles = function(s) {
        var circles = {0:1,6:1,8:2,9:1};
        var count = 0;
        for (var i = 0; i < s.length; i++) {
            count += circles[+s[i]] || 0;
        }
        return count;
    };

    /** 自幂数（阿姆斯特朗数）：每位数字的 n 次方和等于自身，n=有效位数 */
    Utils.isArmstrong = function(s) {
        var n = Utils.getEffectiveLength(s);
        var num = int(s);
        if (n < 2) return true; // 1位数都是自幂数，不计算
        var sum = 0;
        for (var i = 0; i < s.length; i++) {
            var d = +s[i];
            var pow = 1;
            for (var j = 0; j < n; j++) pow *= d;
            sum += pow;
            if (sum > num) return false; // 提前退出
        }
        return sum === num;
    };

    /** Luhn 算法校验 */
    Utils.isLuhnValid = function(s) {
        if (s.length < 2) return false;
        var sum = 0;
        var isSecond = false;
        for (var i = s.length - 1; i >= 0; i--) {
            var d = +s[i];
            if (isSecond) {
                d *= 2;
                if (d > 9) d -= 9;
            }
            sum += d;
            isSecond = !isSecond;
        }
        return sum % 10 === 0;
    };

    /** 数根 */
    Utils.digitalRoot = function(s) {
        var n = Utils.sumOfDigits(s);
        if (n === 0) return 0;
        while (n >= 10) {
            var sum = 0;
            while (n > 0) { sum += n % 10; n = Math.floor(n / 10); }
            n = sum;
        }
        return n;
    };

    /** 判断数字是否为某整数的 ≥ minExp 次方 */
    Utils.isPowerExponent = function(s, minExp) {
        var n = int(s);
        if (n < 2) return false;
        // 检查从 minExp 到合理上限的指数
        for (var exp = minExp; exp <= 30; exp++) {
            var base = Math.round(Math.pow(n, 1 / exp));
            // 检查 base^exp 和 (base+1)^exp 和 (base-1)^exp
            for (var b = Math.max(2, base - 1); b <= base + 1; b++) {
                var p = 1;
                for (var i = 0; i < exp; i++) {
                    p *= b;
                    if (p > Number.MAX_SAFE_INTEGER) break;
                }
                if (p === n) return true;
            }
        }
        return false;
    };

    /** 五边形数：n*(3n-1)/2 */
    Utils.isPentagonal = function(n) {
        if (n < 1) return false;
        // 逆向：24n+1 是完全平方，且(1+sqrt)/6 是整数
        var x = 24 * n + 1;
        var s = Math.floor(Math.sqrt(x));
        if (s * s !== x) return false;
        return (1 + s) % 6 === 0;
    };

    /** 六边形数：n*(2n-1) */
    Utils.isHexagonal = function(n) {
        if (n < 1) return false;
        var x = 8 * n + 1;
        var s = Math.floor(Math.sqrt(x));
        if (s * s !== x) return false;
        return (1 + s) % 4 === 0;
    };

    /** 三角平方数：既是三角形数又是平方数 */
    Utils.isSquareTriangular = function(n) {
        return Utils.isPerfectSquare(n) && Utils.isTriangular(n);
    };

    /** 三角五边数：既是三角形数又是五边形数 */
    Utils.isTriangularPentagonal = function(n) {
        return Utils.isTriangular(n) && Utils.isPentagonal(n);
    };

    /** 二进制表示中连续1的最大长度 >= len */
    Utils.binaryConsecutiveOnes = function(s, len) {
        var n = int(s);
        if (n === 0) return false;
        var max = 0, cur = 0;
        while (n > 0) {
            if (n & 1) { cur++; max = Math.max(max, cur); }
            else { cur = 0; }
            n = Math.floor(n / 2);
        }
        return max >= len;
    };

    /** 二进制表示中是否存在至少 n 位 01 交替（从最低位开始算） */
    Utils.binaryAlternating = function(s, n) {
        var num = int(s);
        if (num === 0) return false;
        var run = 0;
        var last = null;
        while (num > 0) {
            var bit = num & 1;
            if (last === null || bit !== last) {
                run++;
                last = bit;
            } else {
                break; // 交替中断
            }
            num = Math.floor(num / 2);
        }
        return run >= n;
    };

    /** 七段码数字段数和（0→6,1→2,2→5,3→5,4→4,5→5,6→5,7→3,8→7,9→5） */
    Utils.sevenSegmentSum = function(s) {
        var segs = {0:6,1:2,2:5,3:5,4:4,5:5,6:5,7:3,8:7,9:5};
        var sum = 0;
        for (var i = 0; i < s.length; i++) {
            sum += segs[+s[i]] || 0;
        }
        return sum;
    };

    /** 各位数字的平均值 */
    Utils.meanDigits = function(s) {
        if (s.length === 0) return 0;
        return Utils.sumOfDigits(s) / s.length;
    };

    /** 各位数字的方差（总体方差） */
    Utils.varianceDigits = function(s) {
        var mean = Utils.meanDigits(s);
        var sumSq = 0;
        for (var i = 0; i < s.length; i++) {
            var d = +s[i] - mean;
            sumSq += d * d;
        }
        return sumSq / s.length;
    };

    /** 各位数字的极差（max-min） */
    Utils.rangeDigits = function(s) {
        var min = 9, max = 0;
        for (var i = 0; i < s.length; i++) {
            var d = +s[i];
            if (d < min) min = d;
            if (d > max) max = d;
        }
        return max - min;
    };

    /** 每位严格递增1（逆流）：a, a+1, a+2, ... */
    Utils.isStrictlyIncreasing = function(s) {
        var first = +s[0];
        for (var i = 1; i < s.length; i++) {
            if (+s[i] !== first + i) return false;
        }
        return s.length > 1;
    };

    /** 每位严格递减1（瀑布）：a, a-1, a-2, ... */
    Utils.isStrictlyDecreasing = function(s) {
        var first = +s[0];
        for (var i = 1; i < s.length; i++) {
            if (+s[i] !== first - i || +s[i] < 0) return false;
        }
        return s.length > 1;
    };

    /** 逐级差分序列收敛到 target（数根/零） */
    Utils.diffSeqConverges = function(s, target) {
        var cur = s;
        while (cur.length > 1) {
            var next = '';
            var allZero = true;
            for (var i = 1; i < cur.length; i++) {
                var d = Math.abs(+cur[i] - +cur[i-1]);
                next += d;
                if (d !== 0) allZero = false;
            }
            cur = next;
            if (allZero) break;
        }
        // cur 现在是终止序列的全部相同数字
        return cur.length > 0 && +cur[0] === target;
    };

    /** 等路程：每位之间的差值绝对值都相等 */
    Utils.isEquiStep = function(s) {
        if (s.length < 3) return false;
        var step = Math.abs(+s[1] - +s[0]);
        for (var i = 2; i < s.length; i++) {
            if (Math.abs(+s[i] - +s[i-1]) !== step) return false;
        }
        return true;
    };

    /** 正反质数：从左到右和从右到左均为质数（忽略前导零） */
    Utils.isPrimeReversible = function(s) {
        var n = int(s);
        if (!Utils.isPrime(n)) return false;
        var rev = s.split('').reverse().join('').replace(/^0+/, '') || '0';
        return Utils.isPrime(int(rev));
    };

    /** 检查数字是否包含所有指定数字至少各一个 */
    Utils.containsAllDigits = function(s, required) {
        for (var i = 0; i < required.length; i++) {
            if (s.indexOf('' + required[i]) === -1) return false;
        }
        return true;
    };

    /** 检查数字是否可以完全拆分成 24 和/或 8（相邻子串，不重叠） */
    Utils.canSplit24_8 = function(s) {
        // 递归尝试拆分
        function trySplit(str, pos) {
            if (pos >= str.length) return true;
            if (pos + 1 <= str.length && str.substring(pos, pos + 1) === '8') {
                if (trySplit(str, pos + 1)) return true;
            }
            if (pos + 2 <= str.length && str.substring(pos, pos + 2) === '24') {
                if (trySplit(str, pos + 2)) return true;
            }
            return false;
        }
        return trySplit(s, 0);
    };

    /** 检查数字是否可以完全拆分成 13/78/91 */
    Utils.canSplit13_78_91 = function(s) {
        function trySplit(str, pos) {
            if (pos >= str.length) return true;
            if (pos + 2 <= str.length) {
                var sub = str.substring(pos, pos + 2);
                if (sub === '13' || sub === '78' || sub === '91') {
                    if (trySplit(str, pos + 2)) return true;
                }
            }
            return false;
        }
        return trySplit(s, 0);
    };

    /** 检查 n 是否能被 40000 整除 */
    Utils.isDivisibleBy40000 = function(s) {
        return int(s) % 40000 === 0;
    };

    /** 暗杠：包含 0xx0 模式（x不为0） */
    Utils.hasDarkKong = function(s) {
        for (var i = 0; i <= s.length - 4; i++) {
            if (s[i] === '0' && s[i+3] === '0' && s[i+1] !== '0' && s[i+2] !== '0') {
                return true;
            }
        }
        return false;
    };

    /** 双书夹：前两位内部相同，后两位内部相同，但前后两组不同 */
    Utils.hasDoubleBookends = function(s) {
        if (s.length < 4) return false;
        return s[0] === s[1] && s[s.length-2] === s[s.length-1] && s[0] !== s[s.length-2];
    };

    /** 拉链：两个数字交替出现 */
    Utils.isZipper = function(s) {
        if (s.length < 3) return false;
        var f = Utils.countDigitFreq(s);
        var digits = [];
        for (var i = 0; i < 10; i++) {
            if (f[i] > 0) digits.push(i);
        }
        if (digits.length !== 2) return false;
        var a = '' + digits[0], b = '' + digits[1];
        // 检查交替模式
        for (var i = 0; i < s.length; i++) {
            if (i % 2 === 0 && s[i] !== a) return false;
            if (i % 2 === 1 && s[i] !== b) return false;
        }
        return true;
    };

    /** 等差数列（将数字按两位分组，每组是等差数列） */
    Utils.isTwoDigitArithProg = function(s) {
        // 检查将 6 位数分成 3 个两位数是否为等差数列
        if (s.length !== 6) return false;
        var a = +s.substring(0, 2);
        var b = +s.substring(2, 4);
        var c = +s.substring(4, 6);
        return b - a === c - b && b !== a;
    };

    /** 检查 s 是否是 n/7 循环节的开始（142857, 285714, 428571, 571428, 714285, 857142） */
    Utils.isReciprocal7Cycle = function(s) {
        var cycles = ['142857', '285714', '428571', '571428', '714285', '857142'];
        for (var i = 0; i < cycles.length; i++) {
            if (s === cycles[i] || s.indexOf(cycles[i]) === 0) return true;
        }
        return false;
    };

    /** 检查数字是否能被分成 3 个按位置连续的整数（且每个 > minPart） */
    Utils.canSplit3Consec = function(s, minPart) {
        for (var len1 = 1; len1 <= s.length - 2; len1++) {
            for (var len2 = 1; len2 <= s.length - len1 - 1; len2++) {
                var p1 = +s.substring(0, len1);
                var p2 = +s.substring(len1, len1 + len2);
                var p3 = +s.substring(len1 + len2);
                if (p1 > minPart && p1 + 1 === p2 && p2 + 1 === p3) return true;
            }
        }
        return false;
    };

    /** 检查数字是否能被分成 4 个按位置连续的整数（且每个 > minPart） */
    Utils.canSplit4Consec = function(s, minPart) {
        for (var len1 = 1; len1 <= s.length - 3; len1++) {
            for (var len2 = 1; len2 <= s.length - len1 - 2; len2++) {
                for (var len3 = 1; len3 <= s.length - len1 - len2 - 1; len3++) {
                    var p1 = +s.substring(0, len1);
                    var p2 = +s.substring(len1, len1 + len2);
                    var p3 = +s.substring(len1 + len2, len1 + len2 + len3);
                    var p4 = +s.substring(len1 + len2 + len3);
                    if (p1 > minPart && p1 + 1 === p2 && p2 + 1 === p3 && p3 + 1 === p4) return true;
                }
            }
        }
        return false;
    };

    /** 检查是否能分成 2 个按位置连续的整数（且每个 > minPart） */
    Utils.canSplit2Consec = function(s, minPart) {
        for (var len1 = 1; len1 < s.length; len1++) {
            var p1 = +s.substring(0, len1);
            var p2 = +s.substring(len1);
            if (p1 > minPart && p1 + 1 === p2) return true;
        }
        return false;
    };

    /** 检查是否能分成 3 个不按位置的整数（乱序），数值连续且 > minPart */
    Utils.canSplit3Unordered = function(s, minPart) {
        // 取所有可能的三分点
        for (var i1 = 1; i1 < s.length - 1; i1++) {
            for (var i2 = i1 + 1; i2 < s.length; i2++) {
                var parts = [
                    +s.substring(0, i1),
                    +s.substring(i1, i2),
                    +s.substring(i2)
                ];
                if (parts.some(function(p){return p <= minPart;})) continue;
                parts.sort(function(a,b){return a-b;});
                if (parts[1] === parts[0] + 1 && parts[2] === parts[1] + 1) return true;
            }
        }
        return false;
    };

    /** 检查是否能分成 4 个不按位置的整数（乱序），数值连续且 > minPart */
    Utils.canSplit4Unordered = function(s, minPart) {
        for (var i1 = 1; i1 < s.length - 2; i1++) {
            for (var i2 = i1 + 1; i2 < s.length - 1; i2++) {
                for (var i3 = i2 + 1; i3 < s.length; i3++) {
                    var parts = [
                        +s.substring(0, i1),
                        +s.substring(i1, i2),
                        +s.substring(i2, i3),
                        +s.substring(i3)
                    ];
                    if (parts.some(function(p){return p <= minPart;})) continue;
                    parts.sort(function(a,b){return a-b;});
                    var ok = true;
                    for (var i = 1; i < 4; i++) {
                        if (parts[i] !== parts[i-1] + 1) { ok = false; break; }
                    }
                    if (ok) return true;
                }
            }
        }
        return false;
    };

    /** 相邻二连数：包含两个相邻且连续且 > minPart 的整数子串（位置相邻） */
    Utils.hasAdjacent2Consec = function(s, minPart) {
        for (var i = 0; i < s.length - 1; i++) {
            for (var len1 = 1; len1 <= s.length - i - 1; len1++) {
                for (var len2 = 1; len2 <= s.length - i - len1; len2++) {
                    var p1 = +s.substring(i, i + len1);
                    var p2 = +s.substring(i + len1, i + len1 + len2);
                    if (p1 > minPart && p2 > minPart && p2 === p1 + 1) return true;
                }
            }
        }
        return false;
    };

    /** 分散二连数：包含两个不相邻但连续且 > minPart 的整数子串 */
    Utils.hasSeparate2Consec = function(s, minPart) {
        for (var i = 0; i < s.length - 1; i++) {
            for (var len1 = 1; len1 <= s.length - i - 1; len1++) {
                for (var j = i + len1; j < s.length; j++) {
                    for (var len2 = 1; len2 <= s.length - j; len2++) {
                        var p1 = +s.substring(i, i + len1);
                        var p2 = +s.substring(j, j + len2);
                        if (p1 > minPart && p2 > minPart && p2 === p1 + 1) return true;
                    }
                }
            }
        }
        return false;
    };

    /** 相邻三连数：包含三个相邻连续且 > minPart 的整数子串 */
    Utils.hasAdjacent3Consec = function(s, minPart) {
        for (var i = 0; i < s.length - 2; i++) {
            for (var len1 = 1; len1 <= s.length - i - 2; len1++) {
                for (var len2 = 1; len2 <= s.length - i - len1 - 1; len2++) {
                    for (var len3 = 1; len3 <= s.length - i - len1 - len2; len3++) {
                        var p1 = +s.substring(i, i + len1);
                        var p2 = +s.substring(i + len1, i + len1 + len2);
                        var p3 = +s.substring(i + len1 + len2, i + len1 + len2 + len3);
                        if (p1 > minPart && p2 === p1 + 1 && p3 === p2 + 1) return true;
                    }
                }
            }
        }
        return false;
    };

    /** 相邻四连数：包含四个相邻连续且 > minPart 的整数子串 */
    Utils.hasAdjacent4Consec = function(s, minPart) {
        for (var i = 0; i < s.length - 3; i++) {
            for (var len1 = 1; len1 <= s.length - i - 3; len1++) {
                for (var len2 = 1; len2 <= s.length - i - len1 - 2; len2++) {
                    for (var len3 = 1; len3 <= s.length - i - len1 - len2 - 1; len3++) {
                        for (var len4 = 1; len4 <= s.length - i - len1 - len2 - len3; len4++) {
                            var p1 = +s.substring(i, i + len1);
                            var p2 = +s.substring(i + len1, i + len1 + len2);
                            var p3 = +s.substring(i + len1 + len2, i + len1 + len2 + len3);
                            var p4 = +s.substring(i + len1 + len2 + len3, i + len1 + len2 + len3 + len4);
                            if (p1 > minPart && p2 === p1 + 1 && p3 === p2 + 1 && p4 === p3 + 1) return true;
                        }
                    }
                }
            }
        }
        return false;
    };

    /** 三相数：恰好只有 3 个不同的质因数 */
    Utils.hasExact3PrimeFactors = function(s) {
        var n = int(s);
        if (n < 6) return false;
        var factors = [];
        var m = n;
        for (var i = 2; i * i <= m; i++) {
            if (m % i === 0) {
                factors.push(i);
                while (m % i === 0) m /= i;
            }
        }
        if (m > 1) factors.push(m);
        return factors.length === 3;
    };

    /** 四生素数：n>10 且 n%10∈{1,3,7,9}，替换个位为 1/3/7/9 后四个数均为质数 */
    Utils.isQuadruplePrime = function(s) {
        var n = int(s);
        if (n <= 10) return false;
        if (!Utils.isPrime(n)) return false;
        var base = Math.floor(n / 10) * 10;
        var ends = [1, 3, 7, 9];
        for (var i = 0; i < ends.length; i++) {
            if (!Utils.isPrime(base + ends[i])) return false;
        }
        return true;
    };

    /** 五进制熵 > 阈值（比特）*/
    Utils.base5Entropy = function(s) {
        var n = int(s);
        if (n === 0) return 0;
        var digits = '';
        while (n > 0) {
            digits = (n % 5) + digits;
            n = Math.floor(n / 5);
        }
        var f = [0,0,0,0,0];
        for (var i = 0; i < digits.length; i++) f[+digits[i]]++;
        var len = digits.length;
        var entropy = 0;
        for (var i = 0; i < 5; i++) {
            if (f[i] > 0) {
                var p = f[i] / len;
                entropy -= p * Math.log2(p);
            }
        }
        return entropy;
    };

    /** 金字塔(n)：恰好使用 3 个连续数字，分别出现 1,2,3 次（或 1,2,3+ 倍的组合） */
    Utils.isPyramid = function(s, n) {
        var f = Utils.countDigitFreq(s);
        var nonZero = [];
        for (var i = 0; i < 10; i++) {
            if (f[i] > 0) nonZero.push({digit: i, count: f[i]});
        }
        if (nonZero.length < 3) return false;
        // 找连续的 3 个数字
        for (var i = 0; i <= nonZero.length - 3; i++) {
            var a = nonZero[i], b = nonZero[i+1], c = nonZero[i+2];
            if (b.digit === a.digit + 1 && c.digit === b.digit + 1) {
                var counts = [a.count, b.count, c.count];
                // 出现次数为 n*1, n*2, n*3 (按序或乱序)
                // 简化：检查是否有 1:2:3 的比例
                var minC = Math.min(a.count, b.count, c.count);
                if (minC >= n) {
                    var ratioA = a.count / minC;
                    var ratioB = b.count / minC;
                    var ratioC = c.count / minC;
                    // 检查比例是否为 1:2:3 的排列
                    var ratios = [ratioA, ratioB, ratioC].sort(function(x,y){return x-y;});
                    if (Math.abs(ratios[0] - (n > 0 ? n : 1)) < 0.01 &&
                        Math.abs(ratios[1] - (n > 0 ? n*2 : 2)) < 0.01 &&
                        Math.abs(ratios[2] - (n > 0 ? n*3 : 3)) < 0.01) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    /** 相框：检查 axxb 或 axxxb 模式 */
    Utils.hasFrameSatellite = function(s) {
        for (var i = 0; i <= s.length - 4; i++) {
            if (s[i+1] === s[i+2] && s[i] !== s[i+1] && s[i+3] !== s[i+1] && s[i] !== s[i+3]) return true;
        }
        return false;
    };
    Utils.hasFrameAsteroid = function(s) {
        for (var i = 0; i <= s.length - 5; i++) {
            if (s[i+1] === s[i+2] && s[i+2] === s[i+3] && s[i] !== s[i+1] && s[i+4] !== s[i+1] && s[i] !== s[i+4]) return true;
        }
        return false;
    };
    Utils.hasFrameDouble = function(s) {
        for (var i = 0; i <= s.length - 6; i++) {
            if (s[i] === s[i+1] && s[i+2] === s[i+3] && s[i+4] === s[i+5] && s[i] !== s[i+2] && s[i+2] !== s[i+4] && s[i] !== s[i+4]) return true;
        }
        return false;
    };
    Utils.hasFrameDoubleSatellite = function(s) {
        for (var i = 0; i <= s.length - 6; i++) {
            if (s[i] === s[i+1] && s[i+2] === s[i+3] && s[i+4] === s[i+5] &&
                s[i] !== s[i+2] && s[i] !== s[i+4] && s[i+2] !== s[i+4]) return true;
        }
        return false;
    };

    /** 连续双刻：三连相同数字 + 另一组三连相同数字（连续位置，如 111222 或 222111） */
    Utils.hasDoubleTriple = function(s) {
        for (var i = 0; i <= s.length - 6; i++) {
            if (s[i] === s[i+1] && s[i+1] === s[i+2] &&
                s[i+3] === s[i+4] && s[i+4] === s[i+5] &&
                s[i] !== s[i+3]) return true;
        }
        return false;
    };

    /** 双刻：两组三个相同数字（不必连续贴在一起） */
    Utils.hasTwoTriples = function(s) {
        var f = Utils.countDigitFreq(s);
        var triples = 0;
        for (var i = 0; i < 10; i++) { if (f[i] === 3) triples++; }
        return triples >= 2;
    };

    /** 多条件重复模式：包含连续 a 个相同数字 + 连续 b 个相同数字（可能中间隔其他数字） */
    Utils.hasComboRun = function(s, a, b) {
        var hasA = false, hasB = false;
        for (var i = 0; i <= s.length - a; i++) {
            var ok = true;
            for (var j = 1; j < a; j++) { if (s[i] !== s[i+j]) { ok = false; break; } }
            if (ok && (i === 0 || s[i] !== s[i-1]) && (i + a === s.length || s[i] !== s[i+a])) {
                hasA = true; break;
            }
        }
        for (var i = 0; i <= s.length - b; i++) {
            var ok = true;
            for (var j = 1; j < b; j++) { if (s[i] !== s[i+j]) { ok = false; break; } }
            if (ok && (i === 0 || s[i] !== s[i-1]) && (i + b === s.length || s[i] !== s[i+b])) {
                hasB = true; break;
            }
        }
        return hasA && hasB;
    };

    /** 无7徒刑：除以 8~100 中每个数余数都不等于 7 */
    Utils.hasNoRemainder7 = function(s) {
        var n = int(s);
        for (var i = 8; i <= 100; i++) {
            if (n % i === 7) return false;
        }
        return true;
    };

    /** 在范围 [low, high] 之间 */
    Utils.isInRange = function(s, low, high) {
        var n = parseInt(s, 10);
        return n >= low && n <= high;
    };

    /** 检查是否存在两个相邻差 lessThan 的数字（如差=0，差≤1等） */
    Utils.hasGapLessThan = function(s, threshold) {
        for (var i = 1; i < s.length; i++) {
            if (Math.abs(+s[i] - +s[i-1]) < threshold) return true;
        }
        return false;
    };

    /** 循环节前缀匹配（1/7 → 142857, 2/7 → 285714 等） */
    Utils.startsWithReciprocal7 = function(s) {
        var cycles = ['142857', '285714', '428571', '571428', '714285', '857142'];
        for (var i = 0; i < cycles.length; i++) {
            if (s.indexOf(cycles[i]) === 0) return true;
        }
        return false;
    };

    window.BadgeUtils = Utils;
})();
