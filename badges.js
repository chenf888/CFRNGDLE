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
