// badges.js – 徽章管理模块（v3 — 稀有度排序 + 分页 + 新徽章置顶）
(function() {
    'use strict';

    // ---------- 稀有度排序（稀有→普通） ----------
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

    // ---------- localStorage ----------
    function saveToStorage() {
        try {
            var data = {
                earnedBadges: earnedBadges,
                totalTP: totalTP
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch(e) {
            // 静默失败（存储满等）
        }
    }

    function loadFromStorage() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            var data = JSON.parse(raw);
            if (data.earnedBadges && Array.isArray(data.earnedBadges)) {
                earnedBadges = data.earnedBadges;
            }
            if (typeof data.totalTP === 'number') {
                totalTP = data.totalTP;
            }
        } catch(e) {
            earnedBadges = [];
            totalTP = 0;
        }
    }

    // ---------- DOM 引用 ----------
    var badgeListEl = null;
    var totalScoreSpan = null;
    var currentScoreSpan = null;

    // ---------- 创建单个徽章 pill ----------
    function createBadgePill(badge, isActive, isNew) {
        if (!badge) return document.createTextNode('');
        var pill = document.createElement('span');
        var activeClass = isActive ? '' : 'badge-pill--inactive';
        var rarityClass = 'badge-pill--' + badge.rarity;
        pill.className = 'badge-pill ' + rarityClass + ' ' + activeClass;
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

    // ---------- 创建分隔线 ----------
    function createSeparator(label) {
        var sep = document.createElement('div');
        sep.className = 'badge-separator';
        sep.innerHTML = '<span><span class="badge-separator__line"></span>' +
            '<span class="badge-separator__label">' + label + '</span>' +
            '<span class="badge-separator__line"></span></span>';
        return sep;
    }

    // ---------- 创建加载更多按钮 ----------
    function createLoadMoreButton(visibleCount, totalCount) {
        var container = document.createElement('div');
        container.className = 'badge-load-more';
        var remaining = Math.max(0, totalCount - DISPLAY_LIMIT);
        var btn = document.createElement('button');
        btn.className = 'badge-load-more__btn';
        btn.textContent = showAllBadges ?
            '收起' :
            (remaining > 0 ? '加载更多（还剩 ' + remaining + ' 个徽章）' : '收起');

        btn.addEventListener('click', function() {
            showAllBadges = !showAllBadges;
            updateBadgeUI();
        });

        container.appendChild(btn);
        return container;
    }

    // ---------- 初始化 ----------
    function initBadgeUI(badgeListElement, totalScoreElement, currentScoreElement) {
        badgeListEl = badgeListElement;
        totalScoreSpan = totalScoreElement;
        currentScoreSpan = currentScoreElement || null;
        loadFromStorage();
        updateBadgeUI();
    }

    // ---------- 更新 UI ----------
    function updateBadgeUI() {
        if (!badgeListEl || !totalScoreSpan) return;
        totalScoreSpan.textContent = totalTP;
        if (currentScoreSpan) {
            currentScoreSpan.textContent = currentTP;
        }
        badgeListEl.innerHTML = '';

        var defs = window.BadgeDefs || [];
        var hasCurrentNumber = currentNumberStr && currentNumberStr.length > 0;

        // 按稀有度排序
        var sorted = earnedBadges.slice().sort(function(a, b) {
            return rarityRank(a.rarity) - rarityRank(b.rarity);
        });

        // 分离本轮新获得和旧徽章
        var newBadges = [];
        var oldBadges = [];
        sorted.forEach(function(badge) {
            if (newBadgeIds.hasOwnProperty(badge.id)) {
                newBadges.push(badge);
            } else {
                oldBadges.push(badge);
            }
        });

        function isActiveBadge(badge) {
            if (!hasCurrentNumber) return false;
            var def = null;
            for (var i = 0; i < defs.length; i++) {
                if (defs[i].id === badge.id) { def = defs[i]; break; }
            }
            if (!def) return false;
            try { return def.check(currentNumberStr); } catch(e) { return false; }
        }

        var showAll = showAllBadges;
        var newLimit = Math.min(newBadges.length, DISPLAY_LIMIT);
        var oldLimit = showAll ? oldBadges.length : Math.min(oldBadges.length, Math.max(0, DISPLAY_LIMIT - newLimit));

        // ---- 渲染新徽章区域 ----
        if (newBadges.length > 0) {
            badgeListEl.appendChild(createSeparator('\u2728 \u65b0\u83b7\u5f97'));
            for (var ni = 0; ni < newLimit; ni++) {
                badgeListEl.appendChild(
                    createBadgePill(newBadges[ni], isActiveBadge(newBadges[ni]), true)
                );
            }
            if (!showAll && newBadges.length > newLimit) {
                var nExtra = document.createElement('span');
                nExtra.className = 'badge-more-hint';
                nExtra.textContent = '\u2026\u8fd8\u6709 ' + (newBadges.length - newLimit) + ' \u4e2a\u65b0\u5fbd\u7ae0';
                badgeListEl.appendChild(nExtra);
            }
        }

        // ---- 分隔 ----
        if (newBadges.length > 0 && oldBadges.length > 0) {
            badgeListEl.appendChild(createSeparator('\u5df2\u6536\u96c6'));
        }

        // ---- 渲染旧徽章 ----
        for (var oi = 0; oi < oldLimit; oi++) {
            badgeListEl.appendChild(
                createBadgePill(oldBadges[oi], isActiveBadge(oldBadges[oi]), false)
            );
        }

        // ---- 加载更多按钮 ----
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
        var newlyEarnedIds = [];

        var defs = window.BadgeDefs || [];

        for (var i = 0; i < defs.length; i++) {
            var def = defs[i];
            var matched = false;
            try { matched = def.check(numberStr); } catch(e) {}

            if (matched) {
                currentTP += def.score;

                var existing = null;
                for (var j = 0; j < earnedBadges.length; j++) {
                    if (earnedBadges[j].id === def.id) { existing = earnedBadges[j]; break; }
                }

                if (existing) {
                    existing.count += 1;
                    totalTP += def.score;
                } else {
                    earnedBadges.push({
                        id: def.id, name: def.name, emoji: def.emoji,
                        score: def.score, rarity: def.rarity, count: 1
                    });
                    totalTP += def.score;
                    newlyEarnedIds.push(def.id);
                }
            }
        }

        for (var k = 0; k < newlyEarnedIds.length; k++) {
            newBadgeIds[newlyEarnedIds[k]] = true;
        }

        updateBadgeUI();
        saveToStorage();
    }

    // ---------- 重置 ----------
    function resetBadges() {
        earnedBadges = [];
        totalTP = 0;
        currentTP = 0;
        currentNumberStr = '';
        newBadgeIds = {};
        showAllBadges = false;
        saveToStorage();
        updateBadgeUI();
    }

    // ---------- 暴露接口 ----------
    window.Badges = {
        initBadgeUI: initBadgeUI,
        checkAndAwardBadges: checkAndAwardBadges,
        resetBadges: resetBadges,
        getEarnedBadges: function() { return earnedBadges.slice(); },
        getTotalTP: function() { return totalTP; },
        getCurrentTP: function() { return currentTP; }
    };
})();
