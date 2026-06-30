/**
 * React Native 组件示例
 * 可直接集成到 ColorOS / OPPO 壁纸选择页面
 */

import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const FREE_CATEGORY = '绿野闲行';

function getPriceLabel(categoryName: string): string {
  return categoryName === FREE_CATEGORY ? '免费' : '付费';
}

function PriceBadge({ categoryName }: { categoryName: string }) {
  if (categoryName === FREE_CATEGORY) return null;
  return (
    <View style={[styles.badge, styles.badgePaid]}>
      <Text style={styles.badgeText}>{getPriceLabel(categoryName)}</Text>
    </View>
  );
}

function WallpaperCard({
  wallpaper,
  categoryName,
  onPress,
}: {
  wallpaper: { id: string; thumbnailUrl: string };
  categoryName: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: wallpaper.thumbnailUrl }} style={styles.thumbnail} />
      <PriceBadge categoryName={categoryName} />
    </TouchableOpacity>
  );
}

function CategorySection({
  category,
}: {
  category: {
    id: string;
    name: string;
    count: number;
    wallpapers: { id: string; thumbnailUrl: string }[];
  };
}) {
  return (
    <View style={styles.section}>
      <TouchableOpacity style={styles.sectionHeader}>
        <View style={styles.titleRow}>
          <Text style={styles.categoryName}>{category.name}</Text>
          <Text style={styles.categoryCount}>{category.count}</Text>
        </View>
        <Text style={styles.arrow}>{'>'}</Text>
      </TouchableOpacity>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
        {category.wallpapers.map((wp) => (
          <WallpaperCard key={wp.id} wallpaper={wp} categoryName={category.name} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: 28 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  titleRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6 },
  categoryName: { fontSize: 17, fontWeight: '600', color: '#1a1a1a' },
  categoryCount: { fontSize: 14, color: '#999' },
  arrow: { fontSize: 16, color: '#ccc' },
  scroll: { paddingLeft: 16 },
  card: {
    width: 108,
    height: 192,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 10,
    position: 'relative',
  },
  thumbnail: { width: '100%', height: '100%' },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
  },
  badgeFree: {},
  badgePaid: {},
  badgeText: { fontSize: 10, fontWeight: '500', color: 'rgba(255, 255, 255, 0.95)' },
});

export { PriceBadge, WallpaperCard, CategorySection, getPriceLabel, FREE_CATEGORY };
