import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BaseHttpService } from "./base.http.service";

@NgModule({
    declarations: [AppComponent],
    imports: [],
    providers: [
        BaseHttpService
    ],
    // entryComponents: [LoginComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }