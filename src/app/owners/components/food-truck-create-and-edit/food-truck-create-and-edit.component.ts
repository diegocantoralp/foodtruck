import { Component } from '@angular/core';
import {EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {FoodTruck} from "../../model/food-truck.entity";
import {Router} from "@angular/router";

@Component({
  selector: 'app-food-truck-create-and-edit',
  standalone: true,
  imports: [MatFormField, MatInputModule, MatButtonModule, FormsModule, NgIf],
  templateUrl: './food-truck-create-and-edit.component.html',
  styleUrl: './food-truck-create-and-edit.component.css'
})
export class FoodTruckCreateAndEditComponent {
  @Input() foodtruck: FoodTruck;
  @Input() editMode = false;
  @Output() foodtruckAdded = new EventEmitter<FoodTruck>();
  @Output() foodtruckUpdated = new EventEmitter<FoodTruck>();
  @Output() editCanceled = new EventEmitter();
  @ViewChild('foodtruckForm', {static: false}) foodtruckForm!: NgForm;

  // Methods
  constructor(private router: Router) {
    this.foodtruck = {} as FoodTruck;
  }

  // Private methods
  private resetEditState() {
    this.foodtruck = {} as FoodTruck;
    this.editMode = false;
    this.foodtruckForm.resetForm();
  }

  // Event Handlers

  onSubmit() {
    if (this.foodtruckForm.form.valid) {
      let emitter = this.editMode ? this.foodtruckUpdated : this.foodtruckAdded;
      emitter.emit(this.foodtruck);
      this.resetEditState();
    } else {
      console.error('Invalid data in form');
    }
  }

  onCancel() {
    this.editCanceled.emit();
    this.resetEditState();
  }

  onCancelAdd() {
    this.foodtruckForm.reset();
    this.router.navigate(['/home']);
  }
}
