package com.interligadahits.interligadaHitsApp

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.Build
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule

class RadioServiceModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private var toggleReceiver: BroadcastReceiver? = null

    override fun getName() = "RadioServiceModule"

    // Registra listener para receber eventos de toggle da notificação
    @ReactMethod
    fun addListener(eventName: String) {
        if (toggleReceiver != null) return
        toggleReceiver = object : BroadcastReceiver() {
            override fun onReceive(context: Context?, intent: Intent?) {
                reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                    .emit("onTogglePlayback", null)
            }
        }
        val filter = IntentFilter("com.interligadahits.TOGGLE_PLAYBACK")
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            reactContext.registerReceiver(toggleReceiver, filter, Context.RECEIVER_NOT_EXPORTED)
        } else {
            reactContext.registerReceiver(toggleReceiver, filter)
        }
    }

    @ReactMethod
    fun removeListeners(count: Int) {
        toggleReceiver?.let { reactContext.unregisterReceiver(it) }
        toggleReceiver = null
    }

    @ReactMethod
    fun startService(title: String, artist: String, coverUrl: String, isPlaying: Boolean) {
        val intent = Intent(reactContext, RadioForegroundService::class.java).apply {
            putExtra(RadioForegroundService.EXTRA_TITLE, title)
            putExtra(RadioForegroundService.EXTRA_ARTIST, artist)
            putExtra(RadioForegroundService.EXTRA_COVER_URL, coverUrl)
            putExtra(RadioForegroundService.EXTRA_IS_PLAYING, isPlaying)
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            reactContext.startForegroundService(intent)
        } else {
            reactContext.startService(intent)
        }
    }

    @ReactMethod
    fun updateMetadata(title: String, artist: String, coverUrl: String, isPlaying: Boolean) {
        val intent = Intent(reactContext, RadioForegroundService::class.java).apply {
            putExtra(RadioForegroundService.EXTRA_TITLE, title)
            putExtra(RadioForegroundService.EXTRA_ARTIST, artist)
            putExtra(RadioForegroundService.EXTRA_COVER_URL, coverUrl)
            putExtra(RadioForegroundService.EXTRA_IS_PLAYING, isPlaying)
        }
        reactContext.startService(intent)
    }

    @ReactMethod
    fun stopService() {
        val intent = Intent(reactContext, RadioForegroundService::class.java).apply {
            action = RadioForegroundService.ACTION_STOP
        }
        reactContext.startService(intent)
    }
}
