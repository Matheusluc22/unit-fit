/* ==========================================================================
   UNIFIT GAMIFICATION ENGINE
   XP system, Level progression, Achievements/Badges & Streaks
   ========================================================================== */

class UniFitGamification {
  static getGamificationData() {
    const raw = localStorage.getItem("unifit_gamification");
    if (raw) return JSON.parse(raw);

    const defaultData = {
      xp: 350,
      streakDays: 4,
      unlockedBadges: ["primeiro_passo"],
      weeklyGoalCompleted: 3,
      weeklyGoalTarget: 4
    };
    localStorage.setItem("unifit_gamification", JSON.stringify(defaultData));
    return defaultData;
  }

  static addXP(amount) {
    const data = this.getGamificationData();
    const oldLevel = this.calculateLevel(data.xp).level;
    data.xp += amount;
    const newLevel = this.calculateLevel(data.xp).level;

    localStorage.setItem("unifit_gamification", JSON.stringify(data));

    if (newLevel > oldLevel) {
      if (window.showUniFitToast) {
        window.showUniFitToast(`🎉 PARABÉNS! VOCÊ SUBIU PARA O NÍVEL ${newLevel}!`, "green");
      }
    } else {
      if (window.showUniFitToast) {
        window.showUniFitToast(`+${amount} XP Ganhos no UniFit!`, "green");
      }
    }

    return data;
  }

  static calculateLevel(xp) {
    // 250 XP per level
    const level = Math.floor(xp / 250) + 1;
    const currentLevelXp = xp % 250;
    const nextLevelXp = 250;
    const percentage = Math.round((currentLevelXp / nextLevelXp) * 100);

    let title = "Novato Fitness";
    if (level >= 5) title = "Bronze Atleta";
    if (level >= 10) title = "Prata Avançado";
    if (level >= 20) title = "Ouro Mestre";
    if (level >= 35) title = "Elite Gymshark";
    if (level >= 50) title = "Lenda UniFit";

    return { level, currentLevelXp, nextLevelXp, percentage, title };
  }

  static getAllBadges() {
    return [
      { id: "primeiro_passo", title: "Primeiro Passo", desc: "Concluiu seu 1º treino no UniFit", icon: "🔥" },
      { id: "foco_aco", title: "Foco de Aço", desc: "Manteve 7 dias consecutivos de treinos", icon: "⚡" },
      { id: "mestre_carga", title: "Mestre da Carga", desc: "Movimentou mais de 5.000 kg num treino", icon: "🏋️‍♂️" },
      { id: "mente_blindada", title: "Mente Blindada", desc: "Completou 10 treinos no sistema", icon: "🧠" },
      { id: "lenda_academia", title: "Lenda da Academia", desc: "Alcançou o Nível 20 de Gamificação", icon: "🏆" }
    ];
  }
}
