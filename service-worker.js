// このJANスキャンページを「ホーム画面に追加」できるようにするための、最小限のService Workerです。
// オフラインでの動作を保証するものではありません（カメラ認識と商品検索には通信が必要です）。
// 通常は「ネットワークにそのままアクセスする」だけの、素通しの動きをします。

self.addEventListener('install', function (event) {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    fetch(event.request).catch(function () {
      // 通信に失敗した場合でも、可能な範囲でキャッシュから返す（無ければ通常のエラーになる）
      return caches.match(event.request);
    })
  );
});
