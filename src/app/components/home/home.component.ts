import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FormsContactComponent } from '../forms-contact/forms-contact.component';
import { ProductsService } from '../products/products.service';

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

interface Card {
  amount: number;
  description: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, FormsContactComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newTask: string = '';
  tasks: Task[] = [];
  cards: Card[] = [
    { amount: 0, description: 'Produtos cadastrados', icon: 'shopping_bag', color: 'card-color1' },
    { amount: 23, description: 'Clientes cadastrados', icon: 'person', color: 'card-color2' },
    { amount: 0, description: 'Notas emitidas', icon: 'receipt', color: 'card-color3' },
  ];

  constructor(private productsService: ProductsService, private router: Router) {}

  ngOnInit(): void {
    this.loadTasks();
    this.updateProductCount();
    this.addExampleTask();
  }

  updateProductCount(): void {
    this.cards[0].amount = this.productsService.getProductCount();
  }

  addTask(): void {
    if (this.newTask.trim()) {
      const newTask: Task = {
        id: Date.now(),
        name: this.newTask.trim(),
        completed: false
      };
      this.tasks.push(newTask);
      this.saveTasks();
      this.newTask = '';
    }
  }

  toggleTaskCompletion(task: Task): void {
    task.completed = !task.completed;
    this.saveTasks();
  }

  editTask(task: Task): void {
    const newTaskName = prompt('Editar Tarefa:', task.name);
    if (newTaskName !== null && newTaskName.trim() !== '') {
      task.name = newTaskName.trim();
      this.saveTasks();
    }
  }

  deleteTask(task: Task): void {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
    this.saveTasks();
  }

  loadTasks(): void {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }

  saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  addExampleTask(): void {
    if (this.tasks.length === 0) {
      const exampleTask: Task = {
        id: Date.now(),
        name: 'Tarefa de exemplo',
        completed: false
      };
      this.tasks.push(exampleTask);
      this.saveTasks();
    }
  }

  getCardClass(color: string): string {
    return color;
  }

  goToProducts(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/products']);
  }
}
