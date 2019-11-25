import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';


import { NavComponent } from '../components/nav/nav.component';
import { FooterComponent } from '../components/footer/footer.component';
import { AccordionComponent } from '../components/accordion/accordion.component';

@NgModule({
    declarations: [
        NavComponent,
        FooterComponent,
        AccordionComponent
    ],
    imports: [CommonModule, IonicModule],
    exports: [NavComponent, FooterComponent, AccordionComponent]
})

export class ComponentsModule {}