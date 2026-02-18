<script setup>
const mapsUrl = (query) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const baseUrl = import.meta.env.BASE_URL;

const days = [
  {
    date: '2/27',
    weekday: '四',
    title: '抵達日本',
    isPlaceholder: false,
    highlights: [
      {
        text: '成田機場購買「N\'EX 成田特快 14 日來回車票」',
        mapQuery: '成田機場 N\'EX 售票處',
        ticketInfo: true,
      },
      {
        text: '搭乘 N\'EX 直達橫濱站',
        mapQuery: '橫濱站',
      },
      {
        text: '轉地鐵至「關內站」',
        mapQuery: '關內站 橫濱',
      },
    ],
  },
  {
    date: '2/28',
    weekday: '五',
    title: '橫濱活動',
    isPlaceholder: false,
    highlights: [
      { text: '麥當勞 關內北口店', mapQuery: '麥當勞 關內北口店 橫濱' },
      { text: '搭地鐵至櫻木町站', mapQuery: '櫻木町站' },
      { text: '前往橫濱 Pia Arena MM', mapQuery: '橫濱 Pia Arena MM' },
    ],
  },
  {
    date: '3/1',
    weekday: '六',
    title: '橫濱活動',
    isPlaceholder: false,
    highlights: [
      { text: '搭地鐵至櫻木町站', mapQuery: '櫻木町站' },
      { text: '前往橫濱 Pia Arena MM', mapQuery: '橫濱 Pia Arena MM' },
    ],
  },
  {
    date: '3/2',
    weekday: '日',
    title: '橫濱一日遊 (關內/赤色倉庫/橫濱站)',
    isPlaceholder: false,
    highlights: [
      { text: '早餐：Toaster Bread Cafe&Champagne Bar', mapQuery: 'Toaster Bread Cafe&Champagne Bar 橫濱' },
      { text: '前往櫻木町站搭乘 YOKOHAMA AIR CABIN (空中纜車)', mapQuery: 'YOKOHAMA AIR CABIN 櫻木町站' },
      { text: '抵達運河公園站，步行至橫濱赤色倉庫', mapQuery: 'YOKOHAMA AIR CABIN 運河公園站' },
      { text: '午餐：(待定)' },
      { text: '下午：橫濱站周邊百貨公司 (高島屋、SOGO)', mapQuery: '橫濱站' },
      { text: '晚餐：(待定)' },
    ],
  },
  {
    date: '3/3',
    weekday: '一',
    title: '返程',
    isPlaceholder: false,
    highlights: [
      { text: '關內站搭地鐵至橫濱站', mapQuery: '關內站 橫濱' },
      {
        text: '轉乘 N\'EX 成田特快前往成田機場',
        mapQuery: '成田機場',
      },
    ],
  },
];

const ticketGuide = {
  title: 'N\'EX 成田特快 14 日來回車票',
  where: '成田機場第1、第2、第3候機樓的 JR 東日本旅行服務中心或指定席售票機',
  how: '現場購買（出示護照）；亦可於 JR 東日本官網預約後至櫃檯取票。',
  link: 'https://www.jreast.co.jp/nex/',
  linkText: 'JR 東日本 N\'EX 官網',
};

const subwayTicketGuide = {
  title: '地鐵（橫濱站 ⇄ 關內站）',
  where: '橫濱站、關內站站內的自動售票機或站務窗口。橫濱站↔關內站為「橫濱市營地下鐵藍線」（ブルーライン）。',
  how: '於售票機依目的地購入單程票；或使用 IC 卡（Suica、PASMO、ICOCA 等）感應進出站，車資自動扣款。若會多次搭地鐵，可考慮在車站購買或加值 Suica／PASMO。',
  link: 'https://www.city.yokohama.lg.jp/kotsu/subway/',
  linkText: '橫濱市營地下鐵官網',
};

const restaurantOptions = [
  {
    name: '鳥貴族 関内北口店',
    mapQuery: '鳥貴族 関内北口店 橫濱',
    hours: '星期日 16:00～00:00\n星期一 17:00～00:00\n星期二 17:00～00:00\n星期三 17:00～00:00\n星期四 17:00～00:00\n星期五 17:00～00:00\n星期六 16:00～00:00',
  },
  {
    name: '麥當勞 關內北口店',
    mapQuery: '麥當勞 關內北口店 橫濱',
    hours: '24 小時營業',
  },
  {
    name: '吉野家',
    mapQuery: '吉野家 關內 橫濱',
    hours: '24 小時營業',
  },
  {
    name: '迴轉壽司 活美登利 橫濱天空大樓店',
    mapQuery: '活美登利 橫濱天空大樓',
    hours: '週一至週六 11:00～22:30\n週日及國定假日 11:00～22:00',
    transport: '從橫濱站東口經地下街步行約 6-10 分鐘，位於橫濱天空大樓 (Sky Building) 11 樓。',
  },
  {
    name: '壽司 活 JOINUS橫濱店',
    mapQuery: '壽司 活 JOINUS橫濱店',
    hours: '每日 11:00～23:00 (L.O. 22:00)',
    transport: '橫濱站西口直通，位於 JOINUS 購物中心 B2F，步行約 1 分鐘。',
  },
  {
    name: '鰻魚 Roman 橫濱PORTA店',
    mapQuery: '鰻魚 Roman 橫濱PORTA店',
    hours: '每日 11:00～23:00 (L.O. 22:00)',
    transport: '橫濱站東口直達橫濱 PORTA 地下街，步行約 1 分鐘。',
  },
  {
    name: '荒井屋SOGO橫濱店',
    mapQuery: '荒井屋 SOGO 橫濱店',
    hours: '平日：午餐 11:00-15:30 / 晚餐 17:00-23:00\n假日：午餐 11:00-16:00 / 晚餐 17:00-23:00\n(最後點餐 21:00)',
    transport: '橫濱站東口直通，位於 SOGO 橫濱店 10 樓，步行約 4 分鐘。',
  },
  {
    name: 'AFURI 橫濱JOINUS',
    mapQuery: 'AFURI 橫濱JOINUS',
    hours: '每日 11:00～23:00 (L.O. 22:30)',
    transport: '橫濱站西口直通，位於 JOINUS 購物中心 B1F，步行約 3 分鐘。',
  },
];



const souvenirOptions = [
  {
    name: '「橫濱奶油夾心餅乾」（横浜バターサン）',
    note: '橫濱人氣伴手禮餅乾，可在橫濱站、百貨地下街 or 大型土產店找到。',
    image: `${baseUrl}souvenirs/yokohsmamustbuy_IMG_2816.jpg`,
  },
  {
    name: '洋菓子Francais，橫濱法式千層酥',
    note: '色彩繽紛的法式千層酥禮盒，很適合送朋友或帶回公司分送。',
    image: `${baseUrl}souvenirs/yokohsmamustbuy_IMG_2664.jpg`,
  },
  {
    name: '橫濱煉瓦',
    note: '以橫濱紅磚倉庫為靈感的特色伴手禮。',
    image: `${baseUrl}souvenirs/yokohsmamustbuy_IMG_2654.jpg`,
  },
  {
    name: 'ARIAKE 橫濱 HARBOUR',
    note: '橫濱經典船形糕點，有多種口味，是很受歡迎的定番伴手禮。',
    image: `${baseUrl}souvenirs/yokohsmamustbuy_IMG_2665.jpg`,
  },
];

const suicaGuide = {
  title: 'iPhone Suica 開通與使用',
  steps: [
    { title: '新增卡片', desc: '打開「錢包」App → 點擊「+」→ 選擇「交通卡」→ 搜尋「Suica」並依照指示新增。' },
    { title: '儲值方式', desc: '點擊錢包中的 Suica 卡 → 點擊「儲值」→ 輸入金額並使用 Apple Pay (建議使用 VISA/Mastercard) 完成扣款。' },
    { title: '快速交通卡', desc: '在「設定」→「錢包與 Apple Pay」→「快速交通卡」中選擇 Suica，即可免臉部/指紋辨識感應進出站。' },
  ],
  tips: [
    '無需下載專用 App，直接在 Apple 錢包操作最方便。',
    '若原本實體卡轉移至 iPhone，實體卡將作廢。',
    '進出地鐵站僅需將手機頂部靠近讀卡機即可。',
  ],
};
</script>

<template>
  <div class="min-h-screen pb-20">
    <!-- 標題區 -->
    <header class="bg-travel-navy text-white shadow-lg">
      <div class="mx-auto max-w-4xl px-4 py-8 sm:py-10">
        <h1 class="text-2xl font-bold tracking-wide sm:text-3xl md:text-4xl">
          日本橫濱之旅 2/27 - 3/3
        </h1>
        <p class="mt-2 text-travel-sand/90 text-sm sm:text-base">
          成田 ⇄ 橫濱 · 關內 · Pia Arena MM
        </p>
      </div>
    </header>

    <main class="mx-auto max-w-4xl px-4 py-8">
      <!-- 入境日本前：Visit Japan Web -->
      <section class="mb-8 rounded-2xl border-2 border-amber-200 bg-amber-50/80 p-5 shadow-sm sm:p-6">
        <h2 class="mb-3 flex items-center gap-2 text-lg font-semibold text-amber-900">
          <span class="rounded-full bg-amber-200/80 p-1.5">✈️</span>
          入境日本前必做
        </h2>
        <p class="mb-3 text-amber-900/90 text-sm leading-relaxed sm:text-base">
          入境日本時，需事先至 <strong>Visit Japan Web</strong> 網站申請並登錄入境審查、海關申報等資料，抵達機場後可走專用通道，加快通關速度。建議出發前完成登錄並截圖或列印 QR code 備用。
        </p>
        <a href="https://www.vjw.digital.go.jp/" target="_blank" rel="noopener noreferrer"
          class="inline-flex items-center gap-1 rounded-lg bg-amber-600 px-4 py-2 text-white text-sm font-medium transition hover:bg-amber-700">
          前往 Visit Japan Web 官網
          <span class="opacity-80">↗</span>
        </a>
      </section>

      <!-- 車票購買說明區塊 -->
      <section class="mb-10 rounded-2xl bg-white p-5 shadow-md ring-1 ring-gray-200/60 sm:p-6">
        <h2 class="mb-3 flex items-center gap-2 text-lg font-semibold text-travel-navy">
          <span class="rounded-full bg-travel-coral/20 p-1.5 text-travel-coral">🎫</span>
          車票購買方式
        </h2>
        <div class="space-y-4 text-gray-700 text-sm sm:text-base">
          <div class="space-y-2">
            <p><strong>{{ ticketGuide.title }}</strong></p>
            <p><span class="text-gray-500">購買地點：</span>{{ ticketGuide.where }}</p>
            <p><span class="text-gray-500">購買方式：</span>{{ ticketGuide.how }}</p>
            <a :href="ticketGuide.link" target="_blank" rel="noopener noreferrer"
              class="inline-flex items-center gap-1 rounded-lg bg-travel-navy px-4 py-2 text-white text-sm font-medium transition hover:bg-travel-navy/90">
              前往 {{ ticketGuide.linkText }}
              <span class="opacity-80">↗</span>
            </a>
          </div>

          <div class="border-t border-gray-200 pt-4">
            <p class="mb-2"><strong>{{ subwayTicketGuide.title }}</strong></p>
            <p><span class="text-gray-500">購買地點：</span>{{ subwayTicketGuide.where }}</p>
            <p><span class="text-gray-500">購買方式：</span>{{ subwayTicketGuide.how }}</p>
            <a :href="subwayTicketGuide.link" target="_blank" rel="noopener noreferrer"
              class="mt-3 inline-flex items-center gap-1 rounded-lg bg-travel-mint/80 px-4 py-2 text-travel-navy text-sm font-medium transition hover:bg-travel-mint">
              前往 {{ subwayTicketGuide.linkText }}
              <span class="opacity-80">↗</span>
            </a>
          </div>
        </div>
      </section>

      <!-- iPhone Suica 使用說明區塊 -->
      <section
        class="mb-10 rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-200/60 transition-all hover:shadow-lg sm:p-8">
        <h2 class="mb-6 flex items-center gap-3 text-xl font-bold text-travel-navy">
          <span
            class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900/5 text-xl text-gray-900"></span>
          {{ suicaGuide.title }}
        </h2>

        <div class="space-y-3">
          <div v-for="(step, i) in suicaGuide.steps" :key="i"
            class="group flex gap-4 rounded-xl p-2 transition-colors hover:bg-gray-50/80">
            <span
              class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-travel-mint/20 text-sm font-bold text-travel-navy transition-transform group-hover:scale-110">
              {{ i + 1 }}
            </span>
            <div class="text-sm sm:text-base">
              <p class="mb-1 font-bold text-gray-800">{{ step.title }}</p>
              <p class="leading-relaxed text-gray-600">{{ step.desc }}</p>
            </div>
          </div>

          <div class="mt-6 rounded-2xl bg-amber-50/50 p-5 border border-amber-100/50">
            <h3 class="mb-3 text-sm font-bold text-amber-900 flex items-center gap-2">
              <span class="rounded-full bg-amber-200/50 p-1 text-xs">💡</span>
              實用小撇步
            </h3>
            <ul class="space-y-2 text-xs text-amber-800/80 sm:text-sm">
              <li v-for="(tip, i) in suicaGuide.tips" :key="i" class="flex items-start gap-2">
                <span class="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-400"></span>
                <span>{{ tip }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 時間軸 + 卡片 -->
      <div class="relative">
        <!-- 時間軸線（桌面版） -->
        <div
          class="absolute left-6 top-0 bottom-0 hidden w-0.5 bg-travel-mint/40 sm:left-8 md:block md:left-1/2 md:-translate-x-px"
          aria-hidden="true" />

        <ul class="space-y-8 md:space-y-12">
          <li v-for="(day, index) in days" :key="day.date"
            class="relative flex flex-col gap-4 md:flex-row md:items-stretch md:gap-0">
            <!-- 日期節點 -->
            <div class="relative z-10 flex shrink-0 items-center gap-3 md:w-1/2 md:pr-12 md:pt-1 md:text-right">
              <span
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow-md sm:h-14 sm:w-14"
                :class="day.isPlaceholder ? 'bg-gray-400' : 'bg-travel-coral'">
                <span class="text-sm font-bold sm:text-base">{{ day.date }}</span>
              </span>
              <div class="min-w-0 md:flex md:flex-1 md:justify-end">
                <div>
                  <p class="font-semibold text-travel-navy">
                    {{ day.date }} ({{ day.weekday }})
                  </p>
                  <p class="text-gray-600 text-sm">{{ day.title }}</p>
                </div>
              </div>
            </div>

            <!-- 卡片區 -->
            <div class="md:w-1/2 md:pl-12 md:pt-0">
              <article v-if="day.isPlaceholder"
                class="flex min-h-[120px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50/80 py-10 text-gray-500">
                <span class="text-4xl opacity-60">✨</span>
                <p class="mt-2 font-medium">自由探索中...</p>
                <p class="text-sm">行程待定</p>
              </article>

              <article v-else
                class="rounded-2xl bg-white p-5 shadow-md ring-1 ring-gray-200/60 transition hover:shadow-lg sm:p-6">
                <ul class="space-y-4">
                  <li v-for="(item, i) in day.highlights" :key="i" class="flex flex-wrap items-start gap-2 gap-y-1">
                    <span class="flex-1 text-gray-800">{{ item.text }}</span>
                    <a v-if="item.mapQuery" :href="mapsUrl(item.mapQuery)" target="_blank" rel="noopener noreferrer"
                      class="inline-flex shrink-0 items-center gap-1 rounded-full bg-travel-mint/20 px-3 py-1.5 text-travel-navy text-xs font-medium transition hover:bg-travel-mint/40">
                      <span aria-hidden="true">📍</span>
                      地圖
                    </a>
                    <!-- 車票說明僅在 2/27 第一項顯示 -->
                    <div v-if="item.ticketInfo"
                      class="mt-2 w-full rounded-lg bg-amber-50 px-3 py-2 text-amber-900 text-xs">
                      💡 櫃檯位於入境大廳；建議抵達後先購票再出關逛街。
                    </div>
                  </li>
                </ul>
              </article>
            </div>
          </li>
        </ul>
      </div>

      <!-- HanaCell SIM 開通方式 -->
      <section class="mt-12 rounded-2xl bg-white p-5 shadow-md ring-1 ring-gray-200/60 sm:p-6">
        <h2 class="mb-3 flex items-center gap-2 text-lg font-semibold text-travel-navy">
          <span class="rounded-full bg-travel-mint/40 p-1.5 text-travel-navy">📱</span>
          HanaCell SIM 卡開通方式
        </h2>
        <ol class="mb-4 list-inside list-decimal space-y-2 text-gray-700 text-sm leading-relaxed sm:text-base">
          <li>將 HanaCell SIM 卡插入手機（若為 eSIM 則在出發前依說明完成下載與安裝）。</li>
          <li>抵達日本後，<strong>先連接機場或住宿的 Wi‑Fi</strong>（開通需上網）。</li>
          <li>開啟瀏覽器前往 HanaCell 開通頁面，或掃描 SIM 卡包裝上的 QR code。</li>
          <li>依網頁指示輸入 SIM 卡號（ICCID）等資料，完成開通申請。</li>
          <li>開通後將手機重新開機或切換飛航模式再關閉，等待訊號出現即可使用。</li>
        </ol>
        <p class="mb-3 text-gray-500 text-xs sm:text-sm">
          ※ 詳細步驟依您購買的方案與包裝說明為準；遇問題可參考官網 FAQ 或聯繫客服。
        </p>
        <a href="https://www.hanacell.com/" target="_blank" rel="noopener noreferrer"
          class="inline-flex items-center gap-1 rounded-lg bg-travel-mint px-4 py-2 text-travel-navy text-sm font-medium transition hover:bg-travel-mint/80">
          前往 HanaCell 官網
          <span class="opacity-80">↗</span>
        </a>
      </section>



      <!-- 餐廳備選項目 -->
      <section class="mt-12 rounded-2xl bg-white p-5 shadow-md ring-1 ring-gray-200/60 sm:p-6">
        <h2 class="mb-4 flex items-center gap-2 text-lg font-semibold text-travel-navy">
          <span class="rounded-full bg-travel-coral/20 p-1.5 text-travel-coral">🍽️</span>
          餐廳備選項目
        </h2>
        <ul class="space-y-3">
          <li v-for="(restaurant, i) in restaurantOptions" :key="i"
            class="flex flex-wrap items-center gap-2 rounded-lg border border-gray-200/80 bg-gray-50/50 px-4 py-3">
            <div class="min-w-0 flex-1">
              <span class="font-medium text-gray-800">{{ restaurant.name }}</span>
              <p v-if="restaurant.hours" class="mt-1 whitespace-pre-line text-gray-500 text-sm">
                🕐 {{ restaurant.hours }}
              </p>
              <p v-if="restaurant.transport" class="mt-1 text-gray-800/80 text-xs sm:text-sm">
                🚃 {{ restaurant.transport }}
              </p>
            </div>
            <a :href="mapsUrl(restaurant.mapQuery)" target="_blank" rel="noopener noreferrer"
              class="inline-flex shrink-0 items-center gap-1 rounded-full bg-travel-mint/20 px-3 py-1.5 text-travel-navy text-xs font-medium transition hover:bg-travel-mint/40">
              <span aria-hidden="true">📍</span>
              地圖
            </a>
          </li>
        </ul>
      </section>

      <!-- 伴手禮備選項目 -->
      <section class="mt-10 rounded-2xl bg-white p-5 shadow-md ring-1 ring-gray-200/60 sm:p-6">
        <h2 class="mb-4 flex items-center gap-2 text-lg font-semibold text-travel-navy">
          <span class="rounded-full bg-travel-mint/30 p-1.5 text-travel-navy">🎁</span>
          伴手禮備選項目
        </h2>
        <ul class="space-y-3">
          <li v-for="(souvenir, i) in souvenirOptions" :key="i"
            class="flex flex-col gap-3 rounded-lg border border-gray-200/80 bg-gray-50/50 px-4 py-3 sm:flex-row sm:items-center">
            <div class="min-w-0 flex-1">
              <p class="font-medium text-gray-800">
                {{ souvenir.name }}
              </p>
              <p v-if="souvenir.note" class="mt-1 text-gray-600 text-sm">
                {{ souvenir.note }}
              </p>
            </div>
            <div class="flex shrink-0 flex-col items-end gap-2">
              <div v-if="souvenir.image" class="shrink-0">
                <img :src="souvenir.image" :alt="souvenir.name"
                  class="h-28 w-28 rounded-xl object-cover shadow-sm ring-1 ring-gray-200/80 sm:h-32 sm:w-32" />
              </div>
              <a :href="`https://www.google.com/search?q=${encodeURIComponent(souvenir.name + ' 橫濱')}`" target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 rounded-full bg-travel-coral/20 px-3 py-1.5 text-travel-navy text-xs font-medium transition hover:bg-travel-coral/40">
                <span aria-hidden="true">🔍</span>
                搜尋
              </a>
            </div>
          </li>
        </ul>
      </section>
    </main>

    <footer class="border-t border-gray-200/60 bg-white/80 py-4 text-center text-gray-500 text-sm">
      日本橫濱之旅 · 2/27 - 3/3
    </footer>
  </div>
</template>
