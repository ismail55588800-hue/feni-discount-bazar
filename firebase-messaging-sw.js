// ফায়ারবেস কনফিগারেশন
const firebaseConfig = {
  apiKey: "AIzaSyBhusc80KBg7N2xNvxxvT-YCLmb22h8tcM",
  authDomain: "feni-discount-bazar-e12de.firebaseapp.com",
  projectId: "feni-discount-bazar-e12de",
  storageBucket: "feni-discount-bazar-e12de.firebasestorage.app",
  messagingSenderId: "492747097112",
  appId: "1:492747097112:web:cb5ee580283b340f5b6f6d"
};

// ফায়ারবেস SDK ইমপোর্ট
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// ফায়ারবেস ইনিশিয়ালাইজ
firebase.initializeApp(firebaseConfig);

// মেসেজিং অবজেক্ট তৈরি
const messaging = firebase.messaging();

// ব্যাকগ্রাউন্ড মেসেজ হ্যান্ডলার
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] ব্যাকগ্রাউন্ড মেসেজ পেয়েছি:', payload);
  
  const notificationTitle = payload.notification.title || 'নতুন নোটিফিকেশন';
  const notificationOptions = {
    body: payload.notification.body || '',
    icon: '/icon-192x192.png', // আপনার ওয়েবসাইটের আইকনের পাথ
    data: {
      click_action: payload.data?.click_action || '/' // ক্লিক করলে কোথায় যাবে
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// নোটিফিকেশনে ক্লিক করলে কী হবে
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data?.click_action || '/')
  );
});
