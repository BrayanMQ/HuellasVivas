import { Dog, Cat, Rabbit, PawPrint, type LucideIcon } from "lucide-react";

export type AnimalCategory = "dog" | "cat" | "rabbit" | "other";

export const ANIMAL_CATEGORIES: { value: AnimalCategory; label: string; Icon: LucideIcon }[] = [
  { value: "dog", label: "Perro", Icon: Dog },
  { value: "cat", label: "Gato", Icon: Cat },
  { value: "rabbit", label: "Conejo", Icon: Rabbit },
  { value: "other", label: "Otros", Icon: PawPrint },
];

export const getCategoryInfo = (category: AnimalCategory) =>
  ANIMAL_CATEGORIES.find((c) => c.value === category) ?? ANIMAL_CATEGORIES[3];

export interface Comment {
  id: string;
  postId: string;
  authorName: string;
  content: string;
  createdAt: string;
  parentId?: string;
}

export interface DonationPost {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  goalAmount: number;
  raisedAmount: number;
  authorName: string;
  authorAvatar: string;
  createdAt: string;
  isCompleted: boolean;
  proofImages: string[];
  category: AnimalCategory;
}

export interface Notification {
  id: string;
  message: string;
  type: "proof_request" | "proof_sent" | "donation_completed";
  read: boolean;
  createdAt: string;
}

export const mockComments: Comment[] = [
  { id: "c1", postId: "1", authorName: "Juan Pérez", content: "¡Mucha fuerza Luna! Ya doné lo que pude.", createdAt: "2026-02-09" },
  { id: "c2", postId: "1", authorName: "Sofía Ramos", content: "Ojalá se recupere pronto. Compartido con mis amigos.", createdAt: "2026-02-10" },
  { id: "c2r1", postId: "1", authorName: "María García", content: "¡Gracias Sofía! Cada compartida ayuda mucho.", createdAt: "2026-02-10", parentId: "c2" },
  { id: "c3", postId: "2", authorName: "Andrea Muñoz", content: "Qué alegría que se alcanzó la meta para Michi 🎉", createdAt: "2026-02-01" },
  { id: "c4", postId: "3", authorName: "Diego Flores", content: "Rocky es un campeón, vamos a ayudarlo.", createdAt: "2026-02-11" },
  { id: "c5", postId: "5", authorName: "Camila Ríos", content: "Max merece la mejor vida posible. ¡Ánimo!", createdAt: "2026-02-02" },
];

export const mockPosts: DonationPost[] = [
  {
    id: "1",
    title: "Cirugía urgente para Luna",
    description: "Luna es una perrita mestiza de 4 años que fue atropellada y necesita una cirugía de emergencia en su pata trasera. Los veterinarios dicen que sin la operación podría perder la movilidad permanentemente. Necesitamos cubrir los costos de la cirugía, medicamentos y rehabilitación.",
    imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop",
    goalAmount: 450000,
    raisedAmount: 312000,
    authorName: "María García",
    authorAvatar: "",
    createdAt: "2026-02-08",
    isCompleted: false,
    proofImages: [
      "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1612531386530-97a1e4c0e1f5?w=400&h=300&fit=crop",
    ],
    category: "dog",
  },
  {
    id: "2",
    title: "Tratamiento para Michi con leucemia felina",
    description: "Michi fue diagnosticado con leucemia felina y necesita un tratamiento urgente que incluye medicamentos especializados y transfusiones. Es un gatito muy querido por toda la comunidad del barrio.",
    imageUrl: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=400&fit=crop",
    goalAmount: 280000,
    raisedAmount: 280000,
    authorName: "Carlos López",
    authorAvatar: "",
    createdAt: "2026-01-20",
    isCompleted: true,
    proofImages: [
      "https://images.unsplash.com/photo-1615497001839-b0a0eac3274c?w=400&h=300&fit=crop",
    ],
    category: "cat",
  },
  {
    id: "3",
    title: "Operación dental para Rocky",
    description: "Rocky es un bulldog francés de 6 años que sufre de una infección dental severa. Necesita una operación para extraer varias piezas dentales infectadas y evitar que la infección se extienda.",
    imageUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=400&fit=crop",
    goalAmount: 180000,
    raisedAmount: 45000,
    authorName: "Ana Martínez",
    authorAvatar: "",
    createdAt: "2026-02-10",
    isCompleted: false,
    proofImages: [],
    category: "dog",
  },
  {
    id: "4",
    title: "Rescate y rehabilitación de gatitos abandonados",
    description: "Encontramos una camada de 5 gatitos recién nacidos abandonados en la calle. Necesitan vacunas, desparasitación, alimentación especial y cuidados veterinarios hasta que sean adoptados.",
    imageUrl: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=600&h=400&fit=crop",
    goalAmount: 150000,
    raisedAmount: 98000,
    authorName: "Pedro Sánchez",
    authorAvatar: "",
    createdAt: "2026-02-05",
    isCompleted: false,
    proofImages: [
      "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=400&h=300&fit=crop",
    ],
    category: "cat",
  },
  {
    id: "5",
    title: "Quimioterapia para Max",
    description: "Max, un labrador de 8 años, fue diagnosticado con linfoma. Su familia no puede costear el tratamiento de quimioterapia que podría darle varios años más de vida. Cada donación cuenta.",
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop",
    goalAmount: 600000,
    raisedAmount: 520000,
    authorName: "Laura Torres",
    authorAvatar: "",
    createdAt: "2026-01-15",
    isCompleted: false,
    proofImages: [],
    category: "dog",
  },
  {
    id: "6",
    title: "Prótesis para Canela",
    description: "Canela perdió una de sus patitas en un accidente. Con una prótesis especializada podrá volver a caminar y correr. Ayúdanos a darle una segunda oportunidad.",
    imageUrl: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop",
    goalAmount: 350000,
    raisedAmount: 350000,
    authorName: "Roberto Díaz",
    authorAvatar: "",
    createdAt: "2026-01-28",
    isCompleted: true,
    proofImages: [
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop",
    ],
    category: "dog",
  },
  {
    id: "7",
    title: "Cirugía para conejito Nube",
    description: "Nube es un conejo enano que tiene un tumor que necesita ser removido con urgencia. La cirugía es delicada pero tiene altas probabilidades de éxito.",
    imageUrl: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&h=400&fit=crop",
    goalAmount: 200000,
    raisedAmount: 75000,
    authorName: "Valentina Rojas",
    authorAvatar: "",
    createdAt: "2026-02-11",
    isCompleted: false,
    proofImages: [],
    category: "rabbit",
  },
];

export const mockNotifications: Notification[] = [
  {
    id: "1",
    message: "Carlos López ha enviado las pruebas solicitadas para 'Tratamiento para Michi'",
    type: "proof_sent",
    read: false,
    createdAt: "2026-02-11",
  },
  {
    id: "2",
    message: "¡Tu donación para 'Prótesis para Canela' se completó exitosamente!",
    type: "donation_completed",
    read: false,
    createdAt: "2026-02-10",
  },
  {
    id: "3",
    message: "Un donante ha solicitado pruebas adicionales para tu publicación 'Cirugía urgente para Luna'",
    type: "proof_request",
    read: true,
    createdAt: "2026-02-09",
  },
];

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getProgressPercentage = (raised: number, goal: number): number => {
  return Math.min(Math.round((raised / goal) * 100), 100);
};