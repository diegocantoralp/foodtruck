import { Component } from '@angular/core';
import { AfterViewInit, OnInit, ViewChild} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import {FoodTrucksService} from "../../services/food-trucks.service";
import {FoodTruck} from "../../model/food-truck.entity";
import {
  FoodTruckCreateAndEditComponent
} from "../../components/food-truck-create-and-edit/food-truck-create-and-edit.component";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-food-trucks-management',
  standalone: true,
  imports: [MatPaginator, MatSort, MatTableModule, MatIconModule, MatInputModule, NgClass, FoodTruckCreateAndEditComponent],
  templateUrl: './food-trucks-management.component.html',
  styleUrl: './food-trucks-management.component.css'
})
export class FoodTrucksManagementComponent implements OnInit, AfterViewInit  {
  foodtruckData: FoodTruck;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['field', 'title', 'placeholder', 'constraints'];
  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;
  isEditMode: boolean;

  constructor(private foodTrucksService: FoodTrucksService) {
    this.isEditMode = false;
    this.foodtruckData = {} as FoodTruck;
    this.dataSource = new MatTableDataSource<any>();
  }

  private resetEditState(): void{
    this.isEditMode = false;
    this.foodtruckData = {} as FoodTruck;
  }

  //CRUD

  private getAllFoodTrucks(): void {
    this.foodTrucksService.getAll().subscribe((data: any) => {
      this.dataSource.data = data;
    });
  }

  private createFoodTruck(){
    this.foodTrucksService.create(this.foodtruckData).subscribe((data: any) =>{
      this.dataSource.data.push({...data});
      this.dataSource.data = this.dataSource.data.map((foodtruck: FoodTruck) => {return foodtruck; });
    });
  };

  private updateFoodTruck(){
    let foodtruckToUpdate = this.foodtruckData;
    this.foodTrucksService.update(this.foodtruckData.id, foodtruckToUpdate).subscribe((data: any) => {
      this.dataSource.data = this.dataSource.data.map((foodtruck: FoodTruck) => {
        if ( foodtruck.id === data.id) {
          return data;
        }
        return foodtruck;
      });
    });
  }

  private deleteFoodTruck(foodtruckId: number) {
    this.foodTrucksService.delete(foodtruckId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((foodtruck: FoodTruck) => {
        return foodtruck.id !== foodtruckId ? foodtruck : false;
      });
    });
  };

  onEditItem(element: FoodTruck) {
    this.isEditMode = true;
    this.foodtruckData = element;
  }

  onDeleteItem(element: FoodTruck) {
    this.deleteFoodTruck(element.id);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllFoodTrucks();
  }

  onFoodTruckAdded(element: FoodTruck) {
    this.foodtruckData = element;
    this.createFoodTruck();
    this.resetEditState();
  }

  onFoodTruckUpdated(element: FoodTruck) {
    this.foodtruckData = element;
    this.updateFoodTruck();
    this.resetEditState();
  }

  // Lifecycle Hooks

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllFoodTrucks();
  }
}
