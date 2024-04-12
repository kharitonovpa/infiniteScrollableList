<script setup lang="ts">
defineProps<{
  avatar: string
  name: string
  website: string
  views: number
}>()
</script>

<template>
  <div :class="$style.card">
    <img :src="avatar" :alt="`Avatar of ${name}`" loading="lazy" :class="$style.avatar"/>
    <h4 :class="$style.name">{{ name }}</h4>
    <div :class="$style.website">
      <p>Website:</p>
      <a target="_blank" :href="website" :class="$style.link">{{ website }}</a>
    </div>
    <div :class="$style.views">
      {{ views.toLocaleString('ru-RU') }} 👁️
    </div>
  </div>
</template>

<style module lang="scss">
.card {
  min-height: 160px;
  box-sizing: border-box;
  display: grid;
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  border-radius: 16px;
  background: #ffffff;
  padding: 16px;
  border: 1px solid rgba(0, 0, 0, 0.08);


  grid-auto-columns: 1fr;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 64px auto;
  gap: 4px 6px;
  grid-template-areas:
    "avatar website views"
    "name website views";
}

p {
  margin-bottom: 12px;
}

.views {
  grid-area: views;
}

.name {
  justify-self: center;
  text-align: center;
  grid-area: name;
}

.website {
  grid-area: website;
  align-self: end;
}

.avatar {
  border-radius: 50%;
  object-fit: cover;
  height: 64px;
  width: 64px;
  justify-self: center;
  align-self: center;
  grid-area: avatar;
}

.link {
  color: #000000;
  font-size: 14px;
}

.views {
  font-size: 14px;
}

h4 {
  margin: 0;
  align-self: end;
}
</style>