import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TabsPage } from "./tabs";
import { SharedModule } from "../shared";
import { EventModule } from "../event";
import { AboutPage, ContactPage, HomePage } from "./pages";

@NgModule({
    imports: [SharedModule, EventModule,
        IonicModule.forRoot(AboutPage),
        IonicModule.forRoot(ContactPage),
        IonicModule.forRoot(HomePage),
        IonicModule.forRoot(TabsPage)
    ],
    declarations: [TabsPage, AboutPage, ContactPage, HomePage],
    providers: [],
    entryComponents: [TabsPage, AboutPage, ContactPage, HomePage],
    exports: [
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
    ]
})
export class TabsModule {
}