/* ==========================================================================
   UNIFIT INTELLIGENT WORKOUT ALGORITHM
   Generates optimal split, sets, reps, load suggestions & safety filters
   ========================================================================== */

class UniFitAlgorithm {
  static calculateBMI(weightKg, heightCm) {
    if (!weightKg || !heightCm) return { bmi: 22, category: "Normal" };
    const heightM = heightCm / 100;
    const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));
    let category = "Normal";
    if (bmi < 18.5) category = "Abaixo do peso";
    else if (bmi >= 18.5 && bmi < 24.9) category = "Peso Normal";
    else if (bmi >= 25 && bmi < 29.9) category = "Sobrepeso";
    else category = "Obesidade";
    return { bmi, category };
  }

  static generateWorkoutPlan(userProfile) {
    const {
      name = "Atleta",
      weight = 70,
      height = 175,
      experience = "Intermediário",
      goal = "Hipertrofia",
      daysPerWeek = 4,
      timePerWorkout = 60,
      location = "Academia",
      injuries = []
    } = userProfile;

    const bmiData = this.calculateBMI(weight, height);

    // Determine rep range & rest duration based on goal
    let repRange = "8 - 12";
    let setsPerExercise = 4;
    let restSeconds = 90;
    
    if (goal === "Hipertrofia") {
      repRange = experience === "Avançado" ? "6 - 10" : "8 - 12";
      restSeconds = 90;
      setsPerExercise = 4;
    } else if (goal === "Definição" || goal === "Emagrecimento") {
      repRange = "10 - 15";
      restSeconds = 60;
      setsPerExercise = 3;
    } else if (goal === "Resistência") {
      repRange = "12 - 20";
      restSeconds = 45;
      setsPerExercise = 3;
    }

    // Determine Weekly Split Name & Daily Focus
    let splitName = "AB 2x (Corpo Todo / Upper Lower)";
    let daysStructure = [];

    const numDays = parseInt(daysPerWeek) || 4;

    if (numDays <= 2) {
      splitName = "Full Body (Corpo Todo - 2x por semana)";
      daysStructure = [
        { dayName: "Treino A", focus: ["Peito", "Costas", "Pornas", "Ombros", "Abdômen"] },
        { dayName: "Treino B", focus: ["Pernas", "Glúteos", "Costas", "Peito", "Tríceps", "Bíceps"] }
      ];
    } else if (numDays === 3) {
      splitName = "ABC (Push / Pull / Legs - 3x por semana)";
      daysStructure = [
        { dayName: "Treino A", title: "Peito, Ombros e Tríceps", focus: ["Peito", "Ombros", "Tríceps"] },
        { dayName: "Treino B", title: "Costas, Bíceps e Abdômen", focus: ["Costas", "Bíceps", "Abdômen"] },
        { dayName: "Treino C", title: "Pernas Completo e Panturrilha", focus: ["Pernas", "Glúteos", "Posterior", "Panturrilha"] }
      ];
    } else if (numDays === 4) {
      splitName = "Upper / Lower 4x (Membros Superiores e Inferiores)";
      daysStructure = [
        { dayName: "Treino A", title: "Upper A (Peito, Costas, Ombros)", focus: ["Peito", "Costas", "Ombros"] },
        { dayName: "Treino B", title: "Lower A (Quadríceps e Glúteos)", focus: ["Pernas", "Glúteos", "Panturrilha"] },
        { dayName: "Treino C", title: "Upper B (Superiores & Braços)", focus: ["Costas", "Peito", "Bíceps", "Tríceps"] },
        { dayName: "Treino D", title: "Lower B (Posterior e Abdômen)", focus: ["Posterior", "Panturrilha", "Abdômen"] }
      ];
    } else if (numDays === 5) {
      splitName = "ABCDE (Divisão Específica 5x por semana)";
      daysStructure = [
        { dayName: "Treino A", title: "Peito Focado", focus: ["Peito", "Tríceps"] },
        { dayName: "Treino B", title: "Costas & Trapézio", focus: ["Costas", "Bíceps"] },
        { dayName: "Treino C", title: "Quadríceps & Glúteos", focus: ["Pernas", "Glúteos"] },
        { dayName: "Treino D", title: "Ombros & Abdômen", focus: ["Ombros", "Abdômen"] },
        { dayName: "Treino E", title: "Posterior, Panturrilha & Braços", focus: ["Posterior", "Panturrilha", "Bíceps", "Tríceps"] }
      ];
    } else {
      splitName = "Push / Pull / Legs 2x (6x por semana)";
      daysStructure = [
        { dayName: "Treino A", title: "Push A (Peito, Ombros, Tríceps)", focus: ["Peito", "Ombros", "Tríceps"] },
        { dayName: "Treino B", title: "Pull A (Costas, Bíceps, Abdômen)", focus: ["Costas", "Bíceps", "Abdômen"] },
        { dayName: "Treino C", title: "Legs A (Pernas Completo)", focus: ["Pernas", "Glúteos", "Posterior", "Panturrilha"] },
        { dayName: "Treino D", title: "Push B (Hipertrofia Ombros e Peito)", focus: ["Peito", "Ombros", "Tríceps"] },
        { dayName: "Treino E", title: "Pull B (Densidade de Costas)", focus: ["Costas", "Bíceps", "Abdômen"] },
        { dayName: "Treino F", title: "Legs B (Foco Posterior e Panturrilha)", focus: ["Posterior", "Glúteos", "Pernas", "Panturrilha"] }
      ];
    }

    // Filter exercises considering location and injuries
    const daysPlan = daysStructure.map((day) => {
      const selectedExercises = [];
      day.focus.forEach((cat) => {
        let matches = EXERCISES_DATABASE.filter(ex => ex.category === cat);

        // Filter out injured areas
        if (injuries.includes("Ombros") && cat === "Ombros") {
          matches = matches.filter(ex => ex.level !== "Avançado");
        }
        if (injuries.includes("Joelhos") && (cat === "Pernas" || cat === "Posterior")) {
          matches = matches.filter(ex => ex.id !== "agachamento_livre_barra");
        }
        if (injuries.includes("Coluna") && (cat === "Costas" || cat === "Pernas")) {
          matches = matches.filter(ex => ex.id !== "remada_curvada_barra" && ex.id !== "agachamento_livre_barra");
        }

        // Pick 1 to 2 exercises per focus category
        const picked = matches.slice(0, 2);
        picked.forEach((ex) => {
          // Compute estimated initial weight based on weight & experience
          let weightMult = 0.4;
          if (experience === "Intermediário") weightMult = 0.6;
          if (experience === "Avançado") weightMult = 0.85;

          if (ex.category === "Pernas") weightMult *= 1.4;
          if (ex.category === "Bíceps" || ex.category === "Tríceps") weightMult *= 0.35;

          const suggestedWeightKg = Math.round(weight * weightMult);

          selectedExercises.push({
            ...ex,
            sets: setsPerExercise,
            reps: repRange,
            restSeconds: restSeconds,
            suggestedWeightKg: Math.max(5, suggestedWeightKg),
            completed: false
          });
        });
      });

      return {
        dayName: day.dayName,
        title: day.title || day.focus.join(", "),
        exercises: selectedExercises
      };
    });

    return {
      planId: "plan_" + Date.now(),
      generatedAt: new Date().toLocaleDateString("pt-BR"),
      userName: name,
      userBmi: bmiData,
      splitName,
      goal,
      experience,
      daysPlan,
      observations: [
        "Aumente as cargas semanalmente mantendo a técnica impecável (Progressão Sobrecarga).",
        "Beba pelo menos 35ml de água por kg corporal ao longo do dia.",
        "Descanse 48 a 72 horas antes de treinar o mesmo grupo muscular novamente."
      ]
    };
  }
}
