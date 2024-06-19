/**
 * @file
 * Defines Javascript behaviors for the cookies module.
 */
(function ($) {
   'use strict';
 
   function mayrlife_cookies_is_event_in_data_layer(eventname) {
     if (window.dataLayer) {
       for (const i in window.dataLayer) {
         if (window.dataLayer[i].hasOwnProperty('event') && window.dataLayer[i].event === eventname) {
           return true;
         }
       }
     }
   }
 
   function mayrlife_cookies_has_consent() {
     if (window.dataLayer) {
       for (const i in window.dataLayer) {
         if (window.dataLayer[i][0] &&
           window.dataLayer[i][0] === "consent" &&
           window.dataLayer[i][1] &&
           window.dataLayer[i][1] === "update"
         ) {
           return true;
         }
       }
     }
   }
 
   document.addEventListener('cookiesjsrUserConsent', function (event) {
     window.dataLayer = window.dataLayer || [];
 
     var services = (typeof event.detail.services === 'object') ? event.detail.services : {};
     var consent_update_data = [];
 
     for (var sid in services) {
       if (services[sid] === true) {
 
         if (sid === 'facebook_pixel') {
           if (!mayrlife_cookies_is_event_in_data_layer('borlabsCookieOptInFacebookPixel')) {
             window.dataLayer.push({
               event: 'borlabsCookieOptInFacebookPixel',
               borlabsFBPixelConsent: true
             });
           }
         }
 
         if (sid === 'google_analytics') {
           if (!mayrlife_cookies_is_event_in_data_layer('borlabsCookieOptInGoogleAnalytics')) {
             window.dataLayer.push({
               event: 'borlabsCookieOptInGoogleAnalytics',
               borlabsGoogleAnalyticsConsent: true
             });
           }
         }
 
         if (sid === 'piwik_pro') {
           if (!mayrlife_cookies_is_event_in_data_layer('borlabsCookieOptInPiwikPro')) {
             window.dataLayer.push({
               event: 'borlabsCookieOptInPiwikPro',
               borlabsPiwikProConsent: true
             });
           }
         }
 
         if (sid === 'analytics_storage') {
           consent_update_data.push(sid);
         }
 
         if (sid === 'ad_user_data') {
           consent_update_data.push(sid);
         }
 
         if (sid === 'ad_storage') {
           consent_update_data.push(sid);
         }
 
         if (sid === 'ad_personalization') {
           consent_update_data.push(sid);
         }
       }
     }
 
     if (!mayrlife_cookies_has_consent() && consent_update_data.length > 0) {
       var consent_update_data_push = {};
 
       for (var service_to_enable in consent_update_data) {
         consent_update_data_push[consent_update_data[service_to_enable]] = 'granted';
       }
 
       gtag('consent', 'update', consent_update_data_push);
     }
 
   });
 
 })($);
