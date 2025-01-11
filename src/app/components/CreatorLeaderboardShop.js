"use client"

import React from 'react';
import { Star, Users, ShoppingBag, TrendingUp, Crown } from 'lucide-react';
import styles from '../shop/StyleShop.module.css';

export default function CreatorLeaderboard() {
  return (
    <section className={styles.leaderboardSection}>
      <div className={styles.leaderboard}>
        <div className={styles.leaderboardHeader}>
          <div className={styles.headerTop}>
            <div>
              <div className={styles.levelTitle}>Creator Level: Accomplished</div>
              <div className={styles.streak}>Daily Streak: 15 days 🔥</div>
            </div>
            <div className={styles.leagueRank}>
              <div>League Rank: #28</div>
              <div className={styles.streak}>Weekly Points: 2450</div>
            </div>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progress}></div>
          </div>
          <div className={styles.xpText}>
            <span>7580 XP</span>
            <span>10000 XP</span>
          </div>
        </div>

        <div className={styles.badges}>
          <h2 className={styles.leaderboardSectionTitle}>Earned Badges</h2>
          <div className={styles.badgesGrid}>
            <div className={styles.badge}>
              <Star className={styles.badgeIcon} />
              <span className={styles.badgeName}>Early Creator</span>
            </div>
            <div className={styles.badge}>
              <Users className={styles.badgeIcon} />
              <span className={styles.badgeName}>10k Club</span>
            </div>
            <div className={styles.badge}>
              <ShoppingBag className={styles.badgeIcon} />
              <span className={styles.badgeName}>Sales Pro</span>
            </div>
            <div className={styles.badge}>
              <TrendingUp className={styles.badgeIcon} />
              <span className={styles.badgeName}>Trend setter</span>
            </div>
          </div>
        </div>

        <div className={styles.rankProgression}>
          <h2 className={styles.leaderboardSectionTitle}>Rank Progression</h2>
          <div className={styles.rankItem}>
            <div className={styles.rankName}>
              <Crown className={styles.crownIcon} />
              Rookie
            </div>
            <div className={styles.xpValue}>1,000 XP</div>
          </div>
          <div className={styles.rankItem}>
            <div className={styles.rankName}>
              <Crown className={styles.crownIcon} />
              Challenger
            </div>
            <div className={styles.xpValue}>2,500 XP</div>
          </div>
          <div className={styles.rankItem}>
            <div className={styles.rankName}>
              <Crown className={styles.crownIcon} />
              Proven
            </div>
            <div className={styles.xpValue}>5,000 XP</div>
          </div>
        </div>
      </div>
    </section>
  );
}

