import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AccordionComponent } from '../components/accordion/accordion.component';

@NgModule({
    declarations: [
        AccordionComponent
    ],
    imports: [CommonModule, IonicModule],
    exports: [AccordionComponent]
})

export class ComponentsModule {}