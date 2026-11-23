/**
 * Zero-download procedural Web Audio API coffee-shop room tone generator.
 * Produces soft, warm low-passed brown noise (gentle espresso room ambience)
 * with smooth fade-in/fade-out and zero external audio asset weight.
 */
class CafeAmbienceAudio {
  private ctx: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private running = false;

  public start(): void {
    if (typeof window === "undefined") return;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;

      this.ctx = new AudioCtx();
      const bufferSize = this.ctx.sampleRate * 3;
      const noiseBuffer = this.ctx.createBuffer(
        1,
        bufferSize,
        this.ctx.sampleRate
      );
      const output = noiseBuffer.getChannelData(0);

      // Soft brown-noise curve for warm indoor room tone
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 2.4;
      }

      const source = this.ctx.createBufferSource();
      source.buffer = noiseBuffer;
      source.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 340;

      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.value = 0.0001;

      source.connect(filter);
      filter.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);
      source.start(0);
    }

    if (this.ctx.state === "suspended") {
      void this.ctx.resume();
    }

    if (this.gainNode && this.ctx) {
      const now = this.ctx.currentTime;
      this.gainNode.gain.cancelScheduledValues(now);
      this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
      this.gainNode.gain.linearRampToValueAtTime(0.055, now + 0.6);
      this.running = true;
    }
  }

  public stop(): void {
    if (!this.ctx || !this.gainNode || !this.running) return;
    const now = this.ctx.currentTime;
    this.gainNode.gain.cancelScheduledValues(now);
    this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
    this.gainNode.gain.linearRampToValueAtTime(0.0001, now + 0.4);
    this.running = false;
  }
}

export const cafeAmbienceAudio = new CafeAmbienceAudio();
