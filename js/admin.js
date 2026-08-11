/* ==========================================================================
   UNIFIT ADMIN PANEL MODULE
   System statistics, user management directory & exercise catalog controls
   ========================================================================== */

class UniFitAdmin {
  static getAdminMetrics() {
    return {
      totalUsers: 15420,
      activeWorkoutsToday: 1840,
      plansGenerated: 52190,
      retentionRate: "98.4%",
      systemStatus: "Operacional (100%)"
    };
  }

  static getMockUsers() {
    return [
      { id: "usr_01", name: "Carlos Eduardo", email: "carlos@unifit.com", plan: "Pro Elite", level: 12, status: "Ativo" },
      { id: "usr_02", name: "Mariana Silva", email: "mariana@gmail.com", plan: "Pro Elite", level: 8, status: "Ativo" },
      { id: "usr_03", name: "Lucas Mendes", email: "lucas.m@hotmail.com", plan: "Gratuito", level: 3, status: "Ativo" },
      { id: "usr_04", name: "Beatriz Oliveira", email: "bea.oli@outlook.com", plan: "Pro Elite", level: 19, status: "Ativo" },
      { id: "usr_05", name: "Rodrigo Costa", email: "rodrigo.fit@yahoo.com", plan: "Gratuito", level: 5, status: "Inativo" }
    ];
  }
}
