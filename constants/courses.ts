export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  type: 'video' | 'pdf' | 'text';
  contentUrl: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface CourseData {
  id: string;
  title: string;
  description: string;
  bannerImage: any;
  modules: Module[];
  progress: number;
  totalLessons: number;
  completedLessons: number;
  locked?: boolean;
}

export const COURSES: Record<string, CourseData> = {
  "1": {
    id: "1",
    title: "Meteorologia",
    description: "Estudo de fenômenos atmosféricos e sua influência no voo.",
    bannerImage: require("../assets/images/course.jpeg"),
    progress: 0.4,
    totalLessons: 12,
    completedLessons: 5,
    modules: [
      {
        id: "m1",
        title: "Atmosfera e Pressão",
        lessons: [
          { id: "l1", title: "Composição da Atmosfera", duration: "08:15", completed: true, type: 'video', contentUrl: '' },
          { id: "l2", title: "Camadas Atmosféricas", duration: "12:30", completed: true, type: 'video', contentUrl: '' },
          { id: "l3", title: "Pressão Atmosférica", duration: "10:45", completed: true, type: 'video', contentUrl: '' },
        ]
      },
      {
        id: "m2",
        title: "Nuvens e Visibilidade",
        lessons: [
          { id: "l4", title: "Formação de Nuvens", duration: "15:20", completed: true, type: 'video', contentUrl: '' },
          { id: "l5", title: "Classificação das Nuvens", duration: "11:10", completed: true, type: 'video', contentUrl: '' },
          { id: "l6", title: "Visibilidade e Névoa", duration: "09:45", completed: false, type: 'video', contentUrl: '' },
        ]
      }
    ]
  },
  "2": {
    id: "2",
    title: "Navegação Aérea",
    description: "Cálculos de rota, derivas e uso de computador de voo.",
    bannerImage: require("../assets/images/card(1).png"),
    progress: 0.7,
    totalLessons: 15,
    completedLessons: 10,
    modules: [
      {
        id: "m1",
        title: "Fundamentos da Navegação",
        lessons: [
          { id: "n1", title: "Magnetismo Terrestre", duration: "07:45", completed: true, type: 'video', contentUrl: '' },
          { id: "n2", title: "Coordenadas Geográficas", duration: "14:20", completed: true, type: 'video', contentUrl: '' },
        ]
      }
    ]
  },
  "3": {
    id: "3",
    title: "Regulamentos ANAC",
    description: "Normas e leis que regem a aviação civil brasileira.",
    bannerImage: require("../assets/images/card(2).png"),
    progress: 0.2,
    totalLessons: 20,
    completedLessons: 4,
    modules: [
      {
        id: "m1",
        title: "CBA e Código Brasileiro",
        lessons: [
          { id: "r1", title: "Histórico do CBA", duration: "10:00", completed: true, type: 'video', contentUrl: '' },
          { id: "r2", title: "Soberania e Espaço Aéreo", duration: "12:00", completed: true, type: 'video', contentUrl: '' },
        ]
      }
    ]
  }
};
