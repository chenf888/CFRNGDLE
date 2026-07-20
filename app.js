// app.js – 主应用逻辑（数字生成、揭示、按钮交互）
(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {

        // ---------- 检查必要元素 ----------
        const container = document.getElementById('digitsContainer');
        if (!container) {
            console.error('Error: Required element #digitsContainer not found in DOM.');
            return;
        }
        const btn = document.getElementById('generateBtn');
        if (!btn) {
            console.error('Error: Required element #generateBtn not found.');
            return;
        }
        const card = document.getElementById('numberCard');
        if (!card) {
            console.error('Error: Required element #numberCard not found.');
            return;
        }
        const badgeList = document.getElementById('badgeList');
        const currentScoreSpan = document.getElementById('currentScore');
        const totalScoreSpan = document.getElementById('totalScore');
        const rollCountSpan = document.getElementById('rollCount');
        const bestRollNumSpan = document.getElementById('bestRollNum');
        const bestRollTPSpan = document.getElementById('bestRollTP');
        const bestRollBox = document.getElementById('bestRollBox');
        if (window.Badges && typeof window.Badges.initBadgeUI === 'function') {
            window.Badges.initBadgeUI(badgeList, totalScoreSpan, currentScoreSpan, rollCountSpan, bestRollNumSpan, bestRollTPSpan, bestRollBox);
        } else {
            console.warn('Badges module not loaded properly.');
        }

        const TOTAL_DIGITS = 11;

        // ---------- 创建数字占位 ----------
        let digitEls = createDigitSpans(TOTAL_DIGITS);
        let isGenerating = false;

        function createDigitSpans(count) {
            const frag = document.createDocumentFragment();
            for (let i = 0; i < count; i++) {
                const span = document.createElement('span');
                span.className = 'digit';
                span.textContent = '?';
                span.dataset.index = i;
                frag.appendChild(span);
            }
            container.appendChild(frag);
            return container.querySelectorAll('.digit');
        }

        function generateRandom10Digit() {
            let result = '';
            for (let i = 0; i < TOTAL_DIGITS; i++) {
                result += Math.floor(Math.random() * 10);
            }
            return result;
        }

        function resetDigits() {
            digitEls.forEach(el => {
                el.textContent = '?';
                el.className = 'digit';
            });
            card.classList.remove('number-card--glow');
            card.style.borderColor = '';
        }

        // ---------- 逐位揭示 ----------
        function revealNumber(numberStr) {
            return new Promise((resolve) => {
                const digits = numberStr.split('');
                const total = digits.length;
                let revealedCount = 0;

                const leadingZeroMask = new Array(total).fill(false);
                let foundNonZero = false;
                for (let i = 0; i < total - 1; i++) {
                    if (digits[i] === '0' && !foundNonZero) {
                        leadingZeroMask[i] = true;
                    } else {
                        foundNonZero = true;
                    }
                }

                digitEls.forEach(el => {
                    el.textContent = '·';
                    el.className = 'digit';
                });

                function revealNext() {
                    if (revealedCount >= total) { resolve(); return; }

                    const index = total - 1 - revealedCount;
                    const finalChar = digits[index];
                    const el = digitEls[index];
                    const isLeadingZero = leadingZeroMask[index];

                    let flickerCount = 0;
                    const MAX_FLICKER = 10;
                    const flickerInterval = setInterval(() => {
                        const randomDigit = Math.floor(Math.random() * 10);
                        el.textContent = randomDigit;
                        el.className = 'digit digit--active';
                        flickerCount++;
                        if (flickerCount >= MAX_FLICKER) {
                            clearInterval(flickerInterval);
                            el.textContent = finalChar;
                            if (isLeadingZero) {
                                el.className = 'digit digit--leading-zero';
                                el.style.transform = 'scale(0.92)';
                                setTimeout(() => { el.style.transform = 'scale(0.92)'; }, 10);
                            } else {
                                el.className = 'digit digit--revealed';
                                el.style.transform = 'scale(1.25)';
                                setTimeout(() => { el.style.transform = 'scale(1)'; }, 140);
                            }

                            revealedCount++;

                            if (!isLeadingZero || revealedCount === 1) {
                                card.classList.add('number-card--glow');
                                clearTimeout(card._borderTimer);
                                card._borderTimer = setTimeout(() => {
                                    card.classList.remove('number-card--glow');
                                }, 400);
                            }

                            setTimeout(revealNext, 100);
                        }
                    }, 50);
                }

                revealNext();
            });
        }

        // ---------- 主流程 ----------
        async function handleGenerate() {
            if (isGenerating) return;

            isGenerating = true;
            btn.disabled = true;
            btn.classList.add('is-loading');

            resetDigits();
            await new Promise(resolve => setTimeout(resolve, 200));

            const numStr = generateRandom10Digit();
            await revealNumber(numStr);

            // 调用徽章检查
            if (window.Badges && typeof window.Badges.checkAndAwardBadges === 'function') {
                window.Badges.checkAndAwardBadges(numStr);
            } else {
                console.warn('Badges module not available');
            }

            btn.disabled = false;
            btn.classList.remove('is-loading');
            isGenerating = false;

            try { if (navigator.vibrate) navigator.vibrate(12); } catch(e) {}
        }

        // ---------- 事件绑定 ----------
        btn.addEventListener('click', handleGenerate);
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleGenerate();
            }
        });

        // 初始加载后自动生成一次
        resetDigits();
        setTimeout(handleGenerate, 1000);

        // ========== 主题切换 ==========
        (function initTheme() {
            var STORAGE_KEY = 'cfrngdle_theme';
            var saved = localStorage.getItem(STORAGE_KEY) || 'dark';
            document.documentElement.setAttribute('data-theme', saved);
            var themeToggle = document.getElementById('themeToggle');
            if (themeToggle) {
                themeToggle.addEventListener('click', function() {
                    var current = document.documentElement.getAttribute('data-theme');
                    var next = current === 'light' ? 'dark' : 'light';
                    document.documentElement.setAttribute('data-theme', next);
                    localStorage.setItem(STORAGE_KEY, next);
                });
            }
        })();

        // ========== 重置按钮 ==========
        (function initReset() {
            var resetBtn = document.getElementById('resetBtn');
            if (!resetBtn) return;
            resetBtn.addEventListener('click', function() {
                if (!confirm('确定要清除所有本地数据吗？此操作不可撤销。')) return;
                if (window.Badges && typeof window.Badges.resetBadges === 'function') {
                    window.Badges.resetBadges();
                }
                resetDigits();
                card.classList.remove('number-card--glow');
                card.style.borderColor = '';
            });
        })();

        // ========== 自动随机按钮 ==========
        (function initAuto() {
            var autoBtn = document.getElementById('autoBtn');
            if (!autoBtn) return;
            var autoRunning = false;
            var autoTimer = null;
            var AUTO_INTERVAL = 3000; // 3 秒

            autoBtn.addEventListener('click', function() {
                if (autoRunning) {
                    // 停止
                    autoRunning = false;
                    autoBtn.classList.remove('is-running');
                    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
                } else {
                    // 启动
                    autoRunning = true;
                    autoBtn.classList.add('is-running');
                    // 立刻执行一次
                    if (!isGenerating) handleGenerate();
                    autoTimer = setInterval(function() {
                        if (!isGenerating) handleGenerate();
                    }, AUTO_INTERVAL);
                }
            });
        })();

        // ========== 分享按钮 ==========
        (function initShare() {
            var shareBtn = document.getElementById('shareBtn');
            if (!shareBtn) return;

            var RARITY_EMOJI = {
                '终结': '\uD83D\uDFE5',   // 🟥
                '超越': '\uD83D\uDD35',   // 🔵
                '神话': '\uD83D\uDFE2',   // 🟢
                '传说': '🩷',             // 🩷
                '史诗': '\uD83D\uDFE8',   // 🟨
                '稀有': '\uD83D\uDFE3',   // 🟣
                '罕见': '\uD83D\uDFE6',   // 🟦
                '普通': '\uD83D\uDFE9',   // 🟩
                '平庸': '\u2B1C'          // ⬜
            };

            var RARITY_ORDER = ['终结','超越','神话','传说','史诗','稀有','罕见','普通','平庸'];

            function rarityRank(r) {
                var idx = RARITY_ORDER.indexOf(r);
                return idx === -1 ? RARITY_ORDER.length : idx;
            }

            function buildShareText() {
                var num = window.Badges && window.Badges.getCurrentNumberStr ? window.Badges.getCurrentNumberStr() : '';
                var tp = window.Badges && window.Badges.getCurrentTP ? window.Badges.getCurrentTP() : 0;
                var badges = window.Badges && window.Badges.getCurrentActiveBadges ? window.Badges.getCurrentActiveBadges().slice() : [];

                // 按稀有度排序（最稀有在前）
                badges.sort(function(a, b) { return rarityRank(a.rarity) - rarityRank(b.rarity); });

                var top4 = badges.slice(0, 4);
                var more = Math.max(0, badges.length - 4);

                var lines = [];
                lines.push('CFRNGDLE');
                lines.push('\uD83C\uDFB2' + num);  // 🎲 + number
                lines.push('');

                for (var i = 0; i < top4.length; i++) {
                    var b = top4[i];
                    var emoji = RARITY_EMOJI[b.rarity] || '⬜';
                    lines.push(emoji + ' ' + b.emoji + ' ' + b.name);
                }

                if (more > 0) {
                    lines.push('+' + more + ' more');
                }

                lines.push('');
                lines.push(tp.toLocaleString() + ' TP');
                lines.push('https://chenf888.github.io/CFRNGDLE/');

                return lines.join('\n');
            }

            var copiedTimer = null;

            shareBtn.addEventListener('click', function() {
                if (shareBtn.classList.contains('is-copied')) return;

                var text = buildShareText();

                // 复制到剪贴板
                var copied = false;
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(text).then(function() {
                        copied = true;
                        showSuccess();
                    }).catch(function() {
                        fallbackCopy(text);
                    });
                } else {
                    fallbackCopy(text);
                }

                function fallbackCopy(t) {
                    var ta = document.createElement('textarea');
                    ta.value = t;
                    ta.style.position = 'fixed';
                    ta.style.opacity = '0';
                    document.body.appendChild(ta);
                    ta.select();
                    try {
                        document.execCommand('copy');
                        copied = true;
                    } catch(e) {}
                    document.body.removeChild(ta);
                    if (copied) showSuccess();
                }

                function showSuccess() {
                    shareBtn.classList.add('is-copied');
                    // Toast 提示
                    var toast = document.getElementById('toast');
                    if (toast) {
                        toast.classList.add('toast--show');
                        setTimeout(function() { toast.classList.remove('toast--show'); }, 1800);
                    }
                    if (copiedTimer) clearTimeout(copiedTimer);
                    copiedTimer = setTimeout(function() {
                        shareBtn.classList.remove('is-copied');
                    }, 2000);
                }
            });
        })();
    });
})();