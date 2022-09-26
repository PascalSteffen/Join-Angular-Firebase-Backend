import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskFilter'
})
export class TaskFilterPipe implements PipeTransform {

  transform(tasks: any[], callback: (task: any) => boolean): any {
    if (!tasks || !callback) {
      return tasks;
    }
    return tasks.filter(task => callback(task));
  }

}
