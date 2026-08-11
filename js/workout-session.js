/* ==========================================================================
   UNIFIT ACTIVE WORKOUT SESSION PLAYER & REST TIMER ENGINE
   Interactive set logger, Web Audio chime & Workout completion rewards
   ========================================================================== */

class WorkoutSessionManager {
  constructor() {
    this.activeWorkout = null;
    this.currentExerciseIndex = 0;
    this.workoutStartTime = null;
    this.timerInterval = null;
    this.timerSecondsRemaining = 0;
    this.timerTotalSeconds = 60;
  }

  startWorkout(dayPlan) {
    this.activeWorkout = JSON.parse(JSON.stringify(dayPlan));
    this.currentExerciseIndex = 0;
    this.workoutStartTime = Date.now();
    
    // Initialize set tracking data for each exercise
    this.activeWorkout.exercises.forEach((ex) => {
      ex.loggedSets = [];
      for (let i = 1; i <= (ex.sets || 4); i++) {
        ex.loggedSets.push({
          setNumber: i,
          targetReps: ex.reps,
          weightKg: ex.suggestedWeightKg || 20,
          repsDone: parseInt(ex.reps.split("-")[0]) || 10,
          completed: false
        });
      }
    });

    return this.activeWorkout;
  }

  getCurrentExercise() {
    if (!this.activeWorkout || !this.activeWorkout.exercises) return null;
    return this.activeWorkout.exercises[this.currentExerciseIndex];
  }

  toggleSetCompletion(exerciseIndex, setIndex, weightKg, repsDone) {
    const ex = this.activeWorkout.exercises[exerciseIndex];
    if (!ex || !ex.loggedSets[setIndex]) return false;

    const targetSet = ex.loggedSets[setIndex];
    targetSet.completed = !targetSet.completed;
    targetSet.weightKg = parseFloat(weightKg) || targetSet.weightKg;
    targetSet.repsDone = parseInt(repsDone) || targetSet.repsDone;

    // Check if all sets for this exercise are completed
    ex.completed = ex.loggedSets.every(s => s.completed);

    // If set was just completed, trigger rest timer
    if (targetSet.completed) {
      this.startRestTimer(ex.restSeconds || 90);
    }

    return targetSet.completed;
  }

  startRestTimer(seconds, onTickCallback, onCompleteCallback) {
    this.stopRestTimer();
    this.timerTotalSeconds = seconds;
    this.timerSecondsRemaining = seconds;

    if (onTickCallback) onTickCallback(this.timerSecondsRemaining, this.timerTotalSeconds);

    this.timerInterval = setInterval(() => {
      this.timerSecondsRemaining--;

      if (onTickCallback) {
        onTickCallback(this.timerSecondsRemaining, this.timerTotalSeconds);
      }

      if (this.timerSecondsRemaining <= 0) {
        this.stopRestTimer();
        this.playTimerChimeSound();
        if (onCompleteCallback) onCompleteCallback();
      }
    }, 1000);
  }

  stopRestTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  playTimerChimeSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5 note
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5 note

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {
      console.warn("Audio Context error:", e);
    }
  }

  calculateTotalProgress() {
    if (!this.activeWorkout || !this.activeWorkout.exercises) return 0;
    let totalSets = 0;
    let completedSets = 0;

    this.activeWorkout.exercises.forEach(ex => {
      ex.loggedSets.forEach(s => {
        totalSets++;
        if (s.completed) completedSets++;
      });
    });

    return totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;
  }

  finishWorkoutSession() {
    if (!this.workoutStartTime) return null;

    const durationMinutes = Math.max(1, Math.round((Date.now() - this.workoutStartTime) / 60000));
    let totalTonnageKg = 0;
    let completedSetsCount = 0;

    this.activeWorkout.exercises.forEach(ex => {
      ex.loggedSets.forEach(s => {
        if (s.completed) {
          totalTonnageKg += (s.weightKg * s.repsDone);
          completedSetsCount++;
        }
      });
    });

    const xpEarned = 100 + (completedSetsCount * 15);

    const historyEntry = {
      id: "hist_" + Date.now(),
      date: new Date().toISOString().split("T")[0],
      workoutTitle: this.activeWorkout.title || this.activeWorkout.dayName,
      durationMinutes,
      exercisesCompleted: this.activeWorkout.exercises.filter(ex => ex.completed).length,
      totalTonnageKg,
      xpEarned
    };

    // Save to history in localStorage
    const rawHist = localStorage.getItem("unifit_history");
    const historyList = rawHist ? JSON.parse(rawHist) : [];
    historyList.unshift(historyEntry);
    localStorage.setItem("unifit_history", JSON.stringify(historyList));

    // Award XP to gamification engine
    UniFitGamification.addXP(xpEarned);

    return historyEntry;
  }
}

const workoutSessionInstance = new WorkoutSessionManager();
