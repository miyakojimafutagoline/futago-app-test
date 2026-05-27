// ★ Service Worker（PWA用・最小構成）
// キャッシュはしない（常に最新コードが動くようにするため）
// ホーム画面へのインストールを可能にするだけの最小実装

const CACHE_NAME = 'futago-app-v1';

// インストール時：何もキャッシュしない
self.addEventListener('install', event => {
  self.skipWaiting();
});

// アクティベート時：古いキャッシュを削除
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// フェッチ：常にネットワークから取得（キャッシュを使わない）
// → GitHub Pages にコミットしたらすぐ最新版が動く
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
