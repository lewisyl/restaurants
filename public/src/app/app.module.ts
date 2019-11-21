import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { HttpService } from "./Services/http-service/http.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { NewRestaurantComponent } from "./new-restaurant/new-restaurant.component";
import { ShowRestaurantsComponent } from "./show-restaurants/show-restaurants.component";
import { ShowRatesComponent } from "./show-rates/show-rates.component";
import { NewRateComponent } from "./new-rate/new-rate.component";
import { EditRestaurantComponent } from "./edit-restaurant/edit-restaurant.component";

@NgModule({
    declarations: [
        AppComponent,
        NewRestaurantComponent,
        ShowRestaurantsComponent,
        ShowRatesComponent,
        NewRateComponent,
        EditRestaurantComponent
    ],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
    providers: [HttpService],
    bootstrap: [AppComponent]
})
export class AppModule {}
