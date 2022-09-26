export interface Task {
  title: string;
  description: string;
  categorie: string;
  assignTo: string;
  date: number;
  priority: string;
  todo: boolean;
  inProgress: boolean;
  awaitingFeedback: boolean;
  done: boolean;
  history: boolean;

}
