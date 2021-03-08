<template>
  <div
    class="hitokoto"
    :style="{
      backgroundImage: `url(${backgroundImageUrl})`,
    }"
  >
    <template v-if="[STATES.ERROR, STATES.STALE_IF_ERROR].includes(state)">
      {{ error }}
    </template>
    <template v-if="[STATES.PENDING].includes(state)">Loading...</template>
    <template v-if="[STATES.VALIDATING].includes(state)">
      <!-- serve stale content without "loading" -->
    </template>
    <template v-if="[STATES.SUCCESS, STATES.VALIDATING, STATES.STALE_IF_ERROR].includes(state)">
      <p>{{ data.hitokoto }}</p>
      <p v-if="data.from">{{ "  —— " + data.from }}</p>
    </template>
  </div>
</template>

<script>
  import useSWRV from "swrv";
  import api from "@api";
  import useSwrvState from "@compositions/useSwrvState";
  import { computed, watch } from "vue";

  export default {
    name: `Hitokoto`,
    setup() {
      const { data, error, isValidating } = useSWRV(`hitokoto`, api.hitokoto.random);
      const { state, STATES } = useSwrvState(data, error, isValidating);
      watch(data, ({ hitokoto: newValue = `` } = {}, { hitokoto: oldValue = `` } = {}) => {
        console.log(`<${oldValue}> => <${newValue}>`);
      });
      const { data: bgs } = useSWRV(`konachan`, () => api.konachan.list(Math.ceil(Math.random() * 500)));
      const backgroundImageUrl = computed(() => {
        const bs = (bgs.value || []).filter((it) => [`s`].includes(it.rating));
        if (bs.length > 0) return bs[Math.floor(Math.random() * bs.length)].sample_url;
        return undefined;
      });
      return {
        state,
        STATES,
        data,
        bgs,
        backgroundImageUrl,
      };
    },
  };
</script>

<style lang="scss">
  .hitokoto {
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.24);
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 64px;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    font-size: 36px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    p {
      &:first-child {
        text-align: justify;
      }
      &:last-child {
        margin-top: 8px;
        font-size: 32px;
        text-align: right;
      }
    }
  }
</style>
