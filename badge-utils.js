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

    window.BadgeUtils = Utils;
})();
