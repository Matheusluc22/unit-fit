/* ==========================================================================
   UNIFIT AUTHENTICATION & USER PROFILE ENGINE
   Session persistence, JWT simulation & Onboarding wizard integration
   ========================================================================== */

class UniFitAuth {
  static STORAGE_KEYS = {
    USER: "unifit_user",
    TOKEN: "unifit_token",
    PLAN: "unifit_workout_plan",
    HISTORY: "unifit_history",
    MEASUREMENTS: "unifit_measurements",
    GAMIFICATION: "unifit_gamification"
  };

  static initDemoUserIfEmpty() {
    if (!localStorage.getItem(this.STORAGE_KEYS.USER)) {
      const demoUser = {
        name: "Carlos Eduardo",
        email: "carlos@unifit.com",
        age: 26,
        gender: "Masculino",
        height: 178,
        weight: 76.5,
        experience: "Intermediário",
        goal: "Hipertrofia",
        daysPerWeek: 4,
        timePerWorkout: 60,
        location: "Academia",
        injuries: ["Nenhuma"],
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        joinedDate: "2026-01-15"
      };

      const demoToken = btoa(JSON.stringify({ id: "usr_991823", email: demoUser.email, exp: Date.now() + 86400000 }));
      
      localStorage.setItem(this.STORAGE_KEYS.USER, JSON.stringify(demoUser));
      localStorage.setItem(this.STORAGE_KEYS.TOKEN, demoToken);

      // Generate initial workout plan for demo user
      const initialPlan = UniFitAlgorithm.generateWorkoutPlan(demoUser);
      localStorage.setItem(this.STORAGE_KEYS.PLAN, JSON.stringify(initialPlan));

      // Initial history
      const initialHistory = [
        {
          id: "hist_101",
          date: "2026-08-01",
          workoutTitle: "Treino A - Peito, Ombros e Tríceps",
          durationMinutes: 52,
          exercisesCompleted: 5,
          totalTonnageKg: 4200,
          xpEarned: 150
        },
        {
          id: "hist_102",
          date: "2026-08-03",
          workoutTitle: "Treino B - Costas, Bíceps e Abdômen",
          durationMinutes: 58,
          exercisesCompleted: 6,
          totalTonnageKg: 5100,
          xpEarned: 180
        }
      ];
      localStorage.setItem(this.STORAGE_KEYS.HISTORY, JSON.stringify(initialHistory));

      // Initial measurements
      const initialMeasurements = [
        { date: "2026-06-01", weight: 79.0, arm: 37.0, chest: 100, waist: 84, hips: 98, legs: 58, calves: 37, bodyFat: 17.5 },
        { date: "2026-07-01", weight: 77.8, arm: 37.5, chest: 101, waist: 82, hips: 97, legs: 59, calves: 37.5, bodyFat: 16.2 },
        { date: "2026-08-01", weight: 76.5, arm: 38.2, chest: 102, waist: 80, hips: 96, legs: 60, calves: 38, bodyFat: 15.0 }
      ];
      localStorage.setItem(this.STORAGE_KEYS.MEASUREMENTS, JSON.stringify(initialMeasurements));
    }
  }

  static getCurrentUser() {
    const raw = localStorage.getItem(this.STORAGE_KEYS.USER);
    return raw ? JSON.parse(raw) : null;
  }

  static isAuthenticated() {
    return !!localStorage.getItem(this.STORAGE_KEYS.TOKEN);
  }

  static login(email, password) {
    if (!email || !password) {
      throw new Error("Por favor, preencha o e-mail e a senha.");
    }
    const token = btoa(JSON.stringify({ email, time: Date.now() }));
    localStorage.setItem(this.STORAGE_KEYS.TOKEN, token);
    return true;
  }

  static register(userData) {
    if (!userData.email || !userData.name) {
      throw new Error("E-mail e Nome são obrigatórios.");
    }
    localStorage.setItem(this.STORAGE_KEYS.USER, JSON.stringify(userData));
    const token = btoa(JSON.stringify({ email: userData.email, time: Date.now() }));
    localStorage.setItem(this.STORAGE_KEYS.TOKEN, token);

    // Generate new AI workout plan for the user
    const newPlan = UniFitAlgorithm.generateWorkoutPlan(userData);
    localStorage.setItem(this.STORAGE_KEYS.PLAN, JSON.stringify(newPlan));

    return newPlan;
  }

  static updateUserProfile(updatedData) {
    const current = this.getCurrentUser() || {};
    const merged = { ...current, ...updatedData };
    localStorage.setItem(this.STORAGE_KEYS.USER, JSON.stringify(merged));

    // Regenerate plan if physical specs changed
    const newPlan = UniFitAlgorithm.generateWorkoutPlan(merged);
    localStorage.setItem(this.STORAGE_KEYS.PLAN, JSON.stringify(newPlan));

    return merged;
  }

  static logout() {
    localStorage.removeItem(this.STORAGE_KEYS.TOKEN);
    window.location.reload();
  }
}
