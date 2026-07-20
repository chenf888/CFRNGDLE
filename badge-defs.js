// badge-defs.js – 全部徽章定义（约 140 个）
// 依赖：badge-utils.js（window.BadgeUtils）
(function() {
    'use strict';

    var U = window.BadgeUtils || {};

    function int(s) { return parseInt(s, 10); }

    window.BadgeDefs = [

    // ═══════════════════════════════════════════════
    // 一、位数徽章（11个）—— 有效位数越少越稀有
    // ═══════════════════════════════════════════════
    { id: 'len-11', name: '十一位数', emoji: '1️⃣1️⃣', score: 1,            rarity: '平庸',
        check: function(d) { return U.getEffectiveLength(d) === 11; } },
    { id: 'len-10', name: '十位数',   emoji: '🔟',   score: 1,           rarity: '平庸',
        check: function(d) { return U.getEffectiveLength(d) === 10; } },
    { id: 'len-9',  name: '九位数',   emoji: '9️⃣',   score: 10,          rarity: '普通',
        check: function(d) { return U.getEffectiveLength(d) === 9; } },
    { id: 'len-8',  name: '八位数',   emoji: '8️⃣',   score: 100,         rarity: '罕见',
        check: function(d) { return U.getEffectiveLength(d) === 8; } },
    { id: 'len-7',  name: '七位数',   emoji: '7️⃣',   score: 1000,        rarity: '稀有',
        check: function(d) { return U.getEffectiveLength(d) === 7; } },
    { id: 'len-6',  name: '六位数',   emoji: '6️⃣',   score: 10000,       rarity: '史诗',
        check: function(d) { return U.getEffectiveLength(d) === 6; } },
    { id: 'len-5',  name: '五位数',   emoji: '5️⃣',   score: 100000,      rarity: '传说',
        check: function(d) { return U.getEffectiveLength(d) === 5; } },
    { id: 'len-4',  name: '四位数',   emoji: '4️⃣',   score: 8649999,     rarity: '神话',
        check: function(d) { return U.getEffectiveLength(d) === 4; } },
    { id: 'len-3',  name: '三位数',   emoji: '3️⃣',   score: 86499999,    rarity: '超越',
        check: function(d) { return U.getEffectiveLength(d) === 3; } },
    { id: 'len-2',  name: '两位数',   emoji: '2️⃣',   score: 850014999999,   rarity: '终结',
        check: function(d) { return U.getEffectiveLength(d) === 2; } },
    { id: 'len-1',  name: '一位数',   emoji: '1️⃣',   score: 850014999999,  rarity: '终结',
        check: function(d) { return U.getEffectiveLength(d) === 1; } },

    // ═══════════════════════════════════════════════
    // 二、数学性质徽章（30个）
    // ═══════════════════════════════════════════════
    { id: 'prime',           name: '质数',       emoji: '🤵',     score: 10,    rarity: '普通',
        check: function(d) { return U.isPrime(int(d)); } },
    { id: 'semiprime',       name: '半质数',     emoji: '➗🤵',   score: 1,     rarity: '平庸',
        check: function(d) { return U.isSemiprime(int(d)); } },
    { id: 'abundant',        name: '盈数',       emoji: '🟥🟨🟩🟦', score: 1,    rarity: '平庸',
        check: function(d) { return U.isAbundant(int(d)); } },
    { id: 'perfect-number',  name: '完全数',     emoji: '✨',     score: 496, rarity: '终结',
        check: function(d) { return U.isPerfectNumber(int(d)); } },
    { id: 'square',          name: '平方数',     emoji: '🟦',     score: 100000,  rarity: '传说',
        check: function(d) { return U.isPerfectSquare(int(d)); } },
    { id: 'cube',            name: '立方数',     emoji: '📦',     score: 86499,  rarity: '史诗',
        check: function(d) { return U.isPerfectCube(int(d)); } },
    { id: 'power-of-2',      name: '2的幂',      emoji: '2️⃣↑',   score: 2, rarity: '终结',
        check: function(d) { return U.isPowerOf2(int(d)); } },
    { id: 'fibonacci',       name: '斐波那契',   emoji: '🌀',     score: 89, rarity: '史诗',
        check: function(d) { return U.isFibonacci(int(d)); } },
    { id: 'twin-prime',      name: '孪生质数',   emoji: '👯',     score: 100,   rarity: '罕见',
        check: function(d) { return U.isTwinPrime(int(d)); } },

    // 倍数系列
    { id: 'multiple-of-3',   name: '3的倍数',    emoji: '➗3️⃣',   score: 1,     rarity: '平庸',
        check: function(d) { return int(d) % 3 === 0; } },
    { id: 'multiple-of-7',   name: '7的倍数',    emoji: '➗7️⃣',   score: 1,     rarity: '平庸',
        check: function(d) {
            var last = int(d[d.length-1]);
            var rem = d.slice(0,-1);
            return (int(rem||'0') - 2*last) % 7 === 0;
        } },
    { id: 'multiple-of-9',   name: '9的倍数',    emoji: '➗9️⃣',   score: 1,     rarity: '平庸',
        check: function(d) { return U.sumOfDigits(d) % 9 === 0; } },
    { id: 'multiple-of-11',  name: '11的倍数',   emoji: '➗1️⃣1️⃣', score: 1,    rarity: '平庸',
        check: function(d) {
            var odd = 0, even = 0;
            for (var i = 0; i < d.length; i++) {
                if ((i+1)%2===1) odd += +d[i]; else even += +d[i];
            }
            return Math.abs(odd-even) % 11 === 0;
        } },
    { id: 'multiple-of-13',  name: '13的倍数',   emoji: '➗1️⃣3️⃣', score: 1,    rarity: '平庸',
        check: function(d) { return int(d) % 13 === 0; } },
    { id: 'multiple-of-17',  name: '17的倍数',   emoji: '➗1️⃣7️⃣', score: 1,    rarity: '平庸',
        check: function(d) { return int(d) % 17 === 0; } },
    { id: 'multiple-of-19',  name: '19的倍数',   emoji: '➗1️⃣9️⃣', score: 1,    rarity: '平庸',
        check: function(d) { return int(d) % 19 === 0; } },
    { id: 'multiple-of-23',  name: '23的倍数',   emoji: '➗2️⃣3️⃣', score: 10,    rarity: '普通',
        check: function(d) { return int(d) % 23 === 0; } },
    { id: 'multiple-of-29',  name: '29的倍数',   emoji: '➗2️⃣9️⃣', score: 10,    rarity: '普通',
        check: function(d) { return int(d) % 29 === 0; } },
    { id: 'multiple-of-37',  name: '37的倍数',   emoji: '➗3️⃣7️⃣', score: 10,    rarity: '普通',
        check: function(d) { return int(d) % 37 === 0; } },

    // 首尾 / 不含系列
    { id: 'first-last-equal',name: '首尾相等',   emoji: '☸',      score: 1,     rarity: '平庸',
        check: function(d) {
            var t = d.replace(/^0+/, '') || '0';
            return t[0] === t[t.length-1];
        } },
    { id: 'no-zero',         name: '攻',         emoji: '⚔',      score: 1,     rarity: '平庸',
        check: function(d) { return d.indexOf('0') === -1; } },
    { id: 'no-one',          name: '受',         emoji: '🎪',      score: 1,     rarity: '平庸',
        check: function(d) { return d.indexOf('1') === -1; } },
    { id: 'no-one-has-zero', name: '受受',       emoji: '🎪🎪',   score: 1,     rarity: '平庸',
        check: function(d) { return d.indexOf('1')===-1 && d.indexOf('0')!==-1; } },

    // 回文/全同系列
    { id: 'repdigit',        name: '全同数',     emoji: '🟰',     score: 86499999, rarity: '超越',
        check: function(d) { return U.maxConsecutiveSame(d) === d.length; } },
    { id: 'repunit',         name: '全1数',      emoji: '1️⃣',     score: 850014999999, rarity: '终结',
        check: function(d) { return d.indexOf('0')===-1 && d.indexOf('2')===-1 && d.indexOf('3')===-1 && d.indexOf('4')===-1 && d.indexOf('5')===-1 && d.indexOf('6')===-1 && d.indexOf('7')===-1 && d.indexOf('8')===-1 && d.indexOf('9')===-1; } },
    { id: 'palindrome',      name: '回文数',     emoji: '🔁',     score: 10000,   rarity: '史诗',
        check: function(d) { return U.isPalindrome(d); } },
    { id: 'sum-is-prime',    name: '数字和质数', emoji: '➕🤵',   score: 1,     rarity: '平庸',
        check: function(d) { return U.isPrime(U.sumOfDigits(d)); } },
    { id: 'perfect-squareof',name: '平方和平方数',emoji: '🟦➕',  score: 10,     rarity: '普通',
        check: function(d) { return U.isPerfectSquare(U.sumOfSquares(d)); } },
    { id: 'double',          name: '半全相同',   emoji: '🔀',     score: 10000,  rarity: '史诗',
        check: function(d) { return U.firstHalfEqualsSecondHalf(d); } },

    // ═══════════════════════════════════════════════
    // 三、数字模式徽章（25个）
    // ═══════════════════════════════════════════════
    { id: 'ascending',       name: '升序',       emoji: '📈',     score: 100000,   rarity: '传说',
        check: function(d) { return U.isNonDecreasing(d); } },
    { id: 'descending',      name: '降序',       emoji: '📉',     score: 500000,   rarity: '传说',
        check: function(d) { return U.isNonIncreasing(d); } },
    { id: 'all-lte-4',       name: '全≤4',       emoji: '4️⃣⬇',   score: 1000,     rarity: '稀有',
        check: function(d) { return U.allDigitsLTE(d,4); } },
    { id: 'all-gte-6',       name: '全≥6',       emoji: '6️⃣⬆',   score: 10000,  rarity: '史诗',
        check: function(d) { return U.allDigitsGTE(d,6); } },
    { id: 'first-half-lte',  name: '前半低',     emoji: '⬅️4️⃣',  score: 10,     rarity: '普通',
        check: function(d) { return U.firstHalfLTE(d,4); } },
    { id: 'second-half-lte', name: '后半低',     emoji: '4️⃣➡️',  score: 10,     rarity: '普通',
        check: function(d) { return U.secondHalfLTE(d,4); } },
    { id: 'alternating',     name: '奇偶交替',   emoji: '🔀',     score: 100,    rarity: '罕见',
        check: function(d) { return U.isAlternating(d); } },
    { id: 'no-repeat',       name: '无重复',     emoji: '🚫',     score: 100,  rarity: '罕见',
        check: function(d) { return U.uniqueDigitCount(d) >= 10; } },
    { id: 'only-two-digits', name: '二元数',     emoji: '2️⃣',     score: 100000,   rarity: '传说',
        check: function(d) { return U.uniqueDigitCount(d) === 2; } },
    { id: 'only-three-digits',name: '三元数',    emoji: '3️⃣',     score: 1000,    rarity: '稀有',
        check: function(d) { return U.uniqueDigitCount(d) === 3; } },

    // N连系列
    { id: 'triple',          name: '三连',       emoji: '3️⃣🎯',   score: 1,    rarity: '平庸',
        check: function(d) { return U.maxConsecutiveSame(d) >= 3; } },
    { id: 'quadruple',       name: '四连',       emoji: '4️⃣🎯',   score: 10,  rarity: '普通',
        check: function(d) { return U.maxConsecutiveSame(d) >= 4; } },
    { id: 'quintuple',       name: '五连',       emoji: '5️⃣🎯',   score: 100, rarity: '罕见',
        check: function(d) { return U.maxConsecutiveSame(d) >= 5; } },
    { id: 'sextuple',        name: '六连',       emoji: '6️⃣🎯',   score: 10000, rarity: '史诗',
        check: function(d) { return U.maxConsecutiveSame(d) >= 6; } },
    { id: 'septuple',        name: '七连',       emoji: '7️⃣🎯',   score: 500000, rarity: '传说',
        check: function(d) { return U.maxConsecutiveSame(d) >= 7; } },
    { id: 'octuple',         name: '八连',       emoji: '8️⃣🎯',   score: 100000, rarity: '传说',
        check: function(d) { return U.maxConsecutiveSame(d) >= 8; } },
    { id: 'nonuple',         name: '九连',       emoji: '9️⃣🎯',   score: 86499999, rarity: '超越',
        check: function(d) { return U.maxConsecutiveSame(d) >= 9; } },
    { id: 'decuple',         name: '十连以上',   emoji: '🔟🎯',   score: 850014999999, rarity: '终结',
        check: function(d) { return U.maxConsecutiveSame(d) >= 10; } },

    // 特殊形状
    { id: 'stairstep',       name: '阶梯数',     emoji: '🪜',     score: 50000000,    rarity: '超越',
        check: function(d) {
            var ok = true;
            for (var i=1;i<d.length;i++) { if (Math.abs(+d[i]-+d[i-1])!==1){ok=false;break;} }
            return ok && d.length>2;
        } },
    { id: 'mountain',        name: '山峰数',     emoji: '⛰️',    score: 500000,  rarity: '传说',
        check: function(d) { return U.isMountain(d); } },
    { id: 'valley',          name: '山谷数',     emoji: '🏞️',    score: 100000,  rarity: '传说',
        check: function(d) { return U.isValley(d); } },
    { id: 'double-double',   name: '双双对',     emoji: '👯👯',   score: 1,   rarity: '平庸',
        check: function(d) {
            var f = U.countDigitFreq(d);
            var pairs = 0;
            for (var i = 0; i < 10; i++) { if (f[i] >= 2) pairs++; }
            return pairs >= 4;
        } },
    { id: 'triple-pair',     name: '三对子',     emoji: '3️⃣👯',   score: 100,  rarity: '罕见',
        check: function(d) { return U.hasTriplePair(d); } },
    { id: 'all-consec',      name: '全连续',     emoji: '🔗',     score: 100,  rarity: '罕见',
        check: function(d) {
            var digits = [];
            for (var i = 0; i < d.length; i++) digits.push(+d[i]);
            digits.sort(function(a,b){return a-b;});
            var unique = [];
            for (var i = 0; i < digits.length; i++) {
                if (i === 0 || digits[i] !== digits[i-1]) unique.push(digits[i]);
            }
            var range = unique[unique.length-1] - unique[0];
            return range === unique.length - 1 && unique.length >= 10;
        } },

    // ═══════════════════════════════════════════════
    // 四、网络文化梗徽章（50个）—— 子串匹配
    // ═══════════════════════════════════════════════
    // 2位子串 — 平庸
    { id: 'meme-69',      name: '六九',        emoji: '6️⃣9️⃣',  score: 1,    rarity: '平庸', check: function(d){return U.hasSubstring(d,'69');} },
    { id: 'meme-78',      name: '七八',        emoji: '7️⃣8️⃣',  score: 1,    rarity: '平庸', check: function(d){return U.hasSubstring(d,'78');} },
    { id: 'meme-91',      name: '九一',        emoji: '9️⃣1️⃣',  score: 10,    rarity: '普通', check: function(d){return U.hasSubstring(d,'91');} },
    { id: 'meme-42',      name: '生命的意义',  emoji: '🐬',     score: 1,    rarity: '平庸', check: function(d){return U.hasSubstring(d,'42');} },
    { id: 'meme-86',      name: '中国区号',    emoji: '🇨🇳',     score: 1,    rarity: '平庸', check: function(d){return U.hasSubstring(d,'86');} },
    { id: 'meme-62',      name: '六二',        emoji: '6️⃣2️⃣',  score: 10,    rarity: '普通', check: function(d){return U.hasSubstring(d,'62');} },

    // 3位子串 — 平庸
    { id: 'meme-233',     name: '猫笑',        emoji: '🐱',     score: 10,   rarity: '普通', check: function(d){return U.hasSubstring(d,'233');} },
    { id: 'meme-250',     name: '二百五',      emoji: '🤪',     score: 10,   rarity: '普通', check: function(d){return U.hasSubstring(d,'250');} },
    { id: 'meme-251',     name: '二五一',      emoji: '2️⃣5️⃣1️⃣',score: 10,    rarity: '普通', check: function(d){return U.hasSubstring(d,'251');} },
    { id: 'meme-404',     name: '未找到',      emoji: '❓',     score: 10,   rarity: '普通', check: function(d){return U.hasSubstring(d,'404');} },
    { id: 'meme-007',     name: '詹姆斯·邦德', emoji: '🔫',     score: 10,    rarity: '普通', check: function(d){return U.hasSubstring(d,'007');} },
    { id: 'meme-520',     name: '我爱你',      emoji: '💕',     score: 10,   rarity: '普通', check: function(d){return U.hasSubstring(d,'520');} },
    { id: 'meme-521',     name: '我愿意',      emoji: '💍',     score: 10,   rarity: '普通', check: function(d){return U.hasSubstring(d,'521');} },
    { id: 'meme-119',     name: '火警',        emoji: '🚒',     score: 10,   rarity: '普通', check: function(d){return U.hasSubstring(d,'119');} },
    { id: 'meme-120',     name: '急救',        emoji: '🚑',     score: 10,   rarity: '普通', check: function(d){return U.hasSubstring(d,'120');} },
    { id: 'meme-110',     name: '报警',        emoji: '🚔',     score: 10,   rarity: '普通', check: function(d){return U.hasSubstring(d,'110');} },
    { id: 'meme-114',     name: '查号台',      emoji: '📞',     score: 10,   rarity: '普通', check: function(d){return U.hasSubstring(d,'114');} },
    { id: 'meme-992',     name: '救救',        emoji: '🆘',     score: 10,   rarity: '普通', check: function(d){return U.hasSubstring(d,'992');} },
    { id: 'meme-996',     name: '996工作制',   emoji: '💼',     score: 10,   rarity: '普通', check: function(d){return U.hasSubstring(d,'996');} },
    { id: 'meme-745',     name: '气死我',      emoji: '😤',     score: 10,   rarity: '普通', check: function(d){return U.hasSubstring(d,'745');} },
    { id: 'meme-748',     name: '气死吧',      emoji: '😡',     score: 10,   rarity: '普通', check: function(d){return U.hasSubstring(d,'748');} },
    { id: 'meme-810',     name: '八一零',      emoji: '8️⃣1️⃣0️⃣',score: 10,   rarity: '普通', check: function(d){return U.hasSubstring(d,'810');} },
    { id: 'meme-666',     name: '野兽之数',    emoji: '😈',     score: 10,   rarity: '普通', check: function(d){return U.hasSubstring(d,'666');} },
    { id: 'meme-777',     name: '幸运七',      emoji: '🍀',     score: 10,   rarity: '普通', check: function(d){return U.hasSubstring(d,'777');} },
    { id: 'meme-888',     name: '发财',        emoji: '💰',     score: 10,   rarity: '普通', check: function(d){return U.hasSubstring(d,'888');} },
    { id: 'meme-911',     name: '九一一',      emoji: '🏙️',    score: 10,   rarity: '普通', check: function(d){return U.hasSubstring(d,'911');} },
    { id: 'meme-000',     name: '三蛋',        emoji: '🥚',     score: 10,   rarity: '普通', check: function(d){return U.hasSubstring(d,'000');} },
    { id: 'meme-246',     name: '爱死了',      emoji: '💀💕',   score: 10,   rarity: '普通', check: function(d){return U.hasSubstring(d,'246');} },
    { id: 'meme-282',     name: '爱不爱',      emoji: '❓💕',   score: 10,   rarity: '普通', check: function(d){return U.hasSubstring(d,'282');} },
    { id: 'meme-360',     name: '想念你',      emoji: '🤔',     score: 10,   rarity: '普通', check: function(d){return U.hasSubstring(d,'360');} },
    { id: 'meme-592',     name: '我就爱',      emoji: '💖',     score: 10,   rarity: '普通', check: function(d){return U.hasSubstring(d,'592');} },
    { id: 'meme-596',     name: '我走了',      emoji: '🚶',     score: 10,   rarity: '普通', check: function(d){return U.hasSubstring(d,'596');} },
    { id: 'meme-921',     name: '就爱你',      emoji: '💝',     score: 10,   rarity: '普通', check: function(d){return U.hasSubstring(d,'921');} },
    { id: 'meme-400',     name: '四百',        emoji: '4️⃣0️⃣0️⃣',score: 10,   rarity: '普通', check: function(d){return U.hasSubstring(d,'400');} },
    { id: 'meme-578',     name: '我去吧',      emoji: '🏃',     score: 10,   rarity: '普通', check: function(d){return U.hasSubstring(d,'578');} },

    // 4位子串 — 普通
    { id: 'meme-1337',    name: '黑客语言',    emoji: '💻',     score: 100,   rarity: '罕见', check: function(d){return U.hasSubstring(d,'1337');} },
    { id: 'meme-9527',    name: '唐伯虎',      emoji: '🎭',     score: 100,   rarity: '罕见', check: function(d){return U.hasSubstring(d,'9527');} },
    { id: 'meme-1984',    name: '一九八四',    emoji: '📖',     score: 100,   rarity: '罕见', check: function(d){return U.hasSubstring(d,'1984');} },
    { id: 'meme-2049',    name: '未来',        emoji: '🔮',     score: 100,   rarity: '罕见', check: function(d){return U.hasSubstring(d,'2049');} },
    { id: 'meme-1573',    name: '一往情深',    emoji: '💗',     score: 100,   rarity: '罕见', check: function(d){return U.hasSubstring(d,'1573');} },
    { id: 'meme-9413',    name: '九死一生',    emoji: '💀',     score: 100,   rarity: '罕见', check: function(d){return U.hasSubstring(d,'9413');} },
    { id: 'meme-4396',    name: '厂长',        emoji: '🎮',     score: 100,   rarity: '罕见', check: function(d){return U.hasSubstring(d,'4396');} },
    { id: 'meme-1919',    name: '1919',        emoji: '1️⃣9️⃣',  score: 100,   rarity: '罕见', check: function(d){return U.hasSubstring(d,'1919');} },
    { id: 'meme-1314',    name: '一生一世',    emoji: '💞',     score: 100,   rarity: '罕见', check: function(d){return U.hasSubstring(d,'1314');} },
    { id: 'meme-5418',    name: '你是你爸',    emoji: '👨',     score: 100,   rarity: '罕见', check: function(d){return U.hasSubstring(d,'5418');} },
    { id: 'meme-1688',    name: '一路发发',    emoji: '🧧',     score: 100,   rarity: '罕见', check: function(d){return U.hasSubstring(d,'1688');} },
    { id: 'meme-2013',    name: '爱你一生',    emoji: '🗓️',    score: 100,   rarity: '罕见', check: function(d){return U.hasSubstring(d,'2013');} },
    { id: 'meme-5918',    name: '我就要发',    emoji: '🤑',     score: 100,   rarity: '罕见', check: function(d){return U.hasSubstring(d,'5918');} },

    // 5位及以上子串 — 罕见+
    { id: 'meme-10086',   name: '中国移动',    emoji: '📱',     score: 1000,  rarity: '稀有', check: function(d){return U.hasSubstring(d,'10086');} },
    { id: 'meme-10010',   name: '中国联通',    emoji: '📶',     score: 1000,  rarity: '稀有', check: function(d){return U.hasSubstring(d,'10010');} },
    { id: 'meme-12306',   name: '抢票神器',    emoji: '🚄',     score: 1000,  rarity: '稀有', check: function(d){return U.hasSubstring(d,'12306');} },
    { id: 'meme-114514',  name: '好臭的数字',  emoji: '🤢',     score: 100000, rarity: '传说', check: function(d){return U.hasSubstring(d,'114514');} },
    { id: 'meme-66686',   name: '溜溜溜达嘿',  emoji: '🏃💨',   score: 1000,   rarity: '稀有', check: function(d){return U.hasSubstring(d,'66686');} },

    // ═══════════════════════════════════════════════
    // 五、连续序列徽章（35个）—— 子串匹配
    // ═══════════════════════════════════════════════
    // 3位序列（平庸）
    { id: 'seq-012', name: '零一二',   emoji: '0️⃣1️⃣2️⃣', score: 10,  rarity: '普通', check: function(d){return U.hasSubstring(d,'012');} },
    { id: 'seq-123', name: '一二三',   emoji: '1️⃣2️⃣3️⃣', score: 10, rarity: '普通', check: function(d){return U.hasSubstring(d,'123');} },
    { id: 'seq-234', name: '二三四',   emoji: '2️⃣3️⃣4️⃣', score: 10, rarity: '普通', check: function(d){return U.hasSubstring(d,'234');} },
    { id: 'seq-345', name: '三四五',   emoji: '3️⃣4️⃣5️⃣', score: 10, rarity: '普通', check: function(d){return U.hasSubstring(d,'345');} },
    { id: 'seq-456', name: '四五六',   emoji: '4️⃣5️⃣6️⃣', score: 10, rarity: '普通', check: function(d){return U.hasSubstring(d,'456');} },
    { id: 'seq-567', name: '五六七',   emoji: '5️⃣6️⃣7️⃣', score: 10, rarity: '普通', check: function(d){return U.hasSubstring(d,'567');} },
    { id: 'seq-678', name: '六七八',   emoji: '6️⃣7️⃣8️⃣', score: 10, rarity: '普通', check: function(d){return U.hasSubstring(d,'678');} },
    { id: 'seq-789', name: '七八九',   emoji: '7️⃣8️⃣9️⃣', score: 10, rarity: '普通', check: function(d){return U.hasSubstring(d,'789');} },
    { id: 'seq-890', name: '八九零',   emoji: '8️⃣9️⃣0️⃣', score: 10, rarity: '普通', check: function(d){return U.hasSubstring(d,'890');} },
    { id: 'seq-901', name: '九零一',   emoji: '9️⃣0️⃣1️⃣', score: 10, rarity: '普通', check: function(d){return U.hasSubstring(d,'901');} },
    // 降序3位
    { id: 'seq-098', name: '零九八',   emoji: '0️⃣9️⃣8️⃣', score: 10,  rarity: '普通', check: function(d){return U.hasSubstring(d,'098');} },
    { id: 'seq-987', name: '九八七',   emoji: '9️⃣8️⃣7️⃣', score: 10, rarity: '普通', check: function(d){return U.hasSubstring(d,'987');} },
    { id: 'seq-876', name: '八七六',   emoji: '8️⃣7️⃣6️⃣', score: 10, rarity: '普通', check: function(d){return U.hasSubstring(d,'876');} },
    { id: 'seq-765', name: '七六五',   emoji: '7️⃣6️⃣5️⃣', score: 10, rarity: '普通', check: function(d){return U.hasSubstring(d,'765');} },
    { id: 'seq-654', name: '六五四',   emoji: '6️⃣5️⃣4️⃣', score: 10, rarity: '普通', check: function(d){return U.hasSubstring(d,'654');} },
    { id: 'seq-543', name: '五四三',   emoji: '5️⃣4️⃣3️⃣', score: 10, rarity: '普通', check: function(d){return U.hasSubstring(d,'543');} },
    { id: 'seq-432', name: '四三二',   emoji: '4️⃣3️⃣2️⃣', score: 10, rarity: '普通', check: function(d){return U.hasSubstring(d,'432');} },
    { id: 'seq-321', name: '三二一',   emoji: '3️⃣2️⃣1️⃣', score: 10, rarity: '普通', check: function(d){return U.hasSubstring(d,'321');} },
    { id: 'seq-210', name: '二一零',   emoji: '2️⃣1️⃣0️⃣', score: 10, rarity: '普通', check: function(d){return U.hasSubstring(d,'210');} },

    // 4位序列（普通）
    { id: 'seq-1234', name: '一二三四',   emoji: '1️⃣2️⃣3️⃣4️⃣', score: 100, rarity: '罕见', check: function(d){return U.hasSubstring(d,'1234');} },
    { id: 'seq-2345', name: '二三四五',   emoji: '2️⃣3️⃣4️⃣5️⃣', score: 100, rarity: '罕见', check: function(d){return U.hasSubstring(d,'2345');} },
    { id: 'seq-3456', name: '三四五六',   emoji: '3️⃣4️⃣5️⃣6️⃣', score: 100, rarity: '罕见', check: function(d){return U.hasSubstring(d,'3456');} },
    { id: 'seq-4567', name: '四五六七',   emoji: '4️⃣5️⃣6️⃣7️⃣', score: 100, rarity: '罕见', check: function(d){return U.hasSubstring(d,'4567');} },
    { id: 'seq-5678', name: '五六七八',   emoji: '5️⃣6️⃣7️⃣8️⃣', score: 100, rarity: '罕见', check: function(d){return U.hasSubstring(d,'5678');} },
    { id: 'seq-6789', name: '六七八九',   emoji: '6️⃣7️⃣8️⃣9️⃣', score: 100, rarity: '罕见', check: function(d){return U.hasSubstring(d,'6789');} },
    { id: 'seq-7890', name: '七八九零',   emoji: '7️⃣8️⃣9️⃣0️⃣', score: 100, rarity: '罕见', check: function(d){return U.hasSubstring(d,'7890');} },
    { id: 'seq-9876', name: '九八七六',   emoji: '9️⃣8️⃣7️⃣6️⃣', score: 100, rarity: '罕见', check: function(d){return U.hasSubstring(d,'9876');} },
    { id: 'seq-8765', name: '八七六五',   emoji: '8️⃣7️⃣6️⃣5️⃣', score: 100, rarity: '罕见', check: function(d){return U.hasSubstring(d,'8765');} },
    { id: 'seq-7654', name: '七六五四',   emoji: '7️⃣6️⃣5️⃣4️⃣', score: 100, rarity: '罕见', check: function(d){return U.hasSubstring(d,'7654');} },
    { id: 'seq-6543', name: '六五四三',   emoji: '6️⃣5️⃣4️⃣3️⃣', score: 100, rarity: '罕见', check: function(d){return U.hasSubstring(d,'6543');} },
    { id: 'seq-5432', name: '五四三二',   emoji: '5️⃣4️⃣3️⃣2️⃣', score: 100, rarity: '罕见', check: function(d){return U.hasSubstring(d,'5432');} },
    { id: 'seq-4321', name: '四三二一',   emoji: '4️⃣3️⃣2️⃣1️⃣', score: 100, rarity: '罕见', check: function(d){return U.hasSubstring(d,'4321');} },

    // 5位序列（罕见）
    { id: 'seq-12345', name: '一二三四五',     emoji: '🔢', score: 1000, rarity: '稀有', check: function(d){return U.hasSubstring(d,'12345');} },
    { id: 'seq-56789', name: '五六七八九',     emoji: '🔢', score: 1000, rarity: '稀有', check: function(d){return U.hasSubstring(d,'56789');} },
    { id: 'seq-67890', name: '六七八九零',     emoji: '🔢', score: 1000, rarity: '稀有', check: function(d){return U.hasSubstring(d,'67890');} },

    // ═══════════════════════════════════════════════
    // 六、数字密集徽章（20个）—— 某数字出现≥5次
    // ═══════════════════════════════════════════════
    // ≥5次 — 罕见
    { id: 'dense-zero-5',  name: '五零', emoji: '0️⃣×5️⃣', score: 100,  rarity: '罕见', check: function(d){return U.countDigitFreq(d)[0]>=5;} },
    { id: 'dense-one-5',   name: '五一', emoji: '1️⃣×5️⃣', score: 100,  rarity: '罕见', check: function(d){return U.countDigitFreq(d)[1]>=5;} },
    { id: 'dense-two-5',   name: '五二', emoji: '2️⃣×5️⃣', score: 100,  rarity: '罕见', check: function(d){return U.countDigitFreq(d)[2]>=5;} },
    { id: 'dense-three-5', name: '五三', emoji: '3️⃣×5️⃣', score: 100,  rarity: '罕见', check: function(d){return U.countDigitFreq(d)[3]>=5;} },
    { id: 'dense-four-5',  name: '五四', emoji: '4️⃣×5️⃣', score: 100,  rarity: '罕见', check: function(d){return U.countDigitFreq(d)[4]>=5;} },
    { id: 'dense-five-5',  name: '五五', emoji: '5️⃣×5️⃣', score: 100,  rarity: '罕见', check: function(d){return U.countDigitFreq(d)[5]>=5;} },
    { id: 'dense-six-5',   name: '五六', emoji: '6️⃣×5️⃣', score: 100,  rarity: '罕见', check: function(d){return U.countDigitFreq(d)[6]>=5;} },
    { id: 'dense-seven-5', name: '五七', emoji: '7️⃣×5️⃣', score: 100,  rarity: '罕见', check: function(d){return U.countDigitFreq(d)[7]>=5;} },
    { id: 'dense-eight-5', name: '五八', emoji: '8️⃣×5️⃣', score: 100,  rarity: '罕见', check: function(d){return U.countDigitFreq(d)[8]>=5;} },
    { id: 'dense-nine-5',  name: '五九', emoji: '9️⃣×5️⃣', score: 100,  rarity: '罕见', check: function(d){return U.countDigitFreq(d)[9]>=5;} },
    // ≥6次 — 稀有
    { id: 'dense-zero-6',  name: '六零', emoji: '0️⃣×6️⃣', score: 1000, rarity: '稀有', check: function(d){return U.countDigitFreq(d)[0]>=6;} },
    { id: 'dense-one-6',   name: '六一', emoji: '1️⃣×6️⃣', score: 1000, rarity: '稀有', check: function(d){return U.countDigitFreq(d)[1]>=6;} },
    { id: 'dense-two-6',   name: '六二', emoji: '2️⃣×6️⃣', score: 1000, rarity: '稀有', check: function(d){return U.countDigitFreq(d)[2]>=6;} },
    { id: 'dense-three-6', name: '六三', emoji: '3️⃣×6️⃣', score: 1000, rarity: '稀有', check: function(d){return U.countDigitFreq(d)[3]>=6;} },
    // ≥7次 — 史诗
    { id: 'dense-zero-7',  name: '七零', emoji: '0️⃣×7️⃣', score: 10000, rarity: '史诗', check: function(d){return U.countDigitFreq(d)[0]>=7;} },
    { id: 'dense-one-7',   name: '七一', emoji: '1️⃣×7️⃣', score: 10000, rarity: '史诗', check: function(d){return U.countDigitFreq(d)[1]>=7;} },
    // ≥8次 — 传说
    { id: 'dense-zero-8',  name: '八零', emoji: '0️⃣×8️⃣', score: 864999, rarity: '传说', check: function(d){return U.countDigitFreq(d)[0]>=8;} },
    { id: 'dense-one-8',   name: '八一', emoji: '1️⃣×8️⃣', score: 100000, rarity: '传说', check: function(d){return U.countDigitFreq(d)[1]>=8;} },
    // ≥9次 — 神话
    { id: 'dense-zero-9',  name: '九零', emoji: '0️⃣×9️⃣', score: 8649999, rarity: '神话', check: function(d){return U.countDigitFreq(d)[0]>=9;} },
    { id: 'dense-one-9',   name: '九一', emoji: '1️⃣×9️⃣', score: 8649999, rarity: '神话', check: function(d){return U.countDigitFreq(d)[1]>=9;} },

    // ═══════════════════════════════════════════════
    // 七、Pi / e / φ 常数连续徽章（15个）
    // ═══════════════════════════════════════════════
    // π = 3.141592653589793... → "31415926535"
    { id: 'pi-3',  name: 'π连续3位',  emoji: 'π3️⃣',  score: 3,        rarity: '罕见', check: function(d){return U.prefixMatchLength(d, '314') >= 3;} },
    { id: 'pi-4',  name: 'π连续4位',  emoji: 'π4️⃣',  score: 31,       rarity: '稀有', check: function(d){return U.prefixMatchLength(d, '3141') >= 4;} },
    { id: 'pi-5',  name: 'π连续5位',  emoji: 'π5️⃣',  score: 314,      rarity: '史诗', check: function(d){return U.prefixMatchLength(d, '31415') >= 5;} },
    { id: 'pi-6',  name: 'π连续6位',  emoji: 'π6️⃣',  score: 3141,     rarity: '传说', check: function(d){return U.prefixMatchLength(d, '314159') >= 6;} },
    { id: 'pi-7',  name: 'π连续7位',  emoji: 'π7️⃣',  score: 31415,    rarity: '神话', check: function(d){return U.prefixMatchLength(d, '3141592') >= 7;} },
    { id: 'pi-8',  name: 'π连续8位',  emoji: 'π8️⃣',  score: 314159,   rarity: '传说', check: function(d){return U.prefixMatchLength(d, '31415926') >= 8;} },
    { id: 'pi-9',  name: 'π连续9位',  emoji: 'π9️⃣',  score: 3141592,  rarity: '神话', check: function(d){return U.prefixMatchLength(d, '314159265') >= 9;} },
    { id: 'pi-10', name: 'π连续10位', emoji: 'π🔟',  score: 31415926, rarity: '超越', check: function(d){return U.prefixMatchLength(d, '3141592653') >= 10;} },
    { id: 'pi-11', name: 'π连续11位', emoji: 'π1️⃣1️⃣',score: 314159265, rarity: '终结', check: function(d){return U.prefixMatchLength(d, '31415926535') >= 11;} },
    // e = 2.718281828... → "27182818284"
    { id: 'e-3',   name: 'e连续3位',  emoji: 'e3️⃣',  score: 2,       rarity: '罕见', check: function(d){return U.prefixMatchLength(d, '271') >= 3;} },
    { id: 'e-4',   name: 'e连续4位',  emoji: 'e4️⃣',  score: 27,      rarity: '稀有', check: function(d){return U.prefixMatchLength(d, '2718') >= 4;} },
    { id: 'e-5',   name: 'e连续5位',  emoji: 'e5️⃣',  score: 271,     rarity: '史诗', check: function(d){return U.prefixMatchLength(d, '27182') >= 5;} },
    { id: 'e-6',   name: 'e连续6位',  emoji: 'e6️⃣',  score: 2718,    rarity: '传说', check: function(d){return U.prefixMatchLength(d, '271828') >= 6;} },
    // φ = 1.6180339887... → 匹配 "618"
    { id: 'phi-3', name: 'φ连续3位',  emoji: 'φ3️⃣',  score: 6,       rarity: '罕见', check: function(d){return U.prefixMatchLength(d, '618') >= 3;} },
    { id: 'phi-4', name: 'φ连续4位',  emoji: 'φ4️⃣',  score: 61,      rarity: '稀有', check: function(d){return U.prefixMatchLength(d, '6180') >= 4;} },

    // ═══════════════════════════════════════════════
    // 八、奇趣模式徽章（15个）
    // ═══════════════════════════════════════════════
    { id: 'feynman',          name: '费曼点',     emoji: '🎓',     score: 100000, rarity: '传说',
        check: function(d) { return U.hasSubstring(d, '999999'); } },
    { id: 'perfect-palindrome',name: '完美回文',  emoji: '🪞',     score: 5000000,   rarity: '神话',
        check: function(d) { return U.isPalindrome(d) && U.isPrime(int(d)); } },
    { id: 'lucky-seven',     name: '幸运7',      emoji: '🍀7️⃣',   score: 1,     rarity: '平庸',
        check: function(d) { return U.countDigitFreq(d)[7] >= 3; } },
    { id: 'all-evens',       name: '偶数全',     emoji: '2️⃣4️⃣6️⃣', score: 100,   rarity: '罕见',
        check: function(d) { return U.allEven(d); } },
    { id: 'all-odds',        name: '奇数全',     emoji: '1️⃣3️⃣5️⃣', score: 1000,   rarity: '稀有',
        check: function(d) { return U.allOdd(d); } },
    { id: 'phone-pattern',   name: '键盘形',     emoji: '⌨️',     score: 1,    rarity: '平庸',
        check: function(d) { return U.hasPhoneRow(d); } },
    { id: 'two-sum-10',      name: '两两成十',   emoji: '🔟',     score: 50000000,    rarity: '超越',
        check: function(d) { return U.allAdjacentSum10(d); } },
    { id: 'zigzag',          name: '之字形',     emoji: '⚡',     score: 10,    rarity: '普通',
        check: function(d) { return U.isZigzag(d); } },
    { id: 'double-zero',     name: '双零头',     emoji: '0️⃣0️⃣',   score: 10,   rarity: '普通',
        check: function(d) { return d[0]==='0' && d[1]==='0'; } },
    { id: 'tail-zero',       name: '零结尾',     emoji: '0️⃣⬅️',   score: 1,    rarity: '平庸',
        check: function(d) { return d[d.length-1]==='0'; } },
    { id: 'tail-five',       name: '五结尾',     emoji: '5️⃣⬅️',   score: 1,     rarity: '平庸',
        check: function(d) { return d[d.length-1]==='5'; } },
    { id: 'first-big',       name: '大起头',     emoji: '⬆️',     score: 1,     rarity: '平庸',
        check: function(d) { return +d[0] >= 8; } },
    { id: 'first-small',     name: '小起头',     emoji: '⬇️',     score: 1,     rarity: '平庸',
        check: function(d) { return +d[0] <= 2; } },
    { id: 'all-inc-by-2',    name: '隔2递增',    emoji: '2️⃣⏫',    score: 50000000,  rarity: '超越',
        check: function(d) { return U.isArithmeticProgression(d, 2); } },
    { id: 'all-dec-by-2',    name: '隔2递减',    emoji: '2️⃣⏬',    score: 50000000,  rarity: '超越',
        check: function(d) { return U.isArithmeticProgression(d, -2); } },
    { id: 'sum-eq-prod',     name: '和等于积',   emoji: '➕🟰✖️',  score: 500000000,  rarity: '终结',
        check: function(d) { return U.sumEqualsProduct(d); } },

    // ═══════════════════════════════════════════════
    // 九、恰好一个 X 系列（10个）
    // ═══════════════════════════════════════════════
    { id: 'exact-one-0', name: '恰好一个0', emoji: '0️⃣×1️⃣', score: 1, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 0, 1); } },
    { id: 'exact-one-1', name: '恰好一个1', emoji: '1️⃣×1️⃣', score: 1, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 1, 1); } },
    { id: 'exact-one-2', name: '恰好一个2', emoji: '2️⃣×1️⃣', score: 1, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 2, 1); } },
    { id: 'exact-one-3', name: '恰好一个3', emoji: '3️⃣×1️⃣', score: 1, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 3, 1); } },
    { id: 'exact-one-4', name: '恰好一个4', emoji: '4️⃣×1️⃣', score: 1, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 4, 1); } },
    { id: 'exact-one-5', name: '恰好一个5', emoji: '5️⃣×1️⃣', score: 1, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 5, 1); } },
    { id: 'exact-one-6', name: '恰好一个6', emoji: '6️⃣×1️⃣', score: 1, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 6, 1); } },
    { id: 'exact-one-7', name: '恰好一个7', emoji: '7️⃣×1️⃣', score: 1, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 7, 1); } },
    { id: 'exact-one-8', name: '恰好一个8', emoji: '8️⃣×1️⃣', score: 1, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 8, 1); } },
    { id: 'exact-one-9', name: '恰好一个9', emoji: '9️⃣×1️⃣', score: 1, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 9, 1); } },

    // ═══════════════════════════════════════════════
    // 十、邻居/对子系列（8个）
    // ═══════════════════════════════════════════════
    { id: 'has-neighbor',   name: '邻居',     emoji: '🏘️',    score: 1,  rarity: '平庸',
        check: function(d) { var c=0; for(var i=1;i<d.length;i++){if(Math.abs(+d[i]-+d[i-1])<=1)c++;} return c>=5; } },
    { id: 'far-neighbor',   name: '远邻',     emoji: '↔️',    score: 10000, rarity: '史诗',
        check: function(d) { return U.isFarNeighbor(d); } },
    { id: 'exact-pair',     name: '一对',     emoji: '👯',    score: 100, rarity: '罕见',
        check: function(d) { return U.hasExactPair(d); } },
    { id: 'turtle',         name: '乌龟爬',   emoji: '🐢',    score: 500000, rarity: '传说',
        check: function(d) { return U.isTurtle(d); } },
    { id: 'sandwich',       name: '三明治',   emoji: '🥪',    score: 10, rarity: '普通',
        check: function(d) { return U.isSandwich(d); } },
    { id: 'symmetric-pair', name: '对称对',   emoji: '🦋',    score: 10000, rarity: '史诗',
        check: function(d) { return U.isSymmetricPairs(d); } },
    { id: 'has-cliff',      name: '悬崖',     emoji: '🧗',    score: 1, rarity: '平庸',
        check: function(d) { for(var i=1;i<d.length;i++){if(Math.abs(+d[i]-+d[i-1])>=9)return true;} return false; } },
    { id: 'has-plateau',    name: '高原',     emoji: '🏔️',    score: 1000, rarity: '稀有',
        check: function(d) { return U.hasPlateau(d, 5); } },

    // ═══════════════════════════════════════════════
    // 十一、幂次数系列（5个）
    // ═══════════════════════════════════════════════
    { id: 'power-of-3',   name: '3的幂',   emoji: '3️⃣↑',  score: 3, rarity: '终结',
        check: function(d) { return U.isPowerOf(int(d), 3); } },
    { id: 'power-of-5',   name: '5的幂',   emoji: '5️⃣↑',  score: 5, rarity: '终结',
        check: function(d) { return U.isPowerOf(int(d), 5); } },
    { id: 'triangular',   name: '三角数',  emoji: '🔺',    score: 500000, rarity: '传说',
        check: function(d) { return U.isTriangular(int(d)); } },
    { id: 'factorial',    name: '阶乘',    emoji: '!',     score: 720, rarity: '终结',
        check: function(d) {
            var n = int(d), f = 1, i = 2;
            while (f < n) { f *= i; i++; }
            return f === n;
        } },
    { id: 'catalan',      name: '卡塔兰数', emoji: '📐',  score: 42, rarity: '超越',
        check: function(d) { return U.isCatalan(int(d)); } },

    // ═══════════════════════════════════════════════
    // 十二、化学元素系列（10个）
    // ═══════════════════════════════════════════════
    { id: 'elem-h',  name: '氢 (1)',  emoji: '💧', score: 1, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 1, 1); } },
    { id: 'elem-he', name: '氦 (2)',  emoji: '🎈', score: 1, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 2, 1); } },
    { id: 'elem-li', name: '锂 (3)',  emoji: '🔋', score: 1, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 3, 1); } },
    { id: 'elem-be', name: '铍 (4)',  emoji: '💎', score: 1, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 4, 1); } },
    { id: 'elem-b',  name: '硼 (5)',  emoji: '🧼', score: 1, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 5, 1); } },
    { id: 'elem-c',  name: '碳 (6)',  emoji: '💎⚫', score: 1, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 6, 1); } },
    { id: 'elem-n',  name: '氮 (7)',  emoji: '💨', score: 1, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 7, 1); } },
    { id: 'elem-o',  name: '氧 (8)',  emoji: '🫧', score: 1, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 8, 1); } },
    { id: 'elem-f',  name: '氟 (9)',  emoji: '🦷', score: 1, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 9, 1); } },
    { id: 'elem-ne', name: '氖 (0)',  emoji: '💡', score: 1, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 0, 1); } },

    // ═══════════════════════════════════════════════
    // 十三、哈沙德/求和系列（10个）
    // ═══════════════════════════════════════════════
    { id: 'harshad',      name: '哈沙德数', emoji: '➗➕',  score: 10,  rarity: '普通',
        check: function(d) { return U.isHarshad(d); } },
    { id: 'moran',        name: '莫兰数',   emoji: '➗🤵', score: 100, rarity: '罕见',
        check: function(d) { return U.isMoran(d); } },
    { id: 'happy',        name: '快乐数',   emoji: '😊',  score: 1, rarity: '平庸',
        check: function(d) { return U.isHappy(int(d)); } },
    { id: 'deficient',    name: '亏数',     emoji: '📉',  score: 1,  rarity: '平庸',
        check: function(d) {
            var n = int(d), sum = 1, limit = Math.sqrt(n);
            for (var i = 2; i <= limit; i++) { if (n % i === 0) { sum += i; var j = n/i; if (j !== i) sum += j; } }
            return sum < n;
        } },
    { id: 'sum-11',       name: '和为11',   emoji: '➕1️⃣1️⃣', score: 100000, rarity: '传说',
        check: function(d) { return U.sumOfDigits(d) === 11; } },
    { id: 'sum-22',       name: '和为22',   emoji: '➕2️⃣2️⃣', score: 100, rarity: '罕见',
        check: function(d) { return U.sumOfDigits(d) === 22; } },
    { id: 'sum-33',       name: '和为33',   emoji: '➕3️⃣3️⃣', score: 10, rarity: '普通',
        check: function(d) { return U.sumOfDigits(d) === 33; } },
    { id: 'sum-44',       name: '和为44',   emoji: '➕4️⃣4️⃣', score: 10, rarity: '普通',
        check: function(d) { return U.sumOfDigits(d) === 44; } },
    { id: 'sum-55',       name: '和为55',   emoji: '➕5️⃣5️⃣', score: 10, rarity: '普通',
        check: function(d) { return U.sumOfDigits(d) === 55; } },
    { id: 'div-by-prod',  name: '积整除',   emoji: '✖️➗',  score: 5000000,  rarity: '神话',
        check: function(d) { var p = U.productOfDigits(d); return p > 0 && int(d) % p === 0; } },

    // ═══════════════════════════════════════════════
    // 十四、数学猜想/特殊数（12个）
    // ═══════════════════════════════════════════════
    { id: 'mersenne',    name: '梅森素数',   emoji: '🔭',  score: 7, rarity: '终结',
        check: function(d) { return U.isMersennePrime(int(d)); } },
    { id: 'goldbach',    name: '哥德巴赫',   emoji: '🤝',  score: 1,  rarity: '平庸',
        check: function(d) {
            var n = int(d);
            if (n % 2 !== 0 || n < 4) return false;
            for (var p = 2; p <= n/2; p++) {
                if (U.isPrime(p) && U.isPrime(n-p)) return true;
            }
            return false;
        } },
    { id: 'sqrt2',       name: '√2前缀',    emoji: '√2️⃣', score: 1000, rarity: '稀有',
        check: function(d) { return U.hasSubstring(d, '14142'); } },
    { id: 'sqrt3',       name: '√3前缀',    emoji: '√3️⃣', score: 1000, rarity: '稀有',
        check: function(d) { return U.hasSubstring(d, '17320'); } },
    { id: 'sqrt5',       name: '√5前缀',    emoji: '√5️⃣', score: 1000, rarity: '稀有',
        check: function(d) { return U.hasSubstring(d, '22360'); } },
    { id: 'ram-1729',    name: '拉马努金数', emoji: '🧮',  score: 1729, rarity: '罕见',
        check: function(d) { return U.hasSubstring(d, '1729'); } },
    { id: 'kap-6174',    name: '卡普雷卡',   emoji: '🔄',  score: 6174, rarity: '罕见',
        check: function(d) { return U.hasSubstring(d, '6174'); } },
    { id: 'kap-495',     name: '小卡普雷卡', emoji: '🔁',  score: 10,  rarity: '普通',
        check: function(d) { return U.hasSubstring(d, '495'); } },
    { id: 'five-9s',     name: '五连九',     emoji: '9️⃣×5️⃣', score: 1000, rarity: '稀有',
        check: function(d) { return U.hasSubstring(d, '99999'); } },
    { id: 'collatz-ref', name: '3x+1',       emoji: '3️⃣✖️➕1️⃣', score: 1, rarity: '平庸',
        check: function(d) { return U.hasSubstring(d, '31'); } },
    { id: '11037',       name: '考拉兹候选', emoji: '🔢',  score: 1000, rarity: '稀有',
        check: function(d) { return U.hasSubstring(d, '11037'); } },
    { id: 'perfect-sq-sum', name: '平方和完美', emoji: '➕🟰⬜', score: 1, rarity: '平庸',
        check: function(d) { return U.isPerfectSquare(U.sumOfDigits(d)); } },

    // ═══════════════════════════════════════════════
    // 十五、只含特定数字（10个）
    // ═══════════════════════════════════════════════
    { id: 'prime-digits-only', name: '全质数字', emoji: '2️⃣3️⃣5️⃣7️⃣', score: 10000, rarity: '史诗',
        check: function(d) { return U.onlyFrom(d, [2,3,5,7]); } },
    { id: 'comp-digits-only', name: '全合数字', emoji: '4️⃣6️⃣8️⃣9️⃣', score: 10000, rarity: '史诗',
        check: function(d) { return U.onlyFrom(d, [4,6,8,9]); } },
    { id: 'fib-digits-only',  name: '全斐波数字', emoji: '🌀',  score: 100, rarity: '罕见',
        check: function(d) { return U.onlyFrom(d, [0,1,2,3,5,8]); } },
    { id: 'no-prime-digit',   name: '无质数字', emoji: '🚫🤵', score: 100, rarity: '罕见',
        check: function(d) { return U.noneFrom(d, [2,3,5,7]); } },
    { id: 'all-ten-digits',   name: '十全十美', emoji: '🔟',  score: 100, rarity: '罕见',
        check: function(d) { return U.uniqueDigitCount(d) === 10; } },
    { id: 'only-zero-one',    name: '只有0和1', emoji: '0️⃣1️⃣', score: 50000000, rarity: '超越',
        check: function(d) { return U.onlyFrom(d, [0,1]); } },
    { id: 'half-even-odd',    name: '奇偶平衡', emoji: '⚖️',  score: 8, rarity: '平庸',
        check: function(d) { return U.halfEvenHalfOdd(d, 1); } },
    { id: 'one-side',         name: '一边倒',   emoji: '↗️',  score: 100, rarity: '罕见',
        check: function(d) { return U.onlyFrom(d, [0,1,2,3,4]) || U.onlyFrom(d, [5,6,7,8,9]); } },
    { id: 'no-even',          name: '无偶数',   emoji: '🚫2️⃣', score: 1000, rarity: '稀有',
        check: function(d) { return U.onlyFrom(d, [1,3,5,7,9]); } },
    { id: 'no-odd',           name: '无奇数',   emoji: '🚫1️⃣', score: 100, rarity: '罕见',
        check: function(d) { return U.onlyFrom(d, [0,2,4,6,8]); } },

    // ═══════════════════════════════════════════════
    // 十六、黄金分割 φ 及衍生（6个）
    // ═══════════════════════════════════════════════
    { id: 'phi-5',        name: 'φ连续5位', emoji: 'φ5️⃣', score: 161, rarity: '稀有',
        check: function(d) { return U.hasSubstring(d, '16180'); } },
    { id: 'phi-6',        name: 'φ连续6位', emoji: 'φ6️⃣', score: 1618, rarity: '史诗',
        check: function(d) { return U.hasSubstring(d, '161803'); } },
    { id: 'phi-inv',      name: 'φ倒数',     emoji: 'φ🔄', score: 618, rarity: '稀有',
        check: function(d) { return U.hasSubstring(d, '61803'); } },
    { id: 'golden-angle', name: '黄金角',    emoji: '📐',  score: 100, rarity: '罕见',
        check: function(d) { return U.hasSubstring(d, '1375'); } },
    { id: 'a4-ratio',     name: 'A4纸比例',  emoji: '📄',  score: 10, rarity: '普通',
        check: function(d) { return U.hasSubstring(d, '297'); } },
    { id: 'fib-ratio',    name: '斐波那契比', emoji: 'φ🌀', score: 500000, rarity: '传说',
        check: function(d) {
            var a = int(d.substring(0,3)), b = int(d.substring(d.length-3));
            return b > 0 && Math.abs(a/b - 1.618) < 0.01;
        } },

    // ═══════════════════════════════════════════════
    // 十七、网络/文化梗补充（20个）
    // ═══════════════════════════════════════════════
    { id: 'meme-7355608',  name: 'CSGO炸弹',   emoji: '💣',   score: 500000, rarity: '传说',
        check: function(d) { return U.hasSubstring(d, '7355608'); } },
    { id: 'meme-8675309',  name: 'Jenny号码',  emoji: '📞',   score: 500000,  rarity: '传说',
        check: function(d) { return U.hasSubstring(d, '8675309'); } },
    { id: 'meme-58008',    name: '计算器梗',   emoji: '🔢',   score: 1000,  rarity: '稀有',
        check: function(d) { return U.hasSubstring(d, '58008'); } },
    { id: 'meme-5318008',  name: '大计算器梗', emoji: '🍑',   score: 50000000,  rarity: '超越',
        check: function(d) { return U.hasSubstring(d, '5318008'); } },
    { id: 'meme-24601',    name: '冉阿让',     emoji: '⛓️',  score: 1000,  rarity: '稀有',
        check: function(d) { return U.hasSubstring(d, '24601'); } },
    { id: 'meme-112358',   name: '斐波片段',   emoji: '🌀🎵', score: 10000, rarity: '史诗',
        check: function(d) { return U.hasSubstring(d, '112358'); } },
    { id: 'meme-555',      name: '哈哈哈',     emoji: '😂',   score: 10,  rarity: '普通',
        check: function(d) { return U.hasSubstring(d, '555'); } },
    { id: 'meme-444',      name: '四四四',     emoji: '4️⃣4️⃣4️⃣', score: 10, rarity: '普通',
        check: function(d) { return U.hasSubstring(d, '444'); } },
    { id: 'meme-333',      name: '三三三',     emoji: '3️⃣3️⃣3️⃣', score: 10, rarity: '普通',
        check: function(d) { return U.hasSubstring(d, '333'); } },
    { id: 'meme-222',      name: '二二二',     emoji: '2️⃣2️⃣2️⃣', score: 10, rarity: '普通',
        check: function(d) { return U.hasSubstring(d, '222'); } },
    { id: 'meme-111',      name: '一一一',     emoji: '1️⃣1️⃣1️⃣', score: 10, rarity: '普通',
        check: function(d) { return U.hasSubstring(d, '111'); } },
    { id: 'meme-999',      name: '九九九',     emoji: '9️⃣9️⃣9️⃣', score: 10, rarity: '普通',
        check: function(d) { return U.hasSubstring(d, '999'); } },
    { id: 'meme-369',      name: '特斯拉数',   emoji: '⚡3️⃣6️⃣9️⃣', score: 10, rarity: '普通',
        check: function(d) { return U.hasSubstring(d, '369'); } },
    { id: 'meme-108',      name: '一百零八',   emoji: '🕉️',  score: 10, rarity: '普通',
        check: function(d) { return U.hasSubstring(d, '108'); } },
    { id: 'meme-432',      name: '宇宙频率',   emoji: '🎵',   score: 10, rarity: '普通',
        check: function(d) { return U.hasSubstring(d, '432'); } },
    { id: 'meme-528',      name: '爱的频率',   emoji: '💚',   score: 10, rarity: '普通',
        check: function(d) { return U.hasSubstring(d, '528'); } },
    { id: 'meme-963',      name: '神圣频率',   emoji: '🙏',   score: 10, rarity: '普通',
        check: function(d) { return U.hasSubstring(d, '963'); } },
    { id: 'meme-481516',   name: 'Lost数字',   emoji: '🏝️',  score: 50000000, rarity: '超越',
        check: function(d) { return U.hasSubstring(d, '4815162342'); } },
    { id: 'meme-80085',    name: '计算器单词', emoji: '📟',   score: 1000,  rarity: '稀有',
        check: function(d) { return U.hasSubstring(d, '80085'); } },
    { id: 'meme-1134',     name: '倒过来读',   emoji: '🙃',   score: 100,  rarity: '罕见',
        check: function(d) { return U.hasSubstring(d, '1134'); } },

    // ═══════════════════════════════════════════════
    // 十八、更多模式徽章（12个）
    // ═══════════════════════════════════════════════
    { id: 'inc-run-6',    name: '六级台阶', emoji: '📈6️⃣', score: 10000, rarity: '史诗',
        check: function(d) { return U.hasIncreasingRun(d, 6); } },
    { id: 'dec-run-6',    name: '六级滑坡', emoji: '📉6️⃣', score: 10000, rarity: '史诗',
        check: function(d) { return U.hasDecreasingRun(d, 6); } },
    { id: 'abab',         name: 'ABAB模式', emoji: '🔀',  score: 1, rarity: '平庸',
        check: function(d) { return U.hasABAB(d); } },
    { id: 'abcabc',       name: 'ABCABC',   emoji: '🔁',  score: 100, rarity: '罕见',
        check: function(d) { return U.hasABCABC(d); } },
    { id: 'starts-aba',   name: '镜前镜后', emoji: '🪞',  score: 1, rarity: '平庸',
        check: function(d) { return U.startsWithABA(d); } },
    { id: 'wave-8',       name: '八次波浪', emoji: '🌊',  score: 1, rarity: '平庸',
        check: function(d) { return U.isWave(d, 8); } },
    { id: 'roller-2',     name: '过山车',   emoji: '🎢',  score: 1, rarity: '平庸',
        check: function(d) { return U.isRollercoaster(d, 4); } },
    { id: 'rotation',     name: '旋转木马', emoji: '🎠',  score: 10, rarity: '普通',
        check: function(d) {
            for (var len = 3; len <= 5; len++) {
                for (var i = 0; i <= d.length - len; i++) {
                    var sub = d.substring(i, i + len);
                    var rot = sub.substring(1) + sub[0];
                    if (d.indexOf(rot, i + len) !== -1) return true;
                }
            }
            return false;
        } },
    { id: 'eleven-sum-10',name: '全邻和10', emoji: '🔟➕', score: 500000000, rarity: '终结',
        check: function(d) { return U.allAdjacentSum10(d); } },
    { id: 'monotonic',    name: '单调',     emoji: '➡️',  score: 100000, rarity: '传说',
        check: function(d) { return U.isNonDecreasing(d) || U.isNonIncreasing(d); } },
    { id: 'every-other',  name: '隔位相等', emoji: '🏁',  score: 500000000, rarity: '终结',
        check: function(d) {
            for (var i = 2; i < d.length; i++) { if (d[i] !== d[i-2]) return false; }
            return true;
        } },
    { id: 'lucky-number', name: '幸运数',   emoji: '🍀🔢', score: 1, rarity: '平庸',
        check: function(d) { return U.sumOfDigits(d) % 7 === 0 && U.hasSubstring(d, '7'); } },

    // ═══════════════════════════════════════════════
    // 十九、RNGdle 爬取徽章（约 50 个）
    // ═══════════════════════════════════════════════

    // ---- 数论 ----
    { id: 'pronic',           name: '普洛尼克数', emoji: '🧮', score: 500000, rarity: '传说',
        check: function(d) { return U.isPronic(int(d)); } },
    { id: 'strobogrammatic',  name: '旋转不变',   emoji: '🙃',  score: 500000000, rarity: '终结',
        check: function(d) { return U.isStrobogrammatic(d); } },
    { id: 'semi-clean',       name: '半洁',       emoji: '🧹',  score: 100, rarity: '罕见',
        check: function(d) { return U.isSemiClean(d); } },

    // ---- 组合模式 ----
    { id: 'full-house',       name: '满堂彩',     emoji: '🏠',  score: 1, rarity: '平庸',
        check: function(d) { return U.hasFullHouse(d); } },
    { id: 'contig-full-house',name: '连续满堂彩', emoji: '🏰',  score: 10, rarity: '普通',
        check: function(d) { return U.hasContiguousFullHouse(d); } },
    { id: 'snake-eyes',       name: '蛇眼',       emoji: '🎲',  score: 1, rarity: '平庸',
        check: function(d) { return U.hasSnakeEyes(d); } },
    { id: 'blackjack',        name: '21点',       emoji: '♠️',  score: 1000, rarity: '稀有',
        check: function(d) { return U.isBlackjack(d); } },
    { id: 'deep-void',        name: '深虚空',     emoji: '🕳️',  score: 1, rarity: '平庸',
        check: function(d) { var f=U.countDigitFreq(d); return f[0]>=3 && f[0]<=4; } },
    { id: 'devil-number',     name: '魔鬼之数',   emoji: '😈',  score: 10000, rarity: '史诗',
        check: function(d) { return U.hasSubstring(d, '666') && U.hasSubstring(d, '777'); } },

    // ---- 书挡/镜 ----
    { id: 'bookends',         name: '书挡',       emoji: '📚',  score: 10, rarity: '普通',
        check: function(d) { return U.hasBookends(d, 2); } },
    { id: 'mirror-bookends',  name: '镜像书挡',   emoji: '📖',  score: 10, rarity: '普通',
        check: function(d) { return U.hasMirrorBookends(d, 2); } },
    { id: 'pocket-mirror',    name: '口袋镜',     emoji: '🪞',  score: 1, rarity: '平庸',
        check: function(d) { return U.hasPocketMirror(d); } },

    // ---- τ / 数学常数 ----
    { id: 'tau-3',            name: 'τ连续3位',  emoji: 'τ3️⃣', score: 6, rarity: '罕见',
        check: function(d) { return U.tauMatchLength(d, '628') >= 3; } },
    { id: 'tau-4',            name: 'τ连续4位',  emoji: 'τ4️⃣', score: 62, rarity: '稀有',
        check: function(d) { return U.tauMatchLength(d, '6283') >= 4; } },
    { id: 'tau-5',            name: 'τ连续5位',  emoji: 'τ5️⃣', score: 628, rarity: '史诗',
        check: function(d) { return U.tauMatchLength(d, '62831') >= 5; } },
    { id: 'tau-6',            name: 'τ连续6位',  emoji: 'τ6️⃣', score: 6283, rarity: '传说',
        check: function(d) { return U.tauMatchLength(d, '628318') >= 6; } },

    // ---- 打乱连续 ----
    { id: 'scrambled-3',      name: '打乱三连',   emoji: '🔀3️⃣', score: 1, rarity: '平庸',
        check: function(d) { return U.hasScrambledConsecutive(d, 3); } },
    { id: 'scrambled-4',      name: '打乱四连',   emoji: '🔀4️⃣', score: 1, rarity: '平庸',
        check: function(d) { return U.hasScrambledConsecutive(d, 4); } },

    // ---- 节奏/模式 ----
    { id: 'rhyme',            name: '韵脚',       emoji: '🎶',  score: 1, rarity: '平庸',
        check: function(d) { return U.hasRhyme(d); } },
    { id: 'mini-echo',        name: '迷你回声',   emoji: '🔂',  score: 1, rarity: '平庸',
        check: function(d) { return U.hasMiniEcho(d); } },
    { id: 'hills',            name: '丘陵',       emoji: '🏞️',  score: 1, rarity: '平庸',
        check: function(d) { return U.hasHills(d) && U.maxConsecutiveSame(d) <= 2; } },
    { id: 'hop',              name: '跳一跳',     emoji: '🦘',  score: 1, rarity: '平庸',
        check: function(d) { return U.hasHop(d, 2); } },
    { id: 'double-hop',       name: '双跳',       emoji: '🦘🦘', score: 1, rarity: '平庸',
        check: function(d) { return U.hasDoubleHop(d, 2); } },
    { id: 'dunes',            name: '沙丘',       emoji: '🐫',  score: 1, rarity: '平庸',
        check: function(d) { return U.hasDunes(d); } },
    { id: 'metronome',        name: '节拍器',     emoji: '🎼',  score: 10, rarity: '普通',
        check: function(d) { return U.isMetronome(d); } },

    // ---- 特殊条件 ----
    { id: 'feather',          name: '羽毛',       emoji: '🪶',  score: 100, rarity: '罕见',
        check: function(d) { return U.hasFeather(d); } },
    { id: 'firefly',          name: '萤火虫',     emoji: '🪲',  score: 100, rarity: '罕见',
        check: function(d) { return U.hasFirefly(d); } },
    { id: 'low-ball',         name: '低球',       emoji: '📉',  score: 1000, rarity: '稀有',
        check: function(d) { return U.isLowBall(d); } },
    { id: 'ghost',            name: '幽灵',       emoji: '👻',  score: 1, rarity: '平庸',
        check: function(d) { return U.maxConsecutiveSame(d) >= 2 && U.maxConsecutiveSame(d) <= 2 && U.hasSubstring(d, '00'); } },
    { id: 'calendar',         name: '日历',       emoji: '📅',  score: 1, rarity: '平庸',
        check: function(d) { return U.hasCalendar(d); } },
    { id: 'equation',         name: '方程',       emoji: '🟰',  score: 1, rarity: '平庸',
        check: function(d) { return U.isEquation(d); } },
    { id: 'century',          name: '世纪和',     emoji: '💯',  score: 500000000, rarity: '终结',
        check: function(d) { return U.isCentury(d); } },
        
    { id: 'meme-67',          name: '六七',       emoji: '🫠',  score: 1, rarity: '平庸',
        check: function(d) { return U.hasSubstring(d, '67'); } },
    { id: 'meme-11',          name: '十一',       emoji: '🕚',  score: 1, rarity: '平庸',
        check: function(d) { return U.hasSubstring(d, '11'); } },
    { id: 'meme-12',          name: '一打',       emoji: '🍩',  score: 1, rarity: '平庸',
        check: function(d) { return U.hasSubstring(d, '12'); } },
    { id: 'tree-fiddy',       name: '树皮五十',   emoji: '🦕',  score: 10, rarity: '普通',
        check: function(d) { return U.hasSubstring(d, '350'); } },
    { id: 'double-nine',      name: '双九',       emoji: '🎈',  score: 1, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 9, 2); } },
    { id: 'big-brother',      name: '老大哥',     emoji: '👁️',  score: 100, rarity: '罕见',
        check: function(d) { return U.hasSubstring(d, '1984'); } },
    { id: 'contentment',      name: '知足',       emoji: '😌',  score: 1, rarity: '平庸',
        check: function(d) { return U.sumOfDigits(d) >= 50 && U.sumOfDigits(d) <= 99; } },
    { id: 'jackpot',          name: '大奖',       emoji: '💰',  score: 50000000, rarity: '超越',
        check: function(d) { return U.hasSubstring(d, '777') && U.sumOfDigits(d) === 21; } },


    // ---- 圣诞树/拜谢 ----
    { id: 'xmas-1',   name: '圣诞树',   emoji: '🎄',   score: 25,    rarity: '普通', check: function(d){return U.countSubstring(d,'002')>=1;} },
    { id: 'xmas-2',   name: '圣诞树+',  emoji: '🎄', score: 2025,  rarity: '稀有', check: function(d){return U.countSubstring(d,'002')>=2;} },
    { id: 'xmas-3',   name: '圣诞树++', emoji: '🎄', score: 202500, rarity: '传说', check: function(d){return U.countSubstring(d,'002')>=3;} },
    { id: 'worship-1',name: '拜谢',     emoji: '🙇',   score: 29,    rarity: '普通', check: function(d){return U.countSubstring(d,'297')>=1;} },
    { id: 'worship-2',name: '拜谢+',    emoji: '🙇', score: 2970,  rarity: '稀有', check: function(d){return U.countSubstring(d,'297')>=2;} },
    { id: 'worship-3',name: '拜谢++',   emoji: '🙇', score: 297000, rarity: '传说', check: function(d){return U.countSubstring(d,'297')>=3;} },
    // ---- e 连续 7~11 位 ----
    { id: 'e-7',   name: 'e连续7位',  emoji: 'e7️⃣', score: 27182,   rarity: '传说', check: function(d){return U.prefixMatchLength(d,'2718281')>=7;} },
    { id: 'e-8',   name: 'e连续8位',  emoji: 'e8️⃣', score: 271828,  rarity: '终结', check: function(d){return U.prefixMatchLength(d,'27182818')>=8;} },
    { id: 'e-9',   name: 'e连续9位',  emoji: 'e9️⃣', score: 2718281, rarity: '终结', check: function(d){return U.prefixMatchLength(d,'271828182')>=9;} },
    { id: 'e-10',  name: 'e连续10位', emoji: 'e🔟', score: 27182818, rarity: '终结', check: function(d){return U.prefixMatchLength(d,'2718281828')>=10;} },
    { id: 'e-11',  name: 'e连续11位', emoji: 'e1️⃣1️⃣',score: 271828182, rarity: '终结', check: function(d){return U.prefixMatchLength(d,'27182818284')>=11;} },
    // ---- φ 连续 7~11 位 ----
    { id: 'phi-7',  name: 'φ连续7位',  emoji: 'φ7️⃣', score: 161803,  rarity: '传说', check: function(d){return U.prefixMatchLength(d,'1618033')>=7;} },
    { id: 'phi-8',  name: 'φ连续8位',  emoji: 'φ8️⃣', score: 1618033, rarity: '神话', check: function(d){return U.prefixMatchLength(d,'16180339')>=8;} },
    { id: 'phi-9',  name: 'φ连续9位',  emoji: 'φ9️⃣', score: 16180339, rarity: '超越', check: function(d){return U.prefixMatchLength(d,'161803398')>=9;} },
    { id: 'phi-10', name: 'φ连续10位', emoji: 'φ🔟', score: 161803398, rarity: '终结', check: function(d){return U.prefixMatchLength(d,'1618033988')>=10;} },
    { id: 'phi-11', name: 'φ连续11位', emoji: 'φ1️⃣1️⃣',score: 1618033988, rarity: '终结', check: function(d){return U.prefixMatchLength(d,'16180339887')>=11;} },


    // 序列徽章补充 
    { id: 'seq-01234', name: '01234', emoji: '🔢', score: 1234, rarity: '罕见', check: function(d){return U.hasSubstring(d,'01234');} },
    { id: 'seq-98765', name: '98765', emoji: '🔢', score: 98765, rarity: '稀有', check: function(d){return U.hasSubstring(d,'98765');} },
    { id: 'seq-87654', name: '87654', emoji: '🔢', score: 87654, rarity: '稀有', check: function(d){return U.hasSubstring(d,'87654');} },
    { id: 'seq-23456', name: '23456', emoji: '🔢', score: 23456, rarity: '罕见', check: function(d){return U.hasSubstring(d,'23456');} },
    { id: 'seq-76543', name: '76543', emoji: '🔢', score: 76543, rarity: '稀有', check: function(d){return U.hasSubstring(d,'76543');} },
    { id: 'seq-34567', name: '34567', emoji: '🔢', score: 34567, rarity: '罕见', check: function(d){return U.hasSubstring(d,'34567');} },
    { id: 'seq-65432', name: '65432', emoji: '🔢', score: 65432, rarity: '稀有', check: function(d){return U.hasSubstring(d,'65432');} },
    { id: 'seq-45678', name: '45678', emoji: '🔢', score: 45678, rarity: '罕见', check: function(d){return U.hasSubstring(d,'45678');} },
    { id: 'seq-54321', name: '54321', emoji: '🔢', score: 54321, rarity: '稀有', check: function(d){return U.hasSubstring(d,'54321');} },
    { id: 'seq-43210', name: '43210', emoji: '🔢', score: 43210, rarity: '稀有', check: function(d){return U.hasSubstring(d,'43210');} },
    { id: 'seq-012345', name: '012345', emoji: '🔢', score: 12345, rarity: '稀有', check: function(d){return U.hasSubstring(d,'012345');} },
    { id: 'seq-987654', name: '987654', emoji: '🔢', score: 987654, rarity: '稀有', check: function(d){return U.hasSubstring(d,'987654');} },
    { id: 'seq-123456', name: '123456', emoji: '🔢', score: 123456, rarity: '稀有', check: function(d){return U.hasSubstring(d,'123456');} },
    { id: 'seq-876543', name: '876543', emoji: '🔢', score: 876543, rarity: '稀有', check: function(d){return U.hasSubstring(d,'876543');} },
    { id: 'seq-234567', name: '234567', emoji: '🔢', score: 234567, rarity: '稀有', check: function(d){return U.hasSubstring(d,'234567');} },
    { id: 'seq-765432', name: '765432', emoji: '🔢', score: 765432, rarity: '稀有', check: function(d){return U.hasSubstring(d,'765432');} },
    { id: 'seq-345678', name: '345678', emoji: '🔢', score: 345678, rarity: '稀有', check: function(d){return U.hasSubstring(d,'345678');} },
    { id: 'seq-654321', name: '654321', emoji: '🔢', score: 654321, rarity: '稀有', check: function(d){return U.hasSubstring(d,'654321');} },
    { id: 'seq-456789', name: '456789', emoji: '🔢', score: 456789, rarity: '稀有', check: function(d){return U.hasSubstring(d,'456789');} },
    { id: 'seq-543210', name: '543210', emoji: '🔢', score: 543210, rarity: '稀有', check: function(d){return U.hasSubstring(d,'543210');} },
    { id: 'seq-0123456', name: '0123456', emoji: '🔢', score: 123456, rarity: '史诗', check: function(d){return U.hasSubstring(d,'0123456');} },
    { id: 'seq-9876543', name: '9876543', emoji: '🔢', score: 9876543, rarity: '史诗', check: function(d){return U.hasSubstring(d,'9876543');} },
    { id: 'seq-1234567', name: '1234567', emoji: '🔢', score: 1234567, rarity: '史诗', check: function(d){return U.hasSubstring(d,'1234567');} },
    { id: 'seq-8765432', name: '8765432', emoji: '🔢', score: 8765432, rarity: '史诗', check: function(d){return U.hasSubstring(d,'8765432');} },
    { id: 'seq-2345678', name: '2345678', emoji: '🔢', score: 2345678, rarity: '史诗', check: function(d){return U.hasSubstring(d,'2345678');} },
    { id: 'seq-7654321', name: '7654321', emoji: '🔢', score: 7654321, rarity: '史诗', check: function(d){return U.hasSubstring(d,'7654321');} },
    { id: 'seq-3456789', name: '3456789', emoji: '🔢', score: 3456789, rarity: '史诗', check: function(d){return U.hasSubstring(d,'3456789');} },
    { id: 'seq-6543210', name: '6543210', emoji: '🔢', score: 6543210, rarity: '史诗', check: function(d){return U.hasSubstring(d,'6543210');} },
    { id: 'seq-01234567', name: '01234567', emoji: '🔢', score: 1234567, rarity: '传说', check: function(d){return U.hasSubstring(d,'01234567');} },
    { id: 'seq-98765432', name: '98765432', emoji: '🔢', score: 98765432, rarity: '传说', check: function(d){return U.hasSubstring(d,'98765432');} },
    { id: 'seq-12345678', name: '12345678', emoji: '🔢', score: 12345678, rarity: '传说', check: function(d){return U.hasSubstring(d,'12345678');} },
    { id: 'seq-87654321', name: '87654321', emoji: '🔢', score: 87654321, rarity: '传说', check: function(d){return U.hasSubstring(d,'87654321');} },
    { id: 'seq-23456789', name: '23456789', emoji: '🔢', score: 23456789, rarity: '传说', check: function(d){return U.hasSubstring(d,'23456789');} },
    { id: 'seq-76543210', name: '76543210', emoji: '🔢', score: 76543210, rarity: '传说', check: function(d){return U.hasSubstring(d,'76543210');} },
    { id: 'seq-012345678', name: '012345678', emoji: '🔢', score: 12345678, rarity: '神话', check: function(d){return U.hasSubstring(d,'012345678');} },
    { id: 'seq-987654321', name: '987654321', emoji: '🔢', score: 987654321, rarity: '神话', check: function(d){return U.hasSubstring(d,'987654321');} },
    { id: 'seq-123456789', name: '123456789', emoji: '🔢', score: 123456789, rarity: '神话', check: function(d){return U.hasSubstring(d,'123456789');} },
    { id: 'seq-876543210', name: '876543210', emoji: '🔢', score: 876543210, rarity: '神话', check: function(d){return U.hasSubstring(d,'876543210');} },
    { id: 'seq-0123456789', name: '0123456789', emoji: '🔢', score: 123456789, rarity: '超越', check: function(d){return U.hasSubstring(d,'0123456789');} },
    { id: 'seq-9876543210', name: '9876543210', emoji: '🔢', score: 9876543210, rarity: '超越', check: function(d){return U.hasSubstring(d,'9876543210');} },

    ];
})();
