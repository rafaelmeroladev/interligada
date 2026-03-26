package com.interligadahits.interligadaHitsApp

import android.app.*
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.os.Build
import android.os.IBinder
import android.support.v4.media.session.MediaSessionCompat
import android.support.v4.media.session.PlaybackStateCompat
import android.support.v4.media.MediaMetadataCompat
import androidx.core.app.NotificationCompat
import androidx.media.app.NotificationCompat.MediaStyle
import java.net.URL

class RadioForegroundService : Service() {

    companion object {
        const val CHANNEL_ID = "radio_foreground"
        const val NOTIFICATION_ID = 1
        const val ACTION_STOP = "ACTION_STOP"
        const val ACTION_TOGGLE = "ACTION_TOGGLE"
        const val EXTRA_TITLE = "title"
        const val EXTRA_ARTIST = "artist"
        const val EXTRA_COVER_URL = "coverUrl"
        const val EXTRA_IS_PLAYING = "isPlaying"
    }

    private lateinit var mediaSession: MediaSessionCompat
    private var currentTitle = "Interligada Hits"
    private var currentArtist = "Ao vivo"
    private var currentCoverUrl = ""
    private var currentIsPlaying = true
    private var coverBitmap: Bitmap? = null

    override fun onCreate() {
        super.onCreate()
        createNotificationChannel()
        mediaSession = MediaSessionCompat(this, "RadioSession").apply {
            isActive = true
        }
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        when (intent?.action) {
            ACTION_STOP -> {
                stopForeground(STOP_FOREGROUND_REMOVE)
                stopSelf()
                return START_NOT_STICKY
            }
            ACTION_TOGGLE -> {
                // Envia evento para o JS via broadcast
                val broadcast = Intent("com.interligadahits.TOGGLE_PLAYBACK")
                sendBroadcast(broadcast)
                return START_STICKY
            }
        }

        val title = intent?.getStringExtra(EXTRA_TITLE) ?: currentTitle
        val artist = intent?.getStringExtra(EXTRA_ARTIST) ?: currentArtist
        val coverUrl = intent?.getStringExtra(EXTRA_COVER_URL) ?: currentCoverUrl
        val isPlaying = intent?.getBooleanExtra(EXTRA_IS_PLAYING, currentIsPlaying) ?: currentIsPlaying

        currentTitle = title
        currentArtist = artist
        currentIsPlaying = isPlaying

        updateSession(title, artist, isPlaying)

        // Carrega capa em background se mudou
        if (coverUrl.isNotEmpty() && coverUrl != currentCoverUrl) {
            currentCoverUrl = coverUrl
            Thread {
                try {
                    coverBitmap = BitmapFactory.decodeStream(URL(coverUrl).openStream())
                    // Atualiza notificação com a capa carregada
                    val notification = buildNotification(title, artist, isPlaying)
                    val manager = getSystemService(NotificationManager::class.java)
                    manager.notify(NOTIFICATION_ID, notification)
                } catch (e: Exception) {
                    android.util.Log.e("RadioService", "Erro ao carregar capa: ${e.message}")
                }
            }.start()
        }

        val notification = buildNotification(title, artist, isPlaying)
        startForeground(NOTIFICATION_ID, notification)

        return START_STICKY
    }

    private fun updateSession(title: String, artist: String, isPlaying: Boolean) {
        mediaSession.setMetadata(
            MediaMetadataCompat.Builder()
                .putString(MediaMetadataCompat.METADATA_KEY_TITLE, title)
                .putString(MediaMetadataCompat.METADATA_KEY_ARTIST, artist)
                .putBitmap(MediaMetadataCompat.METADATA_KEY_ALBUM_ART, coverBitmap)
                .build()
        )
        val state = if (isPlaying) PlaybackStateCompat.STATE_PLAYING else PlaybackStateCompat.STATE_PAUSED
        mediaSession.setPlaybackState(
            PlaybackStateCompat.Builder()
                .setState(state, 0, 1f)
                .setActions(PlaybackStateCompat.ACTION_PLAY_PAUSE)
                .build()
        )
    }

    private fun buildNotification(title: String, artist: String, isPlaying: Boolean): Notification {
        val mainIntent = packageManager.getLaunchIntentForPackage(packageName)
        val pendingMain = PendingIntent.getActivity(
            this, 0, mainIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        val toggleIntent = Intent(this, RadioForegroundService::class.java).apply {
            action = ACTION_TOGGLE
        }
        val togglePending = PendingIntent.getService(
            this, 1, toggleIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        val toggleAction = NotificationCompat.Action(
            if (isPlaying) android.R.drawable.ic_media_pause else android.R.drawable.ic_media_play,
            if (isPlaying) "Pausar" else "Tocar",
            togglePending
        )

        val builder = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle(title)
            .setContentText(artist)
            .setSmallIcon(R.mipmap.ic_launcher)
            .setContentIntent(pendingMain)
            .addAction(toggleAction)
            .setStyle(
                MediaStyle()
                    .setMediaSession(mediaSession.sessionToken)
                    .setShowActionsInCompactView(0)
            )
            .setOngoing(isPlaying)
            .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
            .setPriority(NotificationCompat.PRIORITY_LOW)

        // Usa capa da música ou logo da rádio como fallback
        val art = coverBitmap ?: BitmapFactory.decodeResource(resources, R.mipmap.ic_launcher)
        builder.setLargeIcon(art)

        return builder.build()
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID, "Rádio Interligada", NotificationManager.IMPORTANCE_LOW
            ).apply {
                description = "Player de rádio em segundo plano"
                setSound(null, null)
            }
            getSystemService(NotificationManager::class.java).createNotificationChannel(channel)
        }
    }

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onDestroy() {
        mediaSession.release()
        super.onDestroy()
    }
}
