
export interface FlashCardAlternative {
  texto: string;
  correto: boolean;
}

export interface FlashCardData {
  pergunta: string;
  alternativas?: FlashCardAlternative[];
  resposta: string;
  explicacao: string;
}

export interface FlashCardStats {
  totalAnswered: number;
  correctAnswers: number;
  cardStats: Record<number, { correct: number; total: number }>;
}
