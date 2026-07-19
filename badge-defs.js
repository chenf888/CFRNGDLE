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
    { id: 'len-10', name: '十位数',   emoji: '🔟',   score: 10,           rarity: '平庸',
        check: function(d) { return U.getEffectiveLength(d) === 10; } },
    { id: 'len-9',  name: '九位数',   emoji: '9️⃣',   score: 100,          rarity: '普通',
        check: function(d) { return U.getEffectiveLength(d) === 9; } },
    { id: 'len-8',  name: '八位数',   emoji: '8️⃣',   score: 1000,         rarity: '罕见',
        check: function(d) { return U.getEffectiveLength(d) === 8; } },
    { id: 'len-7',  name: '七位数',   emoji: '7️⃣',   score: 10000,        rarity: '稀有',
        check: function(d) { return U.getEffectiveLength(d) === 7; } },
    { id: 'len-6',  name: '六位数',   emoji: '6️⃣',   score: 100000,       rarity: '史诗',
        check: function(d) { return U.getEffectiveLength(d) === 6; } },
    { id: 'len-5',  name: '五位数',   emoji: '5️⃣',   score: 1000000,      rarity: '传说',
        check: function(d) { return U.getEffectiveLength(d) === 5; } },
    { id: 'len-4',  name: '四位数',   emoji: '4️⃣',   score: 10000000,     rarity: '神话',
        check: function(d) { return U.getEffectiveLength(d) === 4; } },
    { id: 'len-3',  name: '三位数',   emoji: '3️⃣',   score: 100000000,    rarity: '超越',
        check: function(d) { return U.getEffectiveLength(d) === 3; } },
    { id: 'len-2',  name: '两位数',   emoji: '2️⃣',   score: 1000000000,   rarity: '终结',
        check: function(d) { return U.getEffectiveLength(d) === 2; } },
    { id: 'len-1',  name: '一位数',   emoji: '1️⃣',   score: 10000000000,  rarity: '终结',
        check: function(d) { return U.getEffectiveLength(d) === 1; } },

    // ═══════════════════════════════════════════════
    // 二、数学性质徽章（30个）
    // ═══════════════════════════════════════════════
    { id: 'prime',           name: '质数',       emoji: '🤵',     score: 22,    rarity: '普通',
        check: function(d) { return U.isPrime(int(d)); } },
    { id: 'semiprime',       name: '半质数',     emoji: '➗🤵',   score: 5,     rarity: '平庸',
        check: function(d) { return U.isSemiprime(int(d)); } },
    { id: 'abundant',        name: '盈数',       emoji: '🟥🟨🟩🟦', score: 5,    rarity: '平庸',
        check: function(d) { return U.isAbundant(int(d)); } },
    { id: 'perfect-number',  name: '完全数',     emoji: '✨',     score: 900000000, rarity: '终结',
        check: function(d) { return U.isPerfectNumber(int(d)); } },
    { id: 'square',          name: '平方数',     emoji: '🟦',     score: 40000,  rarity: '史诗',
        check: function(d) { return U.isPerfectSquare(int(d)); } },
    { id: 'cube',            name: '立方数',     emoji: '📦',     score: 80000,  rarity: '史诗',
        check: function(d) { return U.isPerfectCube(int(d)); } },
    { id: 'power-of-2',      name: '2的幂',      emoji: '2️⃣↑',   score: 800000000, rarity: '终结',
        check: function(d) { return U.isPowerOf2(int(d)); } },
    { id: 'fibonacci',       name: '斐波那契',   emoji: '🌀',     score: 50000000, rarity: '超越',
        check: function(d) { return U.isFibonacci(int(d)); } },
    { id: 'twin-prime',      name: '孪生质数',   emoji: '👯',     score: 101,   rarity: '罕见',
        check: function(d) { return U.isTwinPrime(int(d)); } },

    // 倍数系列
    { id: 'multiple-of-3',   name: '3的倍数',    emoji: '➗3️⃣',   score: 3,     rarity: '平庸',
        check: function(d) { return int(d) % 3 === 0; } },
    { id: 'multiple-of-7',   name: '7的倍数',    emoji: '➗7️⃣',   score: 7,     rarity: '平庸',
        check: function(d) {
            var last = int(d[d.length-1]);
            var rem = d.slice(0,-1);
            return (int(rem||'0') - 2*last) % 7 === 0;
        } },
    { id: 'multiple-of-9',   name: '9的倍数',    emoji: '➗9️⃣',   score: 9,     rarity: '平庸',
        check: function(d) { return U.sumOfDigits(d) % 9 === 0; } },
    { id: 'multiple-of-11',  name: '11的倍数',   emoji: '➗1️⃣1️⃣', score: 11,    rarity: '普通',
        check: function(d) {
            var odd = 0, even = 0;
            for (var i = 0; i < d.length; i++) {
                if ((i+1)%2===1) odd += +d[i]; else even += +d[i];
            }
            return Math.abs(odd-even) % 11 === 0;
        } },
    { id: 'multiple-of-13',  name: '13的倍数',   emoji: '➗1️⃣3️⃣', score: 13,    rarity: '普通',
        check: function(d) { return int(d) % 13 === 0; } },
    { id: 'multiple-of-17',  name: '17的倍数',   emoji: '➗1️⃣7️⃣', score: 17,    rarity: '普通',
        check: function(d) { return int(d) % 17 === 0; } },
    { id: 'multiple-of-19',  name: '19的倍数',   emoji: '➗1️⃣9️⃣', score: 19,    rarity: '普通',
        check: function(d) { return int(d) % 19 === 0; } },
    { id: 'multiple-of-23',  name: '23的倍数',   emoji: '➗2️⃣3️⃣', score: 23,    rarity: '普通',
        check: function(d) { return int(d) % 23 === 0; } },
    { id: 'multiple-of-29',  name: '29的倍数',   emoji: '➗2️⃣9️⃣', score: 29,    rarity: '普通',
        check: function(d) { return int(d) % 29 === 0; } },
    { id: 'multiple-of-37',  name: '37的倍数',   emoji: '➗3️⃣7️⃣', score: 37,    rarity: '普通',
        check: function(d) { return int(d) % 37 === 0; } },

    // 首尾 / 不含系列
    { id: 'first-last-equal',name: '首尾相等',   emoji: '☸',      score: 8,     rarity: '平庸',
        check: function(d) {
            var t = d.replace(/^0+/, '') || '0';
            return t[0] === t[t.length-1];
        } },
    { id: 'no-zero',         name: '攻',         emoji: '⚔',      score: 3,     rarity: '平庸',
        check: function(d) { return d.indexOf('0') === -1; } },
    { id: 'no-one',          name: '受',         emoji: '🎪',      score: 3,     rarity: '平庸',
        check: function(d) { return d.indexOf('1') === -1; } },
    { id: 'no-one-has-zero', name: '受受',       emoji: '🎪🎪',   score: 5,     rarity: '平庸',
        check: function(d) { return d.indexOf('1')===-1 && d.indexOf('0')!==-1; } },

    // 回文/全同系列
    { id: 'repdigit',        name: '全同数',     emoji: '🟰',     score: 11111111, rarity: '超越',
        check: function(d) { return U.maxConsecutiveSame(d) === d.length; } },
    { id: 'repunit',         name: '全1数',      emoji: '1️⃣',     score: 111111111, rarity: '终结',
        check: function(d) { return d.indexOf('0')===-1 && d.indexOf('2')===-1 && d.indexOf('3')===-1 && d.indexOf('4')===-1 && d.indexOf('5')===-1 && d.indexOf('6')===-1 && d.indexOf('7')===-1 && d.indexOf('8')===-1 && d.indexOf('9')===-1; } },
    { id: 'palindrome',      name: '回文数',     emoji: '🔁',     score: 999,   rarity: '稀有',
        check: function(d) { return U.isPalindrome(d); } },
    { id: 'sum-is-prime',    name: '数字和质数', emoji: '➕🤵',   score: 7,     rarity: '平庸',
        check: function(d) { return U.isPrime(U.sumOfDigits(d)); } },
    { id: 'perfect-squareof',name: '平方和平方数',emoji: '🟦➕',  score: 5,     rarity: '平庸',
        check: function(d) { return U.isPerfectSquare(U.sumOfSquares(d)); } },
    { id: 'double',          name: '半全相同',   emoji: '🔀',     score: 1001,  rarity: '稀有',
        check: function(d) { return U.firstHalfEqualsSecondHalf(d); } },

    // ═══════════════════════════════════════════════
    // 三、数字模式徽章（25个）
    // ═══════════════════════════════════════════════
    { id: 'ascending',       name: '升序',       emoji: '📈',     score: 234,   rarity: '罕见',
        check: function(d) { return U.isNonDecreasing(d); } },
    { id: 'descending',      name: '降序',       emoji: '📉',     score: 987,   rarity: '罕见',
        check: function(d) { return U.isNonIncreasing(d); } },
    { id: 'all-lte-4',       name: '全≤4',       emoji: '4️⃣⬇',   score: 4,     rarity: '平庸',
        check: function(d) { return U.allDigitsLTE(d,4); } },
    { id: 'all-gte-6',       name: '全≥6',       emoji: '6️⃣⬆',   score: 6666,  rarity: '稀有',
        check: function(d) { return U.allDigitsGTE(d,6); } },
    { id: 'first-half-lte',  name: '前半低',     emoji: '⬅️4️⃣',  score: 4,     rarity: '平庸',
        check: function(d) { return U.firstHalfLTE(d,4); } },
    { id: 'second-half-lte', name: '后半低',     emoji: '4️⃣➡️',  score: 4,     rarity: '平庸',
        check: function(d) { return U.secondHalfLTE(d,4); } },
    { id: 'alternating',     name: '奇偶交替',   emoji: '🔀',     score: 10,    rarity: '普通',
        check: function(d) { return U.isAlternating(d); } },
    { id: 'no-repeat',       name: '无重复',     emoji: '🚫',     score: 9876,  rarity: '稀有',
        check: function(d) { return U.uniqueDigitCount(d) >= 10; } },
    { id: 'only-two-digits', name: '二元数',     emoji: '2️⃣',     score: 212,   rarity: '罕见',
        check: function(d) { return U.uniqueDigitCount(d) === 2; } },
    { id: 'only-three-digits',name: '三元数',    emoji: '3️⃣',     score: 33,    rarity: '普通',
        check: function(d) { return U.uniqueDigitCount(d) === 3; } },

    // N连系列
    { id: 'triple',          name: '三连',       emoji: '3️⃣🎯',   score: 33,    rarity: '平庸',
        check: function(d) { return U.maxConsecutiveSame(d) >= 3; } },
    { id: 'quadruple',       name: '四连',       emoji: '4️⃣🎯',   score: 4444,  rarity: '稀有',
        check: function(d) { return U.maxConsecutiveSame(d) >= 4; } },
    { id: 'quintuple',       name: '五连',       emoji: '5️⃣🎯',   score: 55555, rarity: '史诗',
        check: function(d) { return U.maxConsecutiveSame(d) >= 5; } },
    { id: 'sextuple',        name: '六连',       emoji: '6️⃣🎯',   score: 666666, rarity: '传说',
        check: function(d) { return U.maxConsecutiveSame(d) >= 6; } },
    { id: 'septuple',        name: '七连',       emoji: '7️⃣🎯',   score: 7777777, rarity: '神话',
        check: function(d) { return U.maxConsecutiveSame(d) >= 7; } },
    { id: 'octuple',         name: '八连',       emoji: '8️⃣🎯',   score: 88888888, rarity: '超越',
        check: function(d) { return U.maxConsecutiveSame(d) >= 8; } },
    { id: 'nonuple',         name: '九连',       emoji: '9️⃣🎯',   score: 99999999, rarity: '超越',
        check: function(d) { return U.maxConsecutiveSame(d) >= 9; } },
    { id: 'decuple',         name: '十连以上',   emoji: '🔟🎯',   score: 111111111, rarity: '终结',
        check: function(d) { return U.maxConsecutiveSame(d) >= 10; } },

    // 特殊形状
    { id: 'stairstep',       name: '阶梯数',     emoji: '🪜',     score: 12,    rarity: '普通',
        check: function(d) {
            var ok = true;
            for (var i=1;i<d.length;i++) { if (Math.abs(+d[i]-+d[i-1])!==1){ok=false;break;} }
            return ok && d.length>2;
        } },
    { id: 'mountain',        name: '山峰数',     emoji: '⛰️',    score: 1234,  rarity: '稀有',
        check: function(d) { return U.isMountain(d); } },
    { id: 'valley',          name: '山谷数',     emoji: '🏞️',    score: 4321,  rarity: '稀有',
        check: function(d) { return U.isValley(d); } },
    { id: 'double-double',   name: '双双对',     emoji: '👯👯',   score: 222,   rarity: '普通',
        check: function(d) {
            var f = U.countDigitFreq(d);
            var pairs = 0;
            for (var i = 0; i < 10; i++) { if (f[i] >= 2) pairs++; }
            return pairs >= 4;
        } },
    { id: 'triple-pair',     name: '三对子',     emoji: '3️⃣👯',   score: 1122,  rarity: '稀有',
        check: function(d) { return U.hasTriplePair(d); } },
    { id: 'all-consec',      name: '全连续',     emoji: '🔗',     score: 23456,  rarity: '稀有',
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
    { id: 'meme-69',      name: '六九',        emoji: '6️⃣9️⃣',  score: 6,    rarity: '平庸', check: function(d){return U.hasSubstring(d,'69');} },
    { id: 'meme-78',      name: '七八',        emoji: '7️⃣8️⃣',  score: 7,    rarity: '平庸', check: function(d){return U.hasSubstring(d,'78');} },
    { id: 'meme-91',      name: '九一',        emoji: '9️⃣1️⃣',  score: 9,    rarity: '平庸', check: function(d){return U.hasSubstring(d,'91');} },
    { id: 'meme-42',      name: '生命的意义',  emoji: '🐬',     score: 4,    rarity: '平庸', check: function(d){return U.hasSubstring(d,'42');} },
    { id: 'meme-86',      name: '中国区号',    emoji: '🇨🇳',     score: 8,    rarity: '平庸', check: function(d){return U.hasSubstring(d,'86');} },
    { id: 'meme-62',      name: '六二',        emoji: '6️⃣2️⃣',  score: 6,    rarity: '平庸', check: function(d){return U.hasSubstring(d,'62');} },

    // 3位子串 — 平庸
    { id: 'meme-233',     name: '猫笑',        emoji: '🐱',     score: 23,   rarity: '平庸', check: function(d){return U.hasSubstring(d,'233');} },
    { id: 'meme-250',     name: '二百五',      emoji: '🤪',     score: 25,   rarity: '平庸', check: function(d){return U.hasSubstring(d,'250');} },
    { id: 'meme-251',     name: '二五一',      emoji: '2️⃣5️⃣1️⃣',score: 25,    rarity: '平庸', check: function(d){return U.hasSubstring(d,'251');} },
    { id: 'meme-404',     name: '未找到',      emoji: '❓',     score: 40,   rarity: '平庸', check: function(d){return U.hasSubstring(d,'404');} },
    { id: 'meme-007',     name: '詹姆斯·邦德', emoji: '🔫',     score: 7,    rarity: '平庸', check: function(d){return U.hasSubstring(d,'007');} },
    { id: 'meme-520',     name: '我爱你',      emoji: '💕',     score: 52,   rarity: '平庸', check: function(d){return U.hasSubstring(d,'520');} },
    { id: 'meme-521',     name: '我愿意',      emoji: '💍',     score: 52,   rarity: '平庸', check: function(d){return U.hasSubstring(d,'521');} },
    { id: 'meme-119',     name: '火警',        emoji: '🚒',     score: 11,   rarity: '平庸', check: function(d){return U.hasSubstring(d,'119');} },
    { id: 'meme-120',     name: '急救',        emoji: '🚑',     score: 12,   rarity: '平庸', check: function(d){return U.hasSubstring(d,'120');} },
    { id: 'meme-110',     name: '报警',        emoji: '🚔',     score: 11,   rarity: '平庸', check: function(d){return U.hasSubstring(d,'110');} },
    { id: 'meme-114',     name: '查号台',      emoji: '📞',     score: 11,   rarity: '平庸', check: function(d){return U.hasSubstring(d,'114');} },
    { id: 'meme-992',     name: '救救',        emoji: '🆘',     score: 99,   rarity: '平庸', check: function(d){return U.hasSubstring(d,'992');} },
    { id: 'meme-996',     name: '996工作制',   emoji: '💼',     score: 99,   rarity: '平庸', check: function(d){return U.hasSubstring(d,'996');} },
    { id: 'meme-745',     name: '气死我',      emoji: '😤',     score: 74,   rarity: '平庸', check: function(d){return U.hasSubstring(d,'745');} },
    { id: 'meme-748',     name: '气死吧',      emoji: '😡',     score: 74,   rarity: '平庸', check: function(d){return U.hasSubstring(d,'748');} },
    { id: 'meme-810',     name: '八一零',      emoji: '8️⃣1️⃣0️⃣',score: 81,   rarity: '平庸', check: function(d){return U.hasSubstring(d,'810');} },
    { id: 'meme-666',     name: '野兽之数',    emoji: '😈',     score: 66,   rarity: '平庸', check: function(d){return U.hasSubstring(d,'666');} },
    { id: 'meme-777',     name: '幸运七',      emoji: '🍀',     score: 77,   rarity: '平庸', check: function(d){return U.hasSubstring(d,'777');} },
    { id: 'meme-888',     name: '发财',        emoji: '💰',     score: 88,   rarity: '平庸', check: function(d){return U.hasSubstring(d,'888');} },
    { id: 'meme-911',     name: '九一一',      emoji: '🏙️',    score: 91,   rarity: '平庸', check: function(d){return U.hasSubstring(d,'911');} },
    { id: 'meme-000',     name: '三蛋',        emoji: '🥚',     score: 30,   rarity: '平庸', check: function(d){return U.hasSubstring(d,'000');} },
    { id: 'meme-246',     name: '爱死了',      emoji: '💀💕',   score: 24,   rarity: '平庸', check: function(d){return U.hasSubstring(d,'246');} },
    { id: 'meme-282',     name: '爱不爱',      emoji: '❓💕',   score: 28,   rarity: '平庸', check: function(d){return U.hasSubstring(d,'282');} },
    { id: 'meme-360',     name: '想念你',      emoji: '🤔',     score: 36,   rarity: '平庸', check: function(d){return U.hasSubstring(d,'360');} },
    { id: 'meme-592',     name: '我就爱',      emoji: '💖',     score: 59,   rarity: '平庸', check: function(d){return U.hasSubstring(d,'592');} },
    { id: 'meme-596',     name: '我走了',      emoji: '🚶',     score: 59,   rarity: '平庸', check: function(d){return U.hasSubstring(d,'596');} },
    { id: 'meme-921',     name: '就爱你',      emoji: '💝',     score: 92,   rarity: '平庸', check: function(d){return U.hasSubstring(d,'921');} },
    { id: 'meme-400',     name: '四百',        emoji: '4️⃣0️⃣0️⃣',score: 40,   rarity: '平庸', check: function(d){return U.hasSubstring(d,'400');} },
    { id: 'meme-578',     name: '我去吧',      emoji: '🏃',     score: 57,   rarity: '平庸', check: function(d){return U.hasSubstring(d,'578');} },

    // 4位子串 — 普通
    { id: 'meme-1337',    name: '黑客语言',    emoji: '💻',     score: 13,   rarity: '普通', check: function(d){return U.hasSubstring(d,'1337');} },
    { id: 'meme-9527',    name: '唐伯虎',      emoji: '🎭',     score: 95,   rarity: '普通', check: function(d){return U.hasSubstring(d,'9527');} },
    { id: 'meme-1984',    name: '一九八四',    emoji: '📖',     score: 19,   rarity: '普通', check: function(d){return U.hasSubstring(d,'1984');} },
    { id: 'meme-2049',    name: '未来',        emoji: '🔮',     score: 20,   rarity: '普通', check: function(d){return U.hasSubstring(d,'2049');} },
    { id: 'meme-1573',    name: '一往情深',    emoji: '💗',     score: 15,   rarity: '普通', check: function(d){return U.hasSubstring(d,'1573');} },
    { id: 'meme-9413',    name: '九死一生',    emoji: '💀',     score: 94,   rarity: '普通', check: function(d){return U.hasSubstring(d,'9413');} },
    { id: 'meme-4396',    name: '厂长',        emoji: '🎮',     score: 43,   rarity: '普通', check: function(d){return U.hasSubstring(d,'4396');} },
    { id: 'meme-1919',    name: '1919',        emoji: '1️⃣9️⃣',  score: 19,   rarity: '普通', check: function(d){return U.hasSubstring(d,'1919');} },
    { id: 'meme-1314',    name: '一生一世',    emoji: '💞',     score: 13,   rarity: '普通', check: function(d){return U.hasSubstring(d,'1314');} },
    { id: 'meme-5418',    name: '你是你爸',    emoji: '👨',     score: 54,   rarity: '普通', check: function(d){return U.hasSubstring(d,'5418');} },
    { id: 'meme-1688',    name: '一路发发',    emoji: '🧧',     score: 16,   rarity: '普通', check: function(d){return U.hasSubstring(d,'1688');} },
    { id: 'meme-2013',    name: '爱你一生',    emoji: '🗓️',    score: 20,   rarity: '普通', check: function(d){return U.hasSubstring(d,'2013');} },
    { id: 'meme-5918',    name: '我就要发',    emoji: '🤑',     score: 59,   rarity: '普通', check: function(d){return U.hasSubstring(d,'5918');} },

    // 5位及以上子串 — 罕见+
    { id: 'meme-10086',   name: '中国移动',    emoji: '📱',     score: 100,  rarity: '罕见', check: function(d){return U.hasSubstring(d,'10086');} },
    { id: 'meme-10010',   name: '中国联通',    emoji: '📶',     score: 100,  rarity: '罕见', check: function(d){return U.hasSubstring(d,'10010');} },
    { id: 'meme-12306',   name: '抢票神器',    emoji: '🚄',     score: 123,  rarity: '罕见', check: function(d){return U.hasSubstring(d,'12306');} },
    { id: 'meme-114514',  name: '好臭的数字',  emoji: '🤢',     score: 11451, rarity: '罕见', check: function(d){return U.hasSubstring(d,'114514');} },
    { id: 'meme-66686',   name: '溜溜溜达嘿',  emoji: '🏃💨',   score: 666,   rarity: '普通', check: function(d){return U.hasSubstring(d,'66686');} },

    // ═══════════════════════════════════════════════
    // 五、连续序列徽章（35个）—— 子串匹配
    // ═══════════════════════════════════════════════
    // 3位序列（平庸）
    { id: 'seq-012', name: '零一二',   emoji: '0️⃣1️⃣2️⃣', score: 1,  rarity: '平庸', check: function(d){return U.hasSubstring(d,'012');} },
    { id: 'seq-123', name: '一二三',   emoji: '1️⃣2️⃣3️⃣', score: 12, rarity: '平庸', check: function(d){return U.hasSubstring(d,'123');} },
    { id: 'seq-234', name: '二三四',   emoji: '2️⃣3️⃣4️⃣', score: 23, rarity: '平庸', check: function(d){return U.hasSubstring(d,'234');} },
    { id: 'seq-345', name: '三四五',   emoji: '3️⃣4️⃣5️⃣', score: 34, rarity: '平庸', check: function(d){return U.hasSubstring(d,'345');} },
    { id: 'seq-456', name: '四五六',   emoji: '4️⃣5️⃣6️⃣', score: 45, rarity: '平庸', check: function(d){return U.hasSubstring(d,'456');} },
    { id: 'seq-567', name: '五六七',   emoji: '5️⃣6️⃣7️⃣', score: 56, rarity: '平庸', check: function(d){return U.hasSubstring(d,'567');} },
    { id: 'seq-678', name: '六七八',   emoji: '6️⃣7️⃣8️⃣', score: 67, rarity: '平庸', check: function(d){return U.hasSubstring(d,'678');} },
    { id: 'seq-789', name: '七八九',   emoji: '7️⃣8️⃣9️⃣', score: 78, rarity: '平庸', check: function(d){return U.hasSubstring(d,'789');} },
    { id: 'seq-890', name: '八九零',   emoji: '8️⃣9️⃣0️⃣', score: 89, rarity: '平庸', check: function(d){return U.hasSubstring(d,'890');} },
    { id: 'seq-901', name: '九零一',   emoji: '9️⃣0️⃣1️⃣', score: 90, rarity: '平庸', check: function(d){return U.hasSubstring(d,'901');} },
    // 降序3位
    { id: 'seq-098', name: '零九八',   emoji: '0️⃣9️⃣8️⃣', score: 9,  rarity: '平庸', check: function(d){return U.hasSubstring(d,'098');} },
    { id: 'seq-987', name: '九八七',   emoji: '9️⃣8️⃣7️⃣', score: 98, rarity: '平庸', check: function(d){return U.hasSubstring(d,'987');} },
    { id: 'seq-876', name: '八七六',   emoji: '8️⃣7️⃣6️⃣', score: 87, rarity: '平庸', check: function(d){return U.hasSubstring(d,'876');} },
    { id: 'seq-765', name: '七六五',   emoji: '7️⃣6️⃣5️⃣', score: 76, rarity: '平庸', check: function(d){return U.hasSubstring(d,'765');} },
    { id: 'seq-654', name: '六五四',   emoji: '6️⃣5️⃣4️⃣', score: 65, rarity: '平庸', check: function(d){return U.hasSubstring(d,'654');} },
    { id: 'seq-543', name: '五四三',   emoji: '5️⃣4️⃣3️⃣', score: 54, rarity: '平庸', check: function(d){return U.hasSubstring(d,'543');} },
    { id: 'seq-432', name: '四三二',   emoji: '4️⃣3️⃣2️⃣', score: 43, rarity: '平庸', check: function(d){return U.hasSubstring(d,'432');} },
    { id: 'seq-321', name: '三二一',   emoji: '3️⃣2️⃣1️⃣', score: 32, rarity: '平庸', check: function(d){return U.hasSubstring(d,'321');} },
    { id: 'seq-210', name: '二一零',   emoji: '2️⃣1️⃣0️⃣', score: 21, rarity: '平庸', check: function(d){return U.hasSubstring(d,'210');} },

    // 4位序列（普通）
    { id: 'seq-1234', name: '一二三四',   emoji: '1️⃣2️⃣3️⃣4️⃣', score: 123, rarity: '普通', check: function(d){return U.hasSubstring(d,'1234');} },
    { id: 'seq-2345', name: '二三四五',   emoji: '2️⃣3️⃣4️⃣5️⃣', score: 234, rarity: '普通', check: function(d){return U.hasSubstring(d,'2345');} },
    { id: 'seq-3456', name: '三四五六',   emoji: '3️⃣4️⃣5️⃣6️⃣', score: 345, rarity: '普通', check: function(d){return U.hasSubstring(d,'3456');} },
    { id: 'seq-4567', name: '四五六七',   emoji: '4️⃣5️⃣6️⃣7️⃣', score: 456, rarity: '普通', check: function(d){return U.hasSubstring(d,'4567');} },
    { id: 'seq-5678', name: '五六七八',   emoji: '5️⃣6️⃣7️⃣8️⃣', score: 567, rarity: '普通', check: function(d){return U.hasSubstring(d,'5678');} },
    { id: 'seq-6789', name: '六七八九',   emoji: '6️⃣7️⃣8️⃣9️⃣', score: 678, rarity: '普通', check: function(d){return U.hasSubstring(d,'6789');} },
    { id: 'seq-7890', name: '七八九零',   emoji: '7️⃣8️⃣9️⃣0️⃣', score: 789, rarity: '普通', check: function(d){return U.hasSubstring(d,'7890');} },
    { id: 'seq-9876', name: '九八七六',   emoji: '9️⃣8️⃣7️⃣6️⃣', score: 987, rarity: '普通', check: function(d){return U.hasSubstring(d,'9876');} },
    { id: 'seq-8765', name: '八七六五',   emoji: '8️⃣7️⃣6️⃣5️⃣', score: 876, rarity: '普通', check: function(d){return U.hasSubstring(d,'8765');} },
    { id: 'seq-7654', name: '七六五四',   emoji: '7️⃣6️⃣5️⃣4️⃣', score: 765, rarity: '普通', check: function(d){return U.hasSubstring(d,'7654');} },
    { id: 'seq-6543', name: '六五四三',   emoji: '6️⃣5️⃣4️⃣3️⃣', score: 654, rarity: '普通', check: function(d){return U.hasSubstring(d,'6543');} },
    { id: 'seq-5432', name: '五四三二',   emoji: '5️⃣4️⃣3️⃣2️⃣', score: 543, rarity: '普通', check: function(d){return U.hasSubstring(d,'5432');} },
    { id: 'seq-4321', name: '四三二一',   emoji: '4️⃣3️⃣2️⃣1️⃣', score: 432, rarity: '普通', check: function(d){return U.hasSubstring(d,'4321');} },

    // 5位序列（罕见）
    { id: 'seq-12345', name: '一二三四五',     emoji: '🔢', score: 1234, rarity: '罕见', check: function(d){return U.hasSubstring(d,'12345');} },
    { id: 'seq-56789', name: '五六七八九',     emoji: '🔢', score: 5678, rarity: '罕见', check: function(d){return U.hasSubstring(d,'56789');} },
    { id: 'seq-67890', name: '六七八九零',     emoji: '🔢', score: 6789, rarity: '罕见', check: function(d){return U.hasSubstring(d,'67890');} },

    // ═══════════════════════════════════════════════
    // 六、数字密集徽章（20个）—— 某数字出现≥5次
    // ═══════════════════════════════════════════════
    // ≥5次 — 罕见
    { id: 'dense-zero-5',  name: '五零', emoji: '0️⃣×5️⃣', score: 555,  rarity: '罕见', check: function(d){return U.countDigitFreq(d)[0]>=5;} },
    { id: 'dense-one-5',   name: '五一', emoji: '1️⃣×5️⃣', score: 555,  rarity: '罕见', check: function(d){return U.countDigitFreq(d)[1]>=5;} },
    { id: 'dense-two-5',   name: '五二', emoji: '2️⃣×5️⃣', score: 555,  rarity: '罕见', check: function(d){return U.countDigitFreq(d)[2]>=5;} },
    { id: 'dense-three-5', name: '五三', emoji: '3️⃣×5️⃣', score: 555,  rarity: '罕见', check: function(d){return U.countDigitFreq(d)[3]>=5;} },
    { id: 'dense-four-5',  name: '五四', emoji: '4️⃣×5️⃣', score: 555,  rarity: '罕见', check: function(d){return U.countDigitFreq(d)[4]>=5;} },
    { id: 'dense-five-5',  name: '五五', emoji: '5️⃣×5️⃣', score: 555,  rarity: '罕见', check: function(d){return U.countDigitFreq(d)[5]>=5;} },
    { id: 'dense-six-5',   name: '五六', emoji: '6️⃣×5️⃣', score: 555,  rarity: '罕见', check: function(d){return U.countDigitFreq(d)[6]>=5;} },
    { id: 'dense-seven-5', name: '五七', emoji: '7️⃣×5️⃣', score: 555,  rarity: '罕见', check: function(d){return U.countDigitFreq(d)[7]>=5;} },
    { id: 'dense-eight-5', name: '五八', emoji: '8️⃣×5️⃣', score: 555,  rarity: '罕见', check: function(d){return U.countDigitFreq(d)[8]>=5;} },
    { id: 'dense-nine-5',  name: '五九', emoji: '9️⃣×5️⃣', score: 555,  rarity: '罕见', check: function(d){return U.countDigitFreq(d)[9]>=5;} },
    // ≥6次 — 稀有
    { id: 'dense-zero-6',  name: '六零', emoji: '0️⃣×6️⃣', score: 5555, rarity: '稀有', check: function(d){return U.countDigitFreq(d)[0]>=6;} },
    { id: 'dense-one-6',   name: '六一', emoji: '1️⃣×6️⃣', score: 5555, rarity: '稀有', check: function(d){return U.countDigitFreq(d)[1]>=6;} },
    { id: 'dense-two-6',   name: '六二', emoji: '2️⃣×6️⃣', score: 5555, rarity: '稀有', check: function(d){return U.countDigitFreq(d)[2]>=6;} },
    { id: 'dense-three-6', name: '六三', emoji: '3️⃣×6️⃣', score: 5555, rarity: '稀有', check: function(d){return U.countDigitFreq(d)[3]>=6;} },
    // ≥7次 — 史诗
    { id: 'dense-zero-7',  name: '七零', emoji: '0️⃣×7️⃣', score: 55555, rarity: '史诗', check: function(d){return U.countDigitFreq(d)[0]>=7;} },
    { id: 'dense-one-7',   name: '七一', emoji: '1️⃣×7️⃣', score: 55555, rarity: '史诗', check: function(d){return U.countDigitFreq(d)[1]>=7;} },
    // ≥8次 — 传说
    { id: 'dense-zero-8',  name: '八零', emoji: '0️⃣×8️⃣', score: 555555, rarity: '传说', check: function(d){return U.countDigitFreq(d)[0]>=8;} },
    { id: 'dense-one-8',   name: '八一', emoji: '1️⃣×8️⃣', score: 555555, rarity: '传说', check: function(d){return U.countDigitFreq(d)[1]>=8;} },
    // ≥9次 — 神话
    { id: 'dense-zero-9',  name: '九零', emoji: '0️⃣×9️⃣', score: 5555555, rarity: '神话', check: function(d){return U.countDigitFreq(d)[0]>=9;} },
    { id: 'dense-one-9',   name: '九一', emoji: '1️⃣×9️⃣', score: 5555555, rarity: '神话', check: function(d){return U.countDigitFreq(d)[1]>=9;} },

    // ═══════════════════════════════════════════════
    // 七、Pi / e / φ 常数连续徽章（15个）
    // ═══════════════════════════════════════════════
    // π = 3.141592653589793... → "31415926535"
    { id: 'pi-3',  name: 'π连续3位',  emoji: 'π3️⃣',  score: 3,        rarity: '平庸', check: function(d){return U.prefixMatchLength(d, '314') >= 3;} },
    { id: 'pi-4',  name: 'π连续4位',  emoji: 'π4️⃣',  score: 31,       rarity: '普通', check: function(d){return U.prefixMatchLength(d, '3141') >= 4;} },
    { id: 'pi-5',  name: 'π连续5位',  emoji: 'π5️⃣',  score: 314,      rarity: '罕见', check: function(d){return U.prefixMatchLength(d, '31415') >= 5;} },
    { id: 'pi-6',  name: 'π连续6位',  emoji: 'π6️⃣',  score: 3141,     rarity: '稀有', check: function(d){return U.prefixMatchLength(d, '314159') >= 6;} },
    { id: 'pi-7',  name: 'π连续7位',  emoji: 'π7️⃣',  score: 31415,    rarity: '史诗', check: function(d){return U.prefixMatchLength(d, '3141592') >= 7;} },
    { id: 'pi-8',  name: 'π连续8位',  emoji: 'π8️⃣',  score: 314159,   rarity: '传说', check: function(d){return U.prefixMatchLength(d, '31415926') >= 8;} },
    { id: 'pi-9',  name: 'π连续9位',  emoji: 'π9️⃣',  score: 3141592,  rarity: '神话', check: function(d){return U.prefixMatchLength(d, '314159265') >= 9;} },
    { id: 'pi-10', name: 'π连续10位', emoji: 'π🔟',  score: 31415926, rarity: '超越', check: function(d){return U.prefixMatchLength(d, '3141592653') >= 10;} },
    { id: 'pi-11', name: 'π连续11位', emoji: 'π1️⃣1️⃣',score: 314159265, rarity: '终结', check: function(d){return U.prefixMatchLength(d, '31415926535') >= 11;} },
    // e = 2.718281828... → "27182818284"
    { id: 'e-3',   name: 'e连续3位',  emoji: 'e3️⃣',  score: 2,       rarity: '平庸', check: function(d){return U.prefixMatchLength(d, '271') >= 3;} },
    { id: 'e-4',   name: 'e连续4位',  emoji: 'e4️⃣',  score: 27,      rarity: '普通', check: function(d){return U.prefixMatchLength(d, '2718') >= 4;} },
    { id: 'e-5',   name: 'e连续5位',  emoji: 'e5️⃣',  score: 271,     rarity: '罕见', check: function(d){return U.prefixMatchLength(d, '27182') >= 5;} },
    { id: 'e-6',   name: 'e连续6位',  emoji: 'e6️⃣',  score: 2718,    rarity: '稀有', check: function(d){return U.prefixMatchLength(d, '271828') >= 6;} },
    // φ = 1.6180339887... → 匹配 "618"
    { id: 'phi-3', name: 'φ连续3位',  emoji: 'φ3️⃣',  score: 6,       rarity: '平庸', check: function(d){return U.prefixMatchLength(d, '618') >= 3;} },
    { id: 'phi-4', name: 'φ连续4位',  emoji: 'φ4️⃣',  score: 61,      rarity: '普通', check: function(d){return U.prefixMatchLength(d, '6180') >= 4;} },

    // ═══════════════════════════════════════════════
    // 八、奇趣模式徽章（15个）
    // ═══════════════════════════════════════════════
    { id: 'feynman',          name: '费曼点',     emoji: '🎓',     score: 999999, rarity: '传说',
        check: function(d) { return U.hasSubstring(d, '999999'); } },
    { id: 'perfect-palindrome',name: '完美回文',  emoji: '🪞',     score: 9191,   rarity: '稀有',
        check: function(d) { return U.isPalindrome(d) && U.isPrime(int(d)); } },
    { id: 'lucky-seven',     name: '幸运7',      emoji: '🍀7️⃣',   score: 7,     rarity: '平庸',
        check: function(d) { return U.countDigitFreq(d)[7] >= 3; } },
    { id: 'all-evens',       name: '偶数全',     emoji: '2️⃣4️⃣6️⃣', score: 246,   rarity: '罕见',
        check: function(d) { return U.allEven(d); } },
    { id: 'all-odds',        name: '奇数全',     emoji: '1️⃣3️⃣5️⃣', score: 135,   rarity: '罕见',
        check: function(d) { return U.allOdd(d); } },
    { id: 'phone-pattern',   name: '键盘形',     emoji: '⌨️',     score: 12,    rarity: '平庸',
        check: function(d) { return U.hasPhoneRow(d); } },
    { id: 'two-sum-10',      name: '两两成十',   emoji: '🔟',     score: 55,    rarity: '普通',
        check: function(d) { return U.allAdjacentSum10(d); } },
    { id: 'zigzag',          name: '之字形',     emoji: '⚡',     score: 12,    rarity: '普通',
        check: function(d) { return U.isZigzag(d); } },
    { id: 'double-zero',     name: '双零头',     emoji: '0️⃣0️⃣',   score: 100,   rarity: '平庸',
        check: function(d) { return d[0]==='0' && d[1]==='0'; } },
    { id: 'tail-zero',       name: '零结尾',     emoji: '0️⃣⬅️',   score: 10,    rarity: '平庸',
        check: function(d) { return d[d.length-1]==='0'; } },
    { id: 'tail-five',       name: '五结尾',     emoji: '5️⃣⬅️',   score: 5,     rarity: '平庸',
        check: function(d) { return d[d.length-1]==='5'; } },
    { id: 'first-big',       name: '大起头',     emoji: '⬆️',     score: 8,     rarity: '平庸',
        check: function(d) { return +d[0] >= 8; } },
    { id: 'first-small',     name: '小起头',     emoji: '⬇️',     score: 2,     rarity: '平庸',
        check: function(d) { return +d[0] <= 2; } },
    { id: 'all-inc-by-2',    name: '隔2递增',    emoji: '2️⃣⏫',    score: 1357,  rarity: '稀有',
        check: function(d) { return U.isArithmeticProgression(d, 2); } },
    { id: 'all-dec-by-2',    name: '隔2递减',    emoji: '2️⃣⏬',    score: 9753,  rarity: '稀有',
        check: function(d) { return U.isArithmeticProgression(d, -2); } },
    { id: 'sum-eq-prod',     name: '和等于积',   emoji: '➕🟰✖️',  score: 2345,  rarity: '稀有',
        check: function(d) { return U.sumEqualsProduct(d); } }

    ]; // ~140 badges
})();
