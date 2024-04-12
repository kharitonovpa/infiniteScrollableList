<script setup lang="ts">
import {RecycleScroller} from 'vue3-virtual-scroller';
import type {Item, RecycleScrollerMethods} from '~/types/scroller.type';
import 'vue3-virtual-scroller/dist/vue3-virtual-scroller.css';
import Card from '~/components/Card.vue'
import {fetchMockData} from '~/services/mockApi';
import {useQuery} from "@tanstack/vue-query";

const {data, isLoading} = useQuery({
  queryKey: ['mockData'],
  queryFn: fetchMockData
});

const scrollerRef = ref<RecycleScrollerMethods | null>(null);
const sorts = reactive<{
  views?: 'ASC' | 'DESC'
}>({})

const items = computed(() => data.value || []);
const sortedItems = computed<Item[]>(() => {
  if (!sorts.views) {
    return items.value;
  }

  return [...items.value].sort((a, b) => {
    if (sorts.views === 'ASC') {
      return a.views - b.views;
    } else if (sorts.views === 'DESC') {
      return b.views - a.views;
    }
    return 0;
  });
});

function handleScroll() {
  if (!scrollerRef.value) return;

  const scrollerPosition = scrollerRef.value.getScroll();

  if (scrollerPosition?.start) {
    localStorage.setItem('lastScrollerPosition', scrollerPosition.start.toString());
  }
}

function onSort() {
  switch (sorts.views) {
    case undefined:
      sorts.views = 'ASC'
      break
    case 'ASC':
      sorts.views = 'DESC'
      break
    case 'DESC':
      sorts.views = undefined
      break
  }
}

watch(() => [isLoading.value, data.value?.length], () => {
  if (data.value?.length && !isLoading.value) {
    const lastItemIndex = localStorage.getItem('lastScrollerPosition');
    if (lastItemIndex) {
      nextTick(() => {
        if (scrollerRef.value) {
          scrollerRef.value.scrollToPosition(parseInt(lastItemIndex, 10));
        }
      });
    }
  }
})
</script>

<template>
  <div :class="$style.app">
    <div @click="onSort" :class="[$style.sort, sorts.views && $style[sorts.views]]">Sort by views</div>
    <RecycleScroller
        ref="scrollerRef"
        :class="$style.scroller"
        :items="sortedItems"
        :item-size="160"
        :buffer="2000"
        :key-field="'id'"
        :prerender="Math.min(20, sortedItems.length)"
        @scroll="handleScroll"
    >
      <template #default="{ item }">
        <Card :website="item.website" :name="item.name" :avatar="item.avatar" :views="item.views"/>
      </template>
    </RecycleScroller>
  </div>
</template>

<style module lang="scss">
.app {
  height: 100%;
}

.scroller {
  height: 100%;
  overflow-y: auto;
}

.sort {
  position: fixed;
  top: 12px;
  right: 27px;

  background-color: #717070;
  border-radius: 16px;
  height: 32px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  color: #ffffff;

  z-index: 1;

  cursor: pointer;
  transition: opacity 0.2s;
  border: 2px solid #717070;

  &.ASC {
    border-top-color: red;
  }

  &.DESC {
    border-bottom-color: red;
  }

  &:hover {
    opacity: 0.7;
  }
}
</style>