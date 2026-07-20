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
    });
})();