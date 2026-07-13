"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { usePortfolioStore } from "@/state/usePortfolioStore";

export function useAmbientAudio() {
  const soundEnabled = usePortfolioStore((state) => state.soundEnabled);
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);
  
  // Drones & oscillators
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const osc3Ref = useRef<OscillatorNode | null>(null); // Structural metal vibration (110Hz)
  const osc3GainRef = useRef<GainNode | null>(null);
  const osc4Ref = useRef<OscillatorNode | null>(null); // Perfect fifth interval (A2/E2, 82.4Hz)
  const osc4GainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (soundEnabled && !audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // 1. Master volume node
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.connect(ctx.destination);
      gainNodeRef.current = gainNode;

      // 2. Primary lowpass filter (simulates space thickness)
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.Q.value = 1.2;
      filter.frequency.setValueAtTime(100, ctx.currentTime); // Deep low start
      filter.connect(gainNode);
      filterNodeRef.current = filter;

      // 3. Environmental feedback resonance (replaces standard delay nodes)
      const delay = ctx.createDelay(1.0);
      delay.delayTime.setValueAtTime(0.6, ctx.currentTime); // 600ms echo
      const feedback = ctx.createGain();
      feedback.gain.setValueAtTime(0.25, ctx.currentTime); // Gentle room feedback

      filter.connect(delay);
      delay.connect(feedback);
      feedback.connect(filter); // Creates a feedback loop for environmental resonance

      // 4. Osc 1: Deep sub-base drone (55Hz)
      const osc1 = ctx.createOscillator();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(55, ctx.currentTime);
      osc1.connect(filter);
      osc1.start();
      osc1Ref.current = osc1;

      // 5. Osc 2: Detuned sawtooth to add slow beating chorus (55.4Hz)
      const osc2 = ctx.createOscillator();
      osc2.type = "sawtooth";
      osc2.frequency.setValueAtTime(55.4, ctx.currentTime);
      osc2.connect(filter);
      osc2.start();
      osc2Ref.current = osc2;

      // 6. Osc 3: Structural metal vibration (110Hz)
      const osc3 = ctx.createOscillator();
      osc3.type = "triangle"; // Soft metal tone
      osc3.frequency.setValueAtTime(110, ctx.currentTime);
      
      const osc3Gain = ctx.createGain();
      osc3Gain.gain.setValueAtTime(0, ctx.currentTime); // starts silent during boot
      
      osc3.connect(osc3Gain);
      osc3Gain.connect(filter);
      osc3.start();
      osc3Ref.current = osc3;
      osc3GainRef.current = osc3Gain;

      // 7. Osc 4: Perfect Fifth note (E2, 82.4Hz)
      const osc4 = ctx.createOscillator();
      osc4.type = "sine";
      osc4.frequency.setValueAtTime(82.4, ctx.currentTime);
      
      const osc4Gain = ctx.createGain();
      osc4Gain.gain.setValueAtTime(0, ctx.currentTime); // starts silent
      
      osc4.connect(osc4Gain);
      osc4Gain.connect(filter);
      osc4.start();
      osc4Ref.current = osc4;
      osc4GainRef.current = osc4Gain;

      // 8. White noise wind generator
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.setValueAtTime(90, ctx.currentTime);
      noiseFilter.Q.value = 2.0;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.035, ctx.currentTime); // Soft background wind

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(gainNode);
      whiteNoise.start();
      
      // Wind sweep LFO
      const windLFO = ctx.createOscillator();
      windLFO.frequency.setValueAtTime(0.06, ctx.currentTime); // Slow sweep
      const windLFOGain = ctx.createGain();
      windLFOGain.gain.setValueAtTime(35, ctx.currentTime);
      
      windLFO.connect(windLFOGain);
      windLFOGain.connect(noiseFilter.frequency);
      windLFO.start();
    }

    // Master gain controller fade transitions
    if (audioCtxRef.current && gainNodeRef.current) {
      const ctx = audioCtxRef.current;
      const gainNode = gainNodeRef.current;

      if (soundEnabled) {
        if (ctx.state === "suspended") {
          ctx.resume();
        }
        gainNode.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 1.2);
      } else {
        gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
      }
    }
  }, [soundEnabled]);

  // Modulate drone gains and filters based on emotional chapter scroll bounds
  useEffect(() => {
    if (audioCtxRef.current && filterNodeRef.current) {
      const ctx = audioCtxRef.current;
      const filter = filterNodeRef.current;
      const o3Gain = osc3GainRef.current;
      const o4Gain = osc4GainRef.current;

      let targetFreq = 100;
      let targetO3Volume = 0;
      let targetO4Volume = 0;

      if (scrollProgress < 0.09) {
        // Act 1: Absolute silence during initial question overlays
        targetFreq = 20;
        targetO3Volume = 0;
        targetO4Volume = 0;
        if (gainNodeRef.current) {
          gainNodeRef.current.gain.setTargetAtTime(0, ctx.currentTime, 0.15);
        }
      } else if (scrollProgress < 0.15) {
        // Boot illumination and identity reveal: gradually sweep up low drone
        const t = (scrollProgress - 0.09) / 0.06;
        targetFreq = THREE.MathUtils.lerp(20, 90, t);
        targetO3Volume = 0;
        targetO4Volume = 0.05 * t;
        if (gainNodeRef.current && soundEnabled) {
          gainNodeRef.current.gain.setTargetAtTime(0.35 * t, ctx.currentTime, 0.3);
        }
      } else if (scrollProgress < 0.35) {
        // CampusConnect: filter opens, structural drone emerges (Wonder)
        const t = (scrollProgress - 0.15) / 0.2;
        targetFreq = THREE.MathUtils.lerp(90, 150, t);
        targetO3Volume = THREE.MathUtils.lerp(0, 0.06, t);
        targetO4Volume = 0;
        if (gainNodeRef.current && soundEnabled) {
          gainNodeRef.current.gain.setTargetAtTime(0.35, ctx.currentTime, 0.3);
        }
      } else if (scrollProgress < 0.55) {
        // Railway AI (SIH): detuned sawtooth creates complex tension (Precise systems)
        const t = (scrollProgress - 0.35) / 0.2;
        targetFreq = 140;
        targetO3Volume = 0.08;
        targetO4Volume = THREE.MathUtils.lerp(0, 0.1, t);
        if (gainNodeRef.current && soundEnabled) {
          gainNodeRef.current.gain.setTargetAtTime(0.35, ctx.currentTime, 0.3);
        }
      } else if (scrollProgress < 0.72) {
        // AI SaaS: Filter sweeps and swells dynamically (Possibility / Assembly)
        const t = (scrollProgress - 0.55) / 0.17;
        targetFreq = 140 + Math.sin(t * Math.PI) * 90;
        targetO3Volume = 0.12;
        targetO4Volume = 0.14;
        if (gainNodeRef.current && soundEnabled) {
          gainNodeRef.current.gain.setTargetAtTime(0.35, ctx.currentTime, 0.3);
        }
      } else if (scrollProgress < 0.88) {
        // MADHU//OS Shrine: Deepening and calming (Ecosystem focus)
        const t = (scrollProgress - 0.72) / 0.16;
        targetFreq = THREE.MathUtils.lerp(140, 95, t);
        targetO3Volume = THREE.MathUtils.lerp(0.12, 0.06, t);
        targetO4Volume = THREE.MathUtils.lerp(0.14, 0.22, t);
        if (gainNodeRef.current && soundEnabled) {
          gainNodeRef.current.gain.setTargetAtTime(0.35, ctx.currentTime, 0.3);
        }
      } else if (scrollProgress < 0.95) {
        // Founder's Vision: Spacious, pure fifth drone swells, detuned elements settle (Hopeful)
        const t = (scrollProgress - 0.88) / 0.07;
        targetFreq = 95;
        targetO3Volume = THREE.MathUtils.lerp(0.06, 0.01, t); // Quiet the metallic triangle
        targetO4Volume = THREE.MathUtils.lerp(0.22, 0.35, t); // Pure hopeful harmonic drone swells
        if (gainNodeRef.current && soundEnabled) {
          gainNodeRef.current.gain.setTargetAtTime(0.35, ctx.currentTime, 0.3);
        }
      } else {
        // Portal & Silence Climax: Gradually fade out all nodes to absolute silence
        const t = (scrollProgress - 0.95) / 0.05;
        targetFreq = 20; // Lower lowpass cutoff completely
        targetO3Volume = 0;
        targetO4Volume = 0;
        if (gainNodeRef.current) {
          gainNodeRef.current.gain.setTargetAtTime(THREE.MathUtils.lerp(0.35, 0.0, t), ctx.currentTime, 0.2);
        }
      }

      filter.frequency.setTargetAtTime(targetFreq, ctx.currentTime, 0.45);
      
      if (o3Gain) {
        o3Gain.gain.setTargetAtTime(targetO3Volume, ctx.currentTime, 0.4);
      }
      
      if (o4Gain) {
        o4Gain.gain.setTargetAtTime(targetO4Volume, ctx.currentTime, 0.4);
      }
    }
  }, [scrollProgress, soundEnabled]);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);
}
