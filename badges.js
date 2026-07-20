// badges.js – 徽章管理模块（v4 — +统计 +最佳）
(function() {
    'use strict';

    var RARITY_ORDER = ['终结','超越','神话','传说','史诗','稀有','罕见','普通','平庸'];
    var DISPLAY_LIMIT = 20;

    function rarityRank(rarity) {
        var idx = RARITY_ORDER.indexOf(rarity);
        return idx === -1 ? RARITY_ORDER.length : idx;
    }

    // ---------- 全局状态 ----------
    var STORAGE_KEY = 'cfrngdle_save';
    var earnedBadges = [];
    var totalTP = 0;
    var currentTP = 0;
    var currentNumberStr = '';
    var newBadgeIds = {};
    var showAllBadges = false;
    var totalRolls = 0;
    var bestRollNum = '';
    var bestRollTP = 0;

    // ---------- localStorage ----------
    function saveToStorage() {
        try {
            var data = {
                earnedBadges: earnedBadges,
                totalTP: totalTP,
                totalRolls: totalRolls,
                bestRollNum: bestRollNum,
                bestRollTP: bestRollTP
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch(e) {}
    }

    function loadFromStorage() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            var data = JSON.parse(raw);
            if (data.earnedBadges && Array.isArray(data.earnedBadges)) earnedBadges = data.earnedBadges;
            if (typeof data.totalTP === 'number') totalTP = data.totalTP;
            if (typeof data.totalRolls === 'number') totalRolls = data.totalRolls;
            if (typeof data.bestRollTP === 'number') bestRollTP = data.bestRollTP;
            if (typeof data.bestRollNum === 'string') bestRollNum = data.bestRollNum;
        } catch(e) { earnedBadges = []; totalTP = 0; totalRolls = 0; }
    }

    // ---------- DOM 引用 ----------
    var badgeListEl = null;
    var totalScoreSpan = null;
    var currentScoreSpan = null;
    var rollCountSpan = null;
    var bestRollNumSpan = null;
    var bestRollTPSpan = null;
    var bestRollBox = null;

    // ---------- 创建徽章 pill ----------
    function createBadgePill(badge, isActive, isNew) {
        if (!badge) return document.createTextNode('');
        var pill = document.createElement('span');
        var activeClass = isActive ? '' : 'badge-pill--inactive';
        pill.className = 'badge-pill badge-pill--' + badge.rarity + ' ' + activeClass;
        var countDisplay = badge.count > 1 ? ' \u00d7' + badge.count : '';
        var newTag = isNew ? '<span class="badge-new">\u65b0\uff01</span>' : '';
        pill.innerHTML =
            '<span class="badge-emoji">' + badge.emoji + '</span>' +
            '<span class="badge-name">' + badge.name + countDisplay + '</span>' +
            newTag +
            '<span class="badge-rarity">' + badge.rarity + '</span>' +
            '<span class="badge-score">+' + badge.score.toLocaleString() + 'TP</span>';
        // 查找 badge def 生成描述
        var defs = window.BadgeDefs || [];
        for (var i = 0; i < defs.length; i++) {
            if (defs[i].id === badge.id) {
                pill.dataset.badgeId = badge.id;
                pill.dataset.badgeDesc = getBadgeDesc(defs[i]);
                pill.style.cursor = 'pointer';
                break;
            }
        }
        return pill;
    }

    function createSeparator(label) {
        var sep = document.createElement('div');
        sep.className = 'badge-separator';
        sep.innerHTML = '<span><span class="badge-separator__line"></span>' +
            '<span class="badge-separator__label">' + label + '</span>' +
            '<span class="badge-separator__line"></span></span>';
        return sep;
    }

    function createLoadMoreButton(visibleCount, totalCount) {
        var container = document.createElement('div');
        container.className = 'badge-load-more';
        var remaining = Math.max(0, totalCount - DISPLAY_LIMIT);
        var btn = document.createElement('button');
        btn.className = 'badge-load-more__btn';
        btn.textContent = showAllBadges ? '收起' :
            (remaining > 0 ? '加载更多（还剩 ' + remaining + ' 个徽章）' : '收起');
        btn.addEventListener('click', function() { showAllBadges = !showAllBadges; updateBadgeUI(); });
        container.appendChild(btn);
        return container;
    }

    // ---------- 徽章条件描述生成 ----------
    var BADGE_DESC_OVERRIDES = {
        'prime': '整个 11 位数字是质数（只能被 1 和自身整除）',
        'semiprime': '整个数字是两个质数的乘积（半质数）',
        'abundant': '真因子之和 > 自身（盈数）',
        'perfect-number': '真因子之和 = 自身（完全数，如 6, 28, 496）',
        'square': '整个数字是完全平方数',
        'cube': '整个数字是完全立方数',
        'power-of-2': '整个数字是 2 的幂',
        'fibonacci': '整个数字是斐波那契数列中的数',
        'twin-prime': '整个数字是质数，且 N±2 中至少有一个也是质数',
        'first-last-equal': '去掉前导零后，首位数字 = 末位数字',
        'no-zero': '整个 11 位数字中不含 0',
        'no-one': '整个 11 位数字中不含 1',
        'no-one-has-zero': '不含数字 1，但至少含一个 0',
        'repdigit': '11 位数字全部相同（全同数）',
        'repunit': '11 位数字全部是 1',
        'palindrome': '数字对称，正反读相同（回文数）',
        'sum-is-prime': '各位数字之和是质数',
        'perfect-squareof': '各位数字的平方和是完全平方数',
        'double': '前 5 位 = 后 5 位（中间第 6 位忽略）',
        'ascending': '每位数字 ≥ 前一位（非递减）',
        'descending': '每位数字 ≤ 前一位（非递增）',
        'all-lte-4': '每一位数字都 ≤ 4',
        'all-gte-6': '每一位数字都 ≥ 6',
        'first-half-lte': '前 5 位都 ≤ 4',
        'second-half-lte': '后 5 位都 ≤ 4',
        'alternating': '奇偶性严格交替出现',
        'no-repeat': '至少出现 10 种不同数字',
        'only-two-digits': '恰好出现 2 种不同的数字',
        'only-three-digits': '恰好出现 3 种不同的数字',
        'triple': '存在连续 3 个相同数字',
        'quadruple': '存在连续 4 个相同数字',
        'quintuple': '存在连续 5 个相同数字',
        'sextuple': '存在连续 6 个相同数字',
        'septuple': '存在连续 7 个相同数字',
        'octuple': '存在连续 8 个相同数字',
        'nonuple': '存在连续 9 个相同数字',
        'decuple': '存在连续 10 个及以上相同数字',
        'stairstep': '相邻位之差均为 1（如 1234 或 4321）',
        'mountain': '先严格递增后严格递减（山峰形）',
        'valley': '先严格递减后严格递增（山谷形）',
        'double-double': '至少有 4 种数字各出现至少 2 次',
        'triple-pair': '有 3 个数字各出现至少 2 次',
        'all-consec': '数字集合形成连续整数区间，且至少 10 种不同数字',
        'feynman': '含子串 999999（费曼点 — π 中连续 6 个 9）',
        'perfect-palindrome': '数字是回文数，且整体是质数',
        'lucky-seven': '数字 7 出现至少 3 次',
        'all-evens': '所有数字都是偶数',
        'all-odds': '所有数字都是奇数',
        'phone-pattern': '存在连续 3 位以上在手机键盘同一行',
        'zigzag': '数字严格交替升→降→升（之字形）',
        'double-zero': '前两位是 00',
        'tail-zero': '末位是 0',
        'tail-five': '末位是 5',
        'first-big': '首位 ≥ 8',
        'first-small': '首位 ≤ 2',
        'all-inc-by-2': '数字以步长 2 逐位递增',
        'all-dec-by-2': '数字以步长 2 逐位递减',
        'sum-eq-prod': '各位数字之和 = 各位数字之积',
        'has-neighbor': '至少有 5 对相邻位数字差值 ≤ 1',
        'far-neighbor': '所有相邻位差值 ≥ 3',
        'exact-pair': '恰好有一对相同的数字，其余各不同',
        'turtle': '所有相邻位差值均为 1',
        'sandwich': '至少一处 ABA 模式（隔一位相同）',
        'symmetric-pair': '成对对称（如 ABCCBA 模式）',
        'has-cliff': '存在相邻位数字差值 ≥ 9',
        'has-plateau': '有至少 5 位相同的连续子串',
        'power-of-3': '整个数字是 3 的幂',
        'power-of-5': '整个数字是 5 的幂',
        'triangular': '整个数字是三角数 n(n+1)/2',
        'factorial': '整个数字是阶乘数（如 1, 2, 6, 24, 120…）',
        'catalan': '整个数字是卡塔兰数',
        'harshad': '数字能被各位数字之和整除',
        'moran': '哈沙德数，且商为质数',
        'happy': '各位平方和迭代最终收敛到 1（快乐数）',
        'deficient': '真因子之和 < 自身（亏数）',
        'div-by-prod': '数字能被各位数字之积整除（积 > 0）',
        'mersenne': '整个数字是梅森素数（2^p-1 且为质数）',
        'goldbach': '偶数是两个质数之和',
        'sqrt2': '含子串 14142（√2 的近似值）',
        'sqrt3': '含子串 17320（√3 的近似值）',
        'sqrt5': '含子串 22360（√5 的近似值）',
        'ram-1729': '含子串 1729（拉马努金数）',
        'kap-6174': '含子串 6174（卡普雷卡常数）',
        'kap-495': '含子串 495（三位卡普雷卡常数）',
        'five-9s': '含子串 99999',
        'collatz-ref': '含子串 31',
        '11037': '含子串 11037',
        'perfect-sq-sum': '各位数字之和是完全平方数',
        'prime-digits-only': '每位数字都来自 {2,3,5,7}（质数字）',
        'comp-digits-only': '每位数字都来自 {4,6,8,9}（合数字）',
        'fib-digits-only': '每位数字都来自 {0,1,2,3,5,8}',
        'no-prime-digit': '不含任何质数字 {2,3,5,7}',
        'all-ten-digits': '0~9 全部 10 种数字至少各出现一次',
        'only-zero-one': '每位数字只能是 0 或 1',
        'half-even-odd': '奇数和偶数数量相差 ≤ 1',
        'one-side': '每位数字只能来自 {0-4} 或 {5-9}',
        'no-even': '不含偶数字 {0,2,4,6,8}',
        'no-odd': '不含奇数字 {1,3,5,7,9}',
        'phi-5': '含子串 16180（φ 的 5 位）',
        'phi-6': '含子串 161803（φ 的 6 位）',
        'phi-inv': '含子串 61803（φ 的倒数）',
        'golden-angle': '含子串 1375（黄金角近似值）',
        'a4-ratio': '含子串 297',
        'fib-ratio': '前 3 位 ÷ 后 3 位 ≈ 1.618（黄金分割比）',
        'meme-7355608': '含子串 7355608',
        'meme-8675309': '含子串 8675309',
        'meme-58008': '含子串 58008',
        'meme-5318008': '含子串 5318008',
        '123454321': '含子串 123454321',
        '12345654321': '含子串 12345654321',
        '1234321': '含子串 1234321',
        'luhn-valid': '数字通过 Luhn 校验',
        'deep-root': '数字根 ≥ 7（反复求和直到个位）',
        'multiple-12': '整个数字能被 12 整除',
        'summit': '数字在 9,990,000 ~ 10,000,000 范围内',
        'boulder': '数字在 999,000 ~ 1,000,000 范围内',
        'div-split': '可将数字拆为两部分，前部分能被后部分整除',
        'mul-split': '可将数字拆为两部分，后部分能被前部分整除',
        'zhang-san': '每位数字只能来自 {0,3,6,9}',
        'congrats': '至少各包含一个数字 4、9、7',
        'layered-sample': '数字均匀分布在 {1-3}、{4-6}、{7-9} 三组',
        'nearby': '有连续 5 位递增，且第 1、2 位相差 2',
        'dense': '各位数字之和 > 55',
        'heavy': '各位数字之和 > 45',
        'light-feather': '各位数字之和 < 15',
        'twenty-one': '各位数字之和 = 21',
        'clock-hour': '前 2 位匹配当前系统小时 HH',
        'clock-minute': '第 5~6 位匹配当前系统分钟 MM',
        'clock-second': '第 10~11 位匹配当前系统秒 SS',
        'calendar-year': '前 2 位匹配当前系统年份后 2 位',
        'calendar-month': '第 3~4 位匹配当前系统月份 MM',
        'calendar-day': '第 5~6 位匹配当前系统日期 DD',
        'perfect-time': '第 6~11 位匹配当前系统时间 HHMMSS',
        'perfect-date': '第 6~11 位匹配当前系统日期 YYMMDD',
        'meme-24601': '含子串 24601',
        'meme-112358': '含子串 112358',
        'meme-89757': '含子串 89757',
        'meme-4815162342': '含子串 4815162342',
        'meme-404': '含子串 404',
        'meme-10086': '含子串 10086',
        'meme-10010': '含子串 10010',
        'meme-12306': '含子串 12306',
        'meme-114514': '含子串 114514',
        'meme-66686': '含子串 66686',
        '101112': '含子串 101112',
        '202122': '含子串 202122',
        '303132': '含子串 303132',
        '404142': '含子串 404142',
        '505152': '含子串 505152',
        '606162': '含子串 606162',
        '707172': '含子串 707172',
        '808182': '含子串 808182',
        '909192': '含子串 909192',
        'consec-2': '可以拆分为至少 8 组连续 2 位数',
        'consec-3': '可以拆分为至少 7 组连续 3 位数',
        'consec-4': '可以拆分为至少 6 组连续 4 位数',
        'unordered-3': '可以拆分为至少 7 组乱序 3 位数',
        'unordered-4': '可以拆分为至少 6 组乱序 4 位数',
        'adj-2-consec': '含至少 8 组相邻 2 位连续数字',
        'adj-3-consec': '含相邻 3 位连续数字的子串',
        'adj-4-consec': '含相邻 4 位连续数字的子串',
        'sep-2-consec': '含至少 8 组不连续的 2 位连续数字',
        'chain-7': '有连续 7 位递增或递减 1',
        'chain-6': '有连续 6 位递增或递减 1',
        'chain-5': '有连续 5 位递增或递减 1',
        'scrambled-7': '包含 7 位连续整数的乱序子串',
        'scrambled-6': '包含 6 位连续整数的乱序子串',
        'scrambled-5': '包含 5 位连续整数的乱序子串',
        'inc-run-6': '存在连续 6 位递增差 1',
        'dec-run-6': '存在连续 6 位递减差 1',
        'abab': '含 ABAB 重复模式（如 1212）',
        'abcabc': '含 ABCABC 重复模式（如 123123）',
        'starts-aba': '前 3 位呈 ABA 模式',
        'wave-8': '至少 8 次升→降→升交替',
        'roller-2': '至少有 4 个山峰（升→降拐点）',
        'rotation': '存在循环移位子串',
        'eleven-sum-10': '每对相邻数字之和都为 10',
        'monotonic': '数字整体单调递增或递减',
        'every-other': '隔位数字全部相同（如 12121212121）',
        'lucky-number': '各位数字之和能被 7 整除，且含数字 7',
        'pronic': '整个数字是 n×(n+1) 形式（普洛尼克数）',
        'strobogrammatic': '数字旋转 180° 后与原来相同',
        'semi-clean': '去掉某一位后所有数字互不相同',
        'full-house': '含一个三连数 + 一个对子（如 44422）',
        'contig-full-house': '连续 5 位呈 XXXYY 或 YYXXX 模式',
        'snake-eyes': '恰好有 2 个数字 1',
        'blackjack': '各位数字之和 = 21',
        'deep-void': '含 3 或 4 个数字 0',
        'devil-number': '同时含 666 和 777',
        'bookends': '前 2 位 = 后 2 位',
        'mirror-bookends': '前 2 位 = 后 2 位的反转',
        'pocket-mirror': '至少有一处对称位数字相同',
        'rhyme': '存在相邻两位数字相同',
        'mini-echo': '含 ABA 模式（如 121）',
        'hills': '至少 3 次升降翻转，且无长连数字',
        'hop': '存在相邻位相差 2',
        'double-hop': '至少有 4 种数字各出现至少 2 次',
        'dunes': '存在 4 位模式：升→平→降',
        'metronome': '每两位一组递增',
        'feather': '恰好一位 ≥ 8，其余 ≤ 4',
        'firefly': '奇偶严格交替，且至少含一个 0',
        'low-ball': '所有数字 ≤ 4',
        'ghost': '含 00 且最长相同数字连 ≤ 2',
        'calendar': '含有效 MMDD 日期模式',
        'equation': '含 a+b=c 或 a−b=c 模式',
        'century': '各位数字之和 = 100',
        'tree-fiddy': '含子串 350',
        'double-nine': '两个数字 9 各恰好出现 2 次',
        'contentment': '各位数字之和在 50~99 之间',
        'jackpot': '含子串 777 且各位和 = 21',
        'xmas-1': '含 1 个 002',
        'xmas-2': '含 2 个 002',
        'xmas-3': '含 3 个 002',
        'worship-1': '含 1 个 297',
        'worship-2': '含 2 个 297',
        'worship-3': '含 3 个 297',
        'exact-7777777': '有效数字恰好 7 位，且 = 7777777',
        'exact-1919810': '有效数字恰好 7 位，且 = 1919810',
        'exact-3141592': '有效数字恰好 7 位，且 = 3141592',
        'exact-2718281': '有效数字恰好 7 位，且 = 2718281',
        'exact-1314520': '有效数字恰好 7 位，且 = 1314520 或 5201314',
        'exact-stars': '有效数字恰好 7 位，且为 1155665 或 4433221 或 5544332',
        'exact-666666': '有效数字恰好 6 位，且 = 666666',
        'exact-777': '有效数字恰好 3 位，且 = 777',
        'exact-666': '有效数字恰好 3 位，且 = 666',
        'exact-1337': '有效数字恰好 4 位，且 = 1337',
        'exact-7734': '有效数字恰好 4 位，且 = 7734',
        'exact-42': '有效数字恰好 2 位，且 = 42',
        'exact-911': '有效数字恰好 3 位，且 = 911',
        'pentagonal': '整个数字是五边形数 n(3n−1)/2',
        'hexagonal': '整个数字是六边形数 n(2n−1)',
        'square-triangular': '数字同时是平方数和三角数',
        'tri-pentagonal': '数字同时是三角数和五边形数',
        'armstrong': '各位数字的 N 次方之和等于自身（自幂数）',
        'taxicab': '至少有两种方式表为两个立方数之和',
        'exact-3-factors': '数字恰好有 3 个不同的质因子',
        'quadruple-prime': '有效数字 4 位且是四生素数',
        'prime-reversible': '数字倒过来也是质数',
        'div-by-40000': '整个数字能被 40000 整除',
        'rep-6': '有连续 6 位相同数字',
        'planet-asteroid': '存在 4 连+3 连组合',
        'star-asteroid': '存在 5 连+2 连组合',
        'star': '有连续 5 位相同数字',
        'planet-satellite': '存在 4 连+2 连组合',
        'three-satellites': '有 3 个数字各出现恰好 2 次',
        'two-satellites': '有 2 个数字各出现恰好 2 次',
        'double-triple': '存在连续两个三连',
        'two-triples': '存在两个三连（可不连续）',
        'zipper': '奇偶位形成拉链交替',
        'frame-satellite': '首位末位相同 + 中间单连 2 次',
        'frame-asteroid': '首位末位相同 + 中间单连 3 次',
        'frame-double': '首位末位相同 + 中间两个 2 连',
        'dark-kong': '四个相同数字不连续出现',
        'double-bookends': '前 3 位 = 后 3 位',
        'binary-alt': '二进制表示中 0 和 1 交替出现至少 8 次',
        'cyber-harshad': '七段码数字和能整除原数',
        'discrete': '各位数字方差 ≥ 15',
        'compress': '极差 < 4（数字集中）',
        'decompress': '极差 > 7（数字分散）',
        'chaos': '五进制熵 > 2.25',
        'circles-10': '数字中圈圈总数 ≥ 10',
        'circles-8': '数字中圈圈总数 ≥ 8',
        'circles-5': '数字中圈圈总数 ≥ 5',
        'pyramid-1': '两段阶梯形成金字塔(步长 1)',
        'pyramid-2': '两段阶梯形成金字塔(步长 2)',
        'pyramid-3': '两段阶梯形成金字塔(步长 3)',
        'mamba-out': '可拆分为 24 和 8 的相关数',
        'desert-island': '可拆分为 13、78、91 相关数',
        'strict-incr': '去掉前导零后严格递增',
        'strict-decr': '去掉前导零后严格递减',
        'equi-step': '相邻数字差值恒定',
        'diff-to-root': '逐位差收敛于数字根',
        'diff-to-zero': '逐位差最终收敛至 0',
        'hills-mountain': '至少 3 次升降翻转',
        'neighbor': '至少有 5 对相邻位数字差值 ≤ 1',
        'arith-pairs': '有效数字 6 位，每两位呈等差数列',
        'count-ducks': '至少各包含一个 {2,4,6,7,8}',
        'locked': '每位数字只能来自 {4,6,8,9,0}',
        'open-set': '每位数字只能来自 {1,2,3,5,7}',
        'reciprocal-7': '以 1/7 的循环节 142857 开头',
        'no-rem-7': '每位数字除以 7 的余数均不同',
        'grounded': '首位 < 末位',
        'take-off': '首位 > 末位',
        'gambling': '有效数字 6 位，只含 {1,2,3,4,5,6}',
        'dedicated': '数字 1 恰好出现 2 次，其余数字最多 2 次'
    };

    function getBadgeDesc(def) {
        if (!def) return '';
        var id = def.id;
        var name = def.name;
        // 优先查 overrides
        if (BADGE_DESC_OVERRIDES.hasOwnProperty(id)) return BADGE_DESC_OVERRIDES[id];

        // 位数系列
        if (/^len-\d+$/.test(id)) {
            var n = parseInt(id.split('-')[1]);
            return '有效数字恰好 ' + n + ' 位';
        }
        // 倍数系列
        if (/^multiple-of-(\d+)$/.test(id)) {
            return '整个数字能被 ' + RegExp.$1 + ' 整除';
        }
        // 恰好一个
        if (/^exact-one-(\d+)$/.test(id)) {
            return '数字 ' + RegExp.$1 + ' 恰好出现 1 次';
        }
        // 化学元素
        if (/^elem-/.test(id)) {
            var elemNum = {h:1,he:2,li:3,be:4,b:5,c:6,n:7,o:8,f:9,ne:0};
            var key = id.split('-')[1];
            return '数字 ' + elemNum[key] + ' 恰好出现 1 次';
        }
        // 数字密集
        if (/^dense-(zero|one|two|three|four|five|six|seven|eight|nine)-(\d+)$/.test(id)) {
            var digit = {zero:0,one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9}[RegExp.$1];
            return '数字 ' + digit + ' 出现 ≥ ' + RegExp.$2 + ' 次';
        }
        // 子串系列 (seq / meme)
        if (/^(seq|meme)-(\d+)$/.test(id)) {
            return '含子串 ' + RegExp.$2;
        }
        // π / e / φ 系列
        if (/^(pi|e|phi)-(\d+)$/.test(id)) {
            var cn = {pi:'π',e:'e',phi:'φ'}[RegExp.$1];
            return '数字前缀（第 5 位起）与 ' + cn + ' 的小数部分连续匹配 ' + RegExp.$2 + ' 位';
        }
        // τ 系列
        if (/^tau-(\d+)$/.test(id)) {
            return '数字前缀（第 5 位起）与 τ 的小数部分连续匹配 ' + RegExp.$1 + ' 位';
        }
        // 后缀系列
        if (/^suffix-(.+)$/.test(id)) {
            var suf = RegExp.$1;
            if (suf === '0') return '末位是 0';
            if (suf === '5') return '末位是 5';
            if (suf === '00') return '以 00 结尾';
            if (suf === '000') return '以 000 结尾';
            return '以 ' + suf + ' 结尾';
        }
        // 各位和
        if (/^sum-(\d+)$/.test(id)) {
            return '各位数字之和 = ' + RegExp.$1;
        }
        // 幂次系列
        if (/^power-of-(\d+)$/.test(id)) {
            return '整个数字是 ' + RegExp.$1 + ' 的幂';
        }
        // 次方数 (power-N)
        if (/^power-(\d+)$/.test(id)) {
            return '数字是某个整数的 ' + RegExp.$1 + ' 次方';
        }
        // 二进制连续 1
        if (/^binary-(\d+)-ones$/.test(id)) {
            return '二进制表示中有连续 ' + RegExp.$1 + ' 个 1';
        }
        // 打乱连续数
        if (/^scrambled-(\d+)$/.test(id)) {
            return '包含 ' + RegExp.$1 + ' 位连续整数的乱序子串';
        }
        // 相邻连数
        if (/^adj-(\d+)-consec$/.test(id)) {
            return '含相邻 ' + RegExp.$1 + ' 位连续数字的子串';
        }
        // 分散连数
        if (/^sep-(\d+)-consec$/.test(id)) {
            return '含至少 8 组不连续的 ' + RegExp.$1 + ' 位连续数字';
        }
        // 顺序/乱序连数
        if (/^(consec|unordered)-(\d+)$/.test(id)) {
            var t = RegExp.$1 === 'consec' ? '连续' : '乱序';
            var min = {2:8,3:7,4:6}[RegExp.$2] || '';
            return '可以拆分为至少 ' + min + ' 组 ' + t + ' ' + RegExp.$2 + ' 位数';
        }
        // 数链
        if (/^chain-(\d+)$/.test(id)) {
            return '有连续 ' + RegExp.$1 + ' 位递增或递减 1';
        }
        // 圣诞树/拜谢
        if (id === 'tree-plus-plus-297' || id.indexOf('tree-297')===0) return '含 3 个 297';
        if (id === 'tree-plus-plus-002' || id.indexOf('tree-002')===0) return '含 3 个 002';
        if (id === 'tree-plus-297') return '含 2 个 297';
        if (id === 'tree-plus-002') return '含 2 个 002';
        if (id === 'tree-297') return '含 1 个 297';
        if (id === 'tree-002') return '含 1 个 002';

        // fallback: 显示稀有度 + TP
        return def.rarity + ' · ' + def.score.toLocaleString() + ' TP';
    }

    // ---------- Tooltip ----------
    var tooltipEl = null;
    var tooltipTimer = null;

    function showTooltip(pill, desc) {
        if (!tooltipEl) {
            tooltipEl = document.getElementById('badgeTooltip');
            if (!tooltipEl) return;
        }
        // 填内容
        tooltipEl.innerHTML = '<div class="tooltip__desc">' + desc + '</div>';
        tooltipEl.classList.add('tooltip--show');

        // 定位：pill 上方，水平居中于 pill
        var pillRect = pill.getBoundingClientRect();
        var tooltipRect = tooltipEl.getBoundingClientRect();
        var left = pillRect.left + pillRect.width / 2 - tooltipRect.width / 2;
        var top = pillRect.top - tooltipRect.height - 8;
        // 如果上方空间不够，放到下方
        if (top < 8) top = pillRect.bottom + 8;
        // 左右边界约束
        if (left < 8) left = 8;
        if (left + tooltipRect.width > window.innerWidth - 8) left = window.innerWidth - tooltipRect.width - 8;
        tooltipEl.style.left = left + 'px';
        tooltipEl.style.top = top + 'px';
    }

    function hideTooltip() {
        if (tooltipEl) tooltipEl.classList.remove('tooltip--show');
    }

    function initTooltip() {
        tooltipEl = document.getElementById('badgeTooltip');
        if (!tooltipEl || !badgeListEl) return;
        badgeListEl.addEventListener('click', function(e) {
            var pill = e.target.closest('.badge-pill');
            if (!pill) { hideTooltip(); return; }
            e.stopPropagation();
            if (tooltipEl.classList.contains('tooltip--show') && pill.dataset.activePill === '1') {
                hideTooltip();
                pill.dataset.activePill = '0';
                return;
            }
            // 取消之前的活跃状态
            var prev = badgeListEl.querySelector('[data-active-pill="1"]');
            if (prev) prev.dataset.activePill = '0';
            pill.dataset.activePill = '1';
            showTooltip(pill, pill.dataset.badgeDesc || '');
        });
        document.addEventListener('click', function() {
            hideTooltip();
            var prev = badgeListEl.querySelector('[data-active-pill="1"]');
            if (prev) prev.dataset.activePill = '0';
        });
    }

    // ---------- 初始化 ----------
    function initBadgeUI(badgeListElement, totalScoreElement, currentScoreElement, rollCountElement, bestRollNumElement, bestRollTPElement, bestRollBoxElement) {
        badgeListEl = badgeListElement;
        totalScoreSpan = totalScoreElement;
        currentScoreSpan = currentScoreElement || null;
        rollCountSpan = rollCountElement || null;
        bestRollNumSpan = bestRollNumElement || null;
        bestRollTPSpan = bestRollTPElement || null;
        bestRollBox = bestRollBoxElement || null;
        loadFromStorage();
        updateBadgeUI();
        initTooltip();
    }

    // ---------- 更新 UI ----------
    function updateBadgeUI() {
        if (!badgeListEl || !totalScoreSpan) return;

        // 统计行
        if (rollCountSpan) rollCountSpan.textContent = totalRolls.toLocaleString();
        totalScoreSpan.textContent = totalTP.toLocaleString();
        if (currentScoreSpan) currentScoreSpan.textContent = currentTP.toLocaleString();

        // 最佳
        if (bestRollBox && bestRollTP > 0) {
            bestRollBox.style.display = '';
            if (bestRollNumSpan) bestRollNumSpan.textContent = bestRollNum;
            if (bestRollTPSpan) bestRollTPSpan.textContent = '+' + bestRollTP.toLocaleString() + 'TP';
        } else if (bestRollBox) {
            bestRollBox.style.display = 'none';
        }

        // 徽章列表
        badgeListEl.innerHTML = '';

        var defs = window.BadgeDefs || [];
        var hasCurrentNumber = currentNumberStr && currentNumberStr.length > 0;

        var sorted = earnedBadges.slice().sort(function(a, b) {
            return rarityRank(a.rarity) - rarityRank(b.rarity);
        });

        var newBadges = [], oldBadges = [];
        sorted.forEach(function(badge) {
            if (newBadgeIds.hasOwnProperty(badge.id)) newBadges.push(badge);
            else oldBadges.push(badge);
        });

        function isActiveBadge(badge) {
            if (!hasCurrentNumber) return false;
            for (var i = 0; i < defs.length; i++) {
                if (defs[i].id === badge.id) {
                    try { return defs[i].check(currentNumberStr); } catch(e) { return false; }
                }
            }
            return false;
        }

        var showAll = showAllBadges;
        var newLimit = Math.min(newBadges.length, DISPLAY_LIMIT);
        var oldLimit = showAll ? oldBadges.length : Math.min(oldBadges.length, Math.max(0, DISPLAY_LIMIT - newLimit));

        if (newBadges.length > 0) {
            badgeListEl.appendChild(createSeparator('\u2728 \u65b0\u83b7\u5f97'));
            for (var ni = 0; ni < newLimit; ni++) {
                badgeListEl.appendChild(createBadgePill(newBadges[ni], isActiveBadge(newBadges[ni]), true));
            }
            if (!showAll && newBadges.length > newLimit) {
                var nExtra = document.createElement('span');
                nExtra.className = 'badge-more-hint';
                nExtra.textContent = '\u2026\u8fd8\u6709 ' + (newBadges.length - newLimit) + ' \u4e2a\u65b0\u5fbd\u7ae0';
                badgeListEl.appendChild(nExtra);
            }
        }

        if (newBadges.length > 0 && oldBadges.length > 0) {
            badgeListEl.appendChild(createSeparator('\u5df2\u6536\u96c6'));
        }

        for (var oi = 0; oi < oldLimit; oi++) {
            badgeListEl.appendChild(createBadgePill(oldBadges[oi], isActiveBadge(oldBadges[oi]), false));
        }

        var totalVisible = newLimit + oldLimit;
        var totalAll = newBadges.length + oldBadges.length;
        if (totalVisible < totalAll || showAll) {
            badgeListEl.appendChild(createLoadMoreButton(totalVisible, totalAll));
        }
    }

    // ---------- 检查并颁发徽章 ----------
    function checkAndAwardBadges(numberStr) {
        newBadgeIds = {};
        currentNumberStr = numberStr;
        currentTP = 0;
        showAllBadges = false;
        totalRolls++;
        var newlyEarnedIds = [];

        var defs = window.BadgeDefs || [];

        for (var i = 0; i < defs.length; i++) {
            var def = defs[i];
            if (!tryCheck(def, numberStr)) continue;

            currentTP += def.score;
            var existing = findBadge(def.id);
            if (existing) {
                existing.count++;
                totalTP += def.score;
            } else {
                earnedBadges.push({ id: def.id, name: def.name, emoji: def.emoji,
                    score: def.score, rarity: def.rarity, count: 1 });
                totalTP += def.score;
                newlyEarnedIds.push(def.id);
            }
        }

        // 更新最佳
        if (currentTP > bestRollTP) {
            bestRollTP = currentTP;
            bestRollNum = numberStr;
        }

        for (var k = 0; k < newlyEarnedIds.length; k++) {
            newBadgeIds[newlyEarnedIds[k]] = true;
        }

        updateBadgeUI();
        saveToStorage();
    }

    function tryCheck(def, num) {
        try { return def.check(num); } catch(e) { return false; }
    }

    function findBadge(id) {
        for (var i = 0; i < earnedBadges.length; i++) {
            if (earnedBadges[i].id === id) return earnedBadges[i];
        }
        return null;
    }

    // ---------- 重置 ----------
    function resetBadges() {
        earnedBadges = []; totalTP = 0; currentTP = 0;
        currentNumberStr = ''; newBadgeIds = {}; showAllBadges = false;
        totalRolls = 0; bestRollNum = ''; bestRollTP = 0;
        saveToStorage(); updateBadgeUI();
    }

    // ---------- 暴露 ----------
    window.Badges = {
        initBadgeUI: initBadgeUI,
        checkAndAwardBadges: checkAndAwardBadges,
        resetBadges: resetBadges,
        getEarnedBadges: function() { return earnedBadges.slice(); },
        getTotalTP: function() { return totalTP; },
        getCurrentTP: function() { return currentTP; },
        getCurrentNumberStr: function() { return currentNumberStr; },
        getCurrentActiveBadges: function() {
            if (!currentNumberStr) return [];
            var defs = window.BadgeDefs || [];
            return earnedBadges.filter(function(badge) {
                for (var i = 0; i < defs.length; i++) {
                    if (defs[i].id === badge.id) {
                        try { return defs[i].check(currentNumberStr); } catch(e) { return false; }
                    }
                }
                return false;
            });
        }
    };
})();
