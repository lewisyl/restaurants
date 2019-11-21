import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { NewRestaurantComponent } from "./new-restaurant/new-restaurant.component";
import { ShowRestaurantsComponent } from "./show-restaurants/show-restaurants.component";
import { ShowRatesComponent } from "./show-rates/show-rates.component";
import { NewRateComponent } from "./new-rate/new-rate.component";
import { EditRestaurantComponent } from "./edit-restaurant/edit-restaurant.component";

const routes: Routes = [
    {
        path: "restaurants",
        component: ShowRestaurantsComponent,
        children: [
            {
                path: "edit/:resID",
                component: EditRestaurantComponent
            }
        ]
    },
    { path: "restaurants/new", component: NewRestaurantComponent },
    { path: "restaurants/:resID", component: ShowRatesComponent },
    { path: "restaurants/review/:resID", component: NewRateComponent },
    { path: "", pathMatch: "full", redirectTo: "/restaurants" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
