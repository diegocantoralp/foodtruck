import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import {FoodTruck} from "../model/food-truck.entity";

@Injectable({
  providedIn: 'root'
})
export class CountService extends BaseService<FoodTruck> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/food-trucks';
  }
}
