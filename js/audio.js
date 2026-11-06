/**
 * SoundSystem - Procedural Web Audio API Synthesizer
 * Mengembangkan audio game edukasi PAI secara prosedural:
 * - Efek Chime Islami
 * - Efek Suara Benar & Salah
 * - Fanfare Kemenangan Misi
 * - Ambient Music Lembut
 * Tanpa dependensi file mp3 luar, bebas 404, aman CORS.
 */

class SoundSystem {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
        this.masterVolume = 0.3;
        this.bgmPlaying = false;
        this.bgmTimer = null;
        this.bgmStep = 0;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.isMuted && this.bgmPlaying) {
            this.stopBGM();
        }
        return this.isMuted;
    }

    playClick() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(480, now);
        osc.frequency.exponentialRampToValueAtTime(240, now + 0.08);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.08);
    }

    playCorrect() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        // Akor Mayor Arpeggio Nada Lembut: C5, E5, G5, C6
        const freqs = [523.25, 659.25, 783.99, 1046.50];
        freqs.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + idx * 0.07);

            gain.gain.setValueAtTime(0.2, now + idx * 0.07);
            gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.07 + 0.22);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now + idx * 0.07);
            osc.stop(now + idx * 0.07 + 0.23);
        });
    }

    playWrong() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.25);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.26);
    }

    playFanfare() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        // Melodi Kemenangan Islami: G4, C5, E5, G5, C6
        const melody = [
            { f: 392.00, d: 0.15 },
            { f: 523.25, d: 0.15 },
            { f: 659.25, d: 0.15 },
            { f: 783.99, d: 0.25 },
            { f: 1046.50, d: 0.45 }
        ];

        let cursor = now;
        melody.forEach(note => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(note.f, cursor);

            gain.gain.setValueAtTime(0.22, cursor);
            gain.gain.exponentialRampToValueAtTime(0.01, cursor + note.d);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(cursor);
            osc.stop(cursor + note.d + 0.02);
            cursor += note.d * 0.85;
        });
    }

    playTick() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(750, now);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.05);
    }

    startBGM() {
        if (this.bgmPlaying || this.isMuted) return;
        this.init();
        if (!this.ctx) return;
        this.bgmPlaying = true;
        this.bgmStep = 0;

        // Tangga nada pentatonik oriental lembut yang menenangkan jiwa
        const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
        const pattern = [0, 2, 4, 3, 1, 2, 0, 3, 2, 4, 5, 4, 2, 1, 0, 2];

        const tick = () => {
            if (!this.bgmPlaying || !this.ctx || this.isMuted) return;
            const now = this.ctx.currentTime;
            const noteIdx = pattern[this.bgmStep % pattern.length];
            const freq = scale[noteIdx];

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now);

            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.005, now + 0.35);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.38);

            this.bgmStep++;
            this.bgmTimer = setTimeout(tick, 350);
        };

        tick();
    }

    stopBGM() {
        this.bgmPlaying = false;
        if (this.bgmTimer) {
            clearTimeout(this.bgmTimer);
            this.bgmTimer = null;
        }
    }
}

window.soundSystem = new SoundSystem();
