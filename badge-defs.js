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
    { id: 'len-10', name: '十位数',   emoji: '🔟',   score: 11,           rarity: '平庸',
        check: function(d) { return U.getEffectiveLength(d) === 10; } },
    { id: 'len-9',  name: '九位数',   emoji: '9️⃣',   score: 111,          rarity: '普通',
        check: function(d) { return U.getEffectiveLength(d) === 9; } },
    { id: 'len-8',  name: '八位数',   emoji: '8️⃣',   score: 1111,         rarity: '罕见',
        check: function(d) { return U.getEffectiveLength(d) === 8; } },
    { id: 'len-7',  name: '七位数',   emoji: '7️⃣',   score: 11111,        rarity: '稀有',
        check: function(d) { return U.getEffectiveLength(d) === 7; } },
    { id: 'len-6',  name: '六位数',   emoji: '6️⃣',   score: 111111,       rarity: '史诗',
        check: function(d) { return U.getEffectiveLength(d) === 6; } },
    { id: 'len-5',  name: '五位数',   emoji: '5️⃣',   score: 1111111,      rarity: '传说',
        check: function(d) { return U.getEffectiveLength(d) === 5; } },
    { id: 'len-4',  name: '四位数',   emoji: '4️⃣',   score: 11111111,     rarity: '神话',
        check: function(d) { return U.getEffectiveLength(d) === 4; } },
    { id: 'len-3',  name: '三位数',   emoji: '3️⃣',   score: 111111111,    rarity: '超越',
        check: function(d) { return U.getEffectiveLength(d) === 3; } },
    { id: 'len-2',  name: '两位数',   emoji: '2️⃣',   score: 1111111111,   rarity: '终结',
        check: function(d) { return U.getEffectiveLength(d) === 2; } },
    { id: 'len-1',  name: '一位数',   emoji: '1️⃣',   score: 100000000000,  rarity: '终结',
        check: function(d) { return U.getEffectiveLength(d) === 1; } },

    // ═══════════════════════════════════════════════
    // 二、数学性质徽章（30个）
    // ═══════════════════════════════════════════════
    { id: 'prime',           name: '质数',       emoji: '🤵',     score: 24,    rarity: '普通',
        check: function(d) { return U.isPrime(int(d)); } },
    { id: 'semiprime',       name: '半质数',     emoji: '➗🤵',   score: 7,     rarity: '平庸',
        check: function(d) { return U.isSemiprime(int(d)); } },
    { id: 'abundant',        name: '盈数',       emoji: '🟥🟨🟩🟦', score: 4,    rarity: '平庸',
        check: function(d) { return U.isAbundant(int(d)); } },
    { id: 'perfect-number',  name: '完全数',     emoji: '✨',     score: 16666667, rarity: '终结',
        check: function(d) { return U.isPerfectNumber(int(d)); } },
    { id: 'square',          name: '平方数',     emoji: '🟦',     score: 316228,  rarity: '传说',
        check: function(d) { return U.isPerfectSquare(int(d)); } },
    { id: 'cube',            name: '立方数',     emoji: '📦',     score: 215424,  rarity: '史诗',
        check: function(d) { return U.isPerfectCube(int(d)); } },
    { id: 'power-of-2',      name: '2的幂',      emoji: '2️⃣↑',   score: 2702702703, rarity: '终结',
        check: function(d) { return U.isPowerOf2(int(d)); } },
    { id: 'fibonacci',       name: '斐波那契',   emoji: '🌀',     score: 185185, rarity: '史诗',
        check: function(d) { return U.isFibonacci(int(d)); } },
    { id: 'twin-prime',      name: '孪生质数',   emoji: '👯',     score: 286,   rarity: '罕见',
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
    { id: 'multiple-of-13',  name: '13的倍数',   emoji: '➗1️⃣3️⃣', score: 13,    rarity: '平庸',
        check: function(d) { return int(d) % 13 === 0; } },
    { id: 'multiple-of-17',  name: '17的倍数',   emoji: '➗1️⃣7️⃣', score: 17,    rarity: '平庸',
        check: function(d) { return int(d) % 17 === 0; } },
    { id: 'multiple-of-19',  name: '19的倍数',   emoji: '➗1️⃣9️⃣', score: 19,    rarity: '平庸',
        check: function(d) { return int(d) % 19 === 0; } },
    { id: 'multiple-of-23',  name: '23的倍数',   emoji: '➗2️⃣3️⃣', score: 23,    rarity: '普通',
        check: function(d) { return int(d) % 23 === 0; } },
    { id: 'multiple-of-29',  name: '29的倍数',   emoji: '➗2️⃣9️⃣', score: 29,    rarity: '普通',
        check: function(d) { return int(d) % 29 === 0; } },
    { id: 'multiple-of-37',  name: '37的倍数',   emoji: '➗3️⃣7️⃣', score: 37,    rarity: '普通',
        check: function(d) { return int(d) % 37 === 0; } },

    // 首尾 / 不含系列
    { id: 'first-last-equal',name: '首尾相等',   emoji: '☸',      score: 10,     rarity: '平庸',
        check: function(d) {
            var t = d.replace(/^0+/, '') || '0';
            return t[0] === t[t.length-1];
        } },
    { id: 'no-zero',         name: '攻',         emoji: '⚔',      score: 3,     rarity: '平庸',
        check: function(d) { return d.indexOf('0') === -1; } },
    { id: 'no-one',          name: '受',         emoji: '🎪',      score: 3,     rarity: '平庸',
        check: function(d) { return d.indexOf('1') === -1; } },
    { id: 'no-one-has-zero', name: '受受',       emoji: '🎪🎪',   score: 4,     rarity: '平庸',
        check: function(d) { return d.indexOf('1')===-1 && d.indexOf('0')!==-1; } },

    // 回文/全同系列
    { id: 'repdigit',        name: '全同数',     emoji: '🟰',     score: 1000000000, rarity: '超越',
        check: function(d) { return U.maxConsecutiveSame(d) === d.length; } },
    { id: 'repunit',         name: '全1数',      emoji: '1️⃣',     score: 10000000000, rarity: '终结',
        check: function(d) { return d.indexOf('0')===-1 && d.indexOf('2')===-1 && d.indexOf('3')===-1 && d.indexOf('4')===-1 && d.indexOf('5')===-1 && d.indexOf('6')===-1 && d.indexOf('7')===-1 && d.indexOf('8')===-1 && d.indexOf('9')===-1; } },
    { id: 'palindrome',      name: '回文数',     emoji: '🔁',     score: 100000,   rarity: '史诗',
        check: function(d) { return U.isPalindrome(d); } },
    { id: 'sum-is-prime',    name: '数字和质数', emoji: '➕🤵',   score: 4,     rarity: '平庸',
        check: function(d) { return U.isPrime(U.sumOfDigits(d)); } },
    { id: 'perfect-squareof',name: '平方和平方数',emoji: '🟦➕',  score: 30,     rarity: '普通',
        check: function(d) { return U.isPerfectSquare(U.sumOfSquares(d)); } },
    { id: 'double',          name: '半全相同',   emoji: '🔀',     score: 100000,  rarity: '史诗',
        check: function(d) { return U.firstHalfEqualsSecondHalf(d); } },

    // ═══════════════════════════════════════════════
    // 三、数字模式徽章（25个）
    // ═══════════════════════════════════════════════
    { id: 'ascending',       name: '升序',       emoji: '📈',     score: 1000000,   rarity: '传说',
        check: function(d) { return U.isNonDecreasing(d); } },
    { id: 'descending',      name: '降序',       emoji: '📉',     score: 1000000,   rarity: '传说',
        check: function(d) { return U.isNonIncreasing(d); } },
    { id: 'all-lte-4',       name: '全≤4',       emoji: '4️⃣⬇',   score: 2048,     rarity: '稀有',
        check: function(d) { return U.allDigitsLTE(d,4); } },
    { id: 'all-gte-6',       name: '全≥6',       emoji: '6️⃣⬆',   score: 23842,  rarity: '史诗',
        check: function(d) { return U.allDigitsGTE(d,6); } },
    { id: 'first-half-lte',  name: '前半低',     emoji: '⬅️4️⃣',  score: 32,     rarity: '普通',
        check: function(d) { return U.firstHalfLTE(d,4); } },
    { id: 'second-half-lte', name: '后半低',     emoji: '4️⃣➡️',  score: 64,     rarity: '普通',
        check: function(d) { return U.secondHalfLTE(d,4); } },
    { id: 'alternating',     name: '奇偶交替',   emoji: '🔀',     score: 1000,    rarity: '罕见',
        check: function(d) { return U.isAlternating(d); } },
    { id: 'no-repeat',       name: '无重复',     emoji: '🚫',     score: 501,  rarity: '罕见',
        check: function(d) { return U.uniqueDigitCount(d) >= 10; } },
    { id: 'only-two-digits', name: '二元数',     emoji: '2️⃣',     score: 1086130,   rarity: '传说',
        check: function(d) { return U.uniqueDigitCount(d) === 2; } },
    { id: 'only-three-digits',name: '三元数',    emoji: '3️⃣',     score: 4873,    rarity: '稀有',
        check: function(d) { return U.uniqueDigitCount(d) === 3; } },

    // N连系列
    { id: 'triple',          name: '三连',       emoji: '3️⃣🎯',   score: 12,    rarity: '平庸',
        check: function(d) { return U.maxConsecutiveSame(d) >= 3; } },
    { id: 'quadruple',       name: '四连',       emoji: '4️⃣🎯',   score: 91,  rarity: '普通',
        check: function(d) { return U.maxConsecutiveSame(d) >= 4; } },
    { id: 'quintuple',       name: '五连',       emoji: '5️⃣🎯',   score: 500, rarity: '罕见',
        check: function(d) { return U.maxConsecutiveSame(d) >= 5; } },
    { id: 'sextuple',        name: '六连',       emoji: '6️⃣🎯',   score: 10000, rarity: '史诗',
        check: function(d) { return U.maxConsecutiveSame(d) >= 6; } },
    { id: 'septuple',        name: '七连',       emoji: '7️⃣🎯',   score: 100000, rarity: '传说',
        check: function(d) { return U.maxConsecutiveSame(d) >= 7; } },
    { id: 'octuple',         name: '八连',       emoji: '8️⃣🎯',   score: 1000000, rarity: '传说',
        check: function(d) { return U.maxConsecutiveSame(d) >= 8; } },
    { id: 'nonuple',         name: '九连',       emoji: '9️⃣🎯',   score: 100000000, rarity: '超越',
        check: function(d) { return U.maxConsecutiveSame(d) >= 9; } },
    { id: 'decuple',         name: '十连以上',   emoji: '🔟🎯',   score: 10000000000, rarity: '终结',
        check: function(d) { return U.maxConsecutiveSame(d) >= 10; } },

    // 特殊形状
    { id: 'stairstep',       name: '阶梯数',     emoji: '🪜',     score: 1000000000,    rarity: '超越',
        check: function(d) {
            var ok = true;
            for (var i=1;i<d.length;i++) { if (Math.abs(+d[i]-+d[i-1])!==1){ok=false;break;} }
            return ok && d.length>2;
        } },
    { id: 'mountain',        name: '山峰数',     emoji: '⛰️',    score: 1000000,  rarity: '神话',
        check: function(d) { return U.isMountain(d); } },
    { id: 'valley',          name: '山谷数',     emoji: '🏞️',    score: 1000000,  rarity: '神话',
        check: function(d) { return U.isValley(d); } },
    { id: 'double-double',   name: '双双对',     emoji: '👯👯',   score: 4,   rarity: '平庸',
        check: function(d) {
            var f = U.countDigitFreq(d);
            var pairs = 0;
            for (var i = 0; i < 10; i++) { if (f[i] >= 2) pairs++; }
            return pairs >= 4;
        } },
    { id: 'triple-pair',     name: '三对子',     emoji: '3️⃣👯',   score: 286,  rarity: '罕见',
        check: function(d) { return U.hasTriplePair(d); } },
    { id: 'all-consec',      name: '全连续',     emoji: '🔗',     score: 667,  rarity: '罕见',
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
    { id: 'meme-69',      name: '六九',        emoji: '6️⃣9️⃣',  score: 10,    rarity: '平庸', check: function(d){return U.hasSubstring(d,'69');} },
    { id: 'meme-78',      name: '七八',        emoji: '7️⃣8️⃣',  score: 10,    rarity: '平庸', check: function(d){return U.hasSubstring(d,'78');} },
    { id: 'meme-91',      name: '九一',        emoji: '9️⃣1️⃣',  score: 10,    rarity: '平庸', check: function(d){return U.hasSubstring(d,'91');} },
    { id: 'meme-42',      name: '生命的意义',  emoji: '🐬',     score: 10,    rarity: '平庸', check: function(d){return U.hasSubstring(d,'42');} },
    { id: 'meme-86',      name: '中国区号',    emoji: '🇨🇳',     score: 10,    rarity: '平庸', check: function(d){return U.hasSubstring(d,'86');} },
    { id: 'meme-62',      name: '六二',        emoji: '6️⃣2️⃣',  score: 10,    rarity: '平庸', check: function(d){return U.hasSubstring(d,'62');} },

    // 3位子串 — 平庸
    { id: 'meme-233',     name: '猫笑',        emoji: '🐱',     score: 111,   rarity: '普通', check: function(d){return U.hasSubstring(d,'233');} },
    { id: 'meme-250',     name: '二百五',      emoji: '🤪',     score: 111,   rarity: '普通', check: function(d){return U.hasSubstring(d,'250');} },
    { id: 'meme-251',     name: '二五一',      emoji: '2️⃣5️⃣1️⃣',score: 111,    rarity: '普通', check: function(d){return U.hasSubstring(d,'251');} },
    { id: 'meme-404',     name: '未找到',      emoji: '❓',     score: 112,   rarity: '普通', check: function(d){return U.hasSubstring(d,'404');} },
    { id: 'meme-007',     name: '詹姆斯·邦德', emoji: '🔫',     score: 111,    rarity: '普通', check: function(d){return U.hasSubstring(d,'007');} },
    { id: 'meme-520',     name: '我爱你',      emoji: '💕',     score: 111,   rarity: '普通', check: function(d){return U.hasSubstring(d,'520');} },
    { id: 'meme-521',     name: '我愿意',      emoji: '💍',     score: 111,   rarity: '普通', check: function(d){return U.hasSubstring(d,'521');} },
    { id: 'meme-119',     name: '火警',        emoji: '🚒',     score: 111,   rarity: '普通', check: function(d){return U.hasSubstring(d,'119');} },
    { id: 'meme-120',     name: '急救',        emoji: '🚑',     score: 111,   rarity: '普通', check: function(d){return U.hasSubstring(d,'120');} },
    { id: 'meme-110',     name: '报警',        emoji: '🚔',     score: 111,   rarity: '普通', check: function(d){return U.hasSubstring(d,'110');} },
    { id: 'meme-114',     name: '查号台',      emoji: '📞',     score: 111,   rarity: '普通', check: function(d){return U.hasSubstring(d,'114');} },
    { id: 'meme-992',     name: '救救',        emoji: '🆘',     score: 111,   rarity: '普通', check: function(d){return U.hasSubstring(d,'992');} },
    { id: 'meme-996',     name: '996工作制',   emoji: '💼',     score: 111,   rarity: '普通', check: function(d){return U.hasSubstring(d,'996');} },
    { id: 'meme-745',     name: '气死我',      emoji: '😤',     score: 111,   rarity: '普通', check: function(d){return U.hasSubstring(d,'745');} },
    { id: 'meme-748',     name: '气死吧',      emoji: '😡',     score: 111,   rarity: '普通', check: function(d){return U.hasSubstring(d,'748');} },
    { id: 'meme-810',     name: '八一零',      emoji: '8️⃣1️⃣0️⃣',score: 111,   rarity: '普通', check: function(d){return U.hasSubstring(d,'810');} },
    { id: 'meme-666',     name: '野兽之数',    emoji: '😈',     score: 122,   rarity: '普通', check: function(d){return U.hasSubstring(d,'666');} },
    { id: 'meme-777',     name: '幸运七',      emoji: '🍀',     score: 122,   rarity: '普通', check: function(d){return U.hasSubstring(d,'777');} },
    { id: 'meme-888',     name: '发财',        emoji: '💰',     score: 122,   rarity: '普通', check: function(d){return U.hasSubstring(d,'888');} },
    { id: 'meme-911',     name: '九一一',      emoji: '🏙️',    score: 111,   rarity: '普通', check: function(d){return U.hasSubstring(d,'911');} },
    { id: 'meme-000',     name: '三蛋',        emoji: '🥚',     score: 122,   rarity: '普通', check: function(d){return U.hasSubstring(d,'000');} },
    { id: 'meme-246',     name: '爱死了',      emoji: '💀💕',   score: 111,   rarity: '普通', check: function(d){return U.hasSubstring(d,'246');} },
    { id: 'meme-282',     name: '爱不爱',      emoji: '❓💕',   score: 112,   rarity: '普通', check: function(d){return U.hasSubstring(d,'282');} },
    { id: 'meme-360',     name: '想念你',      emoji: '🤔',     score: 111,   rarity: '普通', check: function(d){return U.hasSubstring(d,'360');} },
    { id: 'meme-592',     name: '我就爱',      emoji: '💖',     score: 111,   rarity: '普通', check: function(d){return U.hasSubstring(d,'592');} },
    { id: 'meme-596',     name: '我走了',      emoji: '🚶',     score: 111,   rarity: '普通', check: function(d){return U.hasSubstring(d,'596');} },
    { id: 'meme-921',     name: '就爱你',      emoji: '💝',     score: 111,   rarity: '普通', check: function(d){return U.hasSubstring(d,'921');} },
    { id: 'meme-400',     name: '四百',        emoji: '4️⃣0️⃣0️⃣',score: 111,   rarity: '普通', check: function(d){return U.hasSubstring(d,'400');} },
    { id: 'meme-578',     name: '我去吧',      emoji: '🏃',     score: 111,   rarity: '普通', check: function(d){return U.hasSubstring(d,'578');} },

    // 4位子串 — 普通
    { id: 'meme-1337',    name: '黑客语言',    emoji: '💻',     score: 1250,   rarity: '罕见', check: function(d){return U.hasSubstring(d,'1337');} },
    { id: 'meme-9527',    name: '唐伯虎',      emoji: '🎭',     score: 1250,   rarity: '罕见', check: function(d){return U.hasSubstring(d,'9527');} },
    { id: 'meme-1984',    name: '一九八四',    emoji: '📖',     score: 1250,   rarity: '罕见', check: function(d){return U.hasSubstring(d,'1984');} },
    { id: 'meme-2049',    name: '未来',        emoji: '🔮',     score: 1250,   rarity: '罕见', check: function(d){return U.hasSubstring(d,'2049');} },
    { id: 'meme-1573',    name: '一往情深',    emoji: '💗',     score: 1250,   rarity: '罕见', check: function(d){return U.hasSubstring(d,'1573');} },
    { id: 'meme-9413',    name: '九死一生',    emoji: '💀',     score: 1250,   rarity: '罕见', check: function(d){return U.hasSubstring(d,'9413');} },
    { id: 'meme-4396',    name: '厂长',        emoji: '🎮',     score: 1250,   rarity: '罕见', check: function(d){return U.hasSubstring(d,'4396');} },
    { id: 'meme-1919',    name: '1919',        emoji: '1️⃣9️⃣',  score: 1260,   rarity: '罕见', check: function(d){return U.hasSubstring(d,'1919');} },
    { id: 'meme-1314',    name: '一生一世',    emoji: '💞',     score: 1250,   rarity: '罕见', check: function(d){return U.hasSubstring(d,'1314');} },
    { id: 'meme-5418',    name: '你是你爸',    emoji: '👨',     score: 1250,   rarity: '罕见', check: function(d){return U.hasSubstring(d,'5418');} },
    { id: 'meme-1688',    name: '一路发发',    emoji: '🧧',     score: 1250,   rarity: '罕见', check: function(d){return U.hasSubstring(d,'1688');} },
    { id: 'meme-2013',    name: '爱你一生',    emoji: '🗓️',    score: 1250,   rarity: '罕见', check: function(d){return U.hasSubstring(d,'2013');} },
    { id: 'meme-5918',    name: '我就要发',    emoji: '🤑',     score: 1250,   rarity: '罕见', check: function(d){return U.hasSubstring(d,'5918');} },

    // 5位及以上子串 — 罕见+
    { id: 'meme-10086',   name: '中国移动',    emoji: '📱',     score: 14286,  rarity: '稀有', check: function(d){return U.hasSubstring(d,'10086');} },
    { id: 'meme-10010',   name: '中国联通',    emoji: '📶',     score: 14294,  rarity: '稀有', check: function(d){return U.hasSubstring(d,'10010');} },
    { id: 'meme-12306',   name: '抢票神器',    emoji: '🚄',     score: 14286,  rarity: '稀有', check: function(d){return U.hasSubstring(d,'12306');} },
    { id: 'meme-114514',  name: '好臭的数字',  emoji: '🤢',     score: 166667, rarity: '传说', check: function(d){return U.hasSubstring(d,'114514');} },
    { id: 'meme-66686',   name: '溜溜溜达嘿',  emoji: '🏃💨',   score: 14286,   rarity: '稀有', check: function(d){return U.hasSubstring(d,'66686');} },

    // ═══════════════════════════════════════════════
    // 五、连续序列徽章（35个）—— 子串匹配
    // ═══════════════════════════════════════════════
    // 3位序列（平庸）
    { id: 'seq-012', name: '零一二',   emoji: '0️⃣1️⃣2️⃣', score: 111,  rarity: '普通', check: function(d){return U.hasSubstring(d,'012');} },
    { id: 'seq-123', name: '一二三',   emoji: '1️⃣2️⃣3️⃣', score: 111, rarity: '普通', check: function(d){return U.hasSubstring(d,'123');} },
    { id: 'seq-234', name: '二三四',   emoji: '2️⃣3️⃣4️⃣', score: 111, rarity: '普通', check: function(d){return U.hasSubstring(d,'234');} },
    { id: 'seq-345', name: '三四五',   emoji: '3️⃣4️⃣5️⃣', score: 111, rarity: '普通', check: function(d){return U.hasSubstring(d,'345');} },
    { id: 'seq-456', name: '四五六',   emoji: '4️⃣5️⃣6️⃣', score: 111, rarity: '普通', check: function(d){return U.hasSubstring(d,'456');} },
    { id: 'seq-567', name: '五六七',   emoji: '5️⃣6️⃣7️⃣', score: 111, rarity: '普通', check: function(d){return U.hasSubstring(d,'567');} },
    { id: 'seq-678', name: '六七八',   emoji: '6️⃣7️⃣8️⃣', score: 111, rarity: '普通', check: function(d){return U.hasSubstring(d,'678');} },
    { id: 'seq-789', name: '七八九',   emoji: '7️⃣8️⃣9️⃣', score: 111, rarity: '普通', check: function(d){return U.hasSubstring(d,'789');} },
    { id: 'seq-890', name: '八九零',   emoji: '8️⃣9️⃣0️⃣', score: 111, rarity: '普通', check: function(d){return U.hasSubstring(d,'890');} },
    { id: 'seq-901', name: '九零一',   emoji: '9️⃣0️⃣1️⃣', score: 111, rarity: '普通', check: function(d){return U.hasSubstring(d,'901');} },
    // 降序3位
    { id: 'seq-098', name: '零九八',   emoji: '0️⃣9️⃣8️⃣', score: 111,  rarity: '普通', check: function(d){return U.hasSubstring(d,'098');} },
    { id: 'seq-987', name: '九八七',   emoji: '9️⃣8️⃣7️⃣', score: 111, rarity: '普通', check: function(d){return U.hasSubstring(d,'987');} },
    { id: 'seq-876', name: '八七六',   emoji: '8️⃣7️⃣6️⃣', score: 111, rarity: '普通', check: function(d){return U.hasSubstring(d,'876');} },
    { id: 'seq-765', name: '七六五',   emoji: '7️⃣6️⃣5️⃣', score: 111, rarity: '普通', check: function(d){return U.hasSubstring(d,'765');} },
    { id: 'seq-654', name: '六五四',   emoji: '6️⃣5️⃣4️⃣', score: 111, rarity: '普通', check: function(d){return U.hasSubstring(d,'654');} },
    { id: 'seq-543', name: '五四三',   emoji: '5️⃣4️⃣3️⃣', score: 111, rarity: '普通', check: function(d){return U.hasSubstring(d,'543');} },
    { id: 'seq-432', name: '四三二',   emoji: '4️⃣3️⃣2️⃣', score: 111, rarity: '普通', check: function(d){return U.hasSubstring(d,'432');} },
    { id: 'seq-321', name: '三二一',   emoji: '3️⃣2️⃣1️⃣', score: 111, rarity: '普通', check: function(d){return U.hasSubstring(d,'321');} },
    { id: 'seq-210', name: '二一零',   emoji: '2️⃣1️⃣0️⃣', score: 111, rarity: '普通', check: function(d){return U.hasSubstring(d,'210');} },

    // 4位序列（普通）
    { id: 'seq-1234', name: '一二三四',   emoji: '1️⃣2️⃣3️⃣4️⃣', score: 1250, rarity: '罕见', check: function(d){return U.hasSubstring(d,'1234');} },
    { id: 'seq-2345', name: '二三四五',   emoji: '2️⃣3️⃣4️⃣5️⃣', score: 1250, rarity: '罕见', check: function(d){return U.hasSubstring(d,'2345');} },
    { id: 'seq-3456', name: '三四五六',   emoji: '3️⃣4️⃣5️⃣6️⃣', score: 1250, rarity: '罕见', check: function(d){return U.hasSubstring(d,'3456');} },
    { id: 'seq-4567', name: '四五六七',   emoji: '4️⃣5️⃣6️⃣7️⃣', score: 1250, rarity: '罕见', check: function(d){return U.hasSubstring(d,'4567');} },
    { id: 'seq-5678', name: '五六七八',   emoji: '5️⃣6️⃣7️⃣8️⃣', score: 1250, rarity: '罕见', check: function(d){return U.hasSubstring(d,'5678');} },
    { id: 'seq-6789', name: '六七八九',   emoji: '6️⃣7️⃣8️⃣9️⃣', score: 1250, rarity: '罕见', check: function(d){return U.hasSubstring(d,'6789');} },
    { id: 'seq-7890', name: '七八九零',   emoji: '7️⃣8️⃣9️⃣0️⃣', score: 1250, rarity: '罕见', check: function(d){return U.hasSubstring(d,'7890');} },
    { id: 'seq-9876', name: '九八七六',   emoji: '9️⃣8️⃣7️⃣6️⃣', score: 1250, rarity: '罕见', check: function(d){return U.hasSubstring(d,'9876');} },
    { id: 'seq-8765', name: '八七六五',   emoji: '8️⃣7️⃣6️⃣5️⃣', score: 1250, rarity: '罕见', check: function(d){return U.hasSubstring(d,'8765');} },
    { id: 'seq-7654', name: '七六五四',   emoji: '7️⃣6️⃣5️⃣4️⃣', score: 1250, rarity: '罕见', check: function(d){return U.hasSubstring(d,'7654');} },
    { id: 'seq-6543', name: '六五四三',   emoji: '6️⃣5️⃣4️⃣3️⃣', score: 1250, rarity: '罕见', check: function(d){return U.hasSubstring(d,'6543');} },
    { id: 'seq-5432', name: '五四三二',   emoji: '5️⃣4️⃣3️⃣2️⃣', score: 1250, rarity: '罕见', check: function(d){return U.hasSubstring(d,'5432');} },
    { id: 'seq-4321', name: '四三二一',   emoji: '4️⃣3️⃣2️⃣1️⃣', score: 1250, rarity: '罕见', check: function(d){return U.hasSubstring(d,'4321');} },

    // 5位序列（罕见）
    { id: 'seq-12345', name: '一二三四五',     emoji: '🔢', score: 14286, rarity: '稀有', check: function(d){return U.hasSubstring(d,'12345');} },
    { id: 'seq-56789', name: '五六七八九',     emoji: '🔢', score: 14286, rarity: '稀有', check: function(d){return U.hasSubstring(d,'56789');} },
    { id: 'seq-67890', name: '六七八九零',     emoji: '🔢', score: 14286, rarity: '稀有', check: function(d){return U.hasSubstring(d,'67890');} },

    // ═══════════════════════════════════════════════
    // 六、数字密集徽章（20个）—— 某数字出现≥5次
    // ═══════════════════════════════════════════════
    // ≥5次 — 罕见
    { id: 'dense-zero-5',  name: '五零', emoji: '0️⃣×5️⃣', score: 364,  rarity: '罕见', check: function(d){return U.countDigitFreq(d)[0]>=5;} },
    { id: 'dense-one-5',   name: '五一', emoji: '1️⃣×5️⃣', score: 364,  rarity: '罕见', check: function(d){return U.countDigitFreq(d)[1]>=5;} },
    { id: 'dense-two-5',   name: '五二', emoji: '2️⃣×5️⃣', score: 364,  rarity: '罕见', check: function(d){return U.countDigitFreq(d)[2]>=5;} },
    { id: 'dense-three-5', name: '五三', emoji: '3️⃣×5️⃣', score: 364,  rarity: '罕见', check: function(d){return U.countDigitFreq(d)[3]>=5;} },
    { id: 'dense-four-5',  name: '五四', emoji: '4️⃣×5️⃣', score: 364,  rarity: '罕见', check: function(d){return U.countDigitFreq(d)[4]>=5;} },
    { id: 'dense-five-5',  name: '五五', emoji: '5️⃣×5️⃣', score: 364,  rarity: '罕见', check: function(d){return U.countDigitFreq(d)[5]>=5;} },
    { id: 'dense-six-5',   name: '五六', emoji: '6️⃣×5️⃣', score: 364,  rarity: '罕见', check: function(d){return U.countDigitFreq(d)[6]>=5;} },
    { id: 'dense-seven-5', name: '五七', emoji: '7️⃣×5️⃣', score: 364,  rarity: '罕见', check: function(d){return U.countDigitFreq(d)[7]>=5;} },
    { id: 'dense-eight-5', name: '五八', emoji: '8️⃣×5️⃣', score: 364,  rarity: '罕见', check: function(d){return U.countDigitFreq(d)[8]>=5;} },
    { id: 'dense-nine-5',  name: '五九', emoji: '9️⃣×5️⃣', score: 364,  rarity: '罕见', check: function(d){return U.countDigitFreq(d)[9]>=5;} },
    // ≥6次 — 稀有
    { id: 'dense-zero-6',  name: '六零', emoji: '0️⃣×6️⃣', score: 3382, rarity: '稀有', check: function(d){return U.countDigitFreq(d)[0]>=6;} },
    { id: 'dense-one-6',   name: '六一', emoji: '1️⃣×6️⃣', score: 3382, rarity: '稀有', check: function(d){return U.countDigitFreq(d)[1]>=6;} },
    { id: 'dense-two-6',   name: '六二', emoji: '2️⃣×6️⃣', score: 3382, rarity: '稀有', check: function(d){return U.countDigitFreq(d)[2]>=6;} },
    { id: 'dense-three-6', name: '六三', emoji: '3️⃣×6️⃣', score: 3382, rarity: '稀有', check: function(d){return U.countDigitFreq(d)[3]>=6;} },
    // ≥7次 — 史诗
    { id: 'dense-zero-7',  name: '七零', emoji: '0️⃣×7️⃣', score: 43669, rarity: '史诗', check: function(d){return U.countDigitFreq(d)[0]>=7;} },
    { id: 'dense-one-7',   name: '七一', emoji: '1️⃣×7️⃣', score: 43669, rarity: '史诗', check: function(d){return U.countDigitFreq(d)[1]>=7;} },
    // ≥8次 — 传说
    { id: 'dense-zero-8',  name: '八零', emoji: '0️⃣×8️⃣', score: 801025, rarity: '传说', check: function(d){return U.countDigitFreq(d)[0]>=8;} },
    { id: 'dense-one-8',   name: '八一', emoji: '1️⃣×8️⃣', score: 801025, rarity: '传说', check: function(d){return U.countDigitFreq(d)[1]>=8;} },
    // ≥9次 — 神话
    { id: 'dense-zero-9',  name: '九零', emoji: '0️⃣×9️⃣', score: 21953897, rarity: '神话', check: function(d){return U.countDigitFreq(d)[0]>=9;} },
    { id: 'dense-one-9',   name: '九一', emoji: '1️⃣×9️⃣', score: 21953897, rarity: '神话', check: function(d){return U.countDigitFreq(d)[1]>=9;} },

    // ═══════════════════════════════════════════════
    // 七、Pi / e / φ 常数连续徽章（15个）
    // ═══════════════════════════════════════════════
    // π = 3.141592653589793... → "31415926535"
    { id: 'pi-3',  name: 'π连续3位',  emoji: 'π3️⃣',  score: 500,      rarity: '罕见', check: function(d){return U.prefixMatchLength(d, '314') >= 3;} },
    { id: 'pi-4',  name: 'π连续4位',  emoji: 'π4️⃣',  score: 3141,     rarity: '稀有', check: function(d){return U.prefixMatchLength(d, '3141') >= 4;} },
    { id: 'pi-5',  name: 'π连续5位',  emoji: 'π5️⃣',  score: 31415,    rarity: '史诗', check: function(d){return U.prefixMatchLength(d, '31415') >= 5;} },
    { id: 'pi-6',  name: 'π连续6位',  emoji: 'π6️⃣',  score: 314159,   rarity: '传说', check: function(d){return U.prefixMatchLength(d, '314159') >= 6;} },
    { id: 'pi-7',  name: 'π连续7位',  emoji: 'π7️⃣',  score: 3141592,  rarity: '神话', check: function(d){return U.prefixMatchLength(d, '3141592') >= 7;} },
    { id: 'pi-8',  name: 'π连续8位',  emoji: 'π8️⃣',  score: 31415926, rarity: '传说', check: function(d){return U.prefixMatchLength(d, '31415926') >= 8;} },
    { id: 'pi-9',  name: 'π连续9位',  emoji: 'π9️⃣',  score: 314159265,rarity: '神话', check: function(d){return U.prefixMatchLength(d, '314159265') >= 9;} },
    { id: 'pi-10', name: 'π连续10位', emoji: 'π🔟',  score: 3141592653,rarity:'超越', check: function(d){return U.prefixMatchLength(d, '3141592653') >= 10;} },
    { id: 'pi-11', name: 'π连续11位', emoji:'π1️⃣1️⃣',score: 31415926535,rarity:'终结',check:function(d){return U.prefixMatchLength(d, '31415926535')>=11;} },
    // e = 2.718281828... → "27182818284"
    { id: 'e-3',   name: 'e连续3位',  emoji: 'e3️⃣',  score: 500,      rarity: '罕见', check: function(d){return U.prefixMatchLength(d, '271') >= 3;} },
    { id: 'e-4',   name: 'e连续4位',  emoji: 'e4️⃣',  score: 2718,     rarity: '稀有', check: function(d){return U.prefixMatchLength(d, '2718') >= 4;} },
    { id: 'e-5',   name: 'e连续5位',  emoji: 'e5️⃣',  score: 27182,    rarity: '史诗', check: function(d){return U.prefixMatchLength(d, '27182') >= 5;} },
    { id: 'e-6',   name: 'e连续6位',  emoji: 'e6️⃣',  score: 271828,   rarity: '传说', check: function(d){return U.prefixMatchLength(d, '271828') >= 6;} },
    // φ = 1.6180339887... → 匹配 "618"
    { id: 'phi-3', name: 'φ连续3位',  emoji: 'φ3️⃣',  score: 500,      rarity: '罕见', check: function(d){return U.prefixMatchLength(d, '618') >= 3;} },
    { id: 'phi-4', name: 'φ连续4位',  emoji: 'φ4️⃣',  score: 6180,     rarity: '稀有', check: function(d){return U.prefixMatchLength(d, '6180') >= 4;} },

    // ═══════════════════════════════════════════════
    // 八、奇趣模式徽章（15个）
    // ═══════════════════════════════════════════════
    { id: 'feynman',          name: '费曼点',     emoji: '🎓',     score: 100000, rarity: '传说',
        check: function(d) { return U.hasSubstring(d, '999999'); } },
    { id: 'perfect-palindrome',name: '完美回文',  emoji: '🪞',     score: 10000000,   rarity: '神话',
        check: function(d) { return U.isPalindrome(d) && U.isPrime(int(d)); } },
    { id: 'lucky-seven',     name: '幸运7',      emoji: '🍀7️⃣',   score: 11,     rarity: '平庸',
        check: function(d) { return U.countDigitFreq(d)[7] >= 3; } },
    { id: 'all-evens',       name: '偶数全',     emoji: '2️⃣4️⃣6️⃣', score: 2048,   rarity: '罕见',
        check: function(d) { return U.allEven(d); } },
    { id: 'all-odds',        name: '奇数全',     emoji: '1️⃣3️⃣5️⃣', score: 2048,   rarity: '稀有',
        check: function(d) { return U.allOdd(d); } },
    { id: 'phone-pattern',   name: '键盘形',     emoji: '⌨️',     score: 2,    rarity: '平庸',
        check: function(d) { return U.hasPhoneRow(d); } },
    { id: 'zigzag',          name: '之字形',     emoji: '⚡',     score: 20,    rarity: '普通',
        check: function(d) { return U.isZigzag(d); } },
    { id: 'double-zero',     name: '双零头',     emoji: '0️⃣0️⃣',   score: 100,   rarity: '普通',
        check: function(d) { return d[0]==='0' && d[1]==='0'; } },
    { id: 'tail-zero',       name: '零结尾',     emoji: '0️⃣⬅️',   score: 10,    rarity: '平庸',
        check: function(d) { return d[d.length-1]==='0'; } },
    { id: 'tail-five',       name: '五结尾',     emoji: '5️⃣⬅️',   score: 10,     rarity: '平庸',
        check: function(d) { return d[d.length-1]==='5'; } },
    { id: 'first-big',       name: '大起头',     emoji: '⬆️',     score: 5,     rarity: '平庸',
        check: function(d) { return +d[0] >= 8; } },
    { id: 'first-small',     name: '小起头',     emoji: '⬇️',     score: 3,     rarity: '平庸',
        check: function(d) { return +d[0] <= 2; } },
    { id: 'all-inc-by-2',    name: '隔2递增',    emoji: '2️⃣⏫',    score: 10000000,  rarity: '超越',
        check: function(d) { return U.isArithmeticProgression(d, 2); } },
    { id: 'all-dec-by-2',    name: '隔2递减',    emoji: '2️⃣⏬',    score: 10000000,  rarity: '超越',
        check: function(d) { return U.isArithmeticProgression(d, -2); } },
    { id: 'sum-eq-prod',     name: '和等于积',   emoji: '➕🟰✖️',  score: 10000000000,  rarity: '终结',
        check: function(d) { return U.sumEqualsProduct(d); } },

    // ═══════════════════════════════════════════════
    // 九、恰好一个 X 系列（10个）
    // ═══════════════════════════════════════════════
    { id: 'exact-one-0', name: '恰好一个0', emoji: '0️⃣×1️⃣', score: 3, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 0, 1); } },
    { id: 'exact-one-1', name: '恰好一个1', emoji: '1️⃣×1️⃣', score: 3, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 1, 1); } },
    { id: 'exact-one-2', name: '恰好一个2', emoji: '2️⃣×1️⃣', score: 3, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 2, 1); } },
    { id: 'exact-one-3', name: '恰好一个3', emoji: '3️⃣×1️⃣', score: 3, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 3, 1); } },
    { id: 'exact-one-4', name: '恰好一个4', emoji: '4️⃣×1️⃣', score: 3, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 4, 1); } },
    { id: 'exact-one-5', name: '恰好一个5', emoji: '5️⃣×1️⃣', score: 3, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 5, 1); } },
    { id: 'exact-one-6', name: '恰好一个6', emoji: '6️⃣×1️⃣', score: 3, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 6, 1); } },
    { id: 'exact-one-7', name: '恰好一个7', emoji: '7️⃣×1️⃣', score: 3, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 7, 1); } },
    { id: 'exact-one-8', name: '恰好一个8', emoji: '8️⃣×1️⃣', score: 3, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 8, 1); } },
    { id: 'exact-one-9', name: '恰好一个9', emoji: '9️⃣×1️⃣', score: 3, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 9, 1); } },

    // ═══════════════════════════════════════════════
    // 十、邻居/对子系列（8个）
    // ═══════════════════════════════════════════════
    { id: 'has-neighbor',   name: '邻居',     emoji: '🏘️',    score: 1,  rarity: '平庸',
        check: function(d) { var c=0; for(var i=1;i<d.length;i++){if(Math.abs(+d[i]-+d[i-1])<=1)c++;} return c>=5; } },
    { id: 'far-neighbor',   name: '远邻',     emoji: '↔️',    score: 1000000, rarity: '史诗',
        check: function(d) { return U.isFarNeighbor(d); } },
    { id: 'exact-pair',     name: '一对',     emoji: '👯',    score: 667, rarity: '罕见',
        check: function(d) { return U.hasExactPair(d); } },
    { id: 'turtle',         name: '乌龟爬',   emoji: '🐢',    score: 10000000, rarity: '传说',
        check: function(d) { return U.isTurtle(d); } },
    { id: 'sandwich',       name: '三明治',   emoji: '🥪',    score: 20, rarity: '普通',
        check: function(d) { return U.isSandwich(d); } },
    { id: 'symmetric-pair', name: '对称对',   emoji: '🦋',    score: 10000, rarity: '史诗',
        check: function(d) { return U.isSymmetricPairs(d); } },
    { id: 'has-cliff',      name: '悬崖',     emoji: '🧗',    score: 6, rarity: '平庸',
        check: function(d) { for(var i=1;i<d.length;i++){if(Math.abs(+d[i]-+d[i-1])>=9)return true;} return false; } },
    { id: 'has-plateau',    name: '高原',     emoji: '🏔️',    score: 667, rarity: '稀有',
        check: function(d) { return U.hasPlateau(d, 5); } },

    // ═══════════════════════════════════════════════
    // 十一、幂次数系列（5个）
    // ═══════════════════════════════════════════════
    { id: 'power-of-3',   name: '3的幂',   emoji: '3️⃣↑',  score: 41666667, rarity: '终结',
        check: function(d) { return U.isPowerOf(int(d), 3); } },
    { id: 'power-of-5',   name: '5的幂',   emoji: '5️⃣↑',  score: 62500000, rarity: '终结',
        check: function(d) { return U.isPowerOf(int(d), 5); } },
    { id: 'triangular',   name: '三角数',  emoji: '🔺',    score: 223607, rarity: '传说',
        check: function(d) { return U.isTriangular(int(d)); } },
    { id: 'factorial',    name: '阶乘',    emoji: '!',     score: 769230769, rarity: '终结',
        check: function(d) {
            var n = int(d), f = 1, i = 2;
            while (f < n) { f *= i; i++; }
            return f === n;
        } },
    { id: 'catalan',      name: '卡塔兰数', emoji: '📐',  score: 50000000, rarity: '超越',
        check: function(d) { return U.isCatalan(int(d)); } },

    // ═══════════════════════════════════════════════
    // 十二、化学元素系列（10个）
    // ═══════════════════════════════════════════════
    { id: 'elem-h',  name: '氢 (1)',  emoji: '💧', score: 3, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 1, 1); } },
    { id: 'elem-he', name: '氦 (2)',  emoji: '🎈', score: 3, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 2, 1); } },
    { id: 'elem-li', name: '锂 (3)',  emoji: '🔋', score: 3, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 3, 1); } },
    { id: 'elem-be', name: '铍 (4)',  emoji: '💎', score: 3, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 4, 1); } },
    { id: 'elem-b',  name: '硼 (5)',  emoji: '🧼', score: 3, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 5, 1); } },
    { id: 'elem-c',  name: '碳 (6)',  emoji: '💎⚫', score: 3, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 6, 1); } },
    { id: 'elem-n',  name: '氮 (7)',  emoji: '💨', score: 3, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 7, 1); } },
    { id: 'elem-o',  name: '氧 (8)',  emoji: '🫧', score: 3, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 8, 1); } },
    { id: 'elem-f',  name: '氟 (9)',  emoji: '🦷', score: 3, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 9, 1); } },
    { id: 'elem-ne', name: '氖 (0)',  emoji: '💡', score: 3, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 0, 1); } },

    // ═══════════════════════════════════════════════
    // 十三、哈沙德/求和系列（10个）
    // ═══════════════════════════════════════════════
    { id: 'harshad',      name: '哈沙德数', emoji: '➗➕',  score: 17,  rarity: '普通',
        check: function(d) { return U.isHarshad(d); } },
    { id: 'moran',        name: '莫兰数',   emoji: '➗🤵', score: 333, rarity: '罕见',
        check: function(d) { return U.isMoran(d); } },
    { id: 'happy',        name: '快乐数',   emoji: '😊',  score: 6, rarity: '平庸',
        check: function(d) { return U.isHappy(int(d)); } },
    { id: 'deficient',    name: '亏数',     emoji: '📉',  score: 1,  rarity: '平庸',
        check: function(d) {
            var n = int(d), sum = 1, limit = Math.sqrt(n);
            for (var i = 2; i <= limit; i++) { if (n % i === 0) { sum += i; var j = n/i; if (j !== i) sum += j; } }
            return sum < n;
        } },
    { id: 'sum-11',       name: '和为11',   emoji: '➕1️⃣1️⃣', score: 283612, rarity: '传说',
        check: function(d) { return U.sumOfDigits(d) === 11; } },
    { id: 'sum-22',       name: '和为22',   emoji: '➕2️⃣2️⃣', score: 1742, rarity: '罕见',
        check: function(d) { return U.sumOfDigits(d) === 22; } },
    { id: 'sum-33',       name: '和为33',   emoji: '➕3️⃣3️⃣', score: 104, rarity: '普通',
        check: function(d) { return U.sumOfDigits(d) === 33; } },
    { id: 'sum-44',       name: '和为44',   emoji: '➕4️⃣4️⃣', score: 28, rarity: '普通',
        check: function(d) { return U.sumOfDigits(d) === 44; } },
    { id: 'sum-55',       name: '和为55',   emoji: '➕5️⃣5️⃣', score: 28, rarity: '普通',
        check: function(d) { return U.sumOfDigits(d) === 55; } },
    { id: 'div-by-prod',  name: '积整除',   emoji: '✖️➗',  score: 10000000,  rarity: '神话',
        check: function(d) { var p = U.productOfDigits(d); return p > 0 && int(d) % p === 0; } },

    // ═══════════════════════════════════════════════
    // 十四、数学猜想/特殊数（12个）
    // ═══════════════════════════════════════════════
    { id: 'mersenne',    name: '梅森素数',   emoji: '🔭',  score: 100000000, rarity: '终结',
        check: function(d) { return U.isMersennePrime(int(d)); } },
    { id: 'goldbach',    name: '哥德巴赫',   emoji: '🤝',  score: 2,  rarity: '平庸',
        check: function(d) {
            var n = int(d);
            if (n % 2 !== 0 || n < 4) return false;
            for (var p = 2; p <= n/2; p++) {
                if (U.isPrime(p) && U.isPrime(n-p)) return true;
            }
            return false;
        } },
    { id: 'sqrt2',       name: '√2前缀',    emoji: '√2️⃣', score: 2000, rarity: '稀有',
        check: function(d) { return U.hasSubstring(d, '14142'); } },
    { id: 'sqrt3',       name: '√3前缀',    emoji: '√3️⃣', score: 2000, rarity: '稀有',
        check: function(d) { return U.hasSubstring(d, '17320'); } },
    { id: 'sqrt5',       name: '√5前缀',    emoji: '√5️⃣', score: 2000, rarity: '稀有',
        check: function(d) { return U.hasSubstring(d, '22360'); } },
    { id: 'ram-1729',    name: '拉马努金数', emoji: '🧮',  score: 1000, rarity: '罕见',
        check: function(d) { return U.hasSubstring(d, '1729'); } },
    { id: 'kap-6174',    name: '卡普雷卡',   emoji: '🔄',  score: 10000, rarity: '罕见',
        check: function(d) { return U.hasSubstring(d, '6174'); } },
    { id: 'kap-495',     name: '小卡普雷卡', emoji: '🔁',  score: 125,  rarity: '普通',
        check: function(d) { return U.hasSubstring(d, '495'); } },
    { id: 'five-9s',     name: '五连九',     emoji: '9️⃣×5️⃣', score: 5000, rarity: '稀有',
        check: function(d) { return U.hasSubstring(d, '99999'); } },
    { id: 'collatz-ref', name: '3x+1',       emoji: '3️⃣✖️➕1️⃣', score: 9, rarity: '平庸',
        check: function(d) { return U.hasSubstring(d, '31'); } },
    { id: '11037',       name: '考拉兹候选', emoji: '🔢',  score: 5000, rarity: '稀有',
        check: function(d) { return U.hasSubstring(d, '11037'); } },
    { id: 'perfect-sq-sum', name: '平方和完美', emoji: '➕🟰⬜', score: 13, rarity: '平庸',
        check: function(d) { return U.isPerfectSquare(U.sumOfDigits(d)); } },

    // ═══════════════════════════════════════════════
    // 十五、只含特定数字（10个）
    // ═══════════════════════════════════════════════
    { id: 'prime-digits-only', name: '全质数字', emoji: '2️⃣3️⃣5️⃣7️⃣', score: 23842, rarity: '史诗',
        check: function(d) { return U.onlyFrom(d, [2,3,5,7]); } },
    { id: 'comp-digits-only', name: '全合数字', emoji: '4️⃣6️⃣8️⃣9️⃣', score: 23842, rarity: '史诗',
        check: function(d) { return U.onlyFrom(d, [4,6,8,9]); } },
    { id: 'fib-digits-only',  name: '全斐波数字', emoji: '🌀',  score: 276, rarity: '罕见',
        check: function(d) { return U.onlyFrom(d, [0,1,2,3,5,8]); } },
    { id: 'no-prime-digit',   name: '无质数字', emoji: '🚫🤵', score: 276, rarity: '罕见',
        check: function(d) { return U.noneFrom(d, [2,3,5,7]); } },
    { id: 'all-ten-digits',   name: '十全十美', emoji: '🔟',  score: 501, rarity: '罕见',
        check: function(d) { return U.uniqueDigitCount(d) === 10; } },
    { id: 'only-zero-one',    name: '只有0和1', emoji: '0️⃣1️⃣', score: 48828125, rarity: '超越',
        check: function(d) { return U.onlyFrom(d, [0,1]); } },
    { id: 'half-even-odd',    name: '奇偶平衡', emoji: '⚖️',  score: 2, rarity: '平庸',
        check: function(d) { return U.halfEvenHalfOdd(d, 1); } },
    { id: 'one-side',         name: '一边倒',   emoji: '↗️',  score: 1024, rarity: '罕见',
        check: function(d) { return U.onlyFrom(d, [0,1,2,3,4]) || U.onlyFrom(d, [5,6,7,8,9]); } },
    { id: 'no-even',          name: '无偶数',   emoji: '🚫2️⃣', score: 2048, rarity: '稀有',
        check: function(d) { return U.onlyFrom(d, [1,3,5,7,9]); } },
    { id: 'no-odd',           name: '无奇数',   emoji: '🚫1️⃣', score: 2048, rarity: '罕见',
        check: function(d) { return U.onlyFrom(d, [0,2,4,6,8]); } },

    // ═══════════════════════════════════════════════
    // 十六、黄金分割 φ 及衍生（6个）
    // ═══════════════════════════════════════════════
    { id: 'phi-5',        name: 'φ连续5位', emoji: 'φ5️⃣', score: 16180, rarity: '稀有',
        check: function(d) { return U.hasSubstring(d, '16180'); } },
    { id: 'phi-6',        name: 'φ连续6位', emoji: 'φ6️⃣', score: 161803, rarity: '史诗',
        check: function(d) { return U.hasSubstring(d, '161803'); } },
    { id: 'phi-inv',      name: 'φ倒数',     emoji: 'φ🔄', score: 61803, rarity: '稀有',
        check: function(d) { return U.hasSubstring(d, '61803'); } },
    { id: 'golden-angle', name: '黄金角',    emoji: '📐',  score: 2000, rarity: '罕见',
        check: function(d) { return U.hasSubstring(d, '1375'); } },
    { id: 'a4-ratio',     name: 'A4纸比例',  emoji: '📄',  score: 95, rarity: '普通',
        check: function(d) { return U.hasSubstring(d, '297'); } },
    { id: 'fib-ratio',    name: '斐波那契比', emoji: 'φ🌀', score: 2222, rarity: '稀有',
        check: function(d) {
            var a = int(d.substring(0,3)), b = int(d.substring(d.length-3));
            return b > 0 && Math.abs(a/b - 1.618) < 0.01;
        } },

    // ═══════════════════════════════════════════════
    // 十七、网络/文化梗补充（20个）
    // ═══════════════════════════════════════════════
    { id: 'meme-7355608',  name: 'CSGO炸弹',   emoji: '💣',   score: 2000000, rarity: '传说',
        check: function(d) { return U.hasSubstring(d, '7355608'); } },
    { id: 'meme-8675309',  name: 'Jenny号码',  emoji: '📞',   score: 2000000,  rarity: '传说',
        check: function(d) { return U.hasSubstring(d, '8675309'); } },
    { id: 'meme-58008',    name: '计算器梗',   emoji: '🔢',   score: 14286,  rarity: '稀有',
        check: function(d) { return U.hasSubstring(d, '58008'); } },
    { id: 'meme-5318008',  name: '大计算器梗', emoji: '🍑',   score: 2000000,  rarity: '超越',
        check: function(d) { return U.hasSubstring(d, '5318008'); } },
    { id: 'meme-24601',    name: '冉阿让',     emoji: '⛓️',  score: 14286,  rarity: '稀有',
        check: function(d) { return U.hasSubstring(d, '24601'); } },
    { id: 'meme-112358',   name: '斐波片段',   emoji: '🌀🎵', score: 166667, rarity: '史诗',
        check: function(d) { return U.hasSubstring(d, '112358'); } },
    { id: 'meme-555',      name: '哈哈哈',     emoji: '😂',   score: 122,  rarity: '普通',
        check: function(d) { return U.hasSubstring(d, '555'); } },
    { id: 'meme-444',      name: '四四四',     emoji: '4️⃣4️⃣4️⃣', score: 122, rarity: '普通',
        check: function(d) { return U.hasSubstring(d, '444'); } },
    { id: 'meme-333',      name: '三三三',     emoji: '3️⃣3️⃣3️⃣', score: 122, rarity: '普通',
        check: function(d) { return U.hasSubstring(d, '333'); } },
    { id: 'meme-222',      name: '二二二',     emoji: '2️⃣2️⃣2️⃣', score: 122, rarity: '普通',
        check: function(d) { return U.hasSubstring(d, '222'); } },
    { id: 'meme-111',      name: '一一一',     emoji: '1️⃣1️⃣1️⃣', score: 122, rarity: '普通',
        check: function(d) { return U.hasSubstring(d, '111'); } },
    { id: 'meme-999',      name: '九九九',     emoji: '9️⃣9️⃣9️⃣', score: 122, rarity: '普通',
        check: function(d) { return U.hasSubstring(d, '999'); } },
    { id: 'meme-369',      name: '特斯拉数',   emoji: '⚡3️⃣6️⃣9️⃣', score: 111, rarity: '普通',
        check: function(d) { return U.hasSubstring(d, '369'); } },
    { id: 'meme-108',      name: '一百零八',   emoji: '🕉️',  score: 111, rarity: '普通',
        check: function(d) { return U.hasSubstring(d, '108'); } },
    { id: 'meme-528',      name: '爱的频率',   emoji: '💚',   score: 111, rarity: '普通',
        check: function(d) { return U.hasSubstring(d, '528'); } },
    { id: 'meme-963',      name: '神圣频率',   emoji: '🙏',   score: 111, rarity: '普通',
        check: function(d) { return U.hasSubstring(d, '963'); } },
    { id: 'meme-481516',   name: 'Lost数字',   emoji: '🏝️',  score: 166667, rarity: '超越',
        check: function(d) { return U.hasSubstring(d, '4815162342'); } },
    { id: 'meme-80085',    name: '计算器单词', emoji: '📟',   score: 14286,  rarity: '稀有',
        check: function(d) { return U.hasSubstring(d, '80085'); } },
    { id: 'meme-1134',     name: '倒过来读',   emoji: '🙃',   score: 1250,  rarity: '罕见',
        check: function(d) { return U.hasSubstring(d, '1134'); } },

    // ═══════════════════════════════════════════════
    // 十八、更多模式徽章（12个）
    // ═══════════════════════════════════════════════
    { id: 'inc-run-6',    name: '六级台阶', emoji: '📈6️⃣', score: 1000000, rarity: '史诗',
        check: function(d) { return U.hasIncreasingRun(d, 6); } },
    { id: 'dec-run-6',    name: '六级滑坡', emoji: '📉6️⃣', score: 1000000, rarity: '史诗',
        check: function(d) { return U.hasDecreasingRun(d, 6); } },
    { id: 'abab',         name: 'ABAB模式', emoji: '🔀',  score: 14, rarity: '平庸',
        check: function(d) { return U.hasABAB(d); } },
    { id: 'abcabc',       name: 'ABCABC',   emoji: '🔁',  score: 250, rarity: '罕见',
        check: function(d) { return U.hasABCABC(d); } },
    { id: 'starts-aba',   name: '镜前镜后', emoji: '🪞',  score: 10, rarity: '平庸',
        check: function(d) { return U.startsWithABA(d); } },
    { id: 'wave-8',       name: '八次波浪', emoji: '🌊',  score: 13, rarity: '平庸',
        check: function(d) { return U.isWave(d, 8); } },
    { id: 'roller-2',     name: '过山车',   emoji: '🎢',  score: 7, rarity: '平庸',
        check: function(d) { return U.isRollercoaster(d, 4); } },
    { id: 'rotation',     name: '旋转木马', emoji: '🎠',  score: 44, rarity: '普通',
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
    { id: 'eleven-sum-10',name: '全邻和10', emoji: '🔟➕', score: 100000000, rarity: '终结',
        check: function(d) { return U.allAdjacentSum10(d); } },
    { id: 'monotonic',    name: '单调',     emoji: '➡️',  score: 10000000, rarity: '传说',
        check: function(d) { return U.isNonDecreasing(d) || U.isNonIncreasing(d); } },
    { id: 'every-other',  name: '隔位相等', emoji: '🏁',  score: 1000000000, rarity: '终结',
        check: function(d) {
            for (var i = 2; i < d.length; i++) { if (d[i] !== d[i-2]) return false; }
            return true;
        } },
    { id: 'lucky-number', name: '幸运数',   emoji: '🍀🔢', score: 10, rarity: '平庸',
        check: function(d) { return U.sumOfDigits(d) % 7 === 0 && U.hasSubstring(d, '7'); } },

    // ═══════════════════════════════════════════════
    // 十九、RNGdle 爬取徽章（约 50 个）
    // ═══════════════════════════════════════════════

    // ---- 数论 ----
    { id: 'pronic',           name: '普洛尼克数', emoji: '🧮', score: 1000000, rarity: '传说',
        check: function(d) { return U.isPronic(int(d)); } },
    { id: 'strobogrammatic',  name: '旋转不变',   emoji: '🙃',  score: 10000000, rarity: '终结',
        check: function(d) { return U.isStrobogrammatic(d); } },
    { id: 'semi-clean',       name: '半洁',       emoji: '🧹',  score: 667, rarity: '罕见',
        check: function(d) { return U.isSemiClean(d); } },

    // ---- 组合模式 ----
    { id: 'full-house',       name: '满堂彩',     emoji: '🏠',  score: 2, rarity: '平庸',
        check: function(d) { return U.hasFullHouse(d); } },
    { id: 'contig-full-house',name: '连续满堂彩', emoji: '🏰',  score: 91, rarity: '普通',
        check: function(d) { return U.hasContiguousFullHouse(d); } },
    { id: 'snake-eyes',       name: '蛇眼',       emoji: '🎲',  score: 5, rarity: '平庸',
        check: function(d) { return U.hasSnakeEyes(d); } },
    { id: 'blackjack',        name: '21点',       emoji: '♠️',  score: 2000, rarity: '稀有',
        check: function(d) { return U.isBlackjack(d); } },
    { id: 'deep-void',        name: '深虚空',     emoji: '🕳️',  score: 12, rarity: '平庸',
        check: function(d) { var f=U.countDigitFreq(d); return f[0]>=3 && f[0]<=4; } },
    { id: 'devil-number',     name: '魔鬼之数',   emoji: '😈',  score: 10000, rarity: '史诗',
        check: function(d) { return U.hasSubstring(d, '666') && U.hasSubstring(d, '777'); } },

    // ---- 书挡/镜 ----
    { id: 'bookends',         name: '书挡',       emoji: '📚',  score: 125, rarity: '普通',
        check: function(d) { return U.hasBookends(d, 2); } },
    { id: 'mirror-bookends',  name: '镜像书挡',   emoji: '📖',  score: 65, rarity: '普通',
        check: function(d) { return U.hasMirrorBookends(d, 2); } },
    { id: 'pocket-mirror',    name: '口袋镜',     emoji: '🪞',  score: 2, rarity: '平庸',
        check: function(d) { return U.hasPocketMirror(d); } },

    // ---- τ / 数学常数 ----
    { id: 'tau-3',            name: 'τ连续3位',  emoji: 'τ3️⃣', score: 400, rarity: '罕见',
        check: function(d) { return U.tauMatchLength(d, '628') >= 3; } },
    { id: 'tau-4',            name: 'τ连续4位',  emoji: 'τ4️⃣', score: 6283, rarity: '稀有',
        check: function(d) { return U.tauMatchLength(d, '6283') >= 4; } },
    { id: 'tau-5',            name: 'τ连续5位',  emoji: 'τ5️⃣', score: 62831, rarity: '史诗',
        check: function(d) { return U.tauMatchLength(d, '62831') >= 5; } },
    { id: 'tau-6',            name: 'τ连续6位',  emoji: 'τ6️⃣', score: 628318, rarity: '传说',
        check: function(d) { return U.tauMatchLength(d, '628318') >= 6; } },
    { id: 'tau-7',            name: 'τ连续7位',  emoji: 'τ7️⃣', score: 6283185, rarity: '神话',
        check: function(d) { return U.tauMatchLength(d, '6283185') >= 7; } },
    { id: 'tau-8',            name: 'τ连续8位',  emoji: 'τ8️⃣', score: 62831853, rarity: '超越',
        check: function(d) { return U.tauMatchLength(d, '62831853') >= 8; } },
    { id: 'tau-9',            name: 'τ连续9位',  emoji: 'τ9️⃣', score: 628318530, rarity: '超越',
        check: function(d) { return U.tauMatchLength(d, '628318530') >= 9; } },
    { id: 'tau-10',           name: 'τ连续10位', emoji: 'τ🔟', score: 6283185307, rarity: '终结',
        check: function(d) { return U.tauMatchLength(d, '6283185307') >= 10; } },
    { id: 'tau-11',           name: 'τ连续11位', emoji: 'τ1️⃣1️⃣', score: 62831853071, rarity: '终结',
        check: function(d) { return U.tauMatchLength(d, '62831853071') >= 11; } },

    // ---- 打乱连续 ----
    { id: 'scrambled-3',      name: '打乱三连',   emoji: '🔀3️⃣', score: 3, rarity: '平庸',
        check: function(d) { return U.hasScrambledConsecutive(d, 3); } },
    { id: 'scrambled-4',      name: '打乱四连',   emoji: '🔀4️⃣', score: 9, rarity: '平庸',
        check: function(d) { return U.hasScrambledConsecutive(d, 4); } },

    // ---- 节奏/模式 ----
    { id: 'rhyme',            name: '韵脚',       emoji: '🎶',  score: 2, rarity: '平庸',
        check: function(d) { return U.hasRhyme(d); } },
    { id: 'mini-echo',        name: '迷你回声',   emoji: '🔂',  score: 2, rarity: '平庸',
        check: function(d) { return U.hasMiniEcho(d); } },
    { id: 'hills',            name: '丘陵',       emoji: '🏞️',  score: 1, rarity: '平庸',
        check: function(d) { return U.hasHills(d) && U.maxConsecutiveSame(d) <= 2; } },
    { id: 'hop',              name: '跳一跳',     emoji: '🦘',  score: 1, rarity: '平庸',
        check: function(d) { return U.hasHop(d, 2); } },
    { id: 'double-hop',       name: '双跳',       emoji: '🦘🦘', score: 10, rarity: '平庸',
        check: function(d) { return U.hasDoubleHop(d, 2); } },
    { id: 'dunes',            name: '沙丘',       emoji: '🐫',  score: 5, rarity: '平庸',
        check: function(d) { return U.hasDunes(d); } },
    { id: 'metronome',        name: '节拍器',     emoji: '🎼',  score: 47, rarity: '普通',
        check: function(d) { return U.isMetronome(d); } },

    // ---- 特殊条件 ----
    { id: 'feather',          name: '羽毛',       emoji: '🪶',  score: 500, rarity: '罕见',
        check: function(d) { return U.hasFeather(d); } },
    { id: 'firefly',          name: '萤火虫',     emoji: '🪲',  score: 1000, rarity: '罕见',
        check: function(d) { return U.hasFirefly(d); } },
    { id: 'low-ball',         name: '低球',       emoji: '📉',  score: 2000, rarity: '稀有',
        check: function(d) { return U.isLowBall(d); } },
    { id: 'ghost',            name: '幽灵',       emoji: '👻',  score: 15, rarity: '平庸',
        check: function(d) { return U.maxConsecutiveSame(d) >= 2 && U.maxConsecutiveSame(d) <= 2 && U.hasSubstring(d, '00'); } },
    { id: 'calendar',         name: '日历',       emoji: '📅',  score: 8, rarity: '平庸',
        check: function(d) { return U.hasCalendar(d); } },
    { id: 'equation',         name: '方程',       emoji: '🟰',  score: 1, rarity: '平庸',
        check: function(d) { return U.isEquation(d); } },
    { id: 'century',          name: '世纪和',     emoji: '💯',  score: 10000000, rarity: '终结',
        check: function(d) { return U.isCentury(d); } },
        
    { id: 'meme-67',          name: '六七',       emoji: '🫠',  score: 10, rarity: '平庸',
        check: function(d) { return U.hasSubstring(d, '67'); } },
    { id: 'meme-11',          name: '十一',       emoji: '🕚',  score: 11, rarity: '平庸',
        check: function(d) { return U.hasSubstring(d, '11'); } },
    { id: 'meme-12',          name: '一打',       emoji: '🍩',  score: 10, rarity: '平庸',
        check: function(d) { return U.hasSubstring(d, '12'); } },
    { id: 'tree-fiddy',       name: '树皮五十',   emoji: '🦕',  score: 118, rarity: '普通',
        check: function(d) { return U.hasSubstring(d, '350'); } },
    { id: 'double-nine',      name: '双九',       emoji: '🎈',  score: 5, rarity: '平庸',
        check: function(d) { return U.exactCount(d, 9, 2); } },
    { id: 'contentment',      name: '知足',       emoji: '😌',  score: 2, rarity: '平庸',
        check: function(d) { return U.sumOfDigits(d) >= 50 && U.sumOfDigits(d) <= 99; } },
    { id: 'jackpot',          name: '大奖',       emoji: '💰',  score: 100000000, rarity: '超越',
        check: function(d) { return U.hasSubstring(d, '777') && U.sumOfDigits(d) === 21; } },


    // ---- 圣诞树/拜谢 ----
    { id: 'xmas-1',   name: '圣诞树',   emoji: '🎄',   score: 133,    rarity: '普通', check: function(d){return U.countSubstring(d,'002')>=1;} },
    { id: 'xmas-2',   name: '圣诞树+',  emoji: '🎄', score: 100000,  rarity: '稀有', check: function(d){return U.countSubstring(d,'002')>=2;} },
    { id: 'xmas-3',   name: '圣诞树++', emoji: '🎄', score: 100000000, rarity: '传说', check: function(d){return U.countSubstring(d,'002')>=3;} },
    { id: 'worship-1',name: '拜谢',     emoji: '🙇',   score: 95,    rarity: '普通', check: function(d){return U.countSubstring(d,'297')>=1;} },
    { id: 'worship-2',name: '拜谢+',    emoji: '🙇', score: 100000,  rarity: '稀有', check: function(d){return U.countSubstring(d,'297')>=2;} },
    { id: 'worship-3',name: '拜谢++',   emoji: '🙇', score: 100000000, rarity: '传说', check: function(d){return U.countSubstring(d,'297')>=3;} },
    // ---- e 连续 7~11 位 ----
    { id: 'e-7',   name: 'e连续7位',  emoji: 'e7️⃣', score: 2718281,  rarity: '传说', check: function(d){return U.prefixMatchLength(d,'2718281')>=7;} },
    { id: 'e-8',   name: 'e连续8位',  emoji: 'e8️⃣', score: 27182818, rarity: '终结', check: function(d){return U.prefixMatchLength(d,'27182818')>=8;} },
    { id: 'e-9',   name: 'e连续9位',  emoji: 'e9️⃣', score: 271828182,rarity:'终结', check: function(d){return U.prefixMatchLength(d,'271828182')>=9;} },
    { id: 'e-10',  name: 'e连续10位', emoji: 'e🔟', score: 2718281828,rarity:'终结',check:function(d){return U.prefixMatchLength(d,'2718281828')>=10;} },
    { id: 'e-11',  name: 'e连续11位', emoji:'e1️⃣1️⃣',score: 27182818284,rarity:'终结',check:function(d){return U.prefixMatchLength(d,'27182818284')>=11;} },
    // ---- φ 连续 7~11 位 ----
    { id: 'phi-7',  name: 'φ连续7位',  emoji: 'φ7️⃣', score: 1618033, rarity: '传说', check: function(d){return U.prefixMatchLength(d,'1618033')>=7;} },
    { id: 'phi-8',  name: 'φ连续8位',  emoji: 'φ8️⃣', score: 16180339,rarity: '神话', check: function(d){return U.prefixMatchLength(d,'16180339')>=8;} },
    { id: 'phi-9',  name: 'φ连续9位',  emoji: 'φ9️⃣', score: 161803398,rarity:'超越', check: function(d){return U.prefixMatchLength(d,'161803398')>=9;} },
    { id: 'phi-10', name: 'φ连续10位', emoji: 'φ🔟', score: 1618033988,rarity:'终结',check:function(d){return U.prefixMatchLength(d,'1618033988')>=10;} },
    { id: 'phi-11', name: 'φ连续11位', emoji:'φ1️⃣1️⃣',score: 16180339887,rarity:'终结',check:function(d){return U.prefixMatchLength(d,'16180339887')>=11;} },


    // 序列徽章补充 
    { id: 'seq-01234', name: '01234', emoji: '🔢', score: 14286, rarity: '罕见', check: function(d){return U.hasSubstring(d,'01234');} },
    { id: 'seq-98765', name: '98765', emoji: '🔢', score: 14286, rarity: '稀有', check: function(d){return U.hasSubstring(d,'98765');} },
    { id: 'seq-87654', name: '87654', emoji: '🔢', score: 14286, rarity: '稀有', check: function(d){return U.hasSubstring(d,'87654');} },
    { id: 'seq-23456', name: '23456', emoji: '🔢', score: 14286, rarity: '罕见', check: function(d){return U.hasSubstring(d,'23456');} },
    { id: 'seq-76543', name: '76543', emoji: '🔢', score: 14286, rarity: '稀有', check: function(d){return U.hasSubstring(d,'76543');} },
    { id: 'seq-34567', name: '34567', emoji: '🔢', score: 14286, rarity: '罕见', check: function(d){return U.hasSubstring(d,'34567');} },
    { id: 'seq-65432', name: '65432', emoji: '🔢', score: 14286, rarity: '稀有', check: function(d){return U.hasSubstring(d,'65432');} },
    { id: 'seq-45678', name: '45678', emoji: '🔢', score: 14286, rarity: '罕见', check: function(d){return U.hasSubstring(d,'45678');} },
    { id: 'seq-54321', name: '54321', emoji: '🔢', score: 14286, rarity: '稀有', check: function(d){return U.hasSubstring(d,'54321');} },
    { id: 'seq-43210', name: '43210', emoji: '🔢', score: 14286, rarity: '稀有', check: function(d){return U.hasSubstring(d,'43210');} },
    { id: 'seq-012345', name: '012345', emoji: '🔢', score: 166667, rarity: '稀有', check: function(d){return U.hasSubstring(d,'012345');} },
    { id: 'seq-987654', name: '987654', emoji: '🔢', score: 166667, rarity: '稀有', check: function(d){return U.hasSubstring(d,'987654');} },
    { id: 'seq-123456', name: '123456', emoji: '🔢', score: 166667, rarity: '稀有', check: function(d){return U.hasSubstring(d,'123456');} },
    { id: 'seq-876543', name: '876543', emoji: '🔢', score: 166667, rarity: '稀有', check: function(d){return U.hasSubstring(d,'876543');} },
    { id: 'seq-234567', name: '234567', emoji: '🔢', score: 166667, rarity: '稀有', check: function(d){return U.hasSubstring(d,'234567');} },
    { id: 'seq-765432', name: '765432', emoji: '🔢', score: 166667, rarity: '稀有', check: function(d){return U.hasSubstring(d,'765432');} },
    { id: 'seq-345678', name: '345678', emoji: '🔢', score: 166667, rarity: '稀有', check: function(d){return U.hasSubstring(d,'345678');} },
    { id: 'seq-654321', name: '654321', emoji: '🔢', score: 166667, rarity: '稀有', check: function(d){return U.hasSubstring(d,'654321');} },
    { id: 'seq-456789', name: '456789', emoji: '🔢', score: 166667, rarity: '稀有', check: function(d){return U.hasSubstring(d,'456789');} },
    { id: 'seq-543210', name: '543210', emoji: '🔢', score: 166667, rarity: '稀有', check: function(d){return U.hasSubstring(d,'543210');} },
    { id: 'seq-0123456', name: '0123456', emoji: '🔢', score: 2000000, rarity: '史诗', check: function(d){return U.hasSubstring(d,'0123456');} },
    { id: 'seq-9876543', name: '9876543', emoji: '🔢', score: 2000000, rarity: '史诗', check: function(d){return U.hasSubstring(d,'9876543');} },
    { id: 'seq-1234567', name: '1234567', emoji: '🔢', score: 2000000, rarity: '史诗', check: function(d){return U.hasSubstring(d,'1234567');} },
    { id: 'seq-8765432', name: '8765432', emoji: '🔢', score: 2000000, rarity: '史诗', check: function(d){return U.hasSubstring(d,'8765432');} },
    { id: 'seq-2345678', name: '2345678', emoji: '🔢', score: 2000000, rarity: '史诗', check: function(d){return U.hasSubstring(d,'2345678');} },
    { id: 'seq-7654321', name: '7654321', emoji: '🔢', score: 2000000, rarity: '史诗', check: function(d){return U.hasSubstring(d,'7654321');} },
    { id: 'seq-3456789', name: '3456789', emoji: '🔢', score: 2000000, rarity: '史诗', check: function(d){return U.hasSubstring(d,'3456789');} },
    { id: 'seq-6543210', name: '6543210', emoji: '🔢', score: 2000000, rarity: '史诗', check: function(d){return U.hasSubstring(d,'6543210');} },
    { id: 'seq-01234567', name: '01234567', emoji: '🔢', score: 25000000, rarity: '传说', check: function(d){return U.hasSubstring(d,'01234567');} },
    { id: 'seq-98765432', name: '98765432', emoji: '🔢', score: 25000000, rarity: '传说', check: function(d){return U.hasSubstring(d,'98765432');} },
    { id: 'seq-12345678', name: '12345678', emoji: '🔢', score: 25000000, rarity: '传说', check: function(d){return U.hasSubstring(d,'12345678');} },
    { id: 'seq-87654321', name: '87654321', emoji: '🔢', score: 25000000, rarity: '传说', check: function(d){return U.hasSubstring(d,'87654321');} },
    { id: 'seq-23456789', name: '23456789', emoji: '🔢', score: 25000000, rarity: '传说', check: function(d){return U.hasSubstring(d,'23456789');} },
    { id: 'seq-76543210', name: '76543210', emoji: '🔢', score: 25000000, rarity: '传说', check: function(d){return U.hasSubstring(d,'76543210');} },
    { id: 'seq-012345678', name: '012345678', emoji: '🔢', score: 333333333, rarity: '神话', check: function(d){return U.hasSubstring(d,'012345678');} },
    { id: 'seq-987654321', name: '987654321', emoji: '🔢', score: 333333333, rarity: '神话', check: function(d){return U.hasSubstring(d,'987654321');} },
    { id: 'seq-123456789', name: '123456789', emoji: '🔢', score: 333333333, rarity: '神话', check: function(d){return U.hasSubstring(d,'123456789');} },
    { id: 'seq-876543210', name: '876543210', emoji: '🔢', score: 333333333, rarity: '神话', check: function(d){return U.hasSubstring(d,'876543210');} },
    { id: 'seq-0123456789', name: '0123456789', emoji: '🔢', score: 5000000000, rarity: '超越', check: function(d){return U.hasSubstring(d,'0123456789');} },
    { id: 'seq-9876543210', name: '9876543210', emoji: '🔢', score: 5000000000, rarity: '超越', check: function(d){return U.hasSubstring(d,'9876543210');} },

    // ═══════════════════════════════════════════════
    // 二十、7位系统迁移徽章（子串/文化梗类）
    // ═══════════════════════════════════════════════

    // -- 新子串（2-3位）--
    { id: 'meme-7734',   name: '地狱',       emoji: '🔥',  score: 1250, rarity: '罕见', check: function(d){return U.hasSubstring(d,'7734');} },
    { id: 'meme-4399',   name: '童年回忆',   emoji: '🎮',  score: 1250, rarity: '罕见', check: function(d){return U.hasSubstring(d,'4399');} },
    { id: 'meme-0721',   name: '绫地宁宁',   emoji: '🥛',  score: 1250, rarity: '罕见', check: function(d){return U.hasSubstring(d,'0721');} },
    { id: 'meme-408',    name: '蜂王',       emoji: '🐝',  score: 111, rarity: '普通', check: function(d){return U.hasSubstring(d,'408');} },
    { id: 'meme-325',    name: '这也言周',   emoji: 'Zc',  score: 111, rarity: '普通', check: function(d){return U.hasSubstring(d,'325');} },
    { id: 'meme-512',    name: '纯矿精华',   emoji: '❇️',  score: 111, rarity: '普通', check: function(d){return U.hasSubstring(d,'512');} },
    { id: 'meme-985211', name: '做题家',     emoji: '📓',  score: 16667, rarity: '史诗', check: function(d){return U.hasSubstring(d,'985211') || U.hasSubstring(d,'211');} },

    // -- 新子串（4位）--
    { id: 'meme-4242',   name: '深邃意义',   emoji: '🌟',  score: 1260, rarity: '罕见', check: function(d){return U.hasSubstring(d,'4242');} },
    { id: 'meme-6969',   name: 'Very Nice',  emoji: '😏',  score: 1260, rarity: '罕见', check: function(d){return U.hasSubstring(d,'6969');} },
    { id: 'meme-6767',   name: '双六-七',    emoji: '🫠',  score: 1260, rarity: '罕见', check: function(d){return U.hasSubstring(d,'6767');} },
    { id: 'meme-07734',  name: 'HELLO',      emoji: '👋',  score: 14286, rarity: '罕见', check: function(d){return U.hasSubstring(d,'07734');} },
    { id: 'meme-24678',  name: '连续数鸭子', emoji: '🦆',  score: 14286, rarity: '罕见', check: function(d){return U.hasSubstring(d,'24678');} },
    { id: 'meme-299792', name: '光速',       emoji: '🔦',  score: 166667, rarity: '史诗', check: function(d){return U.hasSubstring(d,'299792') || U.hasSubstring(d,'300000');} },

    // -- 新子串（5-6位重彩）--
    { id: 'meme-424242',   name: '宇宙答案',   emoji: '🌟',  score: 167785, rarity: '稀有', check: function(d){return U.hasSubstring(d,'424242');} },
    { id: 'meme-696969',   name: 'VeryVeryNice',emoji:'😏',  score: 167785, rarity: '稀有', check: function(d){return U.hasSubstring(d,'696969');} },
    { id: 'meme-676767',   name: '脑腐',       emoji: '🫠',  score: 167785, rarity: '稀有', check: function(d){return U.hasSubstring(d,'676767');} },
    { id: 'meme-365365',   name: '土拨鼠之日', emoji: '📅',  score: 166750, rarity: '稀有', check: function(d){return U.hasSubstring(d,'365365');} },
    { id: 'meme-777777',   name: '7的意志(6)',  emoji: '💰',  score: 181818, rarity: '传说', check: function(d){return U.hasSubstring(d,'777777');} },
    { id: 'meme-000000',   name: '虚空',       emoji: '⚫',  score: 181818, rarity: '传说', check: function(d){return U.hasSubstring(d,'000000');} },
    { id: 'meme-77777',    name: '7的意志(5)',  emoji: '💰',  score: 15625, rarity: '史诗', check: function(d){return U.hasSubstring(d,'77777');} },
    { id: 'meme-00000',    name: '黑洞',       emoji: '⚫',  score: 15625, rarity: '史诗', check: function(d){return U.hasSubstring(d,'00000');} },
    { id: 'meme-314159',   name: 'π切片(6)',   emoji: '🥧',  score: 166667, rarity: '史诗', check: function(d){return U.hasSubstring(d,'314159');} },
    { id: 'meme-271828',   name: 'e切片(6)',   emoji: '📈',  score: 166667, rarity: '史诗', check: function(d){return U.hasSubstring(d,'271828');} },
    { id: 'meme-31415',    name: 'π切片(5)',   emoji: '🥧',  score: 14286, rarity: '稀有', check: function(d){return U.hasSubstring(d,'31415');} },
    { id: 'meme-27182',    name: 'e切片(5)',   emoji: '📈',  score: 14286, rarity: '稀有', check: function(d){return U.hasSubstring(d,'27182');} },
    { id: 'meme-350234',   name: '苦命鸳鸯',   emoji: '🐦',  score: 166667, rarity: '史诗', check: function(d){return U.hasSubstring(d,'350234');} },

    // ═══════════════════════════════════════════════
    // 二十一、精确值徽章（有效位数匹配）
    // ═══════════════════════════════════════════════

    // -- 7位精确值 --
    { id: 'exact-7777777', name: '宇宙头奖',   emoji: '💰', score: 1000000000, rarity: '终结', check: function(d){return U.getEffectiveLength(d)===7 && int(d)===7777777;} },
    { id: 'exact-1919810',name: '野兽先辈',   emoji: '💩', score: 1000000000, rarity: '终结', check: function(d){return U.getEffectiveLength(d)===7 && int(d)===1919810;} },
    { id: 'exact-3141592',name: '七位圆周率', emoji: '🥧', score: 1000000000, rarity: '终结', check: function(d){return U.getEffectiveLength(d)===7 && int(d)===3141592;} },
    { id: 'exact-2718281',name: '七位欧拉常数',emoji:'📈',score: 1000000000, rarity: '终结', check: function(d){return U.getEffectiveLength(d)===7 && int(d)===2718281;} },
    { id: 'exact-1314520',name: '永恒之爱',   emoji: '❤',  score: 1000000000, rarity: '超越', check: function(d){return (U.getEffectiveLength(d)===7&&int(d)===1314520) || (U.getEffectiveLength(d)===7&&int(d)===5201314);} },
    { id: 'exact-stars',  name: '小星星',     emoji: '🌟',  score: 1000000000, rarity: '超越', check: function(d){var n=int(d);var l=U.getEffectiveLength(d);return l===7&&(n===1155665||n===4433221||n===5544332);} },

    // -- 6位精确值 --
    { id: 'exact-666666', name: 'DoctorSoap', emoji: '🎲', score: 100000000, rarity: '超越', check: function(d){return U.getEffectiveLength(d)===6 && int(d)===666666;} },

    // -- 3-4位精准（文化/梗数字） --
    { id: 'exact-777',    name: '精准之7',    emoji: '💰', score: 1000000, rarity: '史诗', check: function(d){return U.getEffectiveLength(d)===3 && int(d)===777;} },
    { id: 'exact-666',    name: '精准恶魔',   emoji: '😈', score: 1000000, rarity: '史诗', check: function(d){return U.getEffectiveLength(d)===3 && int(d)===666;} },
    { id: 'exact-1337',   name: '精准LEET',   emoji: '💻', score: 10000000, rarity: '传说', check: function(d){return U.getEffectiveLength(d)===4 && int(d)===1337;} },
    { id: 'exact-7734',   name: '精准地狱',   emoji: '👹', score: 10000000, rarity: '传说', check: function(d){return U.getEffectiveLength(d)===4 && int(d)===7734;} },
    { id: 'exact-42',     name: '精准意义',   emoji: '🌟', score: 10000000, rarity: '传说', check: function(d){return U.getEffectiveLength(d)===2 && int(d)===42;} },
    { id: 'exact-911',    name: '精准救援',   emoji: '🚑', score: 10000000, rarity: '传说', check: function(d){return U.getEffectiveLength(d)===3 && int(d)===911;} },

    // ═══════════════════════════════════════════════
    // 二十二、数学性质徽章
    // ═══════════════════════════════════════════════

    // -- 次方数系列 --
    { id: 'power-5',      name: '五次方数',   emoji: '🖐️',  score: 100000000, rarity: '超越', check: function(d){return U.isPowerExponent(d,5);} },
    { id: 'power-6',      name: '六次方数',   emoji: '🎲',  score: 10000000, rarity: '神话', check: function(d){return U.isPowerExponent(d,6);} },
    { id: 'power-7',      name: '七次方数',   emoji: '🌈',  score: 10000000, rarity: '传说', check: function(d){return U.isPowerExponent(d,7);} },
    { id: 'power-8',      name: '八次方数',   emoji: '🎱',  score: 10000000, rarity: '传说', check: function(d){return U.isPowerExponent(d,8);} },
    { id: 'power-9',      name: '九次方数',   emoji: '☁️',  score: 10000000, rarity: '传说', check: function(d){return U.isPowerExponent(d,9);} },
    { id: 'power-11',     name: '十一次方数', emoji: '🕚',  score: 1000000, rarity: '史诗', check: function(d){return U.isPowerExponent(d,11);} },
    { id: 'power-13',     name: '十三次方数', emoji: '💀',  score: 1000000, rarity: '史诗', check: function(d){return U.isPowerExponent(d,13);} },
    { id: 'power-17',     name: '十七次方数', emoji: '🧙',  score: 10000000, rarity: '传说', check: function(d){return U.isPowerExponent(d,17);} },
    { id: 'power-19',     name: '十九次方数', emoji: '🌑',  score: 10000000, rarity: '传说', check: function(d){return U.isPowerExponent(d,19);} },

    // -- 多边形数 --
    { id: 'pentagonal',      name: '五边形数',     emoji: '⬠',  score: 10000000, rarity: '传说', check: function(d){return U.isPentagonal(int(d));} },
    { id: 'hexagonal',       name: '六边形数',     emoji: '⬡',  score: 10000000, rarity: '传说', check: function(d){return U.isHexagonal(int(d));} },
    { id: 'square-triangular',name:'三角平方数',   emoji: '◈',  score: 100000000, rarity: '超越', check: function(d){return U.isSquareTriangular(int(d));} },
    { id: 'tri-pentagonal',  name: '三角五边数',   emoji: '◈',  score: 100000000, rarity: '超越', check: function(d){return U.isTriangularPentagonal(int(d));} },

    // -- 其他数学性质 --
    { id: 'armstrong',       name: '自幂数',       emoji: '🌼',  score: 1000000000, rarity: '超越', check: function(d){return U.isArmstrong(d);} },
    { id: 'factorial',       name: '阶乘',         emoji: '❗',  score: 769230769, rarity: '超越', check: function(d){var n=int(d);for(var i=2,p=1;p<=n;i++){p*=i;if(p===n&&n>1)return true;}return false;} },
    { id: 'taxicab',         name: '的士数',       emoji: '🚕',  score: 1000000000, rarity: '传说', check: function(d){var n=int(d);var ways=0;var limit=Math.ceil(Math.cbrt(n));for(var a=1;a<=limit;a++){for(var b=a;b<=limit;b++){if(a*a*a+b*b*b===n)ways++;if(ways>=2)return true;}}return false;} },
    { id: 'exact-3-factors', name: '三项数',       emoji: '🔺',  score: 3, rarity: '平庸', check: function(d){return U.hasExact3PrimeFactors(d);} },
    { id: 'quadruple-prime', name: '四生素数',     emoji: '👶',  score: 1000000000, rarity: '史诗', check: function(d){return U.isQuadruplePrime(d);} },
    { id: 'prime-reversible',name: '正反皆尊',     emoji: '💍',  score: 286, rarity: '罕见', check: function(d){return U.isPrimeReversible(d);} },
    { id: 'div-by-40000',    name: '战锤40k',      emoji: '🔨',  score: 100000, rarity: '史诗', check: function(d){return U.isDivisibleBy40000(d);} },

    // ═══════════════════════════════════════════════
    // 二十三、新模式徽章
    // ═══════════════════════════════════════════════

    // -- 重复模式 --
    { id: 'rep-6',        name: '奇点',       emoji: '⬡',  score: 1000000, rarity: '传说', check: function(d){return U.maxConsecutiveSame(d)>=6;} },
    { id: 'planet-asteroid',name:'定轨行星+小行星',emoji:'🌏',score: 1000000, rarity: '传说', check: function(d){return U.hasComboRun(d,4,3);} },
    { id: 'star-asteroid', name: '定轨恒星+小行星',emoji:'☀️',score: 1000, rarity: '传说', check: function(d){return U.hasComboRun(d,5,2);} },
    { id: 'star',          name: '定轨恒星',   emoji: '☀️',  score: 500, rarity: '史诗', check: function(d){return U.maxConsecutiveSame(d)>=5;} },
    { id: 'planet-satellite',name:'定轨行星+卫星',emoji:'🌏',score: 222, rarity: '稀有', check: function(d){return U.hasComboRun(d,4,2);} },
    { id: 'three-satellites',name:'定轨三卫星',emoji: '🛰',  score: 3, rarity: '平庸', check: function(d){var f=U.countDigitFreq(d);var g=0;for(var i=0;i<10;i++){if(f[i]===2)g++;}return g>=3;} },
    { id: 'two-satellites',  name:'定轨两卫星',emoji: '🛰',  score: 1, rarity: '平庸', check: function(d){var f=U.countDigitFreq(d);var g=0;for(var i=0;i<10;i++){if(f[i]===2)g++;}return g>=2;} },

    // -- 双刻/三刻 --
    { id: 'double-triple',  name: '连续双刻',  emoji: '🍡',  score: 1000, rarity: '稀有', check: function(d){return U.hasDoubleTriple(d);} },
    { id: 'two-triples',    name: '双刻',      emoji: '🍡',  score: 7, rarity: '平庸', check: function(d){return U.hasTwoTriples(d);} },

    // -- 拉链/交替 --
    { id: 'zipper',         name: '拉链',      emoji: '🤐',  score: 100000, rarity: '史诗', check: function(d){return U.isZipper(d);} },

    // -- 相框系列 --
    { id: 'frame-satellite',name: '相框卫星',  emoji: '🖼️',  score: 2, rarity: '平庸', check: function(d){return U.hasFrameSatellite(d);} },
    { id: 'frame-asteroid', name: '相框小行星',emoji: '🖼️',  score: 18, rarity: '普通', check: function(d){return U.hasFrameAsteroid(d);} },
    { id: 'frame-double',   name: '相框双卫星',emoji: '🖼️',  score: 286, rarity: '罕见', check: function(d){return U.hasFrameDoubleSatellite(d);} },

    // -- 暗杠 --
    { id: 'dark-kong',      name: '暗杠',      emoji: '🀫',  score: 20, rarity: '普通', check: function(d){return U.hasDarkKong(d);} },

    // -- 双书夹 --
    { id: 'double-bookends',name: '双书夹',    emoji: '👐',  score: 143, rarity: '罕见', check: function(d){return U.hasDoubleBookends(d);} },

    // -- 二进制相关 --
    { id: 'binary-11-ones', name: '聚光',      emoji: '🔦',  score: 182, rarity: '罕见', check: function(d){return U.binaryConsecutiveOnes(d,11);} },
    { id: 'binary-8-ones',  name: '亮灯',      emoji: '💡',  score: 19, rarity: '普通', check: function(d){return U.binaryConsecutiveOnes(d,8);} },
    { id: 'binary-5-ones',  name: '微光',      emoji: '🕯️',  score: 2, rarity: '平庸', check: function(d){return U.binaryConsecutiveOnes(d,5);} },
    { id: 'binary-alt',     name: '闪灯',      emoji: '✨',  score: 125, rarity: '罕见', check: function(d){return U.binaryAlternating(d,8);} },

    // -- 七段码 --
    { id: 'cyber-harshad',  name: '赛博哈沙德数',emoji:'🤖',score: 69, rarity: '罕见', check: function(d){var seg=U.sevenSegmentSum(d);return seg>0 && int(d)%seg===0;} },

    // -- 方差/极差 --
    { id: 'discrete',       name: '离散',      emoji: '🏁',  score: 1000, rarity: '罕见', check: function(d){return U.varianceDigits(d)>=15;} },
    { id: 'compress',       name: '压缩',      emoji: '⩙',   score: 2000, rarity: '普通', check: function(d){return U.getEffectiveLength(d)>=3 && U.rangeDigits(d)<4;} },
    { id: 'decompress',     name: '解压缩',    emoji: '↕️',  score: 1, rarity: '平庸', check: function(d){return U.getEffectiveLength(d)>=3 && U.rangeDigits(d)>7;} },

    // -- 熵 --
    { id: 'chaos',          name: '混乱',      emoji: '♨️',   score: 6, rarity: '平庸', check: function(d){return U.base5Entropy(d)>2.25;} },

    // -- 圈圈 --
    { id: 'circles-15',     name: '圈套',      emoji: '◉',   score: 200, rarity: '罕见', check: function(d){return U.countCircles(d)>=15;} },
    { id: 'circles-10',     name: '圈套',      emoji: '◉',   score: 24, rarity: '普通', check: function(d){return U.countCircles(d)>=10;} },
    { id: 'circles-8',      name: '圆圆圈圈',  emoji: '◎',  score: 6, rarity: '平庸', check: function(d){return U.countCircles(d)>=8;} },
    { id: 'circles-5',      name: '圆圈',      emoji: '◯',   score: 2, rarity: '平庸', check: function(d){return U.countCircles(d)>=5;} },

    // -- 金字塔 --
    { id: 'pyramid-1',      name: '金字塔(1)', emoji: '△',   score: 50, rarity: '普通', check: function(d){return U.isPyramid(d,1);} },
    { id: 'pyramid-2',      name: '金字塔(2)', emoji: '△',   score: 10000, rarity: '罕见', check: function(d){return U.isPyramid(d,2);} },
    { id: 'pyramid-3',      name: '金字塔(3)', emoji: '◬',   score: 1000000, rarity: '史诗', check: function(d){return U.isPyramid(d,3);} },

    // -- Mamba/荒岛 --
    { id: 'mamba-out',      name: 'Mamba Out!', emoji: '🏀',  score: 1000000, rarity: '史诗', check: function(d){return U.canSplit24_8(d);} },
    { id: 'desert-island',  name: '荒岛没边',  emoji: '🏝',  score: 1000000, rarity: '史诗', check: function(d){return U.canSplit13_78_91(d);} },

    // -- 阶跃/等位移/等路程 --
    { id: 'strict-incr',    name: '逆流',      emoji: '🌊',  score: 1000000, rarity: '传说', check: function(d){var t=d.replace(/^0+/,'')||'0';return U.isStrictlyIncreasing(t);} },
    { id: 'strict-decr',    name: '瀑布',      emoji: '🚿',  score: 1000000, rarity: '传说', check: function(d){var t=d.replace(/^0+/,'')||'0';return U.isStrictlyDecreasing(t);} },
    { id: 'equi-step',      name: '等位移',    emoji: '📏',  score: 10000000, rarity: '史诗', check: function(d){return U.isEquiStep(d);} },

    // -- 逐级差分 --
    { id: 'diff-to-root',   name: '零落成泥',  emoji: '🍂',  score: 16, rarity: '普通', check: function(d){return U.diffSeqConverges(d,U.digitalRoot(d));} },
    { id: 'diff-to-zero',   name: '落叶归根',  emoji: '🍃',  score: 2, rarity: '平庸', check: function(d){return U.diffSeqConverges(d,0);} },

    // -- 山丘/耳语/邻居 --
    { id: 'hills-mountain', name: '山丘',      emoji: '🏞️',  score: 1, rarity: '平庸', check: function(d){return U.hasHills(d);} },
    { id: 'neighbor',       name: '邻居',      emoji: '🏘️',  score: 1, rarity: '平庸', check: function(d){return U.hasNeighbor(d);} },

    // -- 等差数列分组 --
    { id: 'arith-pairs',    name: '等差数列',  emoji: '⏫',  score: 1000000, rarity: '罕见', check: function(d){var t=d.replace(/^0+/,'')||'0';return t.length===6 && U.isTwoDigitArithProg(t);} },

    // -- 数鸭子 --
    { id: 'count-ducks',    name: '数鸭子',    emoji: '🦆',  score: 10, rarity: '普通', check: function(d){return U.containsAllDigits(d, [2,4,6,7,8]);} },

    // -- 闭锁/公开化 --
    { id: 'locked',         name: '闭锁',      emoji: '🔒',  score: 2000, rarity: '普通', check: function(d){return U.onlyFrom(d, [4,6,8,9,0]);} },
    { id: 'open-set',       name: '公开化',    emoji: '📂',  score: 2000, rarity: '普通', check: function(d){return U.onlyFrom(d, [1,2,3,5,7]);} },

    // -- 循环节 --
    { id: 'reciprocal-7',   name: '七彩虹',    emoji: '🌈',  score: 1000000, rarity: '传说', check: function(d){return U.startsWithReciprocal7(d);} },

    // -- 无7徒刑 --
    { id: 'no-rem-7',       name: '无7徒刑',  emoji: '🚫',  score: 3, rarity: '平庸', check: function(d){return U.hasNoRemainder7(d);} },

    // -- 停飞/起飞 --
    { id: 'grounded',       name: '停飞',      emoji: '⚓',  score: 2, rarity: '平庸', check: function(d){return +d[0] < +d[d.length-1];} },
    { id: 'take-off',       name: '起飞',      emoji: '🚀',  score: 2, rarity: '平庸', check: function(d){return +d[0] > +d[d.length-1];} },

    // -- 博饼/专一 --
    { id: 'gambling',       name: '博饼',      emoji: '🎲',  score: 11111, rarity: '普通', check: function(d){var el=U.getEffectiveLength(d);if(el!==6)return false;var t=d.substring(11-el);return U.onlyFrom(t, [1,2,3,4,5,6]);} },
    { id: 'dedicated',      name: '专一',      emoji: '🎲',  score: 11, rarity: '普通', check: function(d){var f=U.countDigitFreq(d);if(f[1]!==2)return false;for(var i=0;i<10;i++){if(i===1)continue;if(f[i]>2)return false;}return true;} },

    // -- Luhn --
    { id: 'luhn-valid',     name: '类银行卡数',emoji: '🏦',  score: 10, rarity: '普通', check: function(d){return U.isLuhnValid(d);} },

    // -- Beat / 节奏 --
    // -- 根深蒂固 / 数根 --
    { id: 'deep-root',      name: '根深蒂固',  emoji: '🌳',  score: 3, rarity: '平庸', check: function(d){return U.digitalRoot(d)>=7;} },


    // -- 尾声系列 --
    { id: 'suffix-999999',  name: '百万年好合',emoji: '❤',  score: 1000000, rarity: '传说', check: function(d){return d.endsWith('999999');} },
    { id: 'suffix-99999',   name: '十万年好合',emoji: '🥳',  score: 100000, rarity: '史诗', check: function(d){return d.endsWith('99999');} },
    { id: 'suffix-9999',    name: '万年好合',  emoji: '🎊',  score: 10000, rarity: '稀有', check: function(d){return d.endsWith('9999');} },
    { id: 'suffix-999',     name: '千年好合',  emoji: '🎉',  score: 1000, rarity: '罕见', check: function(d){return d.endsWith('999');} },
    { id: 'suffix-99',      name: '百年好合',  emoji: '🎈',  score: 100, rarity: '普通', check: function(d){return d.endsWith('99');} },

    // -- 结尾系列 --
    { id: 'suffix-000',     name: '千年',      emoji: '🗓️',  score: 1000, rarity: '普通', check: function(d){return d.endsWith('000');} },
    { id: 'suffix-00',      name: '世纪',      emoji: '💯',  score: 100, rarity: '平庸', check: function(d){return d.endsWith('00');} },
    { id: 'suffix-5000',    name: '半纪元',    emoji: '🗿',  score: 10000, rarity: '稀有', check: function(d){return d.endsWith('5000');} },
    { id: 'suffix-500',     name: '半千年',    emoji: '📜',  score: 1000, rarity: '罕见', check: function(d){return d.endsWith('500');} },
    { id: 'suffix-50',      name: '半世纪',    emoji: '🗓️',  score: 100, rarity: '普通', check: function(d){return d.endsWith('50');} },
    { id: 'suffix-0',       name: '干净',      emoji: '🧼',  score: 10, rarity: '平庸', check: function(d){return d.endsWith('0');} },
    { id: 'suffix-5',       name: '半净',      emoji: '🧹',  score: 10, rarity: '平庸', check: function(d){return d.endsWith('5');} },

    // -- 倍数 --
    { id: 'multiple-12',    name: '一打',      emoji: '🍩',  score: 10, rarity: '平庸', check: function(d){return int(d)%12===0;} },

    // -- 山巅/巨石 --
    { id: 'summit',         name: '山巅',      emoji: '🏔️',  score: 1000000000, rarity: '超越', check: function(d){return U.isInRange(d, 9990000, 10000000);} },
    { id: 'boulder',        name: '巨石',      emoji: '🪨',  score: 1000000000, rarity: '超越', check: function(d){return U.isInRange(d, 999000, 1000000);} },

    // -- 倍减/倍增 --
    { id: 'div-split',      name: '倍减',      emoji: '➗',  score: 3, rarity: '平庸', check: function(d){for(var i=1;i<d.length;i++){var a=int(d.substring(0,i)),b=int(d.substring(i));if(a>1&&b>0&&a%b===0&&a!==b)return true;}return false;} },
    { id: 'mul-split',      name: '倍增',      emoji: '✖',   score: 3, rarity: '平庸', check: function(d){for(var i=1;i<d.length;i++){var a=int(d.substring(0,i)),b=int(d.substring(i));if(b>1&&a>0&&b%a===0&&a!==b)return true;}return false;} },

    // -- 张三来袭 --
    { id: 'zhang-san',      name: '张三来袭',  emoji: '🔺',  score: 100000, rarity: '罕见', check: function(d){return U.onlyFrom(d, [0,3,6,9]);} },

    // -- 恭喜栗子 --
    { id: 'congrats',       name: '恭喜栗子',  emoji: '🌰',  score: 4, rarity: '平庸', check: function(d){return U.containsAllDigits(d, [4,9,7]);} },

    // -- 连续分层抽样 --
    { id: 'layered-sample', name: '分层抽样',  emoji: '🪜',  score: 5, rarity: '平庸', check: function(d){var n=d.length;if(n<3)return false;var g1=0,g2=0,g3=0;for(var i=0;i<n;i++){var v=+d[i];if(v>=1&&v<=3)g1++;else if(v>=4&&v<=6)g2++;else if(v>=7&&v<=9)g3++;}var third=Math.ceil(n/3);return g1>=third-1&&g2>=third-1&&g3>=third-1;} },

    // -- 顺序/乱序连数拆分 --
    { id: 'consec-2',       name: '顺序二连数',emoji: '⛓️',  score: 100, rarity: '稀有', check: function(d){return U.canSplit2Consec(d,8);} },
    { id: 'consec-3',       name: '顺序三连数',emoji: '⛓️',  score: 1000, rarity: '史诗', check: function(d){return U.canSplit3Consec(d,7);} },
    { id: 'consec-4',       name: '顺序四连数',emoji: '⛓️',  score: 10000, rarity: '传说', check: function(d){return U.canSplit4Consec(d,6);} },
    { id: 'unordered-3',    name: '乱序三连数',emoji: '🔀',  score: 100, rarity: '稀有', check: function(d){return U.canSplit3Unordered(d,7);} },
    { id: 'unordered-4',    name: '乱序四连数',emoji: '🔀',  score: 1000, rarity: '史诗', check: function(d){return U.canSplit4Unordered(d,6);} },

    // -- 相邻连数子串 --
    { id: 'adj-2-consec',   name: '相邻二连数',emoji: '🔗',  score: 11, rarity: '普通', check: function(d){return U.hasAdjacent2Consec(d,8);} },
    { id: 'adj-3-consec',   name: '相邻三连数',emoji: '🔗',  score: 667, rarity: '罕见', check: function(d){return U.hasAdjacent3Consec(d,7);} },
    { id: 'adj-4-consec',   name: '相邻四连数',emoji: '🔗',  score: 10000, rarity: '稀有', check: function(d){return U.hasAdjacent4Consec(d,6);} },
    { id: 'sep-2-consec',   name: '分散二连数',emoji: '🔗',  score: 3, rarity: '平庸', check: function(d){return U.hasSeparate2Consec(d,8);} },

    // -- 邻间 --
    { id: 'nearby',         name: '邻间',      emoji: '↔️',   score: 10000, rarity: '罕见', check: function(d){return U.hasIncreasingRun(d,5)&&Math.abs(+d[1]-+d[0])===2;} },

    // -- 山巅/全链系列补充 --
    { id: 'chain-7',        name: '七数链',    emoji: '🔢',  score: 100000, rarity: '传说', check: function(d){return U.hasIncreasingRun(d,7)||U.hasDecreasingRun(d,7);} },
    { id: 'chain-6',        name: '六数链',    emoji: '🔢',  score: 10000, rarity: '罕见', check: function(d){return U.hasIncreasingRun(d,6)||U.hasDecreasingRun(d,6);} },
    { id: 'chain-5',        name: '五数链',    emoji: '📏',  score: 1000, rarity: '稀有', check: function(d){return U.hasIncreasingRun(d,5)||U.hasDecreasingRun(d,5);} },
    { id: 'scrambled-7',    name: '七乱链',    emoji: '🔀',  score: 118, rarity: '传说', check: function(d){return U.hasScrambledConsecutive(d,7);} },
    { id: 'scrambled-6',    name: '六乱链',    emoji: '🔀',  score: 57, rarity: '稀有', check: function(d){return U.hasScrambledConsecutive(d,6);} },

    // -- 极端和 --
    { id: 'dense',          name: '致密',      emoji: '◉',   score: 4, rarity: '平庸', check: function(d){return U.sumOfDigits(d)>55;} },
    { id: 'heavy',          name: '沉重',      emoji: '🧱',  score: 2, rarity: '平庸', check: function(d){return U.sumOfDigits(d)>45;} },
    { id: 'light-feather',  name: '轻羽',      emoji: '🪶',  score: 2000, rarity: '普通', check: function(d){return U.sumOfDigits(d)<15;} },

    // -- 三七 --
    { id: 'twenty-one',     name: '三七',      emoji: '🌿',  score: 2000, rarity: '普通', check: function(d){return U.sumOfDigits(d)===21;} },

    // ═══════════════════════════════════════════════
    // 二十四、时间/日期徽章
    // ═══════════════════════════════════════════════
    { id: 'clock-hour',     name: '时针',      emoji: '🕛',  score: 91, rarity: '普通', check: function(d){var h=('0'+new Date().getHours()).slice(-2);return d.substring(0,2)===h;} },
    { id: 'clock-minute',   name: '分针',      emoji: '🕛',  score: 167, rarity: '罕见', check: function(d){var m=('0'+new Date().getMinutes()).slice(-2);return d.substring(4,6)===m;} },
    { id: 'clock-second',   name: '秒针',      emoji: '🕛',  score: 77, rarity: '普通', check: function(d){var s=('0'+new Date().getSeconds()).slice(-2);return d.substring(9,11)===s;} },
    { id: 'calendar-year',  name: '年历',      emoji: '📅',  score: 118, rarity: '罕见', check: function(d){var y=(''+new Date().getFullYear()).slice(-2);return d.substring(0,2)===y;} },
    { id: 'calendar-month', name: '月历',      emoji: '📅',  score: 118, rarity: '罕见', check: function(d){var m=('0'+(new Date().getMonth()+1)).slice(-2);return d.substring(2,4)===m;} },
    { id: 'calendar-day',   name: '日历',      emoji: '📅',  score: 91, rarity: '普通', check: function(d){var day=('0'+new Date().getDate()).slice(-2);return d.substring(4,6)===day;} },
    { id: 'perfect-time',   name: '完美时间',  emoji: '⏰',  score: 100000000, rarity: '超越', check: function(d){var now=new Date();var h=('0'+now.getHours()).slice(-2);var m=('0'+now.getMinutes()).slice(-2);var s=('0'+now.getSeconds()).slice(-2);return U.getEffectiveLength(d)===6&&d.substring(5,11)===h+m+s;} },
    { id: 'perfect-date',   name: '完美日期',  emoji: '🗓️',  score: 100000000, rarity: '超越', check: function(d){var now=new Date();var y=(''+now.getFullYear()).slice(-2);var m=('0'+(now.getMonth()+1)).slice(-2);var day=('0'+now.getDate()).slice(-2);return U.getEffectiveLength(d)===6&&d.substring(5,11)===y+m+day;} },

    // ═══════════════════════════════════════════════
    // 二十五、链条拓展徽章
    // ═══════════════════════════════════════════════

    // -- 999 后缀链补全（7~10 个 9） --
    { id: 'suffix-9999999',  name: '千万年好合',emoji:'💫',  score: 10000000, rarity: '神话', check: function(d){return d.endsWith('9999999');} },
    { id: 'suffix-99999999', name: '亿年好合',  emoji:'🌟',  score: 100000000, rarity: '超越', check: function(d){return d.endsWith('99999999');} },
    { id: 'suffix-999999999',name: '十亿年好合',emoji:'✨',  score: 1000000000, rarity: '超越', check: function(d){return d.endsWith('999999999');} },
    { id: 'suffix-9999999999',name:'百亿年好合',emoji:'💎',  score: 10000000000, rarity: '终结', check: function(d){return d.endsWith('9999999999');} },

    // -- 000 后缀链补全（4~11 个 0） --
    { id: 'suffix-0000',    name: '四零结尾',  emoji: '0️⃣',  score: 10000, rarity: '罕见', check: function(d){return d.endsWith('0000');} },
    { id: 'suffix-00000',   name: '五零镇底',  emoji: '0️⃣',  score: 100000, rarity: '稀有', check: function(d){return d.endsWith('00000');} },
    { id: 'suffix-000000',  name: '六零镇地',  emoji: '0️⃣',  score: 1000000, rarity: '史诗', check: function(d){return d.endsWith('000000');} },
    { id: 'suffix-0000000', name: '七零通幽',  emoji: '🌑',  score: 10000000, rarity: '传说', check: function(d){return d.endsWith('0000000');} },
    { id: 'suffix-00000000',name: '八零归虚',  emoji: '🌌',  score: 100000000, rarity: '神话', check: function(d){return d.endsWith('00000000');} },
    { id: 'suffix-000000000',name:'九零空寂',  emoji: '🕳️',  score: 1000000000, rarity: '超越', check: function(d){return d.endsWith('000000000');} },
    { id: 'suffix-0000000000',name:'十零灭度', emoji:'♾️',  score: 10000000000, rarity: '超越', check: function(d){return d.endsWith('0000000000');} },
    { id: 'suffix-00000000000',name:'十一零涅槃',emoji:'☯', score: 100000000000, rarity: '终结', check: function(d){return d=== '00000000000';} },

    // -- 500 后缀链补全（5~8 位） --
    { id: 'suffix-50000',   name: '半十万纪',  emoji: '🗿',  score: 100000, rarity: '史诗', check: function(d){return d.endsWith('50000');} },
    { id: 'suffix-500000',  name: '半百万纪',  emoji: '🗿',  score: 1000000, rarity: '传说', check: function(d){return d.endsWith('500000');} },
    { id: 'suffix-5000000', name: '半千万纪',  emoji: '🗿',  score: 10000000, rarity: '神话', check: function(d){return d.endsWith('5000000');} },
    { id: 'suffix-50000000',name: '半亿纪',    emoji: '🗿',  score: 100000000, rarity: '超越', check: function(d){return d.endsWith('50000000');} },

    // -- 各位和精确值补全（66, 77, 88） --
    { id: 'sum-66',       name: '和为66',   emoji: '➕6️⃣6️⃣', score: 104, rarity: '罕见', check: function(d){return U.sumOfDigits(d)===66;} },
    { id: 'sum-77',       name: '和为77',   emoji: '➕7️⃣7️⃣', score: 17402, rarity: '传说', check: function(d){return U.sumOfDigits(d)===77;} },
    { id: 'sum-88',       name: '和为88',   emoji: '➕8️⃣8️⃣', score: 2083612, rarity: '超越', check: function(d){return U.sumOfDigits(d)===88;} },

    // -- 次方数补全（4, 12, 14~16, 18） --
    { id: 'power-4',      name: '四次方数',  emoji: '📦',  score: 1000000, rarity: '传说', check: function(d){return U.isPowerExponent(d,4);} },
    { id: 'power-12',     name: '十二次方数',emoji: '🎲',  score: 1000000, rarity: '史诗', check: function(d){return U.isPowerExponent(d,12);} },
    { id: 'power-14',     name: '十四次方数',emoji: '💀',  score: 1000000, rarity: '史诗', check: function(d){return U.isPowerExponent(d,14);} },
    { id: 'power-15',     name: '十五次方数',emoji: '🌟',  score: 1000000, rarity: '史诗', check: function(d){return U.isPowerExponent(d,15);} },
    { id: 'power-16',     name: '十六次方数',emoji: '🔮',  score: 1000000, rarity: '史诗', check: function(d){return U.isPowerExponent(d,16);} },
    { id: 'power-18',     name: '十八次方数',emoji: '⚡',  score: 100000000, rarity: '传说', check: function(d){return U.isPowerExponent(d,18);} },

    // -- 打乱连续数补全（5, 8~11） --
    { id: 'scrambled-5',  name: '打乱五连',  emoji: '🔀5️⃣', score: 25, rarity: '罕见', check: function(d){return U.hasScrambledConsecutive(d,5);} },
    { id: 'scrambled-8',  name: '打乱八连',  emoji: '🔀8️⃣', score: 2000, rarity: '史诗', check: function(d){return U.hasScrambledConsecutive(d,8);} },
    { id: 'scrambled-9',  name: '打乱九连',  emoji: '🔀9️⃣', score: 50000, rarity: '传说', check: function(d){return U.hasScrambledConsecutive(d,9);} },
    { id: 'scrambled-10', name: '打乱十连',  emoji: '🔀🔟', score: 100000, rarity: '神话', check: function(d){return U.hasScrambledConsecutive(d,10);} },
    { id: 'scrambled-11', name: '打乱全连',  emoji: '🔀☯', score: 1000000, rarity: '超越', check: function(d){return U.hasScrambledConsecutive(d,11);} },

    // -- 二进制连续1补全（6, 7, 9, 10） --
    { id: 'binary-6-ones', name: '炬火',     emoji: '🔥',  score: 4, rarity: '平庸', check: function(d){return U.binaryConsecutiveOnes(d,6);} },
    { id: 'binary-7-ones', name: '炽焰',     emoji: '🌋',  score: 9, rarity: '平庸', check: function(d){return U.binaryConsecutiveOnes(d,7);} },
    { id: 'binary-9-ones', name: '辉光',     emoji: '☀️',  score: 38, rarity: '普通', check: function(d){return U.binaryConsecutiveOnes(d,9);} },
    { id: 'binary-10-ones',name: '烈阳',     emoji: '🌞',  score: 71, rarity: '普通', check: function(d){return U.binaryConsecutiveOnes(d,10);} },

    ];
})();
