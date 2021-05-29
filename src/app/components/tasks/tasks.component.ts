import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../Task'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(
      (response) => {
        this.tasks = response;
      }, (error) => {
        console.error("Oops..." + error);
        alert("Ooops, sowi");
      }
    );
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(
      () => {
        alert("Task deleted!");
        this.tasks = this.tasks.filter(t => t.id !== task.id);
      }, (error) => {
        console.error("Opps, can't delete..." + error);

      }
    );
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe(
      () => {
        console.log("Task updated...")
      }
    )
  }

  addTask(task: Task) {
    console.log("Adding new task to db..." + task);

    this.taskService.insertTask(task).subscribe(
      (response) => {
        console.log("New task inserted...");
        this.tasks.push(response);
      }
    );
  }

}
