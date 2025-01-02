import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BaseHttpService } from "./base.http.service";
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
    declarations: [AppComponent],
    imports: [NzTableModule],
    providers: [
        BaseHttpService
    ],
    // entryComponents: [LoginComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }